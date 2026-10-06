import nodemailer, { type Transporter } from 'nodemailer';
import { config } from './config.js';
import type { ContactFields } from './validation.js';

/**
 * HTML-escape a string and strip control characters (which would otherwise
 * allow header/structure injection). Escapes: & < > " ' /
 * Always escape `&` first so existing entities are not double-mangled.
 */
export function esc(text: string): string {
  const stripped = text.replace(/[\u0000-\u001F\u007F]/g, '');
  return stripped
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#47;');
}

function requireSmtpConfig(): void {
  if (!config.SMTP_HOST) {
    throw new Error(
      'SMTP is not configured: SMTP_HOST is missing. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL in the server .env file.',
    );
  }
  if (!config.CONTACT_TO_EMAIL || !config.CONTACT_FROM_EMAIL) {
    throw new Error(
      'SMTP is not configured: CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL is missing. Set them in the server .env file.',
    );
  }
}

function createTransport(): Transporter {
  requireSmtpConfig();
  return nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.SMTP_PORT === 465,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  });
}

function row(label: string, value: string): string {
  return `<tr>
            <td style="padding:6px 12px;border:1px solid #ddd;background:#f7f7f7;font-weight:bold;white-space:nowrap;">${label}</td>
            <td style="padding:6px 12px;border:1px solid #ddd;">${value}</td>
          </tr>`;
}

/** Build the notification email HTML. Every user value passes through esc(). */
function buildContactHtml(fields: ContactFields): string {
  const subjectLine = fields.subject ? esc(fields.subject) : '(no subject)';
  const rows = [
    row('Name', esc(fields.name)),
    row('Email', esc(fields.email)),
    row('Phone', fields.phone ? esc(fields.phone) : '(not provided)'),
    row('Subject', subjectLine),
  ].join('\n            ');

  return `
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#222;">
        <h2 style="margin:0 0 12px;">New contact form submission</h2>
        <p style="margin:0 0 12px;"><strong>Subject:</strong> ${subjectLine}</p>
        <table style="border-collapse:collapse;margin-bottom:16px;">
          <tbody>
            ${rows}
          </tbody>
        </table>
        <h3 style="margin:0 0 8px;">Message</h3>
        <div style="padding:12px;border:1px solid #ddd;background:#fff;white-space:pre-wrap;">${esc(fields.message)}</div>
      </div>`;
}

interface SendContactEmailArgs {
  fields: ContactFields;
  files: Express.Multer.File[];
  replyTo: string;
}

/** Send the notification email to the firm, with the uploaded files attached. */
export async function sendContactEmail({ fields, files, replyTo }: SendContactEmailArgs): Promise<void> {
  const safeName = esc(fields.name);
  const safeSubject = fields.subject ? esc(fields.subject) : '';
  // Keep the subject line short and single-line (esc already strips control chars).
  const subject = `New contact form: ${safeName}${safeSubject ? ` — ${safeSubject}` : ''}`.slice(0, 100);

  const transporter = createTransport();
  await transporter.sendMail({
    from: config.CONTACT_FROM_EMAIL,
    to: config.CONTACT_TO_EMAIL,
    replyTo,
    subject,
    html: buildContactHtml(fields),
    attachments: files.map((file) => ({
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype,
    })),
  });
}

interface SendAutoReplyArgs {
  to: string;
  name: string;
}

/** Send a short acknowledgement email to the person who submitted the form. */
export async function sendAutoReply({ to, name }: SendAutoReplyArgs): Promise<void> {
  const transporter = createTransport();
  const safeName = esc(name);
  const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#222;">
        <h2 style="margin:0 0 12px;">Thank you, ${safeName}</h2>
        <p style="margin:0 0 10px;">We have received your message and will respond within 24 hours.</p>
        <p style="margin:0;">Kind regards,<br />The Legal Team</p>
      </div>`;

  await transporter.sendMail({
    from: config.CONTACT_FROM_EMAIL,
    to,
    subject: 'We received your message',
    html,
  });
}
