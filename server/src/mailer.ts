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

/* ------------------------------------------------------------------ */
/* Brand tokens (mirror tailwind.config.ts: navy + gold trust palette) */
/* ------------------------------------------------------------------ */

const NAVY = '#1e3a8a';
const NAVY_DARK = '#0a1633';
const GOLD = '#fbbf24';
const GOLD_DARK = '#b45309';
const INK = '#1f2937';
const MUTED = '#6b7280';
const BG = '#f1f5f9';
const CARD = '#ffffff';
const BORDER = '#e2e8f0';

const SITE_URL = 'https://mwauramurokiadvocates.co.ke';
const LOGO_URL = `${SITE_URL}/uploads/7ac751ff-dfac-4f6b-9e97-e9e8eb7fe3b8.png`;
const PHONE_DISPLAY = '+254 704 780 934';
const PHONE_LINK = 'tel:+254704780934';
const WHATSAPP_LINK = 'https://wa.me/254704780934';
const OFFICE_ADDRESS = 'Equity Plaza, Commercial Street, 4th Floor Wing B Rm 420, Thika';
const OFFICE_HOURS = 'Mon\u2013Fri 8:00am\u20135:00pm \u00b7 Sat 9:00am\u20131:00pm';
const TAGLINE = 'Timely and Affordable Legal Services';

const FONT_STACK = `-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif`;

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

/* ------------------------------------------------------------------ */
/* Shared email-safe layout (table-based, all-inline CSS)              */
/* ------------------------------------------------------------------ */

/** Hidden preview text shown in the inbox list, not in the body. */
function preheader(text: string): string {
  return `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${text}</div>`;
}

/** Branded header band: logo + firm name + tagline. Text-first so blocking images still reads well. */
function headerBand(): string {
  const firm = esc(config.FIRM_NAME);
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${NAVY};background-color:${NAVY};">
    <tr>
      <td style="padding:22px 28px;">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="vertical-align:middle;padding-right:14px;">
              <img src="${LOGO_URL}" alt="${firm} logo" width="46" height="46" style="display:block;width:46px;height:46px;border:0;outline:none;background:${CARD};border-radius:8px;" />
            </td>
            <td style="vertical-align:middle;">
              <div style="font-family:${FONT_STACK};font-size:19px;font-weight:bold;color:${GOLD};line-height:1.25;">${firm}</div>
              <div style="font-family:${FONT_STACK};font-size:12px;color:#ffffff;letter-spacing:0.4px;">${TAGLINE}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr><td style="height:3px;line-height:3px;font-size:0;background:${GOLD};background-color:${GOLD};">&nbsp;</td></tr>
  </table>`;
}

/** Reference badge: gold-outlined pill with the enquiry reference. */
function referenceBadge(reference: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 14px;">
    <tr>
      <td style="font-family:${FONT_STACK};font-size:13px;color:${NAVY_DARK};background:#fef9c3;border:1px solid ${GOLD};border-radius:999px;padding:7px 16px;">
        Enquiry reference: <strong>${esc(reference)}</strong>
      </td>
    </tr>
  </table>`;
}

/** Footer: address, phone, hours, confidentiality + unmonitored notice. */
function footerBlock(opts: { unmonitored?: boolean } = {}): string {
  const firm = esc(config.FIRM_NAME);
  const inbox = esc(config.CONTACT_TO_EMAIL);
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${NAVY_DARK};background-color:${NAVY_DARK};">
    <tr>
      <td style="padding:20px 28px;font-family:${FONT_STACK};font-size:12px;line-height:1.7;color:#cbd5e1;">
        <div style="font-size:13px;font-weight:bold;color:${GOLD};margin-bottom:4px;">${firm}</div>
        <div>${OFFICE_ADDRESS}</div>
        <div><a href="${PHONE_LINK}" style="color:#ffffff;text-decoration:none;">${PHONE_DISPLAY}</a> &nbsp;\u00b7&nbsp; <a href="${SITE_URL}" style="color:#ffffff;text-decoration:none;">mwauramurokiadvocates.co.ke</a></div>
        <div style="color:#94a3b8;">${OFFICE_HOURS}</div>
        <div style="margin-top:10px;padding-top:10px;border-top:1px solid #334155;color:#94a3b8;font-size:11px;">
          ${opts.unmonitored
            ? `This is an automated message from an unmonitored mailbox \u2014 please do not reply to it. To reach us, write to <a href="mailto:${inbox}" style="color:#ffffff;">${inbox}</a>.<br />`
            : ''}
          The information in this email is confidential and intended for the named recipient only.
        </div>
      </td>
    </tr>
  </table>`;
}

/** Full document shell: inbox preview + header + body + footer. */
function shell(previewText: string, bodyInner: string, footerOpts?: { unmonitored?: boolean }): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${esc(config.FIRM_NAME)}</title>
</head>
<body style="margin:0;padding:0;background:${BG};background-color:${BG};">
${preheader(previewText)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};background-color:${BG};">
<tr>
<td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:${CARD};background-color:${CARD};border:1px solid ${BORDER};border-radius:10px;overflow:hidden;">
<tr><td style="padding:0;">${headerBand()}</td></tr>
<tr><td style="padding:26px 28px;font-family:${FONT_STACK};font-size:14px;line-height:1.65;color:${INK};">${bodyInner}</td></tr>
<tr><td style="padding:0;">${footerBlock(footerOpts)}</td></tr>
</table>
<div style="font-family:${FONT_STACK};font-size:11px;color:${MUTED};padding:12px 0 0;">Licensed Advocate of the High Court of Kenya \u00b7 Member, Law Society of Kenya</div>
</td>
</tr>
</table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
            <td style="padding:9px 14px;border:1px solid ${BORDER};background:#f8fafc;font-weight:bold;white-space:nowrap;font-size:13px;color:${NAVY_DARK};width:130px;">${label}</td>
            <td style="padding:9px 14px;border:1px solid ${BORDER};font-size:13px;">${value}</td>
          </tr>`;
}

