import { PDFDocument, PDFFont, PDFPage, rgb, StandardFonts, degrees } from "pdf-lib";

/**
 * Branded letterhead engine for Mwaura Muroki Associates & Advocates.
 *
 * Pure pdf-lib drawing helpers (no React, no DOM) so generated PDFs carry
 * the firm's full identity: navy header band with vector MM monogram,
 * contact strip, sectioned field boxes, signature blocks and paginated
 * footers. Everything is WinAnsi-safe (ASCII only) for pdf-lib standard fonts.
 */

export const FIRM = {
  name: "MWAURA MUROKI",
  descriptor: "ASSOCIATES & ADVOCATES",
  tagline: "To provide timely and affordable legal services.",
  address: "Equity Plaza, Commercial Street, 4th Floor Wing B Room 420, Thika, Kenya",
  phone: "+254 704 780 934",
  email: "mwauramurokiadvocates@gmail.com",
  website: "mwauramurokiadvocates.co.ke",
} as const;

const NAVY = rgb(0.04, 0.11, 0.26);
const NAVY_SOFT = rgb(0.16, 0.25, 0.45);
const GOLD = rgb(0.78, 0.62, 0.18);
const GOLD_LIGHT = rgb(0.95, 0.9, 0.76);
const INK = rgb(0.13, 0.13, 0.15);
const MUTED = rgb(0.42, 0.43, 0.46);
const BOX_FILL = rgb(0.96, 0.96, 0.97);
const BOX_BORDER = rgb(0.8, 0.81, 0.84);
const WATERMARK = rgb(0.93, 0.93, 0.94);
const WHITE = rgb(1, 1, 1);

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 50;
const CONTENT_W = PAGE_W - MARGIN * 2;
const HEADER_H = 118;
const FOOTER_RESERVE = 92;

export interface LetterheadField {
  label: string;
  value: string;
  long?: boolean;
}

export interface LetterheadSection {
  heading: string;
  fields: LetterheadField[];
}

export interface Signatory {
  role: string;
  caption: string;
}

interface Fonts {
  serif: PDFFont;
  serifBold: PDFFont;
  sans: PDFFont;
  sansBold: PDFFont;
  sansItalic: PDFFont;
}

interface Ctx {
  doc: PDFDocument;
  fonts: Fonts;
  pages: PDFPage[];
  page: PDFPage;
  cursorY: number;
}

function textWidth(font: PDFFont, text: string, size: number): number {
  return font.widthOfTextAtSize(text, size);
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const trial = line ? `${line} ${word}` : word;
    if (textWidth(font, trial, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = trial;
    }
  }
  if (line) lines.push(line);
  return lines.length > 0 ? lines : [""];
}

function drawCentered(
  page: PDFPage,
  text: string,
  y: number,
  font: PDFFont,
  size: number,
  color: ReturnType<typeof rgb>,
  maxWidth = CONTENT_W,
  centerX = PAGE_W / 2,
) {
  const w = Math.min(textWidth(font, text, size), maxWidth);
  page.drawText(text, { x: centerX - w / 2, y, size, font, color });
}

function drawHeader(ctx: Ctx) {
  const { page, fonts } = ctx;
  // Navy band
  page.drawRectangle({ x: 0, y: PAGE_H - HEADER_H, width: PAGE_W, height: HEADER_H, color: NAVY });
  // Gold rule under band
  page.drawRectangle({ x: 0, y: PAGE_H - HEADER_H - 4, width: PAGE_W, height: 4, color: GOLD });

  // Vector MM monogram in gold ring
  const cx = 78;
  const cy = PAGE_H - HEADER_H / 2 - 2;
  page.drawCircle({ x: cx, y: cy, size: 30, borderColor: GOLD, borderWidth: 1.6 });
  const mm = "MM";
  page.drawText(mm, {
    x: cx - textWidth(fonts.serifBold, mm, 21) / 2,
    y: cy - 8,
    size: 21,
    font: fonts.serifBold,
    color: GOLD,
  });

  // Wordmark
  const tx = 122;
  page.drawText(FIRM.name, { x: tx, y: PAGE_H - 52, size: 21, font: fonts.serifBold, color: WHITE });
  page.drawText(FIRM.descriptor, { x: tx, y: PAGE_H - 68, size: 9.5, font: fonts.sansBold, color: GOLD });
  page.drawText(`"${FIRM.tagline}"`, {
    x: tx,
    y: PAGE_H - 82,
    size: 8.5,
    font: fonts.sansItalic,
    color: rgb(0.78, 0.82, 0.92),
  });
  page.drawText("Advocates | Commissioners for Oaths | LSK Member", {
    x: tx,
    y: PAGE_H - 96,
    size: 7.5,
    font: fonts.sans,
    color: rgb(0.62, 0.67, 0.8),
  });

  // Contact strip (centered, wrapped to two lines)
  const strip = `${FIRM.address}  |  Tel: ${FIRM.phone}  |  ${FIRM.email}`;
  const lines = wrapText(strip, fonts.sans, 7.5, CONTENT_W);
  let sy = PAGE_H - HEADER_H - 20;
  for (const line of lines) {
    drawCentered(page, line, sy, fonts.sans, 7.5, MUTED);
    sy -= 11;
  }
  ctx.cursorY = sy - 14;
}

