import path from 'node:path';

/** File extensions accepted by the contact form, lowercase, no dot. */
export const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'] as const;

export type AllowedExtension = (typeof ALLOWED_EXTENSIONS)[number];

/**
 * Canonical MIME types per extension. Browsers are inconsistent (some send
 * `application/octet-stream`), so the declared MIME is advisory only — the
 * authoritative check is the magic-byte sniffing below.
 */
export const ALLOWED_MIME: { readonly [K in AllowedExtension]: string | readonly string[] } = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  jpg: ['image/jpeg'],
  jpeg: ['image/jpeg'],
  png: 'image/png',
};

/** Reusable human-readable list for error messages, e.g. ".pdf, .doc, ...". */
export const ALLOWED_EXTENSIONS_LABEL = ALLOWED_EXTENSIONS.map((ext) => `.${ext}`).join(', ');

/** Kind detected from a file's leading bytes. */
export type FileKind = 'pdf' | 'doc' | 'docx' | 'jpg' | 'png' | 'unknown';

const KIND_LABEL: Record<Exclude<FileKind, 'unknown'>, string> = {
  pdf: 'PDF',
  doc: 'Word document (DOC)',
  docx: 'Word document (DOCX)',
  jpg: 'JPEG image',
  png: 'PNG image',
};

/**
 * Detect the real file kind from magic bytes (file signatures):
 *  - PDF  → "%PDF"        (25 50 44 46)
 *  - DOC  → OLE2 compound (D0 CF 11 E0 A1 B1 1A E1)
 *  - DOCX → ZIP archive   (50 4B 03 04) — OOXML packages are zips
 *  - JPEG → (FF D8 FF)
 *  - PNG  → (89 50 4E 47 0D 0A 1A 0A)
 * Anything else is 'unknown' and therefore rejected.
 */
export function detectFileKind(buffer: Buffer): FileKind {
  if (buffer.length >= 4 && buffer.readUInt32BE(0) === 0x25504446) return 'pdf'; // %PDF
  if (
    buffer.length >= 8 &&
    buffer[0] === 0xd0 &&
    buffer[1] === 0xcf &&
    buffer[2] === 0x11 &&
    buffer[3] === 0xe0 &&
    buffer[4] === 0xa1 &&
    buffer[5] === 0xb1 &&
    buffer[6] === 0x1a &&
    buffer[7] === 0xe1
  ) {
    return 'doc';
  }
  if (buffer.length >= 4 && buffer[0] === 0x50 && buffer[1] === 0x4b && buffer[2] === 0x03 && buffer[3] === 0x04) {
    return 'docx';
  }
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return 'jpg';
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return 'png';
  }
  return 'unknown';
}

/** Map an extension to the magic-byte kind it must sniff as (.jpg and .jpeg both → jpg). */
function expectedKindForExtension(ext: AllowedExtension): Exclude<FileKind, 'unknown'> {
  return ext === 'jpeg' ? 'jpg' : ext;
}

function isAllowedMime(ext: AllowedExtension, mime: string): boolean {
  const allowed = ALLOWED_MIME[ext];
  const normalized = mime.toLowerCase();
  if (Array.isArray(allowed)) return allowed.includes(normalized);
  if (allowed === normalized) return true;
  // Generic octet-stream is tolerated ONLY because the magic-byte check below
  // independently proves the content matches the extension.
  return normalized === 'application/octet-stream';
}

export type ValidationResult = { ok: true } | { ok: false; error: string };

export const MAX_FILE_COUNT = 5;

/**
 * Validate the uploaded set: count, non-empty, allowed extension, declared
 * MIME (advisory) and — decisively — magic bytes matching the extension.
 * Returns a single human-readable error for the first offending file.
 */
export function validateUploadedFiles(files: Express.Multer.File[]): ValidationResult {
  if (files.length === 0) return { ok: true };
  if (files.length > MAX_FILE_COUNT) {
    return { ok: false, error: `You can attach up to ${MAX_FILE_COUNT} files.` };
  }

  for (const file of files) {
    const original = file.originalname || 'unnamed';
    const extRaw = path.extname(original).replace('.', '').toLowerCase();
    const ext = ALLOWED_EXTENSIONS.find((allowed) => allowed === extRaw);

    if (file.size === 0) {
      return { ok: false, error: `Rejected file "${original}": file is empty.` };
    }

    if (!ext) {
      return {
        ok: false,
        error: `Rejected file "${original}": file type ".${extRaw || '?'}" is not allowed. Allowed types: ${ALLOWED_EXTENSIONS_LABEL}.`,
      };
    }

    if (!isAllowedMime(ext, file.mimetype)) {
      return {
        ok: false,
        error: `Rejected file "${original}": content type "${file.mimetype}" does not match a .${ext} file.`,
      };
    }

    const kind = detectFileKind(file.buffer);
    const expected = expectedKindForExtension(ext);
    if (kind !== expected) {
      const label = kind === 'unknown' ? 'an unknown format' : KIND_LABEL[kind];
      return {
        ok: false,
        error: `Rejected file "${original}": content does not match a ${KIND_LABEL[expected]} (detected ${label}).`,
      };
    }
  }

  return { ok: true };
}

/** Human-readable byte size, e.g. "1.5 MB", "320 KB". */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  const rounded = value >= 10 ? Math.round(value) : Math.round(value * 10) / 10;
  return `${rounded} ${units[unitIndex]}`;
}
