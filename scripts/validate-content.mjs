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

function validateOptionalStringArray(value, label, errors, { nonEmpty = true } = {}) {
  if (value === undefined) return;
  if (!Array.isArray(value)) {
    errors.push(`${label} must be an array`);
    return;
  }
  for (const item of value) {
    if (typeof item !== "string" || (nonEmpty && item.trim().length === 0)) {
      errors.push(`Invalid string entry '${item}' at ${label}`);
    }
  }
}

function validateFaqArray(value, label, errors, resourceIdsFile, resourceIds) {
  if (value === undefined) return;
  if (!Array.isArray(value)) {
    errors.push(`${label} must be an array`);
    return;
  }
  for (let i = 0; i < value.length; i += 1) {
    const entry = value[i];
    if (!entry || typeof entry !== "object") {
      errors.push(`Invalid faq entry at ${label}[${i}]`);
      continue;
    }
    if (typeof entry.question !== "string" || entry.question.trim().length === 0) {
      errors.push(`Missing or invalid faq.question at ${label}[${i}]`);
    }
    if (typeof entry.answer !== "string" || entry.answer.trim().length === 0) {
      errors.push(`Missing or invalid faq.answer at ${label}[${i}]`);
    }
    if ("sourceIds" in entry && entry.sourceIds !== undefined) {
      if (!Array.isArray(entry.sourceIds)) {
        errors.push(`faq.sourceIds must be an array at ${label}[${i}]`);
        continue;
      }
      for (const sourceId of entry.sourceIds) {
        if (typeof sourceId !== "string") {
          errors.push(`Non-string faq.sourceId at ${label}[${i}]`);
          continue;
        }
        if (resourceIdsFile && Array.isArray(resourceIdsFile) && !resourceIdsFile.includes(sourceId)) {
          errors.push(`faq sourceId '${sourceId}' not listed in event resource-ids at ${label}[${i}]`);
        }
        if (resourceIds && !resourceIds.has(sourceId)) {
          errors.push(`Unknown faq sourceId '${sourceId}' at ${label}[${i}]`);
        }
      }
    }
  }
}

function hasBangla(text) {
  return /[\u0980-\u09FF]/.test(text);
}