function drawWatermark(ctx: Ctx) {
  const { page, fonts } = ctx;
  const mark = "MWAURA MUROKI";
  const size = 52;
  const w = textWidth(fonts.serifBold, mark, size);
  page.drawText(mark, {
    x: PAGE_W / 2 - w / 2,
    y: PAGE_H / 2 - 40,
    size,
    font: fonts.serifBold,
    color: WATERMARK,
    rotate: degrees(38),
  });
}

function newPage(ctx: Ctx) {
  const page = ctx.doc.addPage([PAGE_W, PAGE_H]);
  ctx.pages.push(page);
  ctx.page = page;
  drawWatermark(ctx);
  drawHeader(ctx);
}

function ensureSpace(ctx: Ctx, needed: number) {
  if (ctx.cursorY - needed < FOOTER_RESERVE) newPage(ctx);
}

function drawTitleBlock(ctx: Ctx, title: string, refCode: string, dateStr: string) {
  const { fonts } = ctx;
  ensureSpace(ctx, 76);
  // NOTE: capture the page AFTER ensureSpace — it may have added a new page.
  const page = ctx.page;
  const y = ctx.cursorY;
  drawCentered(page, title.toUpperCase(), y, fonts.serifBold, 15, NAVY);
  const tw = textWidth(fonts.serifBold, title.toUpperCase(), 15);
  page.drawLine({
    start: { x: PAGE_W / 2 - tw / 2, y: y - 6 },
    end: { x: PAGE_W / 2 + tw / 2, y: y - 6 },
    thickness: 1.5,
    color: GOLD,
  });
  const metaY = y - 26;
  page.drawText(`REF: ${refCode}`, { x: MARGIN, y: metaY, size: 9, font: fonts.sansBold, color: NAVY_SOFT });
  const dateLabel = `DATE: ${dateStr}`;
  page.drawText(dateLabel, {
    x: PAGE_W - MARGIN - textWidth(fonts.sans, dateLabel, 9),
    y: metaY,
    size: 9,
    font: fonts.sans,
    color: MUTED,
  });
  ctx.cursorY = metaY - 24;
}

function drawSectionHeading(ctx: Ctx, heading: string, keepWithNext = 0) {
  const { fonts } = ctx;
  // keepWithNext reserves room for the first field so a heading is never
  // orphaned at the bottom of a page while its content starts the next one.
  ensureSpace(ctx, 40 + keepWithNext);
  const page = ctx.page;
  const y = ctx.cursorY;
  const label = heading.toUpperCase();
  page.drawText(label, { x: MARGIN, y, size: 10.5, font: fonts.sansBold, color: NAVY });
  page.drawLine({
    start: { x: MARGIN, y: y - 5 },
    end: { x: MARGIN + textWidth(fonts.sansBold, label, 10.5), y: y - 5 },
    thickness: 1.5,
    color: GOLD,
  });
  ctx.cursorY = y - 22;
}

function drawField(ctx: Ctx, field: LetterheadField) {
  const { fonts } = ctx;
  const clean = field.value && field.value.trim() ? field.value.trim() : "Not provided";
  const lines = wrapText(clean, fonts.sans, 10, CONTENT_W - 20);
  const boxH = lines.length * 13 + 14;
  ensureSpace(ctx, boxH + 34);
  const page = ctx.page;
  let y = ctx.cursorY;
  page.drawText(field.label.toUpperCase(), { x: MARGIN, y, size: 8.5, font: fonts.sansBold, color: MUTED });
  y -= 6;
  page.drawRectangle({
    x: MARGIN,
    y: y - boxH,
    width: CONTENT_W,
    height: boxH,
    color: BOX_FILL,
    borderColor: BOX_BORDER,
    borderWidth: 0.8,
  });
  let ty = y - 13;
  for (const line of lines) {
    page.drawText(line, { x: MARGIN + 10, y: ty, size: 10, font: fonts.sans, color: INK });
    ty -= 13;
  }
  ctx.cursorY = y - boxH - 14;
}

