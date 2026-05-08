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
  const topicsDir = path.join(contentDir, "topics");
  const placesDir = path.join(contentDir, "places");

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
  await fs.readdir(periodDir);

  const allowedMovementIds = new Set([
    "colonial-capture-and-resistance",
    "partition-and-political-representation",
    "language-autonomy-and-liberation",
    "state-power-and-democratic-transition",
    "memory-justice-and-civic-dissent",
  ]);
  const movementDir = path.join(contentDir, "movements");
  await fs.readdir(movementDir);
  const allowedPlaceIds = new Set([
    "bengal-region",
  ]);
  await fs.readdir(placesDir);

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
      if ("placeId" in meta && meta.placeId !== undefined) {
        if (typeof meta.placeId !== "string" || !allowedPlaceIds.has(meta.placeId)) {
          errors.push(`Invalid placeId at content/events/${slug}/meta.${locale}.json`);
        }
      }
      if ("placeLabel" in meta && (typeof meta.placeLabel !== "string" || meta.placeLabel.trim().length === 0)) {
        errors.push(`Invalid placeLabel at content/events/${slug}/meta.${locale}.json`);
      }
      if ("sensitive" in meta && typeof meta.sensitive !== "boolean") {
        errors.push(`sensitive must be boolean at content/events/${slug}/meta.${locale}.json`);
      }
      if ("requiresSources" in meta && typeof meta.requiresSources !== "boolean") {
        errors.push(`requiresSources must be boolean at content/events/${slug}/meta.${locale}.json`);
      }
      if ("contentWarnings" in meta && meta.contentWarnings !== undefined) {
        if (!Array.isArray(meta.contentWarnings)) {
          errors.push(`contentWarnings must be an array at content/events/${slug}/meta.${locale}.json`);
        } else {
          for (const warning of meta.contentWarnings) {
            if (typeof warning !== "string" || warning.trim().length === 0) {
              errors.push(`Invalid contentWarnings entry '${warning}' at content/events/${slug}/meta.${locale}.json`);
            }
          }
        }
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
      const legacyIds = Array.isArray(meta.longTermLegacySourceIds) ? meta.longTermLegacySourceIds : [];
      const culturalIds = Array.isArray(meta.culturalImpactSourceIds) ? meta.culturalImpactSourceIds : [];
      const identityIds = Array.isArray(meta.identityMemorySourceIds) ? meta.identityMemorySourceIds : [];
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
      if (legacyIds.length > 0) {
        if (typeof meta.longTermLegacyEvidenceLevel !== "string" || !allowedEvidenceLevel.has(meta.longTermLegacyEvidenceLevel)) {
          errors.push(`Invalid or missing longTermLegacyEvidenceLevel at content/events/${slug}/meta.${locale}.json`);
        }
      }
      if (culturalIds.length > 0) {
        if (typeof meta.culturalImpactEvidenceLevel !== "string" || !allowedEvidenceLevel.has(meta.culturalImpactEvidenceLevel)) {
          errors.push(`Invalid or missing culturalImpactEvidenceLevel at content/events/${slug}/meta.${locale}.json`);
        }
      }
      if (identityIds.length > 0) {
        if (typeof meta.identityMemoryEvidenceLevel !== "string" || !allowedEvidenceLevel.has(meta.identityMemoryEvidenceLevel)) {
          errors.push(`Invalid or missing identityMemoryEvidenceLevel at content/events/${slug}/meta.${locale}.json`);
        }
      }
      if ("longTermLegacy" in meta && meta.longTermLegacy !== undefined) {
        if (typeof meta.longTermLegacy !== "string" || meta.longTermLegacy.trim().length === 0) {
          errors.push(`Invalid longTermLegacy at content/events/${slug}/meta.${locale}.json`);
        }
      }
      if ("culturalImpact" in meta && meta.culturalImpact !== undefined) {
        if (typeof meta.culturalImpact !== "string" || meta.culturalImpact.trim().length === 0) {
          errors.push(`Invalid culturalImpact at content/events/${slug}/meta.${locale}.json`);
        }
      }
      if ("identityMemoryNotes" in meta && meta.identityMemoryNotes !== undefined) {
        if (typeof meta.identityMemoryNotes !== "string" || meta.identityMemoryNotes.trim().length === 0) {
          errors.push(`Invalid identityMemoryNotes at content/events/${slug}/meta.${locale}.json`);
        }
      }
      if (meta.requiresSources === true) {
        if (summaryIds.length === 0) {
          errors.push(`requiresSources=true requires non-empty summarySourceIds at content/events/${slug}/meta.${locale}.json`);
        }
        if (whyIds.length === 0) {
          errors.push(`requiresSources=true requires non-empty whyItMattersSourceIds at content/events/${slug}/meta.${locale}.json`);
        }
      }
      if (meta.importance === "major") {
        if (typeof meta.longTermLegacy !== "string" || meta.longTermLegacy.trim().length === 0) {
          errors.push(`importance=major requires longTermLegacy at content/events/${slug}/meta.${locale}.json`);
        }
      }
      if (meta.importance === "landmark") {
        if (typeof meta.culturalImpact !== "string" || meta.culturalImpact.trim().length === 0) {
          errors.push(`importance=landmark requires culturalImpact at content/events/${slug}/meta.${locale}.json`);
        }
        if (typeof meta.identityMemoryNotes !== "string" || meta.identityMemoryNotes.trim().length === 0) {
          errors.push(`importance=landmark requires identityMemoryNotes at content/events/${slug}/meta.${locale}.json`);
        }
      }
      if (meta.importance === "major") {
        if (typeof meta.identityMemoryNotes !== "string" || meta.identityMemoryNotes.trim().length === 0) {
          errors.push(`importance=major requires identityMemoryNotes at content/events/${slug}/meta.${locale}.json`);
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

    if (resourceIdsFile && Array.isArray(resourceIdsFile)) {
      for (const [locale, meta] of [["en", metaEn], ["bn", metaBn]]) {
        if (!meta || typeof meta !== "object") continue;
        const fields = ["summarySourceIds", "whyItMattersSourceIds", "longTermLegacySourceIds", "culturalImpactSourceIds", "identityMemorySourceIds"];
        for (const fieldName of fields) {
          const sourceIds = meta[fieldName];
          if (sourceIds === undefined) continue;
          if (!Array.isArray(sourceIds)) {
            errors.push(`${fieldName} must be an array at content/events/${slug}/meta.${locale}.json`);
            continue;
          }
          for (const sourceId of sourceIds) {
            if (typeof sourceId !== "string") {
              errors.push(`Non-string ${fieldName} entry at content/events/${slug}/meta.${locale}.json`);
              continue;
            }
            if (!resourceIdsFile.includes(sourceId)) {
              errors.push(`${fieldName} sourceId '${sourceId}' not listed in content/events/${slug}/resource-ids.json`);
            }
            if (!resourceIds.has(sourceId)) {
              errors.push(`Unknown ${fieldName} sourceId '${sourceId}' at content/events/${slug}/meta.${locale}.json`);
            }
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

  const placeEntries = await fs.readdir(placesDir);
  for (const placeId of placeEntries) {
    for (const locale of ["en", "bn"]) {
      const metaPath = path.join(placesDir, placeId, `meta.${locale}.json`);
      if (!(await exists(metaPath))) {
        errors.push(`Missing file: content/places/${placeId}/meta.${locale}.json`);
        continue;
      }
      const meta = await readJson(metaPath, errors);
      if (!meta || typeof meta !== "object") continue;
      if (meta.id !== placeId) {
        errors.push(`Place id mismatch at content/places/${placeId}/meta.${locale}.json`);
      }
      if (!allowedPlaceIds.has(placeId)) {
        errors.push(`Unsupported place id '${placeId}' in content/places`);
      }
      if (typeof meta.title !== "string" || meta.title.trim().length === 0) {
        errors.push(`Invalid or missing title at content/places/${placeId}/meta.${locale}.json`);
      }
      if (typeof meta.subtitle !== "string" || meta.subtitle.trim().length === 0) {
        errors.push(`Invalid or missing subtitle at content/places/${placeId}/meta.${locale}.json`);
      }
      if (typeof meta.description !== "string" || meta.description.trim().length === 0) {
        errors.push(`Invalid or missing description at content/places/${placeId}/meta.${locale}.json`);
      }
      if (typeof meta.themeColor !== "string" || meta.themeColor.trim().length === 0) {
        errors.push(`Invalid or missing themeColor at content/places/${placeId}/meta.${locale}.json`);
      }
      const allowedRegionTypes = new Set(["region", "city", "district", "site"]);
      if (typeof meta.regionType !== "string" || !allowedRegionTypes.has(meta.regionType)) {
        errors.push(`Invalid regionType at content/places/${placeId}/meta.${locale}.json`);
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

  const topicEntries = await fs.readdir(topicsDir);
  for (const topicSlug of topicEntries) {
    for (const locale of ["en", "bn"]) {
      const metaPath = path.join(topicsDir, topicSlug, `meta.${locale}.json`);
      if (!(await exists(metaPath))) {
        errors.push(`Missing file: content/topics/${topicSlug}/meta.${locale}.json`);
        continue;
      }
      const meta = await readJson(metaPath, errors);
      if (!meta || typeof meta !== "object") continue;
      for (const key of ["slug", "title", "tagline", "intro", "description"]) {
        if (typeof meta[key] !== "string" || meta[key].trim().length === 0) {
          errors.push(`Missing or invalid '${key}' at content/topics/${topicSlug}/meta.${locale}.json`);
        }
      }
      if (meta.slug !== topicSlug) {
        errors.push(`Topic slug mismatch at content/topics/${topicSlug}/meta.${locale}.json`);
      }
      if ("priority" in meta && meta.priority !== undefined) {
        if (!Number.isInteger(meta.priority) || meta.priority < 0) {
          errors.push(`priority must be a non-negative integer at content/topics/${topicSlug}/meta.${locale}.json`);
        }
      }
      if (!Array.isArray(meta.eventSlugs) || meta.eventSlugs.length === 0) {
        errors.push(`eventSlugs must be a non-empty array at content/topics/${topicSlug}/meta.${locale}.json`);
      } else {
        const seenEventSlugs = new Set();
        for (const eventSlug of meta.eventSlugs) {
          if (typeof eventSlug !== "string" || !eventSlugSet.has(eventSlug)) {
            errors.push(`Invalid eventSlugs entry '${eventSlug}' at content/topics/${topicSlug}/meta.${locale}.json`);
            continue;
          }
          if (seenEventSlugs.has(eventSlug)) {
            errors.push(`Duplicate eventSlugs entry '${eventSlug}' at content/topics/${topicSlug}/meta.${locale}.json`);
          }
          seenEventSlugs.add(eventSlug);
        }
      }
      if ("figureIds" in meta && meta.figureIds !== undefined) {
        if (!Array.isArray(meta.figureIds)) {
          errors.push(`figureIds must be an array at content/topics/${topicSlug}/meta.${locale}.json`);
        } else {
          const seenFigureIds = new Set();
          for (const figureId of meta.figureIds) {
            if (typeof figureId !== "string" || !figureIds.has(figureId)) {
              errors.push(`Invalid figureIds entry '${figureId}' at content/topics/${topicSlug}/meta.${locale}.json`);
              continue;
            }
            if (seenFigureIds.has(figureId)) {
              errors.push(`Duplicate figureIds entry '${figureId}' at content/topics/${topicSlug}/meta.${locale}.json`);
            }
            seenFigureIds.add(figureId);
          }
        }
      }
      if ("resourceIds" in meta && meta.resourceIds !== undefined) {
        if (!Array.isArray(meta.resourceIds)) {
          errors.push(`resourceIds must be an array at content/topics/${topicSlug}/meta.${locale}.json`);
        } else {
          const seenResourceIds = new Set();
          for (const resourceId of meta.resourceIds) {
            if (typeof resourceId !== "string" || !resourceIds.has(resourceId)) {
              errors.push(`Invalid resourceIds entry '${resourceId}' at content/topics/${topicSlug}/meta.${locale}.json`);
              continue;
            }
            if (seenResourceIds.has(resourceId)) {
              errors.push(`Duplicate resourceIds entry '${resourceId}' at content/topics/${topicSlug}/meta.${locale}.json`);
            }
            seenResourceIds.add(resourceId);
          }
        }
      }
      if ("keywords" in meta && meta.keywords !== undefined) {
        if (!Array.isArray(meta.keywords)) {
          errors.push(`keywords must be an array at content/topics/${topicSlug}/meta.${locale}.json`);
        } else {
          for (const keyword of meta.keywords) {
            if (typeof keyword !== "string" || keyword.trim().length === 0) {
              errors.push(`Invalid keywords entry '${keyword}' at content/topics/${topicSlug}/meta.${locale}.json`);
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
