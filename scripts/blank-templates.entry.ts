import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { buildBlankTemplatePdf } from "../src/lib/lawFirmLetterhead";
import { BLANK_TEMPLATES } from "../src/lib/blankTemplateSpecs";

/**
 * Bundled by scripts/generate-blank-templates.mjs and executed with node.
 * Writes print-ready manual-fill PDFs into public/documents/.
 * Override the destination with BLANK_OUT_DIR.
 */
async function main() {
  const outDir = process.env.BLANK_OUT_DIR ?? join(process.cwd(), "public", "documents");
  mkdirSync(outDir, { recursive: true });
  for (const spec of BLANK_TEMPLATES) {
    const bytes = await buildBlankTemplatePdf(spec);
    writeFileSync(join(outDir, spec.filename), Buffer.from(bytes));
    console.log(`wrote ${spec.filename} (${bytes.length} bytes)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
