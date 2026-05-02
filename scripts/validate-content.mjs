#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "content");

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath, errors) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf-8"));
  } catch (error) {
    errors.push(`Invalid JSON: ${path.relative(root, filePath)} (${error.message})`);
    return null;
  }
}

function assertArray(value, label, errors) {
  if (!Array.isArray(value)) {
    errors.push(`${label} must be an array`);
    return false;
  }
  return true;
}

async function main() {
  const errors = [];
  const eventDir = path.join(contentDir, "events");
  const heroDir = path.join(contentDir, "heroes");
  const resourceDir = path.join(contentDir, "resources");
  const bookDir = path.join(contentDir, "books");

  const heroIds = new Set((await fs.readdir(heroDir)).filter((name) => !name.startsWith("index.")));
  const resourceIds = new Set(await fs.readdir(resourceDir));
  const bookIds = new Set(await fs.readdir(bookDir));

  const eventSlugs = await fs.readdir(eventDir);
  for (const slug of eventSlugs) {
    const base = path.join(eventDir, slug);
    const required = [
      "meta.en.json",
      "meta.bn.json",
      "timeline.en.json",
      "timeline.bn.json",
      "quotes.en.json",
      "quotes.bn.json",
      "hero-ids.json",
      "resource-ids.json",
      "book-ids.json",
    ];

    for (const fileName of required) {
      const filePath = path.join(base, fileName);
      if (!(await exists(filePath))) {
        errors.push(`Missing file: content/events/${slug}/${fileName}`);
      }
    }

    const heroIdsFile = await readJson(path.join(base, "hero-ids.json"), errors);
    const resourceIdsFile = await readJson(path.join(base, "resource-ids.json"), errors);
    const bookIdsFile = await readJson(path.join(base, "book-ids.json"), errors);
    const timelineEn = await readJson(path.join(base, "timeline.en.json"), errors);
    const timelineBn = await readJson(path.join(base, "timeline.bn.json"), errors);

    if (heroIdsFile && assertArray(heroIdsFile, `content/events/${slug}/hero-ids.json`, errors)) {
      for (const heroId of heroIdsFile) {
        if (typeof heroId !== "string") {
          errors.push(`Non-string hero ID in content/events/${slug}/hero-ids.json`);
          continue;
        }
        if (!heroIds.has(heroId)) {
          errors.push(`Unknown hero ID '${heroId}' in content/events/${slug}/hero-ids.json`);
        }
      }
    }

    if (resourceIdsFile && assertArray(resourceIdsFile, `content/events/${slug}/resource-ids.json`, errors)) {
      for (const resourceId of resourceIdsFile) {
        if (typeof resourceId !== "string") {
          errors.push(`Non-string resource ID in content/events/${slug}/resource-ids.json`);
          continue;
        }
        if (!resourceIds.has(resourceId)) {
          errors.push(`Unknown resource ID '${resourceId}' in content/events/${slug}/resource-ids.json`);
        }
      }
    }

    if (bookIdsFile && assertArray(bookIdsFile, `content/events/${slug}/book-ids.json`, errors)) {
      for (const bookId of bookIdsFile) {
        if (typeof bookId !== "string") {
          errors.push(`Non-string book ID in content/events/${slug}/book-ids.json`);
          continue;
        }
        if (!bookIds.has(bookId)) {
          errors.push(`Unknown book ID '${bookId}' in content/events/${slug}/book-ids.json`);
        }
      }
    }

    for (const [locale, timeline] of [["en", timelineEn], ["bn", timelineBn]]) {
      if (!timeline || !assertArray(timeline, `content/events/${slug}/timeline.${locale}.json`, errors)) continue;
      for (let i = 0; i < timeline.length; i += 1) {
        const item = timeline[i];
        if (!item || typeof item !== "object") {
          errors.push(`Invalid timeline item at content/events/${slug}/timeline.${locale}.json[${i}]`);
          continue;
        }
        if (!("sourceIds" in item)) {
          errors.push(`Missing sourceIds at content/events/${slug}/timeline.${locale}.json[${i}]`);
          continue;
        }
        if (!Array.isArray(item.sourceIds)) {
          errors.push(`sourceIds must be array at content/events/${slug}/timeline.${locale}.json[${i}]`);
          continue;
        }
        if (item.sourceIds.length === 0) {
          errors.push(`sourceIds must not be empty at content/events/${slug}/timeline.${locale}.json[${i}]`);
          continue;
        }
        for (const sourceId of item.sourceIds) {
          if (typeof sourceId !== "string") {
            errors.push(`Non-string sourceId at content/events/${slug}/timeline.${locale}.json[${i}]`);
            continue;
          }
          if (resourceIdsFile && Array.isArray(resourceIdsFile) && !resourceIdsFile.includes(sourceId)) {
            errors.push(`sourceId '${sourceId}' not listed in content/events/${slug}/resource-ids.json`);
          }
          if (!resourceIds.has(sourceId)) {
            errors.push(`Unknown sourceId '${sourceId}' in content/events/${slug}/timeline.${locale}.json[${i}]`);
          }
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error(`\nContent validation failed with ${errors.length} issue(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`Content validation passed for ${eventSlugs.length} event(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