function drawSignatories(ctx: Ctx, signatories: Signatory[]) {
  const { fonts } = ctx;
  ensureSpace(ctx, 110);
  let page = ctx.page;
  let y = ctx.cursorY;
  page.drawText("SIGNATURES", { x: MARGIN, y, size: 10.5, font: fonts.sansBold, color: NAVY });
  page.drawLine({
    start: { x: MARGIN, y: y - 5 },
    end: { x: MARGIN + textWidth(fonts.sansBold, "SIGNATURES", 10.5), y: y - 5 },
    thickness: 1.5,
    color: GOLD,
  });
  y -= 30;

  const colW = (CONTENT_W - 40) / 2;
  for (let i = 0; i < signatories.length; i += 2) {
    ensureSpace(ctx, 74);
    // Re-capture: ensureSpace may have added a new page mid-block.
    page = ctx.page;
    y = ctx.cursorY;
    const row = signatories.slice(i, i + 2);
    row.forEach((sig, col) => {
      const x = MARGIN + col * (colW + 40);
      page.drawText(sig.role.toUpperCase(), { x, y, size: 9, font: fonts.sansBold, color: INK });
      page.drawLine({ start: { x, y: y - 26 }, end: { x: x + colW, y: y - 26 }, thickness: 1, color: INK });
      page.drawText(sig.caption, { x, y: y - 38, size: 7.5, font: fonts.sansItalic, color: MUTED });
    });
    ctx.cursorY = y - 58;
    y = ctx.cursorY;
  }
}

function drawSealAndNotice(ctx: Ctx, notice: string) {
  const { fonts } = ctx;
  ensureSpace(ctx, 120);
  const page = ctx.page;
  const y = ctx.cursorY;

  // Official seal box (right) beside the notice (left)
  const sealW = 130;
  const sealH = 78;
  const sealX = PAGE_W - MARGIN - sealW;
  page.drawRectangle({
    x: sealX,
    y: y - sealH,
    width: sealW,
    height: sealH,
    borderColor: GOLD,
    borderWidth: 1.4,
  });
  page.drawRectangle({
    x: sealX + 5,
    y: y - sealH + 5,
    width: sealW - 10,
    height: sealH - 10,
    borderColor: GOLD_LIGHT,
    borderWidth: 0.8,
  });
  const sealCenterX = sealX + sealW / 2;
  drawCentered(page, "OFFICIAL SEAL", y - 30, fonts.sansBold, 8.5, NAVY_SOFT, sealW, sealCenterX);
  drawCentered(page, "& AUTHORISED", y - 42, fonts.sansBold, 8.5, NAVY_SOFT, sealW, sealCenterX);
  drawCentered(page, "SIGNATURE", y - 54, fonts.sansBold, 8.5, NAVY_SOFT, sealW, sealCenterX);

  // Notice paragraph to the left of the seal
  const noticeLines = wrapText(notice, fonts.sansItalic, 8, CONTENT_W - sealW - 24);
  let ny = y;
  page.drawText("IMPORTANT NOTICE", { x: MARGIN, y: ny, size: 8.5, font: fonts.sansBold, color: rgb(0.55, 0.16, 0.16) });
  ny -= 13;
  for (const line of noticeLines) {
    page.drawText(line, { x: MARGIN, y: ny, size: 8, font: fonts.sansItalic, color: MUTED });
    ny -= 11;
  }
  ctx.cursorY = Math.min(ny, y - sealH) - 10;
}