function assertLocaleScript(value, locale, label, errors) {
  if (typeof value !== "string") return;
  const trimmed = value.trim();
  if (trimmed.length === 0) return;
  if (locale === "bn" && !hasBangla(trimmed)) {
    errors.push(`Expected Bangla script at ${label}`);
  }
  if (locale === "en" && hasBangla(trimmed)) {
    errors.push(`Expected English/non-Bangla script at ${label}`);
  }
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
  const placeEntries = await fs.readdir(placesDir);
  const placeIdSet = new Set(placeEntries);
  const allowedQuality = new Set(["primary", "secondary", "archive", "editorial"]);
  const allowedSourceQuality = new Set(["primary", "secondary", "archive", "academic", "editorial", "reference", "unknown"]);
  const allowedEvidenceLevel = new Set(["high", "medium", "low"]);
  const allowedResourceCategories = new Set([
    "primary-sources",
    "academic-books",
    "reference-sources",
    "research-articles-and-papers",
    "memoirs-and-eyewitness-accounts",
    "maps-and-visual-sources",
    "documentary-and-video",
    "cultural-and-literary-resources",
    "news-and-contemporary-reports",
    "further-reading",
  ]);
  const allowedMapPointRoles = new Set([
    "battlefield",
    "capital",
    "route",
    "birthplace",
    "deathplace",
    "treaty-place",
    "movement-center",
    "administrative-center",
    "other",
  ]);
  const allowedLearningPathTypes = new Set(["event", "figure", "resource", "place", "period", "topic"]);
  const allowedThemes = new Set(["language", "democracy", "war", "culture", "economy"]);
  const allowedImportance = new Set(["landmark", "major", "high", "medium", "reference"]);
  const allowedRelationTypes = new Set(["cause", "effect", "background", "parallel", "legacy", "contrast"]);
  const allowedClaimSections = new Set(["summary", "whyItMatters", "longTermLegacy", "culturalImpact", "identityMemoryNotes"]);
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
    "bangladesh",
    "east-bengal",
    "east-pakistan",
    "west-bengal",
    "mahasthangarh",
    "somapura-mahavihara",
    "gaur-lakhnauti",
    "nadia-nabadwip",
    "sonargaon",
    "sylhet",
    "dhaka-jahangirnagar",
    "murshidabad",
    "chittagong-chattogram",
    "rajmahal",
    "hooghly",
    "calcutta-kolkata",
    "palashi-plassey",
    "buxar",
    "faridpur",
    "barasat-narkelberia",
    "noakhali",
    "dhaka-university",
    "dhaka-medical-college",
    "central-shaheed-minar",
    "racecourse-suhrawardy-udyan",
    "mujibnagar",
    "farakka",
    "shahbag-dhaka",
    "pilkhana-dhaka",
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
      if ("contested" in meta && typeof meta.contested !== "boolean") {
        errors.push(`contested must be boolean at content/events/${slug}/meta.${locale}.json`);
      }
      if ("contentWarnings" in meta && meta.contentWarnings !== undefined) {
        if (!Array.isArray(meta.contentWarnings)) {
          errors.push(`contentWarnings must be an array at content/events/${slug}/meta.${locale}.json`);
        } else {
          for (let i = 0; i < meta.contentWarnings.length; i += 1) {
            const warning = meta.contentWarnings[i];
            if (typeof warning !== "string" || warning.trim().length === 0) {
              errors.push(`Invalid contentWarnings entry '${warning}' at content/events/${slug}/meta.${locale}.json`);
            }
            assertLocaleScript(warning, locale, `content/events/${slug}/meta.${locale}.json contentWarnings[${i}]`, errors);
          }
        }
      }
      for (const localizedField of [
        "title",
        "subtitle",
        "seoTitle",
        "seoDescription",
        "quickAnswer",
        "summary",
        "heroTagline",
        "whyItMatters",
        "longTermLegacy",
        "culturalImpact",
        "identityMemoryNotes",
        "historicalDebate",
        "periodLabel",
        "movementLabel",
        "placeLabel",
      ]) {
        if (localizedField in meta && meta[localizedField] !== undefined) {
          assertLocaleScript(
            meta[localizedField],
            locale,
            `content/events/${slug}/meta.${locale}.json field '${localizedField}'`,
            errors,
          );
        }
      }
      validateOptionalStringArray(meta.causes, `content/events/${slug}/meta.${locale}.json causes`, errors);
      validateOptionalStringArray(meta.consequences, `content/events/${slug}/meta.${locale}.json consequences`, errors);
      validateFaqArray(
        meta.faq,
        `content/events/${slug}/meta.${locale}.json faq`,
        errors,
        resourceIdsFile,
        resourceIds,
      );
      if ("misconceptions" in meta && meta.misconceptions !== undefined) {
        if (!Array.isArray(meta.misconceptions)) {
          errors.push(`misconceptions must be an array at content/events/${slug}/meta.${locale}.json`);
        } else {
          for (let i = 0; i < meta.misconceptions.length; i += 1) {
            const item = meta.misconceptions[i];
            if (!item || typeof item !== "object") {
              errors.push(`Invalid misconceptions entry at content/events/${slug}/meta.${locale}.json[${i}]`);
              continue;
            }
            if (typeof item.title !== "string" || item.title.trim().length === 0) {
              errors.push(`Invalid misconceptions.title at content/events/${slug}/meta.${locale}.json[${i}]`);
            }
            if (typeof item.explanation !== "string" || item.explanation.trim().length === 0) {
              errors.push(`Invalid misconceptions.explanation at content/events/${slug}/meta.${locale}.json[${i}]`);
            }
            if ("sourceIds" in item && item.sourceIds !== undefined) {
              if (!Array.isArray(item.sourceIds)) {
                errors.push(`misconceptions.sourceIds must be an array at content/events/${slug}/meta.${locale}.json[${i}]`);
              } else {
                for (const sourceId of item.sourceIds) {
                  if (typeof sourceId !== "string") {
                    errors.push(`Non-string misconceptions.sourceId at content/events/${slug}/meta.${locale}.json[${i}]`);
                    continue;
                  }
                  if (resourceIdsFile && Array.isArray(resourceIdsFile) && !resourceIdsFile.includes(sourceId)) {
                    errors.push(`misconceptions sourceId '${sourceId}' not listed in content/events/${slug}/resource-ids.json`);
                  }
                  if (!resourceIds.has(sourceId)) {
                    errors.push(`Unknown misconceptions sourceId '${sourceId}' at content/events/${slug}/meta.${locale}.json`);
                  }
                }
              }
            }
          }
        }
      }
      if ("mapPoints" in meta && meta.mapPoints !== undefined) {
        if (!Array.isArray(meta.mapPoints)) {
          errors.push(`mapPoints must be an array at content/events/${slug}/meta.${locale}.json`);
        } else {
          for (let i = 0; i < meta.mapPoints.length; i += 1) {
            const point = meta.mapPoints[i];
            if (!point || typeof point !== "object") {
              errors.push(`Invalid mapPoints entry at content/events/${slug}/meta.${locale}.json[${i}]`);
              continue;
            }
            if (typeof point.placeId !== "string" || point.placeId.trim().length === 0) {
              errors.push(`Invalid mapPoints.placeId at content/events/${slug}/meta.${locale}.json[${i}]`);
            } else if (!placeIdSet.has(point.placeId)) {
              errors.push(`Unknown mapPoints.placeId '${point.placeId}' at content/events/${slug}/meta.${locale}.json[${i}]`);
            }
            if (typeof point.label !== "string" || point.label.trim().length === 0) {
              errors.push(`Invalid mapPoints.label at content/events/${slug}/meta.${locale}.json[${i}]`);
            }
            if ("lat" in point && point.lat !== undefined && typeof point.lat !== "number") {
              errors.push(`mapPoints.lat must be number at content/events/${slug}/meta.${locale}.json[${i}]`);
            }
            if ("lon" in point && point.lon !== undefined && typeof point.lon !== "number") {
              errors.push(`mapPoints.lon must be number at content/events/${slug}/meta.${locale}.json[${i}]`);
            }
            if ("role" in point && point.role !== undefined) {
              if (typeof point.role !== "string" || !allowedMapPointRoles.has(point.role)) {
                errors.push(`Invalid mapPoints.role '${point.role}' at content/events/${slug}/meta.${locale}.json[${i}]`);
              }
            }
            if ("year" in point && point.year !== undefined && typeof point.year !== "string") {
              errors.push(`mapPoints.year must be string at content/events/${slug}/meta.${locale}.json[${i}]`);
            }
            if ("note" in point && point.note !== undefined && typeof point.note !== "string") {
              errors.push(`mapPoints.note must be string at content/events/${slug}/meta.${locale}.json[${i}]`);
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
      const debateIds = Array.isArray(meta.historicalDebateSourceIds) ? meta.historicalDebateSourceIds : [];
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
      if (debateIds.length > 0) {
        if (typeof meta.historicalDebateEvidenceLevel !== "string" || !allowedEvidenceLevel.has(meta.historicalDebateEvidenceLevel)) {
          errors.push(`Invalid or missing historicalDebateEvidenceLevel at content/events/${slug}/meta.${locale}.json`);
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
      if ("historicalDebate" in meta && meta.historicalDebate !== undefined) {
        if (typeof meta.historicalDebate !== "string" || meta.historicalDebate.trim().length === 0) {
          errors.push(`Invalid historicalDebate at content/events/${slug}/meta.${locale}.json`);
        }
      }
      if ("claimCitations" in meta && meta.claimCitations !== undefined) {
        if (!Array.isArray(meta.claimCitations)) {
          errors.push(`claimCitations must be an array at content/events/${slug}/meta.${locale}.json`);
        } else {
          const seenClaimIds = new Set();
          for (const claimCitation of meta.claimCitations) {
            if (!claimCitation || typeof claimCitation !== "object") {
              errors.push(`Invalid claimCitations entry at content/events/${slug}/meta.${locale}.json`);
              continue;
            }
            if (typeof claimCitation.id !== "string" || claimCitation.id.trim().length === 0) {
              errors.push(`Invalid claimCitations.id at content/events/${slug}/meta.${locale}.json`);
            } else if (seenClaimIds.has(claimCitation.id)) {
              errors.push(`Duplicate claimCitations.id '${claimCitation.id}' at content/events/${slug}/meta.${locale}.json`);
            } else {
              seenClaimIds.add(claimCitation.id);
            }
            if (typeof claimCitation.section !== "string" || !allowedClaimSections.has(claimCitation.section)) {
              errors.push(`Invalid claimCitations.section '${claimCitation.section}' at content/events/${slug}/meta.${locale}.json`);
            }
            if (typeof claimCitation.claim !== "string" || claimCitation.claim.trim().length === 0) {
              errors.push(`Invalid claimCitations.claim at content/events/${slug}/meta.${locale}.json`);
            }
            if (!Array.isArray(claimCitation.sourceIds) || claimCitation.sourceIds.length === 0) {
              errors.push(`claimCitations.sourceIds must be a non-empty array at content/events/${slug}/meta.${locale}.json`);
            }
            if (typeof claimCitation.evidenceLevel !== "string" || !allowedEvidenceLevel.has(claimCitation.evidenceLevel)) {
              errors.push(`Invalid claimCitations.evidenceLevel at content/events/${slug}/meta.${locale}.json`);
            }
          }
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
      if (meta.contested === true) {
        if (typeof meta.historicalDebate !== "string" || meta.historicalDebate.trim().length === 0) {
          errors.push(`contested=true requires historicalDebate at content/events/${slug}/meta.${locale}.json`);
        }
        if (debateIds.length === 0) {
          errors.push(`contested=true requires non-empty historicalDebateSourceIds at content/events/${slug}/meta.${locale}.json`);
        }
      }
      if (meta.importance === "major") {
        if (typeof meta.longTermLegacy !== "string" || meta.longTermLegacy.trim().length === 0) {
          errors.push(`importance=major requires longTermLegacy at content/events/${slug}/meta.${locale}.json`);
        }
        if (!Array.isArray(meta.claimCitations) || meta.claimCitations.length === 0) {
          errors.push(`importance=major requires non-empty claimCitations at content/events/${slug}/meta.${locale}.json`);
        }
      }
      if (meta.importance === "landmark") {
        if (typeof meta.culturalImpact !== "string" || meta.culturalImpact.trim().length === 0) {
          errors.push(`importance=landmark requires culturalImpact at content/events/${slug}/meta.${locale}.json`);
        }
        if (typeof meta.identityMemoryNotes !== "string" || meta.identityMemoryNotes.trim().length === 0) {
          errors.push(`importance=landmark requires identityMemoryNotes at content/events/${slug}/meta.${locale}.json`);
        }
        if (!Array.isArray(meta.claimCitations) || meta.claimCitations.length === 0) {
          errors.push(`importance=landmark requires non-empty claimCitations at content/events/${slug}/meta.${locale}.json`);
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
        const fields = ["summarySourceIds", "whyItMattersSourceIds", "longTermLegacySourceIds", "culturalImpactSourceIds", "identityMemorySourceIds", "historicalDebateSourceIds"];
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

        if (Array.isArray(meta.claimCitations)) {
          for (const claimCitation of meta.claimCitations) {
            if (!claimCitation || typeof claimCitation !== "object" || !Array.isArray(claimCitation.sourceIds)) continue;
            for (const sourceId of claimCitation.sourceIds) {
              if (typeof sourceId !== "string") {
                errors.push(`Non-string claimCitations.sourceId at content/events/${slug}/meta.${locale}.json`);
                continue;
              }
              if (!resourceIdsFile.includes(sourceId)) {
                errors.push(`claimCitations sourceId '${sourceId}' not listed in content/events/${slug}/resource-ids.json`);
              }
              if (!resourceIds.has(sourceId)) {
                errors.push(`Unknown claimCitations sourceId '${sourceId}' at content/events/${slug}/meta.${locale}.json`);
              }
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
      assertLocaleScript(meta.title, locale, `content/periods/${periodId}/meta.${locale}.json field 'title'`, errors);
      if (typeof meta.description !== "string" || meta.description.trim().length === 0) {
        errors.push(`Invalid or missing description at content/periods/${periodId}/meta.${locale}.json`);
      }
      assertLocaleScript(meta.description, locale, `content/periods/${periodId}/meta.${locale}.json field 'description'`, errors);
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
      assertLocaleScript(meta.title, locale, `content/movements/${movementId}/meta.${locale}.json field 'title'`, errors);
      if (typeof meta.description !== "string" || meta.description.trim().length === 0) {
        errors.push(`Invalid or missing description at content/movements/${movementId}/meta.${locale}.json`);
      }
      assertLocaleScript(meta.description, locale, `content/movements/${movementId}/meta.${locale}.json field 'description'`, errors);
    }
  }

  const validatedPlaceEntries = await fs.readdir(placesDir);
  for (const placeId of validatedPlaceEntries) {
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
      assertLocaleScript(meta.title, locale, `content/places/${placeId}/meta.${locale}.json field 'title'`, errors);
      if (typeof meta.subtitle !== "string" || meta.subtitle.trim().length === 0) {
        errors.push(`Invalid or missing subtitle at content/places/${placeId}/meta.${locale}.json`);
      }
      assertLocaleScript(meta.subtitle, locale, `content/places/${placeId}/meta.${locale}.json field 'subtitle'`, errors);
      if (typeof meta.description !== "string" || meta.description.trim().length === 0) {
        errors.push(`Invalid or missing description at content/places/${placeId}/meta.${locale}.json`);
      }
      assertLocaleScript(meta.description, locale, `content/places/${placeId}/meta.${locale}.json field 'description'`, errors);
      if (typeof meta.themeColor !== "string" || meta.themeColor.trim().length === 0) {
        errors.push(`Invalid or missing themeColor at content/places/${placeId}/meta.${locale}.json`);
      }
      const allowedPlaceTypes = new Set([
        "region", "city", "capital", "district", "division", "river", "port",
        "battlefield", "religious-site", "educational-site", "archaeological-site",
        "frontier", "route", "other"
      ]);
      const allowedRegionTypes = new Set(["region", "city", "district", "site"]);

      // Check placeType (new required field) or fallback to regionType (deprecated)
      if ("placeType" in meta) {
        if (typeof meta.placeType !== "string" || !allowedPlaceTypes.has(meta.placeType)) {
          errors.push(`Invalid placeType at content/places/${placeId}/meta.${locale}.json`);
        }
      } else if (typeof meta.regionType !== "string" || !allowedRegionTypes.has(meta.regionType)) {
        errors.push(`Invalid regionType at content/places/${placeId}/meta.${locale}.json (consider migrating to placeType)`);
      }
      if ("lat" in meta && meta.lat !== undefined && typeof meta.lat !== "number") {
        errors.push(`lat must be number at content/places/${placeId}/meta.${locale}.json`);
      }
      if ("lon" in meta && meta.lon !== undefined && typeof meta.lon !== "number") {
        errors.push(`lon must be number at content/places/${placeId}/meta.${locale}.json`);
      }
      if ("modernCountry" in meta && meta.modernCountry !== undefined && typeof meta.modernCountry !== "string") {
        errors.push(`modernCountry must be string at content/places/${placeId}/meta.${locale}.json`);
      }
      validateOptionalStringArray(meta.historicalNames, `content/places/${placeId}/meta.${locale}.json historicalNames`, errors);
      if ("relatedEventIds" in meta && meta.relatedEventIds !== undefined) {
        if (!Array.isArray(meta.relatedEventIds)) {
          errors.push(`relatedEventIds must be an array at content/places/${placeId}/meta.${locale}.json`);
        } else {
          for (const eventId of meta.relatedEventIds) {
            if (typeof eventId !== "string" || !eventSlugSet.has(eventId)) {
              errors.push(`Invalid relatedEventIds entry '${eventId}' at content/places/${placeId}/meta.${locale}.json`);
            }
          }
        }
      }
      if ("relatedFigureIds" in meta && meta.relatedFigureIds !== undefined) {
        if (!Array.isArray(meta.relatedFigureIds)) {
          errors.push(`relatedFigureIds must be an array at content/places/${placeId}/meta.${locale}.json`);
        } else {
          for (const figureId of meta.relatedFigureIds) {
            if (typeof figureId !== "string" || !figureIds.has(figureId)) {
              errors.push(`Invalid relatedFigureIds entry '${figureId}' at content/places/${placeId}/meta.${locale}.json`);
            }
          }
        }
      }
      if ("mapNote" in meta && meta.mapNote !== undefined && typeof meta.mapNote !== "string") {
        errors.push(`mapNote must be string at content/places/${placeId}/meta.${locale}.json`);
      }

      // Validate new place schema fields (2026-05 historical place system)
      if ("modernAdministrativeUnit" in meta && meta.modernAdministrativeUnit !== undefined && typeof meta.modernAdministrativeUnit !== "string") {
        errors.push(`modernAdministrativeUnit must be string at content/places/${placeId}/meta.${locale}.json`);
      }

      const allowedCoordinateConfidence = new Set(["exact", "approximate", "representative", "unknown"]);
      if ("coordinateConfidence" in meta && meta.coordinateConfidence !== undefined) {
        if (typeof meta.coordinateConfidence !== "string" || !allowedCoordinateConfidence.has(meta.coordinateConfidence)) {
          errors.push(`Invalid coordinateConfidence at content/places/${placeId}/meta.${locale}.json (must be: exact | approximate | representative | unknown)`);
        }
      }

      // Warn if lat/lon exists but no coordinateConfidence
      if (((meta.lat !== undefined && meta.lat !== null) || (meta.lon !== undefined && meta.lon !== null)) &&
          !meta.coordinateConfidence) {
        errors.push(`WARN: Place has lat/lon but no coordinateConfidence at content/places/${placeId}/meta.${locale}.json`);
      }

      // Warn if historical place (not "region" or modern) has no mapNote
      const isHistoricalPlace = meta.placeType && meta.placeType !== "region" &&
        (meta.historicalNames && meta.historicalNames.length > 0 || meta.nameHistory);
      if (isHistoricalPlace && !meta.mapNote) {
        errors.push(`WARN: Historical place has no mapNote at content/places/${placeId}/meta.${locale}.json`);
      }

      // Validate nameHistory array shape
      if ("nameHistory" in meta && meta.nameHistory !== undefined) {
        if (!Array.isArray(meta.nameHistory)) {
          errors.push(`nameHistory must be an array at content/places/${placeId}/meta.${locale}.json`);
        } else {
          const allowedLanguages = new Set(["bn", "en", "fa", "ar", "sa", "pt", "other"]);
          for (let i = 0; i < meta.nameHistory.length; i++) {
            const entry = meta.nameHistory[i];
            if (!entry || typeof entry !== "object") {
              errors.push(`Invalid nameHistory entry at content/places/${placeId}/meta.${locale}.json[${i}]`);
              continue;
            }
            if (typeof entry.name !== "string" || entry.name.trim().length === 0) {
              errors.push(`Missing or invalid nameHistory.name at content/places/${placeId}/meta.${locale}.json[${i}]`);
            }
            if ("language" in entry && entry.language !== undefined && !allowedLanguages.has(entry.language)) {
              errors.push(`Invalid nameHistory.language at content/places/${placeId}/meta.${locale}.json[${i}]`);
            }
            if ("sourceIds" in entry && entry.sourceIds !== undefined) {
              if (!Array.isArray(entry.sourceIds)) {
                errors.push(`nameHistory.sourceIds must be array at content/places/${placeId}/meta.${locale}.json[${i}]`);
              } else {
                for (const sourceId of entry.sourceIds) {
                  if (typeof sourceId !== "string" || !resourceIds.has(sourceId)) {
                    errors.push(`Invalid nameHistory.sourceIds entry '${sourceId}' at content/places/${placeId}/meta.${locale}.json[${i}]`);
                  }
                }
              }
            }
          }
        }
      }

      // Validate administrativeHistory array shape
      if ("administrativeHistory" in meta && meta.administrativeHistory !== undefined) {
        if (!Array.isArray(meta.administrativeHistory)) {
          errors.push(`administrativeHistory must be an array at content/places/${placeId}/meta.${locale}.json`);
        } else {
          for (let i = 0; i < meta.administrativeHistory.length; i++) {
            const entry = meta.administrativeHistory[i];
            if (!entry || typeof entry !== "object") {
              errors.push(`Invalid administrativeHistory entry at content/places/${placeId}/meta.${locale}.json[${i}]`);
              continue;
            }
            if (typeof entry.label !== "string" || entry.label.trim().length === 0) {
              errors.push(`Missing or invalid administrativeHistory.label at content/places/${placeId}/meta.${locale}.json[${i}]`);
            }
            if ("sourceIds" in entry && entry.sourceIds !== undefined) {
              if (!Array.isArray(entry.sourceIds)) {
                errors.push(`administrativeHistory.sourceIds must be array at content/places/${placeId}/meta.${locale}.json[${i}]`);
              } else {
                for (const sourceId of entry.sourceIds) {
                  if (typeof sourceId !== "string" || !resourceIds.has(sourceId)) {
                    errors.push(`Invalid administrativeHistory.sourceIds entry '${sourceId}' at content/places/${placeId}/meta.${locale}.json[${i}]`);
                  }
                }
              }
            }
          }
        }
      }

      // Validate relatedTopicIds
      if ("relatedTopicIds" in meta && meta.relatedTopicIds !== undefined) {
        if (!Array.isArray(meta.relatedTopicIds)) {
          errors.push(`relatedTopicIds must be an array at content/places/${placeId}/meta.${locale}.json`);
        } else {
          for (const topicId of meta.relatedTopicIds) {
            if (typeof topicId !== "string" || topicId.trim().length === 0) {
              errors.push(`Invalid relatedTopicIds entry '${topicId}' at content/places/${placeId}/meta.${locale}.json`);
            }
          }
        }
      }

      // Validate relatedPeriodIds
      if ("relatedPeriodIds" in meta && meta.relatedPeriodIds !== undefined) {
        if (!Array.isArray(meta.relatedPeriodIds)) {
          errors.push(`relatedPeriodIds must be an array at content/places/${placeId}/meta.${locale}.json`);
        } else {
          for (const periodId of meta.relatedPeriodIds) {
            if (typeof periodId !== "string" || !allowedPeriodIds.has(periodId)) {
              errors.push(`Invalid relatedPeriodIds entry '${periodId}' at content/places/${placeId}/meta.${locale}.json`);
            }
          }
        }
      }

      // Validate seoTitle and seoDescription
      if ("seoTitle" in meta && meta.seoTitle !== undefined && (typeof meta.seoTitle !== "string" || meta.seoTitle.trim().length === 0)) {
        errors.push(`Invalid seoTitle at content/places/${placeId}/meta.${locale}.json`);
      }
      if ("seoDescription" in meta && meta.seoDescription !== undefined && (typeof meta.seoDescription !== "string" || meta.seoDescription.trim().length === 0)) {
        errors.push(`Invalid seoDescription at content/places/${placeId}/meta.${locale}.json`);
      }

      // Validate faq array
      validateFaqArray(meta.faq, `content/places/${placeId}/meta.${locale}.json faq`, errors, null, resourceIds);

      // Validate sourceIds
      if ("sourceIds" in meta && meta.sourceIds !== undefined) {
        if (!Array.isArray(meta.sourceIds)) {
          errors.push(`sourceIds must be an array at content/places/${placeId}/meta.${locale}.json`);
        } else {
          for (const sourceId of meta.sourceIds) {
            if (typeof sourceId !== "string" || !resourceIds.has(sourceId)) {
              errors.push(`Invalid sourceIds entry '${sourceId}' at content/places/${placeId}/meta.${locale}.json`);
            }
          }
        }
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
      if (typeof meta.quality !== "string") {
        errors.push(`Missing or invalid quality at content/resources/${resourceId}/meta.${locale}.json`);
        continue;
      }
      if (!allowedQuality.has(meta.quality)) {
        errors.push(`Invalid quality '${meta.quality}' at content/resources/${resourceId}/meta.${locale}.json`);
      }
      if (typeof meta.category !== "string" || !allowedResourceCategories.has(meta.category)) {
        errors.push(`Invalid category '${meta.category}' at content/resources/${resourceId}/meta.${locale}.json`);
      }
      if (typeof meta.subcategory !== "string" || meta.subcategory.trim().length === 0) {
        errors.push(`Missing or invalid subcategory at content/resources/${resourceId}/meta.${locale}.json`);
      }
      if ("href" in meta && meta.href !== undefined) {
        if (typeof meta.href !== "string" || meta.href.trim().length === 0) {
          errors.push(`Invalid href at content/resources/${resourceId}/meta.${locale}.json`);
        } else if (!/^https?:\/\//i.test(meta.href)) {
          errors.push(`href must be absolute http(s) URL at content/resources/${resourceId}/meta.${locale}.json`);
        }
      }
      if ("sourceQuality" in meta && meta.sourceQuality !== undefined) {
        if (typeof meta.sourceQuality !== "string" || !allowedSourceQuality.has(meta.sourceQuality)) {
          errors.push(`Invalid sourceQuality '${meta.sourceQuality}' at content/resources/${resourceId}/meta.${locale}.json`);
        }
      }
      if ("evidenceLevel" in meta && meta.evidenceLevel !== undefined) {
        if (typeof meta.evidenceLevel !== "string" || !allowedEvidenceLevel.has(meta.evidenceLevel)) {
          errors.push(`Invalid evidenceLevel '${meta.evidenceLevel}' at content/resources/${resourceId}/meta.${locale}.json`);
        }
      }
      for (const relationField of ["relatedEventIds", "relatedFigureIds", "relatedTopicIds"]) {
        if (!(relationField in meta) || meta[relationField] === undefined) continue;
        if (!Array.isArray(meta[relationField])) {
          errors.push(`${relationField} must be an array at content/resources/${resourceId}/meta.${locale}.json`);
          continue;
        }
      }
      if (Array.isArray(meta.relatedEventIds)) {
        for (const eventId of meta.relatedEventIds) {
          if (typeof eventId !== "string" || !eventSlugSet.has(eventId)) {
            errors.push(`Invalid relatedEventIds entry '${eventId}' at content/resources/${resourceId}/meta.${locale}.json`);
          }
        }
      }
      if (Array.isArray(meta.relatedFigureIds)) {
        for (const figureId of meta.relatedFigureIds) {
          if (typeof figureId !== "string" || !figureIds.has(figureId)) {
            errors.push(`Invalid relatedFigureIds entry '${figureId}' at content/resources/${resourceId}/meta.${locale}.json`);
          }
        }
      }
      if (Array.isArray(meta.relatedTopicIds)) {
        for (const topicId of meta.relatedTopicIds) {
          if (typeof topicId !== "string" || topicId.trim().length === 0) {
            errors.push(`Invalid relatedTopicIds entry '${topicId}' at content/resources/${resourceId}/meta.${locale}.json`);
          }
        }
      }
      if ("whyItMatters" in meta && meta.whyItMatters !== undefined && typeof meta.whyItMatters !== "string") {
        errors.push(`whyItMatters must be string at content/resources/${resourceId}/meta.${locale}.json`);
      }
    }
  }

  const figureEntries = await fs.readdir(figureDir);
  for (const figureId of figureEntries) {
    if (figureId.startsWith("index.")) continue;
    for (const locale of ["en", "bn"]) {
      const metaPath = path.join(figureDir, figureId, `meta.${locale}.json`);
      if (!(await exists(metaPath))) {
        errors.push(`Missing file: content/figures/${figureId}/meta.${locale}.json`);
        continue;
      }
      const meta = await readJson(metaPath, errors);
      if (!meta || typeof meta !== "object") continue;
      for (const key of ["name", "role", "context", "impact"]) {
        if (key in meta && meta[key] !== undefined) {
          assertLocaleScript(meta[key], locale, `content/figures/${figureId}/meta.${locale}.json field '${key}'`, errors);
        }
      }
      validateOptionalStringArray(meta.alternateNames, `content/figures/${figureId}/meta.${locale}.json alternateNames`, errors);
      validateOptionalStringArray(meta.searchAliases, `content/figures/${figureId}/meta.${locale}.json searchAliases`, errors);
      validateFaqArray(
        meta.faq,
        `content/figures/${figureId}/meta.${locale}.json faq`,
        errors,
        null,
        resourceIds,
      );
      if ("primaryEventIds" in meta && meta.primaryEventIds !== undefined) {
        if (!Array.isArray(meta.primaryEventIds)) {
          errors.push(`primaryEventIds must be an array at content/figures/${figureId}/meta.${locale}.json`);
        } else {
          for (const eventId of meta.primaryEventIds) {
            if (typeof eventId !== "string" || !eventSlugSet.has(eventId)) {
              errors.push(`Invalid primaryEventIds entry '${eventId}' at content/figures/${figureId}/meta.${locale}.json`);
            }
          }
        }
      }
      if ("relatedPlaceIds" in meta && meta.relatedPlaceIds !== undefined) {
        if (!Array.isArray(meta.relatedPlaceIds)) {
          errors.push(`relatedPlaceIds must be an array at content/figures/${figureId}/meta.${locale}.json`);
        } else {
          for (const placeId of meta.relatedPlaceIds) {
            if (typeof placeId !== "string" || !placeIdSet.has(placeId)) {
              errors.push(`Invalid relatedPlaceIds entry '${placeId}' at content/figures/${figureId}/meta.${locale}.json`);
            }
          }
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
      for (const key of ["title", "tagline", "intro", "description"]) {
        assertLocaleScript(meta[key], locale, `content/topics/${topicSlug}/meta.${locale}.json field '${key}'`, errors);
      }
      for (const key of ["seoTitle", "seoDescription", "beginnerSummary", "advancedSummary"]) {
        if (key in meta && meta[key] !== undefined) {
          if (typeof meta[key] !== "string" || meta[key].trim().length === 0) {
            errors.push(`Invalid '${key}' at content/topics/${topicSlug}/meta.${locale}.json`);
          } else {
            assertLocaleScript(meta[key], locale, `content/topics/${topicSlug}/meta.${locale}.json field '${key}'`, errors);
          }
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
      validateOptionalStringArray(meta.primaryKeywords, `content/topics/${topicSlug}/meta.${locale}.json primaryKeywords`, errors);
      validateOptionalStringArray(meta.secondaryKeywords, `content/topics/${topicSlug}/meta.${locale}.json secondaryKeywords`, errors);
      validateFaqArray(
        meta.faq,
        `content/topics/${topicSlug}/meta.${locale}.json faq`,
        errors,
        null,
        resourceIds,
      );
      if ("learningPath" in meta && meta.learningPath !== undefined) {
        if (!Array.isArray(meta.learningPath)) {
          errors.push(`learningPath must be an array at content/topics/${topicSlug}/meta.${locale}.json`);
        } else {
          for (let i = 0; i < meta.learningPath.length; i += 1) {
            const item = meta.learningPath[i];
            if (!item || typeof item !== "object") {
              errors.push(`Invalid learningPath item at content/topics/${topicSlug}/meta.${locale}.json[${i}]`);
              continue;
            }
            if (typeof item.type !== "string" || !allowedLearningPathTypes.has(item.type)) {
              errors.push(`Invalid learningPath.type '${item.type}' at content/topics/${topicSlug}/meta.${locale}.json[${i}]`);
            }
            if (typeof item.id !== "string" || item.id.trim().length === 0) {
              errors.push(`Invalid learningPath.id at content/topics/${topicSlug}/meta.${locale}.json[${i}]`);
              continue;
            }
            if (item.type === "event" && !eventSlugSet.has(item.id)) {
              errors.push(`Unknown learningPath event id '${item.id}' at content/topics/${topicSlug}/meta.${locale}.json[${i}]`);
            }
            if (item.type === "figure" && !figureIds.has(item.id)) {
              errors.push(`Unknown learningPath figure id '${item.id}' at content/topics/${topicSlug}/meta.${locale}.json[${i}]`);
            }
            if (item.type === "resource" && !resourceIds.has(item.id)) {
              errors.push(`Unknown learningPath resource id '${item.id}' at content/topics/${topicSlug}/meta.${locale}.json[${i}]`);
            }
            if (item.type === "place" && !placeIdSet.has(item.id)) {
              errors.push(`Unknown learningPath place id '${item.id}' at content/topics/${topicSlug}/meta.${locale}.json[${i}]`);
            }
            if (item.type === "period" && !allowedPeriodIds.has(item.id)) {
              errors.push(`Unknown learningPath period id '${item.id}' at content/topics/${topicSlug}/meta.${locale}.json[${i}]`);
            }
            if ("reason" in item && item.reason !== undefined && typeof item.reason !== "string") {
              errors.push(`learningPath.reason must be string at content/topics/${topicSlug}/meta.${locale}.json[${i}]`);
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
