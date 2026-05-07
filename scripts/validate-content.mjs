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
  const figureDir = path.join(contentDir, "figures");
  const resourceDir = path.join(contentDir, "resources");
  const glossaryDir = path.join(contentDir, "glossary");

  const figureIds = new Set((await fs.readdir(figureDir)).filter((name) => !name.startsWith("index.")));
  const resourceIds = new Set(await fs.readdir(resourceDir));
  const eventSlugs = await fs.readdir(eventDir);
  const eventSlugSet = new Set(eventSlugs);
  const allowedQuality = new Set(["primary", "secondary", "archive", "editorial"]);
  const allowedEvidenceLevel = new Set(["high", "medium", "low"]);
  const allowedThemes = new Set(["language", "democracy", "war", "culture", "economy"]);
  const allowedImportance = new Set(["landmark", "major", "high", "medium", "reference"]);
  const allowedRelationTypes = new Set(["cause", "effect", "background", "parallel", "legacy", "contrast"]);
  const allowedPeriodIds = new Set([
    "ancient-and-pre-sultanate-bengal",
    "transition-to-sultanate-formation",
    "independent-bengal-sultanate-era",
    "mughal-incorporation-and-consolidation",
    "colonial-rule-and-resistance",
    "partition-and-late-colonial-politics",
    "pakistan-period-and-national-awakening",
    "post-liberation-state-and-democracy",
    "contemporary-memory-and-civic-protest",
  ]);
  const periodDir = path.join(contentDir, "periods");
  const periodIds = new Set((await fs.readdir(periodDir)).filter((name) => !name.startsWith("index.")));

  const allowedMovementIds = new Set([
    "colonial-capture-and-resistance",
    "partition-and-political-representation",
    "language-autonomy-and-liberation",
    "state-power-and-democratic-transition",
    "memory-justice-and-civic-dissent",
  ]);
  const movementDir = path.join(contentDir, "movements");
  const movementIds = new Set((await fs.readdir(movementDir)).filter((name) => !name.startsWith("index.")));

  for (const slug of eventSlugs) {
    const base = path.join(eventDir, slug);
    const required = [
      "meta.en.json",
      "meta.bn.json",
      "timeline.en.json",
      "timeline.bn.json",
      "quotes.en.json",
      "quotes.bn.json",
      "figure-ids.json",
      "resource-ids.json",
    ];

    for (const fileName of required) {
      const filePath = path.join(base, fileName);
      if (!(await exists(filePath))) {
        errors.push(`Missing file: content/events/${slug}/${fileName}`);
      }
    }

    const figureIdsFile = await readJson(path.join(base, "figure-ids.json"), errors);
    const resourceIdsFile = await readJson(path.join(base, "resource-ids.json"), errors);
    const metaEn = await readJson(path.join(base, "meta.en.json"), errors);
    const metaBn = await readJson(path.join(base, "meta.bn.json"), errors);
    const timelineEn = await readJson(path.join(base, "timeline.en.json"), errors);
    const timelineBn = await readJson(path.join(base, "timeline.bn.json"), errors);

    for (const [locale, meta] of [["en", metaEn], ["bn", metaBn]]) {
      if (!meta || typeof meta !== "object") continue;
      if (typeof meta.importance !== "string" || !allowedImportance.has(meta.importance)) {
        errors.push(`Invalid or missing importance at content/events/${slug}/meta.${locale}.json`);
      }
      if ("periodLabel" in meta && (typeof meta.periodLabel !== "string" || meta.periodLabel.trim().length === 0)) {
        errors.push(`Invalid periodLabel at content/events/${slug}/meta.${locale}.json`);
      }
      if ("periodId" in meta && meta.periodId !== undefined) {
        if (typeof meta.periodId !== "string" || !allowedPeriodIds.has(meta.periodId)) {
          errors.push(`Invalid periodId at content/events/${slug}/meta.${locale}.json`);
        }
      }
      if ("movementId" in meta && meta.movementId !== undefined) {
        if (typeof meta.movementId !== "string" || !allowedMovementIds.has(meta.movementId)) {
          errors.push(`Invalid movementId at content/events/${slug}/meta.${locale}.json`);
        }
      }
      if ("movementLabel" in meta && (typeof meta.movementLabel !== "string" || meta.movementLabel.trim().length === 0)) {
        errors.push(`Invalid movementLabel at content/events/${slug}/meta.${locale}.json`);
      }
      if ("parentEvent" in meta && meta.parentEvent !== undefined) {
        if (typeof meta.parentEvent !== "string" || !eventSlugSet.has(meta.parentEvent)) {
          errors.push(`Invalid parentEvent at content/events/${slug}/meta.${locale}.json`);
        } else if (meta.parentEvent === slug) {
          errors.push(`parentEvent cannot self-reference at content/events/${slug}/meta.${locale}.json`);
        }
      }
      for (const relationField of ["childEventIds", "relatedEventIds"]) {
        if (!(relationField in meta) || meta[relationField] === undefined) continue;
        if (!Array.isArray(meta[relationField])) {
          errors.push(`${relationField} must be an array at content/events/${slug}/meta.${locale}.json`);
          continue;
        }
        const seen = new Set();
        for (const eventId of meta[relationField]) {
          if (typeof eventId !== "string" || !eventSlugSet.has(eventId)) {
            errors.push(`Invalid ${relationField} entry '${eventId}' at content/events/${slug}/meta.${locale}.json`);
            continue;
          }
          if (eventId === slug) {
            errors.push(`${relationField} cannot self-reference at content/events/${slug}/meta.${locale}.json`);
          }
          if (seen.has(eventId)) {
            errors.push(`Duplicate ${relationField} entry '${eventId}' at content/events/${slug}/meta.${locale}.json`);
          }
          seen.add(eventId);
        }
      }
      if ("relatedEvents" in meta && meta.relatedEvents !== undefined) {
        if (!Array.isArray(meta.relatedEvents)) {
          errors.push(`relatedEvents must be an array at content/events/${slug}/meta.${locale}.json`);
        } else {
          const seen = new Set();
          for (const relation of meta.relatedEvents) {
            if (!relation || typeof relation !== "object") {
              errors.push(`Invalid relatedEvents entry at content/events/${slug}/meta.${locale}.json`);
              continue;
            }
            const { eventId, relationType } = relation;
            if (typeof eventId !== "string" || !eventSlugSet.has(eventId)) {
              errors.push(`Invalid relatedEvents.eventId '${eventId}' at content/events/${slug}/meta.${locale}.json`);
              continue;
            }
            if (eventId === slug) {
              errors.push(`relatedEvents cannot self-reference at content/events/${slug}/meta.${locale}.json`);
            }
            if (typeof relationType !== "string" || !allowedRelationTypes.has(relationType)) {
              errors.push(`Invalid relatedEvents.relationType '${relationType}' at content/events/${slug}/meta.${locale}.json`);
              continue;
            }
            const key = `${relationType}:${eventId}`;
            if (seen.has(key)) {
              errors.push(`Duplicate relatedEvents entry '${key}' at content/events/${slug}/meta.${locale}.json`);
            }
            seen.add(key);
          }
        }
      }
      const summaryIds = Array.isArray(meta.summarySourceIds) ? meta.summarySourceIds : [];
      const whyIds = Array.isArray(meta.whyItMattersSourceIds) ? meta.whyItMattersSourceIds : [];
      if (summaryIds.length > 0) {
        if (typeof meta.summaryEvidenceLevel !== "string" || !allowedEvidenceLevel.has(meta.summaryEvidenceLevel)) {
          errors.push(`Invalid or missing summaryEvidenceLevel at content/events/${slug}/meta.${locale}.json`);
        }
      }
      if (whyIds.length > 0) {
        if (typeof meta.whyItMattersEvidenceLevel !== "string" || !allowedEvidenceLevel.has(meta.whyItMattersEvidenceLevel)) {
          errors.push(`Invalid or missing whyItMattersEvidenceLevel at content/events/${slug}/meta.${locale}.json`);
        }
      }
    }

    for (const [locale, meta] of [["en", metaEn], ["bn", metaBn]]) {
      if (!meta || typeof meta !== "object") continue;
      if (typeof meta.parentEvent === "string") {
        const parentMetaPath = path.join(eventDir, meta.parentEvent, `meta.${locale}.json`);
        const parentMeta = await readJson(parentMetaPath, errors);
        if (
          parentMeta &&
          typeof parentMeta === "object" &&
          Array.isArray(parentMeta.childEventIds) &&
          !parentMeta.childEventIds.includes(slug)
        ) {
          errors.push(`Parent-child mismatch: content/events/${slug}/meta.${locale}.json parentEvent='${meta.parentEvent}' but parent does not include childEventIds '${slug}'`);
        }
      }
    }

    if (figureIdsFile && assertArray(figureIdsFile, `content/events/${slug}/figure-ids.json`, errors)) {
      for (const figureId of figureIdsFile) {
        if (typeof figureId !== "string") {
          errors.push(`Non-string figure ID in content/events/${slug}/figure-ids.json`);
          continue;
        }
        if (!figureIds.has(figureId)) {
          errors.push(`Unknown figure ID '${figureId}' in content/events/${slug}/figure-ids.json`);
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
        if (typeof item.evidenceLevel !== "string" || !allowedEvidenceLevel.has(item.evidenceLevel)) {
          errors.push(`Invalid or missing evidenceLevel at content/events/${slug}/timeline.${locale}.json[${i}]`);
        }
        if (!Array.isArray(item.themes) || item.themes.length === 0) {
          errors.push(`Missing or empty themes at content/events/${slug}/timeline.${locale}.json[${i}]`);
        } else {
          for (const theme of item.themes) {
            if (typeof theme !== "string" || !allowedThemes.has(theme)) {
              errors.push(`Invalid theme '${theme}' at content/events/${slug}/timeline.${locale}.json[${i}]`);
            }
          }
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

  const periodEntries = await fs.readdir(periodDir);
  for (const periodId of periodEntries) {
    if (periodId.startsWith("index.")) continue;
    for (const locale of ["en", "bn"]) {
      const metaPath = path.join(periodDir, periodId, `meta.${locale}.json`);
      if (!(await exists(metaPath))) {
        errors.push(`Missing file: content/periods/${periodId}/meta.${locale}.json`);
        continue;
      }
      const meta = await readJson(metaPath, errors);
      if (!meta || typeof meta !== "object") continue;
      if (meta.id !== periodId) {
        errors.push(`Period id mismatch at content/periods/${periodId}/meta.${locale}.json`);
      }
      if (typeof meta.title !== "string" || meta.title.trim().length === 0) {
        errors.push(`Invalid or missing title at content/periods/${periodId}/meta.${locale}.json`);
      }
      if (typeof meta.description !== "string" || meta.description.trim().length === 0) {
        errors.push(`Invalid or missing description at content/periods/${periodId}/meta.${locale}.json`);
      }
      if (typeof meta.startYear !== "string" || meta.startYear.trim().length === 0) {
        errors.push(`Invalid or missing startYear at content/periods/${periodId}/meta.${locale}.json`);
      }
      if (typeof meta.endYear !== "string" || meta.endYear.trim().length === 0) {
        errors.push(`Invalid or missing endYear at content/periods/${periodId}/meta.${locale}.json`);
      }
    }
  }

  const movementEntries = await fs.readdir(movementDir);
  for (const movementId of movementEntries) {
    if (movementId.startsWith("index.")) continue;
    for (const locale of ["en", "bn"]) {
      const metaPath = path.join(movementDir, movementId, `meta.${locale}.json`);
      if (!(await exists(metaPath))) {
        errors.push(`Missing file: content/movements/${movementId}/meta.${locale}.json`);
        continue;
      }
      const meta = await readJson(metaPath, errors);
      if (!meta || typeof meta !== "object") continue;
      if (meta.id !== movementId) {
        errors.push(`Movement id mismatch at content/movements/${movementId}/meta.${locale}.json`);
      }
      if (typeof meta.title !== "string" || meta.title.trim().length === 0) {
        errors.push(`Invalid or missing title at content/movements/${movementId}/meta.${locale}.json`);
      }
      if (typeof meta.description !== "string" || meta.description.trim().length === 0) {
        errors.push(`Invalid or missing description at content/movements/${movementId}/meta.${locale}.json`);
      }
    }
  }

  const resourceEntries = await fs.readdir(resourceDir);
  for (const resourceId of resourceEntries) {
    for (const locale of ["en", "bn"]) {
      const metaPath = path.join(resourceDir, resourceId, `meta.${locale}.json`);
      if (!(await exists(metaPath))) {
        errors.push(`Missing file: content/resources/${resourceId}/meta.${locale}.json`);
        continue;
      }
      const meta = await readJson(metaPath, errors);
      if (!meta || typeof meta !== "object") continue;
      if ("quality" in meta && meta.quality !== undefined) {
        if (typeof meta.quality !== "string") {
          errors.push(`quality must be string at content/resources/${resourceId}/meta.${locale}.json`);
          continue;
        }
        if (!allowedQuality.has(meta.quality)) {
          errors.push(`Invalid quality '${meta.quality}' at content/resources/${resourceId}/meta.${locale}.json`);
        }
      }
    }
  }

  const glossaryEntries = await fs.readdir(glossaryDir);
  const glossaryIds = new Set(glossaryEntries);
  for (const termId of glossaryEntries) {
    for (const locale of ["en", "bn"]) {
      const metaPath = path.join(glossaryDir, termId, `meta.${locale}.json`);
      if (!(await exists(metaPath))) {
        errors.push(`Missing file: content/glossary/${termId}/meta.${locale}.json`);
        continue;
      }
      const meta = await readJson(metaPath, errors);
      if (!meta || typeof meta !== "object") continue;
      for (const key of ["id", "term", "definition", "explanation"]) {
        if (typeof meta[key] !== "string" || meta[key].trim().length === 0) {
          errors.push(`Missing or invalid '${key}' at content/glossary/${termId}/meta.${locale}.json`);
        }
      }
      if (meta.id !== termId) {
        errors.push(`Glossary id mismatch at content/glossary/${termId}/meta.${locale}.json`);
      }
      if ("relatedTerms" in meta) {
        if (!Array.isArray(meta.relatedTerms)) {
          errors.push(`relatedTerms must be array at content/glossary/${termId}/meta.${locale}.json`);
        } else {
          for (const related of meta.relatedTerms) {
            if (typeof related !== "string" || !glossaryIds.has(related)) {
              errors.push(`Invalid related term '${related}' at content/glossary/${termId}/meta.${locale}.json`);
            }
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
