// Post-build SEO prerender: copies dist/index.html to per-route folders
// and injects route-specific title / meta / canonical / robots so crawlers
// see correct tags without executing JS. Works on cPanel static hosting.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, "..", "dist");
const base = join(dist, "index.html");

if (!existsSync(base)) {
  console.error("[seo-prerender] dist/index.html not found. Run `vite build` first.");
  process.exit(1);
}

const SITE = "https://mwauramurokiadvocates.co.ke";

const routes = [
  {
    path: "",
    title: "Lawyer in Thika & Kenya | Commercial, Family & Sports Law – Mwaura Muroki Associates",
    description:
      "Mwaura Muroki Associates & Advocates – timely, affordable lawyers in Thika serving Nairobi & Kenya. Commercial litigation, contracts, dispute resolution, family law, sports law & mental health law. Call +254 704 780 934.",
    canonical: `${SITE}/`,
    robots: "index, follow, max-image-preview:large",
  },
  {
    path: "about",
    title: "About Francis Mwaura Muroki | Advocate of the High Court of Kenya, Thika",
    description:
      "Meet Francis Mwaura Muroki, Principal Advocate & founder of Mwaura Muroki Associates (Thika, est. 2022). Licensed by LSK, Young Male Lawyer of the Year 2024, LSK Thika Vice Secretary, Kenya Times columnist.",
    canonical: `${SITE}/about`,
    robots: "index, follow, max-image-preview:large",
  },
  {
    path: "services",
    title: "Legal Services in Kenya – Litigation, Contracts, Family, Sports Law | Mwaura Muroki",
    description:
      "Full legal services in Thika & Kenya: commercial litigation, contract drafting & negotiation, mediation & arbitration, child custody & family law, sports law, legal research, mental health law.",
    canonical: `${SITE}/services`,
    robots: "index, follow, max-image-preview:large",
  },
  {
    path: "contact",
    title: "Contact Advocate in Thika | Book a Consultation – Mwaura Muroki Associates",
    description:
      "Contact Mwaura Muroki Associates & Advocates, Equity Plaza Commercial Street 4th Floor Wing B Rm 420, Thika. Call/WhatsApp +254 704 780 934. Mon–Fri 8am–5pm, Sat 9am–1pm.",
    canonical: `${SITE}/contact`,
    robots: "index, follow, max-image-preview:large",
  },
  {
    path: "media",
    title: "Media Center – Legal Insights & Videos | Mwaura Muroki Associates",
    description:
      "Watch and read legal insights from Mwaura Muroki Associates: human rights documentation, constitutional analysis and professional legal updates from Thika, Kenya.",
    canonical: `${SITE}/media`,
    robots: "index, follow, max-image-preview:large",
  },
  { path: "privacy-policy", noindex: true },
  { path: "terms-conditions", noindex: true },
  { path: "legal-disclaimer", noindex: true },
  { path: "cookie-policy", noindex: true },
];

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

let html = readFileSync(base, "utf8");

const setTag = (source, regex, replacement) =>
  regex.test(source) ? source.replace(regex, replacement) : source.replace("</head>", `  ${replacement}\n</head>`);

for (const r of routes) {
  if (!r.path) continue; // root already correct from index.html
  let out = html;

  if (r.noindex) {
    out = setTag(out, /<meta name="robots"[^>]*>/, `<meta name="robots" content="noindex, follow" />`);
    out = setTag(out, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${SITE}/${r.path}" />`);
  } else {
    out = out.replace(
      /<title>.*?<\/title>/s,
      `<title>${escapeHtml(r.title)}</title>`
    );
    out = setTag(out, /<meta name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(r.description)}" />`);
    out = setTag(out, /<meta name="robots"[^>]*>/, `<meta name="robots" content="${r.robots}" />`);
    out = setTag(out, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${r.canonical}" />`);
    out = setTag(out, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(r.title)}" />`);
    out = setTag(out, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(r.description)}" />`);
    out = setTag(out, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${r.canonical}" />`);
    out = setTag(out, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeHtml(r.title)}" />`);
    out = setTag(out, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escapeHtml(r.description)}" />`);
  }

  const dir = join(dist, r.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), out);
  console.log(`[seo-prerender] wrote /${r.path}/index.html`);
}

// Refresh sitemap lastmod to today
const sitemapPath = join(dist, "sitemap.xml");
if (existsSync(sitemapPath)) {
  console.log("[seo-prerender] sitemap.xml present in dist (copied from public/)");
}

console.log("[seo-prerender] done.");
