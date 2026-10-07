import express, { type NextFunction, type Request, type Response, type RequestHandler } from 'express';
import compression from 'compression';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import multer from 'multer';
import { z } from 'zod';
import { MAX_TOTAL_UPLOAD_BYTES, config } from './config.js';
import { parseContactFields, type ContactFields } from './validation.js';
import { validateUploadedFiles, formatBytes, MAX_FILE_COUNT } from './files.js';
import { verifyTurnstile } from './turnstile.js';
import { sendContactEmail, sendAutoReply } from './mailer.js';

type UploadResult = { ok: true } | { ok: false; status: number; errorMsg: string };

/**
 * Wrap multer's callback API in a promise so upload failures become structured
 * results instead of thrown errors. Maps multer error codes to friendly HTTP
 * responses without leaking internals.
 */
function handleUpload(req: Request, res: Response, uploadMiddleware: RequestHandler): Promise<UploadResult> {
  return new Promise((resolve) => {
    uploadMiddleware(req, res, (err: unknown) => {
      if (err === undefined || err === null) {
        resolve({ ok: true });
        return;
      }

      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          resolve({
            ok: false,
            status: 413,
            errorMsg: `Upload too large. Maximum total size is ${config.MAX_TOTAL_UPLOAD_MB} MB.`,
          });
          return;
        }
        if (err.code === 'LIMIT_FILE_COUNT' || err.code === 'LIMIT_UNEXPECTED_FILE') {
          resolve({ ok: false, status: 400, errorMsg: `You can attach up to ${MAX_FILE_COUNT} files.` });
          return;
        }
        resolve({ ok: false, status: 400, errorMsg: 'Upload rejected.' });
        return;
      }

      // Non-multer error (stream failure, malformed multipart, ...).
      resolve({ ok: false, status: 400, errorMsg: 'Upload rejected.' });
    });
  });
}