function drawFooters(ctx: Ctx) {
  const total = ctx.pages.length;
  ctx.pages.forEach((page, idx) => {
    const { fonts } = ctx;
    const y = 46;
    page.drawLine({
      start: { x: MARGIN, y: y + 14 },
      end: { x: PAGE_W - MARGIN, y: y + 14 },
      thickness: 0.8,
      color: BOX_BORDER,
    });
    const left = `${FIRM.phone}  |  ${FIRM.email}`;
    page.drawText(left, { x: MARGIN, y, size: 7.5, font: fonts.sans, color: MUTED });
    const right = `Page ${idx + 1} of ${total}`;
    page.drawText(right, {
      x: PAGE_W - MARGIN - textWidth(fonts.sans, right, 7.5),
      y,
      size: 7.5,
      font: fonts.sans,
      color: MUTED,
    });
    const copy = `Copyright ${new Date().getFullYear()} Mwaura Muroki Associates & Advocates - All Rights Reserved`;
    page.drawText(copy, { x: MARGIN, y: y - 12, size: 7, font: fonts.sans, color: rgb(0.62, 0.63, 0.66) });
  });
}

export function makeRefCode(prefix: string): string {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `MMA/${prefix}/${new Date().getFullYear()}/${rand}`;
}

export function formatLongDate(d = new Date()): string {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

/** Vertical space a filled field block will occupy (for orphan control). */
function filledFieldBlockHeight(ctx: Ctx, value: string): number {
  const clean = value && value.trim() ? value.trim() : "Not provided";
  const lines = wrapText(clean, ctx.fonts.sans, 10, CONTENT_W - 20);
  return lines.length * 13 + 14 + 34;
}

/** Vertical space a blank field block will occupy (for orphan control). */
function blankFieldBlockHeight(field: BlankField): number {
  if (field.checkboxOptions && field.checkboxOptions.length > 0) return 44;
  return (field.lines ?? 1) * LINE_GAP + 26;
}

export interface LetterheadInput {
  title: string;
  refPrefix: string;
  sections: LetterheadSection[];
  signatories: Signatory[];
  notice: string;
  watermark?: string;
}

/** Builds a complete branded PDF and returns its bytes. */
export async function buildLetterheadPdf(input: LetterheadInput): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const fonts: Fonts = {
    serif: await doc.embedFont(StandardFonts.TimesRoman),
    serifBold: await doc.embedFont(StandardFonts.TimesRomanBold),
    sans: await doc.embedFont(StandardFonts.Helvetica),
    sansBold: await doc.embedFont(StandardFonts.HelveticaBold),
    sansItalic: await doc.embedFont(StandardFonts.HelveticaOblique),
  };
  const ctx: Ctx = { doc, fonts, pages: [], page: null as unknown as PDFPage, cursorY: 0 };
  newPage(ctx);
  drawTitleBlock(ctx, input.title, makeRefCode(input.refPrefix), formatLongDate());
  for (const section of input.sections) {
    const first = section.fields[0];
    drawSectionHeading(ctx, section.heading, first ? filledFieldBlockHeight(ctx, first.value) : 0);
    for (const field of section.fields) drawField(ctx, field);
    ctx.cursorY -= 6;
  }
  drawSignatories(ctx, input.signatories);
  drawSealAndNotice(ctx, input.notice);
  drawFooters(ctx);
  return doc.save();
}

/* ------------------------------------------------------------------ */
/* Blank printable templates (filled in by hand)                       */
/* ------------------------------------------------------------------ */

export interface BlankField {
  label: string;
  /** Ruled handwriting lines. Defaults to 1. */
  lines?: number;
  /** Renders tick-boxes instead of ruled lines. */
  checkboxOptions?: string[];
}

export interface BlankSection {
  heading: string;
  fields: BlankField[];
}

export interface BlankTemplateInput {
  title: string;
  formCode: string;
  instructions: string[];
  sections: BlankSection[];
  signatories: Signatory[];
  notice: string;
}

const RULE_COLOR = rgb(0.68, 0.69, 0.72);
const LINE_GAP = 20;

function drawBlankTitleBlock(ctx: Ctx, title: string, formCode: string) {
  const { fonts } = ctx;
  ensureSpace(ctx, 76);
  const page = ctx.page;
  const y = ctx.cursorY;
  drawCentered(page, title.toUpperCase(), y, fonts.serifBold, 15, NAVY);
  const tw = textWidth(fonts.serifBold, title.toUpperCase(), 15);
  page.drawLine({
    start: { x: PAGE_W / 2 - tw / 2, y: y - 6 },
    end: { x: PAGE_W / 2 + tw / 2, y: y - 6 },
    thickness: 1.5,
    color: GOLD,
  });
  const codeLabel = `FORM NO.: ${formCode}`;
  page.drawText(codeLabel, { x: MARGIN, y: y - 26, size: 9, font: fonts.sansBold, color: NAVY_SOFT });
  const dateLabel = "Date: ______ / ______ / ____________";
  page.drawText(dateLabel, {
    x: PAGE_W - MARGIN - textWidth(fonts.sans, dateLabel, 9),
    y: y - 26,
    size: 9,
    font: fonts.sans,
    color: MUTED,
  });
  ctx.cursorY = y - 44;
}

