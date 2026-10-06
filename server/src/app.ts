import express, { type NextFunction, type Request, type Response, type RequestHandler } from 'express';
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
  app.use(helmet());

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
    try {
      await sendContactEmail({ fields, files, replyTo: fields.email });
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

    // 7. Best-effort auto-reply — must never fail the request.
    try {
      await sendAutoReply({ to: fields.email, name: fields.name });
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      console.warn(`Auto-reply failed (env CONTACT_FROM_EMAIL): ${reason}`);
    }

    res.status(200).json({ success: true });
  });

  // JSON 404 for any other API route.
  app.use('/api/*', (_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' });
  });

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
