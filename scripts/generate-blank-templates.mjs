/**
 * Regenerates the branded blank (print & fill by hand) PDF templates into
 * public/documents/. Usage: npm run generate:templates
 *
 * The TypeScript entry is bundled with esbuild and executed with node, so the
 * checked-in PDFs always match the current letterhead engine and specs.
 */
import { buildSync } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dir = mkdtempSync(join(tmpdir(), "blank-templates-"));
try {
  const bundle = join(dir, "entry.cjs");
  buildSync({
    entryPoints: ["scripts/blank-templates.entry.ts"],
    bundle: true,
    platform: "node",
    format: "cjs",
    outfile: bundle,
    logLevel: "warning",
  });
  execFileSync(process.execPath, [bundle], { stdio: "inherit", cwd: process.cwd() });
} finally {
  rmSync(dir, { recursive: true, force: true });
}