/* ------------------------------------------------------------------ */
/* Firm notification email                                             */
/* ------------------------------------------------------------------ */

/** Build the notification email HTML. Every user value passes through esc(). */
export function buildContactHtml(fields: ContactFields, reference?: string, attachmentCount = 0): string {
  const subjectLine = fields.subject ? esc(fields.subject) : '(no subject)';
  const rows = [
    ...(reference ? [row('Reference', `<strong>${esc(reference)}</strong>`)] : []),
    row('Name', esc(fields.name)),
    row('Email', `<a href="mailto:${esc(fields.email)}" style="color:${NAVY};">${esc(fields.email)}</a>`),
    row('Phone', fields.phone ? esc(fields.phone) : '<span style="color:#9ca3af;">(not provided)</span>'),
    row('Subject', subjectLine),
    ...(attachmentCount > 0
      ? [row('Attachments', `${attachmentCount} file${attachmentCount === 1 ? '' : 's'} attached`)]
      : []),
  ].join('\n            ');

  const body = `
        <div style="font-size:12px;font-weight:bold;letter-spacing:1.5px;color:${GOLD_DARK};margin-bottom:6px;">NEW WEBSITE ENQUIRY</div>
        <h1 style="margin:0 0 6px;font-size:21px;line-height:1.3;color:${NAVY_DARK};">New contact form submission</h1>
        <p style="margin:0 0 16px;color:${MUTED};font-size:13px;">Reply directly to this email to respond \u2014 replies go to the client via Reply-To.</p>
        ${reference ? referenceBadge(reference) : ''}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:18px;">
          <tbody>
            ${rows}
          </tbody>
        </table>
        <div style="font-size:12px;font-weight:bold;letter-spacing:1.5px;color:${GOLD_DARK};margin-bottom:6px;">CLIENT MESSAGE</div>
        <div style="padding:16px 18px;border:1px solid ${BORDER};border-left:4px solid ${NAVY};background:#f8fafc;white-space:pre-wrap;font-size:14px;">${esc(fields.message)}</div>`;

  return shell(
    `New enquiry${reference ? ` ${esc(reference)}` : ''} from ${esc(fields.name)} — ${esc(fields.subject || 'no subject')}`,
    body,
  );
}

