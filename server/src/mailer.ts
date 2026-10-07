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
function buildContactHtml(fields: ContactFields, reference?: string): string {
  const subjectLine = fields.subject ? esc(fields.subject) : '(no subject)';
  const rows = [
    ...(reference ? [row('Reference', esc(reference))] : []),
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
  /** Optional enquiry reference, echoed in the subject and body. */
  reference?: string;
}

/** Send the notification email to the firm, with the uploaded files attached. */
export async function sendContactEmail({ fields, files, replyTo, reference }: SendContactEmailArgs): Promise<void> {
  const safeName = esc(fields.name);
  const safeSubject = fields.subject ? esc(fields.subject) : '';
  // Keep the subject line short and single-line (esc already strips control chars).
  const subject = `New contact form: ${safeName}${safeSubject ? ` — ${safeSubject}` : ''}${reference ? ` [${reference}]` : ''}`.slice(0, 120);

  const transporter = createTransport();
  await transporter.sendMail({
    from: config.CONTACT_FROM_EMAIL,
    to: config.CONTACT_TO_EMAIL,
    replyTo,
    subject,
    html: buildContactHtml(fields, reference),
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
  /** Echo of the client's subject line (optional). */
  subject?: string;
  /** Enquiry reference number (optional). */
  reference?: string;
}

/**
 * Send the no-reply acknowledgement email to the person who submitted the
 * form. Sent from the dedicated NO_REPLY_EMAIL address (falling back to
 * CONTACT_FROM_EMAIL), with replies routed to the firm's inbox and
 * RFC 3834 auto-reply headers so mail loops and out-of-office storms
 * cannot occur.
 */
export async function sendAutoReply({ to, name, subject, reference }: SendAutoReplyArgs): Promise<void> {
  const transporter = createTransport();
  const fromAddress = config.NO_REPLY_EMAIL || config.CONTACT_FROM_EMAIL;
  const from = `${config.FIRM_NAME} (No Reply) <${fromAddress}>`;
  const safeName = esc(name);
  const subjectLine = subject ? esc(subject) : '(no subject)';
  const referenceLine = reference ? esc(reference) : null;
  const inbox = esc(config.CONTACT_TO_EMAIL);

  const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#222;max-width:600px;margin:0 auto;">
        <div style="background:#1e3a8a;padding:20px 24px;border-radius:8px 8px 0 0;">
          <div style="color:#f5c518;font-size:18px;font-weight:bold;">${esc(config.FIRM_NAME)}</div>
          <div style="color:#ffffff;font-size:12px;">Timely and Affordable Legal Services</div>
        </div>
        <div style="padding:24px;border:1px solid #ddd;border-top:none;border-radius:0 0 8px 8px;">
          <h2 style="margin:0 0 12px;font-size:18px;">Thank you, ${safeName}</h2>
          <p style="margin:0 0 12px;">We have received your enquiry and a member of our legal team will respond within <strong>24 hours</strong> (Monday–Friday).</p>
          ${
            referenceLine
              ? `<p style="margin:0 0 12px;">Your enquiry reference is <strong>${referenceLine}</strong> — please quote it in any follow-up.</p>`
              : ''
          }
          <p style="margin:0 0 4px;color:#555;">Subject: ${subjectLine}</p>
          <h3 style="margin:16px 0 8px;font-size:15px;">What happens next?</h3>
          <ol style="margin:0 0 12px;padding-left:20px;color:#333;">
            <li>An advocate reviews your message and any attachments.</li>
            <li>We contact you on the email or phone number you provided.</li>
            <li>If needed, we schedule a consultation at our Thika office.</li>
          </ol>
          <p style="margin:0 0 12px;">Need us sooner? Call/WhatsApp <strong>+254 704 780 934</strong> or write to <strong>${inbox}</strong>.</p>
          <p style="margin:0;padding-top:12px;border-top:1px solid #eee;font-size:12px;color:#777;">This is an automated message from an unmonitored mailbox — please do not reply to it. To reach us, write to ${inbox}.</p>
          <p style="margin:12px 0 0;">Kind regards,<br /><strong>${esc(config.FIRM_NAME)}</strong><br />Equity Plaza, Commercial Street, 4th Floor Wing B Rm 420, Thika</p>
        </div>
      </div>`;

  await transporter.sendMail({
    from,
    to,
    // Replies from the client must reach a human, never bounce off no-reply.
    replyTo: config.CONTACT_TO_EMAIL,
    subject: reference
      ? `We received your enquiry [${reference}]`
      : 'We received your enquiry',
    html,
    headers: {
      'Auto-Submitted': 'auto-replied',
      'X-Auto-Response-Suppress': 'All',
    },
  });
}
