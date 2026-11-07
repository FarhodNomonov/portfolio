// Build step after `vite build`: renders the page for every language into
// static HTML (dist/index.html, dist/uz/index.html, dist/en/index.html) with
// its own <head>: title, description, canonical, hreflang, Open Graph,
// JSON-LD. Also writes sitemap.xml and robots.txt.
//
// SITE_URL is the only place the domain lives. Change it here (or set the
// SITE_URL env var on Netlify) when the domain changes.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const SITE_URL = (process.env.SITE_URL || "https://farhod-nomonov.uz").replace(/\/$/, "");
const LOCALES = ["ru", "en", "uz"];
const OG_LOCALE = { ru: "ru_RU", en: "en_US", uz: "uz_UZ" };
const pathFor = (l) => (l === "ru" ? "/" : `/${l}/`);
const url = (l) => SITE_URL + pathFor(l);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const { render, MESSAGES } = await import(pathToFileURL(resolve("dist-ssr/entry-server.js")).href);
const template = readFileSync("dist/index.html", "utf8");

for (const locale of LOCALES) {
  const t = MESSAGES[locale];
  const title = t["meta.title"];
  const description = t["meta.description"];

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t["name"],
    jobTitle: "Full-stack developer",
    url: url(locale),
    image: `${SITE_URL}/icon-512.png`,
    knowsAbout: ["Laravel", "React", "Flutter", "PostgreSQL", "Docker", "CRM"],
    address: { "@type": "PostalAddress", addressCountry: "UZ" },
  };

  const head = [
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${url(locale)}" />`,
    ...LOCALES.map((l) => `<link rel="alternate" hreflang="${l}" href="${url(l)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${url("ru")}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url(locale)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[locale]}" />`,
    `<meta property="og:image" content="${SITE_URL}/og-cover.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${SITE_URL}/og-cover.png" />`,
    `<script type="application/ld+json">${JSON.stringify(person)}</script>`,
  ].join("\n    ");

  const html = template
    .replace(/<html lang="[^"]*"/, `<html lang="${locale}"`)
    .replace(/<title>.*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<!-- SEO_HEAD:[\s\S]*?-->/, head)
    .replace('<div id="root"></div>', `<div id="root">${await render(locale)}</div>`);

  const dir = locale === "ru" ? "dist" : `dist/${locale}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/index.html`, html);
  console.log(`✓ ${pathFor(locale).padEnd(5)} ${(html.length / 1024).toFixed(0)} KB`);
}

const today = new Date().toISOString().slice(0, 10);
const alternates = LOCALES.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(l)}"/>`).join("\n");
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LOCALES.map((l) => `  <url>\n    <loc>${url(l)}</loc>\n    <lastmod>${today}</lastmod>\n${alternates}\n  </url>`).join("\n")}
</urlset>
`
);
writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
rmSync("dist-ssr", { recursive: true, force: true });
console.log(`✓ sitemap.xml, robots.txt for ${SITE_URL}`);