export function createApp(): express.Express {
  const app = express();

  // Must be set before any middleware that inspects the client IP (rate limiter).
  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  // Gzip responses (JS/CSS/HTML/JSON) — the single biggest transfer-size win
  // on slow mobile networks. Runs before static + routes; small payloads
  // and already-compressed images/PDFs pass through untouched.
  app.use(compression());

  // This API also serves the built SPA on cPanel/Passenger deployments, so the
  // CSP must allow the site's own assets: Google Fonts (stylesheet + font
  // files), the Cloudflare Turnstile widget (script + iframe), Google Maps
  // embed (iframe), and data/blob images. Inline styles are allowed for
  // component libraries that emit style attributes; scripts stay strictly
  // same-origin + Turnstile.
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          baseUri: ["'self'"],
          objectSrc: ["'none'"],
          scriptSrc: ["'self'", 'https://challenges.cloudflare.com'],
          frameSrc: [
            "'self'",
            'https://challenges.cloudflare.com',
            'https://www.google.com',
            'https://maps.google.com',
          ],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:', 'blob:'],
          connectSrc: ["'self'"],
        },
      },
    }),
  );

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  // Rate limit only the contact endpoint: 5 submissions per 15 minutes per IP.
  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: (_req: Request, res: Response) => {
      res.status(429).json({ error: 'Too many submissions. Please try again later.' });
    },
  });

  // Memory storage only — uploads are never written to disk.
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_TOTAL_UPLOAD_BYTES, files: 6 },
  });

  let turnstileWarningLogged = false;

  app.post('/api/contact', contactLimiter, async (req: Request, res: Response) => {
    // 1. Receive files (multer fills req.body with text fields as well).
    const uploaded = await handleUpload(req, res, upload.array('files', MAX_FILE_COUNT));
    if (!uploaded.ok) {
      res.status(uploaded.status).json({ error: uploaded.errorMsg });
      return;
    }

    const files = (req.files as Express.Multer.File[] | undefined) ?? [];

    // 2. Validate text fields.
    let fields: ContactFields;
    try {
      fields = parseContactFields(req.body as Record<string, unknown>);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const message = err.issues[0]?.message ?? 'Invalid input.';
        res.status(400).json({ error: message });
        return;
      }
      res.status(400).json({ error: 'Invalid input.' });
      return;
    }

    // 3. Honeypot tripped → pretend success, send nothing.
    if (fields.honeypot !== undefined && fields.honeypot.trim() !== '') {
      res.status(200).json({ success: true, skipped: true });
      return;
    }

    // 4. Bot check. Failures return a fake success so bots learn nothing.
    if (!config.TURNSTILE_SECRET_KEY && !turnstileWarningLogged) {
      turnstileWarningLogged = true;
      console.warn('Turnstile verification is DISABLED: TURNSTILE_SECRET_KEY is not set.');
    }
    const turnstileOk = await verifyTurnstile(fields.turnstileToken, config.TURNSTILE_SECRET_KEY);
    if (!turnstileOk) {
      res.status(200).json({ success: true });
      return;
    }

    // 5. File validation (extension + magic bytes).
    const fileCheck = validateUploadedFiles(files);
    if (!fileCheck.ok) {
      res.status(400).json({ error: fileCheck.error });
      return;
    }

    // 5b. Total-size cap (multer's fileSize limit is per-file; this enforces
    //     the combined MAX_TOTAL_UPLOAD_MB across all attachments).
    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_TOTAL_UPLOAD_BYTES) {
      res.status(413).json({
        error: `Upload too large. Total size is ${formatBytes(totalBytes)}; maximum is ${config.MAX_TOTAL_UPLOAD_MB} MB.`,
      });
      return;
    }

    // 6. Send the notification email.
    // A short reference (e.g. MM-2026-A1B2C3) is shared by the firm
    // notification and the client's no-reply acknowledgement so the
    // two can be matched later.
    const reference = `MM-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    try {
      await sendContactEmail({ fields, files, replyTo: fields.email, reference });
    } catch (err) {
      // Log only the error message and the target env var name — never the
      // message body, file names or file contents.
      const reason = err instanceof Error ? err.message : 'unknown error';
      console.error(`Contact email failed (recipient from env CONTACT_TO_EMAIL): ${reason}`);
      res.status(500).json({
        error: 'Failed to send your message. Please try again or contact us directly.',
      });
      return;
    }

    // 7. Best-effort no-reply acknowledgement — must never fail the request.
    try {
      await sendAutoReply({ to: fields.email, name: fields.name, subject: fields.subject, reference });
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      console.warn(`Auto-reply failed (env CONTACT_FROM_EMAIL): ${reason}`);
    }

    res.status(200).json({ success: true });
  });

  // JSON 404 for any other API route — runs before the static SPA so API
  // paths never fall through to index.html.
  app.use('/api/*', (_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' });
  });

  // ---- Static SPA (cPanel/Passenger deployment) -------------------------
  // The frontend build sits in <project>/dist (two levels up from this
  // compiled file at server/dist). Override with STATIC_DIR if relocated.
  // Locally in dev the dist folder may be absent — then this block is skipped
  // entirely and the Vite dev server serves the UI as before.
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const distDir = process.env.STATIC_DIR
    ? path.resolve(process.env.STATIC_DIR)
    : path.resolve(moduleDir, '..', '..', 'dist');

  if (fs.existsSync(path.join(distDir, 'index.html'))) {
    app.use(
      express.static(distDir, {
        index: false,
        setHeaders: (res, filePath) => {
          if (filePath.endsWith('index.html')) {
            res.setHeader('Cache-Control', 'no-cache');
          } else if (filePath.includes(`${path.sep}assets${path.sep}`)) {
            // Vite fingerprints everything under assets/ — safe to cache hard.
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          } else {
            res.setHeader('Cache-Control', 'public, max-age=3600');
          }
        },
      }),
    );

    // History-mode fallback: any GET that survived the API 404 above gets the
    // SPA shell, so deep links like /contact survive a refresh.
    app.get('*', (_req: Request, res: Response) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  // Final error handler (must keep 4 parameters so Express treats it as one).
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (res.headersSent) return;
    const reason = err instanceof Error ? err.message : 'unknown error';
    console.error(`Unhandled API error: ${reason}`);
    res.status(500).json({ error: 'Internal server error.' });
  });

  return app;
}