function drawInstructions(ctx: Ctx, instructions: string[]) {
  const { fonts } = ctx;
  const wrapped: string[][] = instructions.map((step, i) =>
    wrapText(`${i + 1}.  ${step}`, fonts.sans, 8.5, CONTENT_W - 24),
  );
  const boxH = wrapped.reduce((sum, lines) => sum + lines.length * 12, 0) + 42;
  ensureSpace(ctx, boxH);
  const page = ctx.page;
  const y = ctx.cursorY;
  page.drawRectangle({
    x: MARGIN,
    y: y - boxH,
    width: CONTENT_W,
    height: boxH,
    color: GOLD_LIGHT,
    borderColor: GOLD,
    borderWidth: 1,
  });
  page.drawText("BEFORE YOU BEGIN", { x: MARGIN + 12, y: y - 18, size: 9, font: fonts.sansBold, color: NAVY });
  let ty = y - 34;
  for (const lines of wrapped) {
    for (const line of lines) {
      page.drawText(line, { x: MARGIN + 12, y: ty, size: 8.5, font: fonts.sans, color: INK });
      ty -= 12;
    }
    ty -= 2;
  }
  ctx.cursorY = y - boxH - 14;
}

function drawBlankField(ctx: Ctx, field: BlankField) {
  const { fonts } = ctx;
  if (field.checkboxOptions && field.checkboxOptions.length > 0) {
    ensureSpace(ctx, 44);
    const page = ctx.page;
    const y = ctx.cursorY;
    page.drawText(field.label.toUpperCase(), { x: MARGIN, y, size: 8.5, font: fonts.sansBold, color: MUTED });
    let x = MARGIN;
    const oy = y - 20;
    for (const option of field.checkboxOptions) {
      page.drawRectangle({ x, y: oy - 2, width: 10, height: 10, borderColor: INK, borderWidth: 1 });
      page.drawText(option, { x: x + 15, y: oy, size: 9.5, font: fonts.sans, color: INK });
      x += textWidth(fonts.sans, option, 9.5) + 42;
    }
    ctx.cursorY = oy - 18;
    return;
  }
  const count = field.lines ?? 1;
  ensureSpace(ctx, count * LINE_GAP + 26);
  const page = ctx.page;
  const y = ctx.cursorY;
  page.drawText(field.label.toUpperCase(), { x: MARGIN, y, size: 8.5, font: fonts.sansBold, color: MUTED });
  for (let i = 0; i < count; i++) {
    const ly = y - 14 - i * LINE_GAP;
    page.drawLine({ start: { x: MARGIN, y: ly }, end: { x: MARGIN + CONTENT_W, y: ly }, thickness: 0.8, color: RULE_COLOR });
  }
  ctx.cursorY = y - 14 - (count - 1) * LINE_GAP - 16;
}

/** Builds a blank, print-ready manual-fill template and returns its bytes. */
export async function buildBlankTemplatePdf(input: BlankTemplateInput): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const fonts: Fonts = {
    serif: await doc.embedFont(StandardFonts.TimesRoman),
    serifBold: await doc.embedFont(StandardFonts.TimesRomanBold),
    sans: await doc.embedFont(StandardFonts.Helvetica),
    sansBold: await doc.embedFont(StandardFonts.HelveticaBold),
    sansItalic: await doc.embedFont(StandardFonts.HelveticaOblique),
  };
  const ctx: Ctx = { doc, fonts, pages: [], page: null as unknown as PDFPage, cursorY: 0 };
  newPage(ctx);
  drawBlankTitleBlock(ctx, input.title, input.formCode);
  drawInstructions(ctx, input.instructions);
  for (const section of input.sections) {
    const first = section.fields[0];
    drawSectionHeading(ctx, section.heading, first ? blankFieldBlockHeight(first) : 0);
    for (const field of section.fields) drawBlankField(ctx, field);
    ctx.cursorY -= 4;
  }
  drawSignatories(ctx, input.signatories);
  drawSealAndNotice(ctx, input.notice);
  drawFooters(ctx);
  return doc.save();
}