/** Plain-text mirror of the firm notification (deliverability + screen readers). */
export function buildContactText(fields: ContactFields, reference?: string, attachmentCount = 0): string {
  const lines = [
    `${config.FIRM_NAME} \u2014 New website enquiry`,
    '========================================',
    ...(reference ? [`Reference:   ${reference}`] : []),
    `Name:        ${fields.name}`,
    `Email:       ${fields.email}`,
    `Phone:       ${fields.phone || '(not provided)'}`,
    `Subject:     ${fields.subject || '(no subject)'}`,
    ...(attachmentCount > 0 ? [`Attachments: ${attachmentCount} file(s) attached`] : []),
    '',
    '--- Client message ---',
    fields.message,
    '',
    `-- Reply to this email to respond to the client. Reference ${reference || 'n/a'}.`,
  ];
  return lines.join('\n');
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
  const subject = `New contact form: ${safeName}${safeSubject ? ` \u2014 ${safeSubject}` : ''}${reference ? ` [${reference}]` : ''}`.slice(0, 120);

  const transporter = createTransport();
  await transporter.sendMail({
    from: config.CONTACT_FROM_EMAIL,
    to: config.CONTACT_TO_EMAIL,
    replyTo,
    subject,
    text: buildContactText(fields, reference, files.length),
    html: buildContactHtml(fields, reference, files.length),
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

/* ------------------------------------------------------------------ */
/* Client no-reply acknowledgement email                               */
/* ------------------------------------------------------------------ */

/** Build the acknowledgement HTML. Every user value passes through esc(). */
export function buildAutoReplyHtml(name: string, subject?: string, reference?: string): string {
  const safeName = esc(name);
  const subjectLine = subject ? esc(subject) : '(no subject)';
  const inbox = esc(config.CONTACT_TO_EMAIL);

  const step = (n: string, title: string, desc: string): string => `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
      <tr>
        <td width="34" style="width:34px;vertical-align:top;padding-top:2px;">
          <div style="width:26px;height:26px;line-height:26px;text-align:center;font-size:13px;font-weight:bold;color:#ffffff;background:${NAVY};border-radius:999px;">${n}</div>
        </td>
        <td style="vertical-align:top;">
          <div style="font-weight:bold;font-size:14px;color:${NAVY_DARK};">${title}</div>
          <div style="font-size:13px;color:${MUTED};">${desc}</div>
        </td>
      </tr>
    </table>`;

  const body = `
        <h1 style="margin:0 0 6px;font-size:22px;line-height:1.3;color:${NAVY_DARK};">Thank you, ${safeName}.</h1>
        <p style="margin:0 0 14px;font-size:14px;">We have received your enquiry and a member of our legal team will respond within <strong>24 hours</strong> (Monday\u2013Friday).</p>
        ${reference ? referenceBadge(reference) : ''}
        ${reference ? `<p style="margin:0 0 14px;font-size:13px;color:${MUTED};">Please quote your reference in any follow-up call or email.</p>` : ''}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid ${BORDER};border-radius:8px;margin-bottom:18px;">
          <tr><td style="padding:12px 16px;font-size:13px;color:${MUTED};">Your subject: <strong style="color:${INK};">${subjectLine}</strong></td></tr>
        </table>
        <div style="font-size:12px;font-weight:bold;letter-spacing:1.5px;color:${GOLD_DARK};margin-bottom:10px;">WHAT HAPPENS NEXT</div>
        ${step('1', 'An advocate reviews your message', 'Including any documents you attached.')}
        ${step('2', 'We contact you directly', 'On the email address or phone number you provided.')}
        ${step('3', 'We schedule a consultation if needed', `At our Thika office: ${OFFICE_ADDRESS}.`)}
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:18px 0 6px;">
          <tr>
            <td style="padding-right:10px;">
              <a href="${PHONE_LINK}" style="display:inline-block;font-family:${FONT_STACK};font-size:14px;font-weight:bold;color:${NAVY_DARK};background:${GOLD};text-decoration:none;border-radius:8px;padding:12px 22px;">Call ${PHONE_DISPLAY}</a>
            </td>
            <td>
              <a href="${WHATSAPP_LINK}" style="display:inline-block;font-family:${FONT_STACK};font-size:14px;font-weight:bold;color:#ffffff;background:#16a34a;text-decoration:none;border-radius:8px;padding:12px 22px;">WhatsApp us</a>
            </td>
          </tr>
        </table>
        <p style="margin:12px 0 0;font-size:13px;color:${MUTED};">Prefer email? Write to <a href="mailto:${inbox}" style="color:${NAVY};">${inbox}</a>.</p>
        <p style="margin:18px 0 0;">Kind regards,<br /><strong style="color:${NAVY_DARK};">${esc(config.FIRM_NAME)}</strong><br /><span style="font-size:13px;color:${MUTED};">${OFFICE_ADDRESS}</span></p>`;

  return shell(
    `We received your enquiry${reference ? ` [${reference}]` : ''} \u2014 response within 24 hours`,
    body,
    { unmonitored: true },
  );
}

/** Plain-text mirror of the acknowledgement. */
export function buildAutoReplyText(name: string, subject?: string, reference?: string): string {
  return [
    `${config.FIRM_NAME}`,
    TAGLINE,
    '========================================',
    `Dear ${name},`,
    '',
    'Thank you \u2014 we have received your enquiry and a member of our legal team',
    'will respond within 24 hours (Monday\u2013Friday).',
    ...(reference ? ['', `Your enquiry reference: ${reference}`, 'Please quote it in any follow-up.'] : []),
    '',
    `Your subject: ${subject || '(no subject)'}`,
    '',
    'What happens next:',
    '  1. An advocate reviews your message and any attachments.',
    '  2. We contact you on the email or phone number you provided.',
    `  3. If needed, we schedule a consultation at our Thika office (${OFFICE_ADDRESS}).`,
    '',
    `Need us sooner? Call/WhatsApp ${PHONE_DISPLAY} or write to ${config.CONTACT_TO_EMAIL}.`,
    '',
    'This is an automated message from an unmonitored mailbox \u2014 please do not',
    `reply to it. To reach us, write to ${config.CONTACT_TO_EMAIL}.`,
    '',
    `Kind regards,\n${config.FIRM_NAME}\n${OFFICE_ADDRESS}`,
  ].join('\n');
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

  await transporter.sendMail({
    from,
    to,
    // Replies from the client must reach a human, never bounce off no-reply.
    replyTo: config.CONTACT_TO_EMAIL,
    subject: reference
      ? `We received your enquiry [${reference}]`
      : 'We received your enquiry',
    text: buildAutoReplyText(name, subject, reference),
    html: buildAutoReplyHtml(name, subject, reference),
    headers: {
      'Auto-Submitted': 'auto-replied',
      'X-Auto-Response-Suppress': 'All',
    },
  });
}
