#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";

const FIGURES_DIR = "content/figures";
const EVENTS_DIR = "content/events";
const PUBLIC_FIGURES_DIR = "public/figures";
const REPORT_PATH = "docs/figure-content-audit.csv";
const IMAGE_EXTS = new Set([".webp", ".jpg", ".jpeg", ".png", ".svg", ".avif"]);

const GENERIC_PATTERNS = [
  /key historical actor/iu,
  /helps explain how power/iu,
  /important historical figure/iu,
  /played a notable role/iu,
  /significant turning point in the political and social trajectory/iu,
  /political and social context/iu,
  /গুরুত্বপূর্ণ ঐতিহাসিক চরিত্র/u,
  /ক্ষমতা, প্রতিষ্ঠান বা ধারণাগত পরিবর্তন/u,
  /রাজনৈতিক ও সামাজিক প্রেক্ষাপট/u,
  /উল্লেখযোগ্য ভূমিকা রাখেন/u,
  /বাংলার রূপান্তরপর্ব বোঝার জন্য গুরুত্বপূর্ণ/u,
];

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function dirs(path) {
  return readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function textFields(meta) {
  return [meta.name, meta.role, meta.contribution, meta.context, meta.impact, meta.highlight, meta.shortAnswer]
    .filter((value) => typeof value === "string")
    .join(" ")
    .trim();
}

function countWords(text) {
  return text ? text.split(/\s+/u).filter(Boolean).length : 0;
}

function countGenericPatterns(text) {
  return GENERIC_PATTERNS.reduce((count, pattern) => count + (pattern.test(text) ? 1 : 0), 0);
}

function hasImageAsset(figureId) {
  if (!existsSync(PUBLIC_FIGURES_DIR)) return false;
  return readdirSync(PUBLIC_FIGURES_DIR).some((file) => {
    const ext = extname(file).toLowerCase();
    return IMAGE_EXTS.has(ext) && file.slice(0, -ext.length) === figureId;
  });
}

function scoreFigure({ en, bn, eventCount, hasImage }) {
  const enText = textFields(en);
  const bnText = textFields(bn);
  const genericCount = countGenericPatterns(`${enText} ${bnText}`);
  const missingSeo = Number(!en.seoTitle || !en.seoDescription) + Number(!bn.seoTitle || !bn.seoDescription);
  const totalWords = countWords(enText) + countWords(bnText);
  const missingImage = Number(!en.image && !bn.image && !hasImage);
  const noEvents = Number(eventCount === 0);
  const thinProfile = Number(totalWords < 120);
  const shortProfile = Number(totalWords < 220);

  let tier = "A";
  if (genericCount >= 2 || thinProfile) tier = "D";
  else if (genericCount >= 1 || missingSeo === 2 || shortProfile) tier = "C";
  else if (missingSeo === 1 || missingImage || noEvents) tier = "B";

  const priorityScore =
    genericCount * 25 +
    missingSeo * 12 +
    thinProfile * 20 +
    shortProfile * 8 +
    missingImage * 8 +
    noEvents * 8 +
    Math.max(0, 6 - Math.min(eventCount, 6));

  const actions = [];
  if (genericCount) actions.push("replace generic copy with specific historical facts");
  if (thinProfile) actions.push("expand contribution, context, and impact");
  if (missingSeo) actions.push("add localized SEO title and description");
  if (missingImage) actions.push("consider an image after editorial review");
  if (noEvents) actions.push("link to a primary timeline event");

  return { tier, priorityScore, genericCount, missingSeo, totalWords, missingImage, noEvents, actions: actions.join("; ") };
}

const figureIds = dirs(FIGURES_DIR);
const eventCounts = new Map();

for (const eventId of dirs(EVENTS_DIR)) {
  const idsPath = join(EVENTS_DIR, eventId, "figure-ids.json");
  if (!existsSync(idsPath)) continue;
  for (const figureId of readJson(idsPath)) eventCounts.set(figureId, (eventCounts.get(figureId) ?? 0) + 1);
}

const rows = figureIds.map((figureId) => {
  const en = readJson(join(FIGURES_DIR, figureId, "meta.en.json"));
  const bn = readJson(join(FIGURES_DIR, figureId, "meta.bn.json"));
  const eventCount = eventCounts.get(figureId) ?? 0;
  const hasImage = Boolean(en.image || bn.image || hasImageAsset(figureId));
  const score = scoreFigure({ en, bn, eventCount, hasImage });
  return {
    figureId,
    name: en.name || en.name_en || bn.name || figureId,
    role: en.role || bn.role || "",
    group: en.group || bn.group || "",
    eventCount,
    image: hasImage ? "yes" : "no",
    enWords: countWords(textFields(en)),
    bnWords: countWords(textFields(bn)),
    seo: score.missingSeo === 0 ? "complete" : score.missingSeo === 2 ? "missing-en-and-bn" : "partial",
    genericFlags: score.genericCount,
    tier: score.tier,
    priorityScore: score.priorityScore,
    recommendedAction: score.actions,
  };
});

rows.sort((a, b) => b.priorityScore - a.priorityScore || a.figureId.localeCompare(b.figureId));

const header = [
  "Rank", "Figure ID", "Name", "Role", "Group", "Event Count", "Image", "EN Words", "BN Words",
  "SEO", "Generic Flags", "Tier", "Priority Score", "Recommended Action",
];
const csv = [
  header.join(","),
  ...rows.map((row, index) => [
    index + 1, row.figureId, row.name, row.role, row.group, row.eventCount, row.image, row.enWords, row.bnWords,
    row.seo, row.genericFlags, row.tier, row.priorityScore, row.recommendedAction,
  ].map(csvCell).join(",")),
].join("\n");

writeFileSync(REPORT_PATH, `${csv}\n`);

const tierCounts = rows.reduce((counts, row) => {
  counts[row.tier] = (counts[row.tier] ?? 0) + 1;
  return counts;
}, {});
const genericCount = rows.filter((row) => row.genericFlags > 0).length;
const missingSeoCount = rows.filter((row) => row.seo !== "complete").length;
const missingImageCount = rows.filter((row) => row.image === "no").length;

console.log(`Figures audited: ${rows.length}`);
console.log(`Quality tiers: ${Object.entries(tierCounts).map(([tier, count]) => `${tier}=${count}`).join(", ")}`);
console.log(`Profiles with generic-language flags: ${genericCount}`);
console.log(`Profiles with incomplete SEO metadata: ${missingSeoCount}`);
console.log(`Profiles without an image asset: ${missingImageCount}`);
console.log(`Updated: ${REPORT_PATH}`);
