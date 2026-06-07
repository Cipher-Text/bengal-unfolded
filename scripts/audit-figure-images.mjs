#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";

const FIGURES_DIR = "content/figures";
const EVENTS_DIR = "content/events";
const PUBLIC_FIGURES_DIR = "public/figures";
const REPORT_PATH = "docs/missing-images-report.csv";
const IMAGE_EXTS = new Set([".webp", ".jpg", ".jpeg", ".png", ".svg", ".avif"]);

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

function hasImageAsset(figureId) {
  if (!existsSync(PUBLIC_FIGURES_DIR)) return false;
  return readdirSync(PUBLIC_FIGURES_DIR).some((file) => {
    const ext = extname(file).toLowerCase();
    return IMAGE_EXTS.has(ext) && file.slice(0, -ext.length) === figureId;
  });
}

const figureIds = dirs(FIGURES_DIR);
const eventCounts = new Map();

for (const eventId of dirs(EVENTS_DIR)) {
  const idsPath = join(EVENTS_DIR, eventId, "figure-ids.json");
  if (!existsSync(idsPath)) continue;
  for (const figureId of readJson(idsPath)) {
    eventCounts.set(figureId, (eventCounts.get(figureId) ?? 0) + 1);
  }
}

const imageFiles = existsSync(PUBLIC_FIGURES_DIR)
  ? readdirSync(PUBLIC_FIGURES_DIR).filter((file) => IMAGE_EXTS.has(extname(file).toLowerCase()))
  : [];

const imageStems = new Set(imageFiles.map((file) => file.slice(0, -extname(file).length)));
let imageBytes = 0;
const byExt = new Map();

for (const file of imageFiles) {
  const ext = extname(file).slice(1).toUpperCase();
  const size = statSync(join(PUBLIC_FIGURES_DIR, file)).size;
  imageBytes += size;
  byExt.set(ext, (byExt.get(ext) ?? 0) + 1);
}

let withImage = 0;
let broken = 0;
let invalid = 0;
let mismatches = 0;
const missingRows = [];

for (const figureId of figureIds) {
  const enPath = join(FIGURES_DIR, figureId, "meta.en.json");
  const bnPath = join(FIGURES_DIR, figureId, "meta.bn.json");
  const en = readJson(enPath);
  const bn = readJson(bnPath);

  if (en.image && bn.image && en.image !== bn.image) mismatches += 1;

  const image = en.image || bn.image;
  if (image) {
    withImage += 1;
    if (!image.startsWith("/")) invalid += 1;
    if (!existsSync(join("public", image.replace(/^\//, "")))) broken += 1;
    continue;
  }

  if (hasImageAsset(figureId)) continue;

  const eventCount = eventCounts.get(figureId) ?? 0;
  const group = en.group || bn.group || "";
  const priorityScore = eventCount * 30 + (group === "leader" ? 100 : group === "organization" ? 65 : 40);
  missingRows.push({
    figureId,
    name: en.name || en.name_en || bn.name || figureId,
    role: en.role || bn.role || "",
    group,
    eventCount,
    priorityScore,
    tags: Array.isArray(en.tags) ? en.tags.join(", ") : "",
  });
}

missingRows.sort(
  (a, b) =>
    b.eventCount - a.eventCount ||
    b.priorityScore - a.priorityScore ||
    a.figureId.localeCompare(b.figureId),
);

const csv = [
  "Rank,Figure ID,Name,Role,Group,Event Count,Priority Score,Tags",
  ...missingRows.map((row, index) =>
    [
      index + 1,
      row.figureId,
      row.name,
      row.role,
      row.group,
      row.eventCount,
      row.priorityScore,
      row.tags,
    ]
      .map(csvCell)
      .join(","),
  ),
].join("\n");

writeFileSync(REPORT_PATH, `${csv}\n`);

const orphanAssets = [...imageStems].filter((stem) => !figureIds.includes(stem)).length;

console.log(`Figures: ${figureIds.length}`);
console.log(`With image metadata: ${withImage}`);
console.log(`Missing images: ${missingRows.length}`);
console.log(`Image files: ${imageFiles.length} (${(imageBytes / 1024 / 1024).toFixed(1)} MB)`);
console.log(`Formats: ${[...byExt].map(([ext, count]) => `${ext}=${count}`).join(", ")}`);
console.log(`Broken references: ${broken}`);
console.log(`Invalid paths: ${invalid}`);
console.log(`Locale mismatches: ${mismatches}`);
console.log(`Orphan assets: ${orphanAssets}`);
console.log(`Updated: ${REPORT_PATH}`);
