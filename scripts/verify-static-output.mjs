#!/usr/bin/env node
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const errors = [];
const exists = async (file) => access(file).then(() => true, () => false);
const requireFile = async (relative) => {
  if (!(await exists(path.join(root, relative)))) errors.push(`Missing output file: ${relative}`);
};

async function collectHtml(directory, files = []) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) await collectHtml(target, files);
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(target);
  }
  return files;
}

async function targetExists(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath);
  } catch {
    return false;
  }
  const relative = decoded.replace(/^\/+/, "");
  const file = path.join(root, relative);
  const candidates = path.extname(relative) ? [file] : [path.join(root, relative, "index.html"), `${file}.html`];
  for (const candidate of candidates) if (await exists(candidate)) return true;
  return false;
}

for (const file of ["index.html", "404.html", "bn/index.html", "en/index.html", "robots.txt", "sitemap.xml", "_next/static"]) {
  await requireFile(file);
}
const rootHtml = await readFile(path.join(root, "index.html"), "utf8");
if (!rootHtml.includes("url=/bn/") || !rootHtml.includes('href="/bn/"')) errors.push("Root route is missing its static Bengali handoff");
if (await exists(path.join(root, "does-not-exist", "index.html"))) errors.push("Unexpected output exists for an invalid route");

const contentIds = async (kind) => {
  const dir = path.join("content", kind);
  try {
    return (await readdir(dir, { withFileTypes: true })).filter((item) => item.isDirectory()).map((item) => item.name);
  } catch {
    return [];
  }
};
const events = await contentIds("events");
const figures = await contentIds("figures");
const topics = await contentIds("topics");
const resources = await contentIds("resources");
const glossaryTerms = await contentIds("glossary");
const places = await contentIds("places");
const periods = await contentIds("periods");
const movements = await contentIds("movements");
const examples = [
  "bn/timeline/index.html",
  "en/timeline/index.html",
  "bn/compare/index.html",
  "en/compare/index.html",
  "bn/figures/index.html",
  "en/resources/index.html",
];
if (events[0]) examples.push(`bn/events/${events[0]}/index.html`, `en/events/${events[0]}/index.html`);
if (figures[0]) examples.push(`bn/figures/${figures[0]}/index.html`, `en/figures/${figures[0]}/index.html`);
if (topics[0]) examples.push(`bn/topics/${topics[0]}/index.html`, `en/topics/${topics[0]}/index.html`);
if (resources[0]) examples.push(`bn/resources/${resources[0]}/index.html`);
for (const file of examples) await requireFile(file);

for (const [type, ids, routeName] of [["event", events, "events"], ["figure", figures, "figures"]]) {
  if (!ids[0]) continue;
  for (const locale of ["bn", "en"]) {
    const id = ids[0];
    const htmlPath = path.join(root, locale, routeName, id, "index.html");
    if (!(await exists(htmlPath))) continue;
    const html = await readFile(htmlPath, "utf8");
    const expectedImage = `https://bengalunfolded.com/og/${locale}/${type}/${id}.png`;
    for (const marker of ["rel=\"canonical\"", "hrefLang=\"en-US\"", "hrefLang=\"bn-BD\"", "property=\"og:image\"", "name=\"twitter:card\"", "application/ld+json", expectedImage]) {
      if (!html.includes(marker)) errors.push(`SEO metadata missing '${marker}' in ${locale}/${routeName}/${id}/`);
    }
  }
}

for (const locale of ["bn", "en"]) {
  for (const slug of events) await requireFile(`${locale}/events/${slug}/index.html`);
  for (const id of figures) await requireFile(`${locale}/figures/${id}/index.html`);
  for (const slug of topics) await requireFile(`${locale}/topics/${slug}/index.html`);
  for (const id of resources) await requireFile(`${locale}/resources/${id}/index.html`);
  for (const term of glossaryTerms) await requireFile(`${locale}/glossary/${term}/index.html`);
  for (const id of places) await requireFile(`${locale}/places/${id}/index.html`);
  for (const id of periods) await requireFile(`${locale}/periods/${id}/index.html`);
  for (const id of movements) await requireFile(`${locale}/movements/${id}/index.html`);
  for (const slug of events) {
    await requireFile(`${locale}/events/${slug}/figures/index.html`);
    await requireFile(`${locale}/events/${slug}/resources/index.html`);
  }
}

const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
for (const [, location] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const url = new URL(location);
  if (!(await targetExists(url.pathname))) errors.push(`Sitemap URL has no static page: ${url.pathname}`);
}

const pngAt = async (rel) => {
  const file = path.join(root, rel);
  if (!(await exists(file))) return false;
  const bytes = await readFile(file);
  return bytes.length > 24 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) && bytes.readUInt32BE(16) === 1200 && bytes.readUInt32BE(20) === 630;
};
for (const locale of ["en", "bn"]) {
  for (const [type, ids] of [["event", events], ["figure", figures]]) {
    for (const id of ids) {
      const image = `og/${locale}/${type}/${id}.png`;
      if (!(await pngAt(image))) errors.push(`Missing or invalid 1200x630 social image: ${image}`);
    }
  }
}

const htmlFiles = await collectHtml(root);
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const raw = match[1].trim();
    if (!raw || raw.startsWith("#") || /^(?:data:|javascript:|mailto:|tel:)/i.test(raw)) continue;
    let target;
    try {
      target = new URL(raw, "https://bengalunfolded.com/");
    } catch {
      continue;
    }
    if (target.origin !== "https://bengalunfolded.com") continue;
    if (!(await targetExists(target.pathname))) {
      const relativePage = path.relative(root, file);
      errors.push(`Broken internal ${raw.startsWith("/") ? "link" : "asset"} in ${relativePage}: ${raw}`);
    }
  }
}

if (!(await exists(path.join(root, "_next/static")))) errors.push("Missing compiled Next.js assets");
if (errors.length) {
  console.error(`Static output verification failed (${errors.length} issue(s)):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Static output verified: ${htmlFiles.length} HTML files, all supported content routes, sitemap URLs, internal HTML links/assets, robots, and event/figure OG PNGs.`);
