# Changelog

## 2026-05-29

### Completed

- RM-008/RM-011A/RM-011B/RM-011F Learning paths:
  - UI/runtime:
    - Added `/[locale]/paths` learning-path discovery with static mode filters: beginner, student, researcher, and exam-prep.
    - Added `/[locale]/paths/[slug]` detail pages derived from existing `Topic.learningPath[]` metadata.
    - Added roadmap-style numbered step UI for guided reading across events, figures, resources, places, periods, and topics.
    - Added topic-backed difficulty labels (`beginner`, `intermediate`, `advanced`) without progress tracking or badge logic.
  - SEO/discovery:
    - Added localized metadata for path index/detail routes.
    - Added `/paths` and `/paths/[slug]` routes to sitemap alternates and header navigation.
  - Model/validation/backfill:
    - No new JSON schema fields required; pages reuse already-validated `Topic.learningPath[]`.
    - No content backfill required because current topic hubs already include bilingual learning-path data.

- RM-007 Compare events view (`/{locale}/compare`):
  - UI/runtime:
    - Added a static, server-rendered bilingual compare page for selecting two events via query params.
    - Shows side-by-side event chronology, period, movement, place, importance, evidence posture, overview, why-it-matters text, causes, consequences, and chapter links.
    - Adds shared-context blocks for overlapping figures, resources, and related chapters.
  - SEO/discovery:
    - Added localized metadata for the compare route.
    - Added `/compare` to header navigation and sitemap alternates.
  - Model/validation/backfill:
    - No schema changes required.
    - No content backfill required; the page uses existing event, figure, resource, and relationship metadata.

## 2026-05-25

### Completed

- Place backfill batch for `/[locale]/places` coverage:
  - Activated 30 place IDs in `src/types/content.ts` and `scripts/validate-content.mjs`:
    - `bengal-region`, `bangladesh`, `east-bengal`, `east-pakistan`, `west-bengal`, `mahasthangarh`, `somapura-mahavihara`, `gaur-lakhnauti`, `nadia-nabadwip`, `sonargaon`, `sylhet`, `dhaka-jahangirnagar`, `murshidabad`, `chittagong-chattogram`, `rajmahal`, `hooghly`, `calcutta-kolkata`, `palashi-plassey`, `buxar`, `faridpur`, `barasat-narkelberia`, `noakhali`, `dhaka-university`, `dhaka-medical-college`, `central-shaheed-minar`, `racecourse-suhrawardy-udyan`, `mujibnagar`, `farakka`, `shahbag-dhaka`, `pilkhana-dhaka`.
  - Added bilingual place metadata files (`meta.en.json`, `meta.bn.json`) for the newly introduced place IDs under `content/places/<place-id>/`.
  - Applied combined historical/modern display naming for core dual-name places:
    - `Dhaka / Jahangirnagar`, `Gaur / Lakhnauti`, `Calcutta / Kolkata`, `Chittagong / Chattogram`, `Palashi / Plassey`, `Nabadwip / Nadia`.

- Historical place system expansion (RM-REL-009 enhancement):
  - Model:
    - Extended `PlaceMeta` in `src/types/content.ts` with time-aware fields:
      - `placeType: PlaceType` — expanded taxonomy (region | city | capital | district | division | river | port | battlefield | religious-site | educational-site | archaeological-site | frontier | route | other)
      - `coordinateConfidence?: CoordinateConfidence` — exact | approximate | representative | unknown
      - `nameHistory?: NameHistoryEntry[]` — time-aware name timeline with language, period, and sources
      - `administrativeHistory?: AdministrativeHistoryEntry[]` — time-aware governance timeline
      - `modernAdministrativeUnit?: string`
      - `relatedTopicIds?: string[]`
      - `relatedPeriodIds?: PeriodId[]`
      - `seoTitle?: string`, `seoDescription?: string`
      - `faq?: FaqItem[]`, `sourceIds?: string[]`
    - Deprecated `regionType` in favor of `placeType` (backward compatible)
    - Added 24 new place IDs to `SUPPORTED_PLACE_IDS` for specific historical places:
      - bangladesh, west-bengal, dhaka-jahangirnagar, gaur-lakhnauti, murshidabad, sonargaon
      - mahasthangarh, somapura-mahavihara, sylhet, chittagong-chattogram, chittagong-hill-tracts
      - nadia-nabadwip, rajmahal, palashi-plassey, buxar, calcutta-kolkata, hooghly, satgaon
      - farakka, noakhali, mujibnagar, dhaka-university, pilkhana-dhaka, shahbag-dhaka
  - Validation:
    - Added `placeType` enum validation with 14 allowed types
    - Added `coordinateConfidence` enum validation
    - Added `nameHistory` shape validation (name, language, period, year range, sourceIds)
    - Added `administrativeHistory` shape validation (label, authority, year range, sourceIds)
    - Added validation for `relatedTopicIds`, `relatedPeriodIds`, `seoTitle`, `seoDescription`, `faq`, `sourceIds`
    - Added warning when place has lat/lon but no coordinateConfidence
    - Added warning when historical place (with historicalNames or nameHistory) has no mapNote
    - Updated allowed place IDs to include all 25 places
  - Docs:
    - Updated `docs/CONTENT_MODEL.md` with comprehensive historical place schema documentation
    - Added place type taxonomy explanation and examples
    - Added Dhaka/Jahangirnagar complete example with nameHistory and administrativeHistory
    - Added rule: "Historical boundaries changed. Do not pretend modern coordinates represent historical borders exactly."
  - Content backfill (Phase 1):
    - Created 2 high-priority places with full historical metadata:
      - `dhaka-jahangirnagar` — Capital with 9 related events, complete nameHistory (4 entries) and administrativeHistory (5 eras from Mughal to modern Bangladesh)
      - `palashi-plassey` — 1757 battlefield with 3 related events, nameHistory, and administrative transitions
    - Both places include: placeType, coordinateConfidence, modernCountry, historicalNames, nameHistory, administrativeHistory, relatedEventIds, relatedPeriodIds, mapNote, seoTitle, seoDescription, faq
    - Updated `bengal-region` to use new `placeType` field with coordinateConfidence and mapNote
    - Activated 2 places in SUPPORTED_PLACE_IDS (22 remaining for future backfill)
  - UI:
    - Place index and detail pages working with new schema fields
    - TODO (future): Render nameHistory and administrativeHistory timelines on place detail pages
    - TODO (future): Group place index by placeType (capitals, battlefields, sites, etc.)
    - TODO (future): Add coordinateConfidence indicator to map displays

## 2026-05-25

### Completed

- Resource system revision for historical trust + SEO + linking:
  - Model:
    - Upgraded resource taxonomy in `src/types/content.ts` from legacy broad groups to 10 trust/learning categories:
      - `primary-sources`, `academic-books`, `reference-sources`, `research-articles-and-papers`, `memoirs-and-eyewitness-accounts`, `maps-and-visual-sources`, `documentary-and-video`, `cultural-and-literary-resources`, `news-and-contemporary-reports`, `further-reading`
    - Made `EventResource.subcategory` string-based to support curated sublabels without repeated type churn.
  - Validation:
    - Added hard validation for resource `category` against the 10-category taxonomy.
    - Added hard validation for non-empty `subcategory`.
    - Added hard validation that `href` (if present) is absolute `http(s)`.
  - UI/runtime:
    - Updated resource card and resource index/event-resource pages to use the revised category labels and ordering.
    - Event resource pages now sort within category/subcategory by trust precedence (`sourceQuality`, then `evidenceLevel`) so strongest sources appear first.
    - Content loader now maps legacy category values (`read/watch/explore/understand`) to new taxonomy for backward compatibility.
  - Backfill:
    - Normalized all `content/resources/*/meta.en.json` and `meta.bn.json` entries:
      - category/subcategory normalization
      - standardized `sourceQuality`
      - standardized `evidenceLevel`
      - added/fixed `whyItMatters`
      - added reverse topic linking via `relatedTopicIds` where topic hubs referenced resource IDs
      - removed non-absolute `href` values
    - Curated strong resource sets and resource-based learning-path entries in major topic hubs.
  - Docs:
    - Updated `docs/CONTENT_MODEL.md` with 2026 resource taxonomy rules and quality/evidence mapping.
    - Updated `docs/seo-audit.md` with resource SEO strategy revision.

- Topic hub revision for historical balance + SEO structure:
  - Model/content:
    - Reworked `content/topics/**` into a 17-topic BN/EN hub system with clearer historical sequencing and search-friendly naming.
    - Preserved existing indexed topic slugs wherever possible (no breaking slug migrations for existing hubs).
    - Added four new topic hubs:
      - `pala-sena-period-and-knowledge-culture`
      - `peasant-religious-and-rural-resistance`
      - `state-formation-crisis-and-military-rule-1972-1990`
      - `bengal-culture-literature-and-memory`
    - Added/standardized per-topic optional metadata fields:
      - `seoTitle`, `seoDescription`, `beginnerSummary`, `advancedSummary`
      - `primaryKeywords`, `secondaryKeywords`, `resourceIds`, `faq`, `learningPath`
  - Validation/backfill:
    - Ensured each topic has both BN and EN metadata files with required core fields and valid event mappings.
    - Removed future-sensitive `2026-election` from topic hubs to avoid presenting future events as settled history.
  - UI/runtime:
    - Updated topic detail page (`src/app/[locale]/topics/[slug]/page.tsx`) to render stronger internal links:
      - connected events
      - related figures
      - related resources
      - structured learning path (event/figure/resource/place/period/topic links)
      - FAQ block
    - Topic metadata generation now prioritizes `seoTitle`/`seoDescription` when present.
  - Docs:
    - Updated `docs/seo-audit.md` with revised topic hub status and next priority topic pages.
    - Updated `docs/CONTENT_MODEL.md` topic example to align with the new topic-hub SEO/learning structure.

## 2026-05-23

### Completed

- Content schema extension for SEO, relationships, maps, learning paths, and backend-readiness:
  - Model:
    - Added optional Figure metadata fields in `src/types/content.ts`:
      - `seoTitle`, `seoDescription`, `shortAnswer`, `birthYear`, `deathYear`, `activePeriod`
      - `primaryEventIds`, `relatedPlaceIds`, `alternateNames`, `searchAliases`, `faq`
    - Added optional Event metadata fields:
      - `seoTitle`, `seoDescription`, `quickAnswer`
      - `causes`, `consequences`, `misconceptions`, `faq`, `mapPoints`
    - Added optional Topic metadata fields:
      - `seoTitle`, `seoDescription`, `beginnerSummary`, `advancedSummary`
      - `primaryKeywords`, `secondaryKeywords`, `faq`, `learningPath`
    - Added optional Resource metadata fields:
      - `sourceQuality`, `evidenceLevel`, `relatedEventIds`, `relatedFigureIds`, `relatedTopicIds`, `whyItMatters`
    - Added optional Place metadata fields:
      - `lat`, `lon`, `modernCountry`, `historicalNames`, `relatedEventIds`, `relatedFigureIds`, `mapNote`
    - Added shared helper types for FAQ, misconceptions, map points, and learning-path items.
  - Validation:
    - Added optional-field checks in `scripts/validate-content.mjs` without requiring backfill:
      - FAQ entry shape validation (`question`, `answer`, optional `sourceIds`)
      - Event `mapPoints` shape and `placeId` existence checks
      - Topic `learningPath` type/id shape checks with entity-aware ID validation
      - Figure `alternateNames` and `searchAliases` string-array validation
      - Resource `sourceQuality` and `evidenceLevel` enum validation
      - Added Place/Resource/Figure optional relation/metadata checks
  - UI/runtime:
    - Updated normalization in `src/lib/content.ts` to safely pass through new optional Figure/Resource fields when present.
  - Backfill:
    - No historical content backfill required; all new fields are optional.
  - Docs:
    - Updated `docs/CONTENT_MODEL.md` with optional-field definitions, rationale, examples, and migration note.
    - Updated `docs/AI_CONTRACT.md` contract rule for optional metadata extension validation.

## 2026-05-22

### Completed

- RM-TRUTH-002 source reliability rubric completion:
  - Model:
    - Updated `EventResource.quality` in `src/types/content.ts` from optional to required.
  - Validation:
    - Updated `scripts/validate-content.mjs` to require `quality` on every `content/resources/*/meta.<locale>.json`.
    - Kept strict enum enforcement for `quality` values: `primary | secondary | archive | editorial`.
  - Backfill:
    - Added missing `quality: "secondary"` for `content/resources/caretaker-government-banglapedia/meta.en.json` and `meta.bn.json`.
  - Docs:
    - Updated `docs/CONTENT_MODEL.md` resource schema to explicitly include `quality`.
    - Updated `docs/AI_CONTRACT.md` contract rules to require resource `quality` classification and reference `docs/SOURCE_QUALITY.md`.
    - Marked RM-TRUTH-002 complete in `docs/ROADMAP.md`.

- RM-TRUTH-003 primary vs secondary distinction completion:
  - Model:
    - No schema/type changes required.
  - Validation:
    - No new validator checks required beyond required `quality` enum enforcement already implemented in RM-TRUTH-002.
  - Policy/docs:
    - Expanded `docs/SOURCE_QUALITY.md` with explicit primary-vs-secondary decision tests and examples (origin, processing, proximity, reproduction, commentary boundary).
    - Updated `docs/EDITORIAL_RULES.md` with a hard rule against mislabeling interpretive sources as `primary`.
    - Updated `docs/AI_CONTRACT.md` to require using the rubric distinction tests for `primary` vs `secondary` assignment.
    - Marked RM-TRUTH-003 complete in `docs/ROADMAP.md`.

- RM-TRUTH-006 editorial neutrality guideline completion:
  - Model:
    - No schema/type changes required.
  - Validation:
    - No validator code changes required; existing sensitive/contested metadata checks remain the enforcement baseline.
  - Policy/docs:
    - Added published neutrality policy: `docs/EDITORIAL_NEUTRALITY.md`.
    - Linked neutrality policy from `docs/EDITORIAL_RULES.md`.
    - Added neutrality-policy requirement to `docs/AI_CONTRACT.md`.
    - Marked `RM-TRUTH-006` complete in `docs/ROADMAP.md`.
    - Marked governance checkpoint `Written editorial neutrality policy published` as complete in `docs/ROADMAP.md`.

- RM-TRUTH-007 sensitive political history writing guideline completion:
  - Model:
    - No schema/type changes required.
  - Validation:
    - No validator code changes required; existing sensitive/contested metadata checks remain in effect.
  - Policy/docs:
    - Added published policy document: `docs/SENSITIVE_POLITICAL_HISTORY.md`.
    - Linked policy from `docs/EDITORIAL_RULES.md`.
    - Added policy requirement to `docs/AI_CONTRACT.md`.
    - Marked `RM-TRUTH-007` complete in `docs/ROADMAP.md`.
    - Marked governance checkpoint `Written sensitive history writing policy published` as complete in `docs/ROADMAP.md`.

- RM-TRUTH-008 deferment UX clarification (static phase):
  - Model:
    - No schema/type changes required.
  - Validation:
    - No validator changes required.
  - UI/runtime:
    - Added a localized placeholder note on event detail pages clarifying that public revision history is planned for backend phase B5.
    - Added a direct link from that note to `/{locale}/methodology` for trust-method explanation.
  - Docs:
    - Roadmap deferment state remains unchanged for RM-TRUTH-008 (backend B5 dependency preserved).

- RM-SEO-001 contextual figure title rewrite:
  - Model:
    - No schema/type changes required.
  - Validation:
    - No validator changes required.
  - UI/runtime:
    - Updated figure page metadata title generation to use contextual formula on `/{locale}/figures/{id}` pages.
    - EN format: `{Name} — {Role} in {Historical Context} | Bengal Unfolded`.
    - BN format: locale-adapted contextual equivalent with graceful fallback when role/context is missing.
  - Docs:
    - Marked `RM-SEO-001` complete in `docs/ROADMAP.md`.

- RM-SEO-002 contextual figure meta-description rewrite:
  - Model:
    - No schema/type changes required.
  - Validation:
    - No validator changes required.
  - UI/runtime:
    - Updated figure page metadata description generation on `/{locale}/figures/{id}` to include:
      - who (person + role)
      - why (highlight/contribution value proposition)
      - period (derived from chronological linked events)
      - reader outcome (what the page helps the reader understand)
    - Added locale-aware EN/BN description templates with graceful fallbacks and length clamp.
  - Docs:
    - Marked `RM-SEO-002` complete in `docs/ROADMAP.md`.

- RM-SEO-003 related blocks on figure pages:
  - Model:
    - No schema/type changes required.
  - Validation:
    - No validator changes required.
  - UI/runtime:
    - Added `Related` section to `/{locale}/figures/{id}` pages with four blocks:
      - related figures (co-occurrence across linked events)
      - related events
      - related places
      - related resources
    - Added localized EN/BN labels and empty-state messages for each block.
  - Docs:
    - Marked `RM-SEO-003` complete in `docs/ROADMAP.md`.

- RM-SEO-006 structured data consistency for figure/event pages:
  - Model:
    - No schema/type changes required.
  - Validation:
    - Added JSON-LD serialization helper in `src/lib/seo.ts` to safely escape `<` characters in structured data payloads.
    - Lint verification run (`pnpm lint`) completed with warnings only (no errors).
  - UI/runtime:
    - Figure detail pages (`/{locale}/figures/{id}`):
      - Kept `Person` schema and expanded it with `@id` and `mainEntityOfPage`.
      - Added `BreadcrumbList` schema.
    - Event detail pages (`/{locale}/events/{slug}`):
      - Added `Event` schema.
      - Added `Article` schema linked to the event entity.
      - Added `BreadcrumbList` schema.
    - Switched figure/event JSON-LD script serialization to shared safe serializer.
  - Docs:
    - Marked `RM-SEO-006` complete in `docs/ROADMAP.md`.

- RM-SHARE-004 canonical URL and locale-aware metadata consistency checks:
  - Model:
    - No schema/type changes required.
  - Validation:
    - Added central metadata consistency guards in `src/lib/seo.ts`:
      - `canonicalPath` must start with locale prefix (`/en` or `/bn`).
      - `languagePathWithoutLocale` must not include locale prefix.
      - `canonicalPath` must exactly match `/${locale}${languagePathWithoutLocale}` when language path is provided.
    - Lint verification run (`pnpm lint`) completed with warnings only (no errors).
  - UI/runtime:
    - `buildPageMetadata` now emits absolute canonical URLs and absolute Open Graph page URLs derived from `CANONICAL_ORIGIN`.
    - Existing page-level metadata calls now inherit strict locale/canonical consistency checks automatically.
  - Docs:
    - Marked `RM-SHARE-004` complete in `docs/ROADMAP.md`.

- RM-SHARE-001 social metadata baseline for event/figure/book pages:
  - Model:
    - No schema/type changes required.
  - Validation:
    - Added shared metadata description normalizer `normalizeMetaDescription` in `src/lib/seo.ts` (trim, fallback, max-length clamp).
    - Lint verification run (`pnpm lint`) completed with warnings only (no errors).
  - UI/runtime:
    - Event pages (`/{locale}/events/{slug}`): metadata now uses normalized description with locale-aware fallback text.
    - Figure pages (`/{locale}/figures/{id}`): metadata description now uses shared normalizer for consistent clamp/fallback behavior.
    - Book pages (`/{locale}/books/{id}`): metadata now uses normalized description with locale-aware fallback text.
    - Dynamic OG image baseline for event/figure/book remains active via existing `buildDynamicOgImagePath` integration.
  - Docs:
    - Marked `RM-SHARE-001` complete in `docs/ROADMAP.md`.

- RM-SEO-007 figure-page content depth expansion:
  - Model:
    - No schema/type changes required.
  - Validation:
    - Reused existing normalized figure/event/resource data model; no validator rule changes required.
    - Lint verification run (`pnpm lint`) completed with warnings only (no errors).
  - UI/runtime:
    - Expanded `/{locale}/figures/{id}` page structure with explicit depth sections:
      - biography summary
      - timeline placement
      - legacy summary
      - references
      - related events (retained via existing related blocks)
    - Added derived timeline placement metrics from linked events:
      - first appearance year
      - latest appearance year
      - active span
      - linked event count
    - Promoted source-backed reference visibility by creating a dedicated references section from related resources with citation frequency (`cited in N events`).
  - Docs:
    - Marked `RM-SEO-007` complete in `docs/ROADMAP.md`.

- RM-SHARE-005 downloadable share card images:
  - Model:
    - No schema/type changes required.
  - Validation:
    - Reused existing dynamic OG image endpoint (`/api/og`) and URL builder.
    - Lint verification run (`pnpm lint`) completed with warnings only (no errors).
  - UI/runtime:
    - Extended `ShareActions` with optional download-card action (`downloadImagePath`, `downloadFileName`, localized label).
    - Added manual download controls on detail pages:
      - `/{locale}/events/{slug}`
      - `/{locale}/figures/{id}`
      - `/{locale}/books/{id}`
    - Download action points to corresponding dynamic OG image URL and suggests deterministic file names for manual posting workflows.
  - Docs:
    - Marked `RM-SHARE-005` complete in `docs/ROADMAP.md`.

## 2026-05-20

### Completed

- RM-TRUTH-004 / RM-TRUTH-005 contested-history rollout:
  - Model:
    - Added `contested`, `historicalDebate`, `historicalDebateSourceIds`, and `historicalDebateEvidenceLevel` to `EventMeta` in `src/types/content.ts`.
  - Validation:
    - Added shape checks for `contested` and `historicalDebate`.
    - Added `historicalDebateSourceIds -> historicalDebateEvidenceLevel` requirement.
    - Added `contested=true` requirement for non-empty `historicalDebate` and `historicalDebateSourceIds`.
    - Extended event source-integrity validation to cover `historicalDebateSourceIds`.
  - UI/runtime:
    - Added a contested-history badge to event overview metadata on event detail pages.
    - Added localized `Historical Debate` jump-nav entry and debate block on event pages with inline citations and evidence badge rendering.
  - Backfill:
    - Backfilled contested-history metadata for `1905-partition-of-bengal`, `1947-partition-and-eastern-bengal`, and `1947-united-bengal-proposal` in EN/BN using already-linked event resources.
  - Docs:
    - Updated `docs/CONTENT_MODEL.md`, `docs/AI_CONTRACT.md`, and roadmap checkbox state in `docs/ROADMAP.md`.

- RM-TRUTH-010 public methodology page rollout:
  - Model: No schema/type additions required.
  - Validation: No validator changes required.
  - UI/runtime:
    - Added localized methodology page at `/{locale}/methodology`.
    - Added page metadata and locale alternates through the existing SEO helper.
    - Added methodology route entries to `src/app/sitemap.ts`.
    - Added a footer link so the page is reachable from all locale views.
  - Backfill: No content backfill required.
  - Docs: Updated roadmap checkbox state in `docs/ROADMAP.md`.

- Figure registry sync for existing 1971 content:
  - Content: No content-file changes required; existing bilingual figure metadata already existed for `major-rafiqul-islam`, `m-hamidullah-khan`, `mk-bashar`, `mohiuddin-jahangir`, and `major-ma-manzur`, and those IDs were already referenced by existing event content.
  - Model: Added the missing figure IDs to `SUPPORTED_FIGURE_IDS` in `src/types/content.ts` so runtime loaders and static generation recognize the existing figures.
  - Validation: No validator rule changes required.

## 2026-05-09

### Completed

- 2024 figure backfill for Sharif Osman Hadi:
  - Content: Added `sharif-osman-hadi` figure metadata in EN/BN as a 2024 student-activist / Inquilab Mancha spokesperson profile.
  - Content: Linked the figure into `content/events/2024-anti-discrimination-movement/figure-ids.json` and the `democracy-and-civic-movements` and `bangladesh-history` topic hubs for discoverability.
  - Model: Updated `SUPPORTED_FIGURE_IDS` in `src/types/content.ts` so the figure route and loaders recognize the new profile.
  - Validation: No new validator rules were required; existing figure ID and EN/BN parity checks cover the backfill.
  - Docs: Added this changelog entry to record the content sync.

- Historical timeline expansion with three new Bengal/Bangladesh chapters:
  - Added event chapters `1764-battle-of-buxar` (Battle of Buxar), `1770-great-bengal-famine` (Great Bengal Famine), `1935-government-of-india-act-1935` (Government of India Act 1935), and `1937-bengal-provincial-election-and-coalition-ministry` (Bengal Provincial Election and Coalition Ministry) with full EN/BN event packs.
  - Added event chapter `2007-2008-emergency-caretaker-rule` (Emergency-era Caretaker Rule) with full EN/BN event packs.
  - Added supporting resource entries for Buxar, the 1770 famine, the 1935 constitutional framework, and the 1937 Bengal provincial election.
  - Updated `2006-caretaker-crisis-and-emergency-rule` child-event wiring to include `2007-2008-emergency-caretaker-rule` so the cluster remains parent-child consistent.
  - Updated `SUPPORTED_EVENT_SLUGS` in `src/types/content.ts` to register the new event routes.
  - Validation: `pnpm content:validate` passed after the additions.

## 2026-05-08

### Completed

- RM-TRUTH-001 claim-level citation model rollout:
  - Model:
    - Added `EventClaimCitation` schema in `src/types/content.ts` with `id`, `section`, `claim`, `sourceIds`, and `evidenceLevel`.
    - Added `claimCitations?: EventClaimCitation[]` to `EventMeta`.
  - Validation:
    - Added strict shape checks for `claimCitations` entries, unique per-event claim IDs, allowed section enum values, and non-empty source arrays.
    - Added source integrity checks for `claimCitations.sourceIds` against event `resource-ids.json` and global resource set.
    - Added `importance=major|landmark` requirement for non-empty `claimCitations`.
  - UI/runtime:
    - Added localized claim-level citations section on event detail pages with jump-nav anchor, glossary-linked claim text, inline citations, and evidence badge rendering.
  - Backfill:
    - Backfilled `claimCitations` for EN/BN event metadata using existing cited narrative blocks (`summary`, `whyItMatters`, `longTermLegacy`, `culturalImpact`, `identityMemoryNotes`) where source and evidence metadata already existed.
  - Docs:
    - Updated `docs/CONTENT_MODEL.md`, `docs/AI_CONTRACT.md`, and roadmap checkbox state in `docs/ROADMAP.md`.

- RM-REL-013 identity and memory notes rollout:
  - Model:
    - Added `identityMemoryNotes`, `identityMemorySourceIds`, and `identityMemoryEvidenceLevel` to `EventMeta` in `src/types/content.ts`.
  - Validation:
    - Added `identityMemoryNotes` shape checks.
    - Added `identityMemorySourceIds -> identityMemoryEvidenceLevel` requirement.
    - Added `importance=major|landmark` requirement for non-empty `identityMemoryNotes`.
    - Added source ID integrity checks for `identityMemorySourceIds` against event `resource-ids.json` and global resources.
  - UI/runtime:
    - Added localized `Identity and Memory Notes` section to event detail pages with glossary-linked text, inline citations, and evidence badge.
    - Added jump-nav anchor/link for the new section.
  - Backfill:
    - Populated identity-memory fields for all `importance=major` and `importance=landmark` chapters in EN/BN using existing validated narrative/citation metadata as base.
  - Docs:
    - Updated `docs/CONTENT_MODEL.md`, `docs/AI_CONTRACT.md`, and roadmap checkbox state in `docs/ROADMAP.md`.

- RM-REL-010 book/resource-to-event reverse mapping rollout:
  - Model: No schema/type additions required.
  - Validation: No validator rule changes required.
  - UI/runtime:
    - Added `getEventsByBookIdChronological(locale, bookId)` and `getEventsByResourceIdChronological(locale, resourceId)` in `src/lib/content.ts`.
    - Updated book detail page to render referenced events in chronological timeline view.
    - Updated resource detail page to render referenced events in chronological timeline view.
    - Localized timeline-view labels for EN/BN on both pages.
  - Backfill: No content backfill required.
  - Docs: Updated `docs/CONTENT_MODEL.md` runtime accessor list and roadmap checkbox state in `docs/ROADMAP.md`.

- RM-REL-009 place-to-event timeline view rollout:
  - Model:
    - Added `SUPPORTED_PLACE_IDS`, `PlaceId`, `PlaceMeta`, and `Place` in `src/types/content.ts`.
    - Added `placeId?: PlaceId` and `placeLabel?: string` to `EventMeta`.
  - Validation:
    - Extended `scripts/validate-content.mjs` with allowed `placeId` checks on event metadata.
    - Added place directory validation (`content/places/<id>/meta.en.json`, `meta.bn.json`) with required field checks and EN/BN parity enforcement.
  - UI/runtime:
    - Added place loaders in `src/lib/content.ts` (`getPlace`, `getAllPlaces`, `getEventsByPlaceId`, `getEventsByPlaceIdChronological`).
    - Added place timeline detail pages at `/{locale}/places/{id}`.
    - Added place badge/link on event detail pages to navigate to place timelines.
    - Updated `src/app/sitemap.ts` to include localized place detail routes.
  - Backfill:
    - Added bilingual place entity `content/places/bengal-region/`.
    - Backfilled `placeId` and localized `placeLabel` for all event metadata files in EN/BN.
  - Docs:
    - Updated `docs/CONTENT_MODEL.md`, `docs/AI_CONTRACT.md`, and roadmap checkbox state in `docs/ROADMAP.md`.

- RM-SHARE-002 dynamic localized Open Graph image rollout:
  - Model: No schema/type additions required.
  - Validation: No validator rule changes required.
  - UI/runtime:
    - Added dynamic OG image endpoint at `src/app/api/og/route.tsx` using `ImageResponse`.
    - Added localized (EN/BN) OG card labels and rendering variants for content types (`event`, `figure`, `book`).
    - Extended SEO helper in `src/lib/seo.ts` with `buildDynamicOgImagePath(...)` and `ogImagePath` support in `buildPageMetadata(...)`.
    - Updated metadata generation for event, figure, and book detail pages to use content-specific dynamic OG image URLs.
  - Backfill: No content backfill required.
  - Docs: Updated roadmap checkbox state in `docs/ROADMAP.md`.

- RM-SHARE-003 share action UI rollout:
  - Model: No schema/type additions required.
  - Validation: No validator rule changes required.
  - UI/runtime:
    - Added reusable client-side `ShareActions` component in `src/components/ShareActions.tsx` with localized `Share` and `Copy link` actions.
    - Added native share support via `navigator.share` where available.
    - Added copy-to-clipboard fallback with success/error status messaging.
    - Integrated share actions into event, figure, and book detail hero sections.
  - Backfill: No content backfill required.
  - Docs: Updated roadmap checkbox state in `docs/ROADMAP.md`.

- RM-REL-011 long-term legacy fields for major events rollout:
  - Model: Added `longTermLegacy`, `longTermLegacySourceIds`, and `longTermLegacyEvidenceLevel` to `EventMeta` in `src/types/content.ts`.
  - Validation:
    - Added `longTermLegacy` shape checks.
    - Added `longTermLegacySourceIds -> longTermLegacyEvidenceLevel` requirement.
    - Added `importance=major` requirement for non-empty `longTermLegacy`.
    - Added source ID integrity checks for event-level citation arrays (`summarySourceIds`, `whyItMattersSourceIds`, `longTermLegacySourceIds`) against event `resource-ids.json` and global resource set.
  - UI/runtime: Added a dedicated localized `Long-Term Legacy` section on event detail pages with glossary-linked text, inline citations, and evidence badge, plus jump-nav anchor.
  - Backfill: Populated long-term legacy fields for all `importance=major` chapters in both locales (31 event chapters), reusing existing why-it-matters source/evidence metadata where needed.
  - Docs: Updated `docs/CONTENT_MODEL.md`, `docs/AI_CONTRACT.md`, and roadmap checkbox state.

- RM-REL-008 figure-to-event timeline view rollout:
  - Model: No schema/type additions required; existing figure-event relationship model already supported this view.
  - Validation: No validator rule changes required; existing relationship and event integrity checks remain sufficient.
  - UI/runtime:
    - Added `getEventsByFigureIdChronological(locale, figureId)` in `src/lib/content.ts` to return figure-linked events in global chronology order.
    - Updated `/{locale}/figures/{id}` page to render a timeline-style vertical sequence for related events instead of a flat card list.
  - Backfill: No content backfill required.

- RM-006E sensitive-event metadata rollout:
  - Model: Added `sensitive?: boolean`, `contentWarnings?: string[]`, and `requiresSources?: boolean` to `EventMeta` in `src/types/content.ts`.
  - Validation: Extended `scripts/validate-content.mjs` with type checks for all three fields, `contentWarnings` entry validation, and `requiresSources=true` enforcement for non-empty `summarySourceIds` and `whyItMattersSourceIds`.
  - UI/runtime: Updated event detail page UI to show a localized sensitive-content badge and warning panel with optional warning labels and source requirement note.
  - Backfill: Marked an initial curated set of high-sensitivity chapters in EN/BN (`1946-direct-action-day-and-the-great-calcutta-killing`, `1971-liberation-war`, `1974-famine-emergency-and-state-crisis`, `2009-bdr-mutiny-pilkhana-massacre`, `2013-shahbag-movement`, `2014-10th-parliamentary-election`, `2018-digital-security-act`, `2024-anti-discrimination-movement`) with `sensitive`, `contentWarnings`, and `requiresSources`.
  - Docs: Updated `docs/CONTENT_MODEL.md`, `docs/AI_CONTRACT.md`, and roadmap checkbox state in `docs/ROADMAP.md`.

- Historical timeline gap backfill (6 chapters) with full EN/BN content packs:
  - Added event chapters: `1874-assam-reorganization-and-sylhet-s-administrative-detachment`, `1930-chittagong-armoury-raid`, `1948-language-question-becomes-a-mass-political-issue`, `1949-founding-of-awami-muslim-league`, `1962-education-movement-in-east-pakistan`, `1968-agartala-conspiracy-case`.
  - Added shared source entities: `assam-banglapedia`, `surya-sen-banglapedia`, `awami-league-britannica`, `agartala-conspiracy-case-banglapedia`.
  - Updated chronology wiring for parent/child integrity around `1911 -> 1930`, `1947 -> 1948`, and `1958 -> 1962 -> 1966 -> 1968 -> 1969`.
  - Updated `SUPPORTED_EVENT_SLUGS` in `src/types/content.ts` for all six new chapters.

- Dynamic topic hub system rollout (multi-topic, content-driven):
  - Model: Added `TopicMeta` / `Topic` types in `src/types/content.ts` with `slug`, localized presentation fields, and linked entity arrays (`eventSlugs`, `figureIds`, `resourceIds`, `keywords`).
  - Validation: Extended `scripts/validate-content.mjs` with topic directory checks for EN/BN parity, required fields, slug parity, non-empty `eventSlugs`, duplicate prevention, and linked ID integrity against events/figures/resources.
  - UI/runtime: Replaced hardcoded topic route behavior with data-driven loaders:
    - Added topic loaders in `src/lib/content.ts` (`getAllTopicSlugs`, `getTopic`, `getAllTopics`, `getTopicsByEventSlug`, `getTopicsByFigureId`, `getTopicsByResourceId`).
    - Updated `/{locale}/topics` index to render cards from topic content.
    - Updated `/{locale}/topics/[slug]` to generate static params dynamically from topic directories and render topic-specific metadata/JSON-LD/content.
    - Updated event/figure/resource detail pages to show related topic links based on topic membership instead of a fixed hardcoded topic.
    - Updated `src/app/sitemap.ts` to include all topic slugs per locale dynamically.
  - Backfill: Added six bilingual topic hubs under `content/topics/`:
    - `bangladesh-history`
    - `partition-and-identity`
    - `democracy-and-civic-movements`
    - `liberation-war-1971`
    - `language-movement-and-mother-language-day`
    - `partition-of-bengal-1905`
  - Docs: Updated `docs/CONTENT_MODEL.md`, `docs/AI_CONTRACT.md`, and `docs/ROADMAP.md` for the new topic model and completed roadmap item.
  - Follow-up enhancement: Added optional topic `priority` for editorial ordering, validator enforcement, and sorted rendering on topic index/related blocks.

- Added five pre-1204 foundational event chapters with full EN/BN content structure:
  - `content/events/0400bce-0300bce-mahasthangarh-urban-emergence/`
  - `content/events/0600-0637-shashanka-gauda-kingdom/`
  - `content/events/0750-1170-pala-dynasty-foundation/`
  - `content/events/0800-1200-somapura-mahavihara/`
  - `content/events/1178-1204-sena-transition/`
  - Content: Included bilingual `meta`, `timeline`, `quotes`, `figure-ids`, and `resource-ids` files for each event.
  - Model: Updated `SUPPORTED_EVENT_SLUGS` in `src/types/content.ts` to register all five new chapters for runtime routing and loading.
  - Sources: Added new shared resource entities in `content/resources/` for UNESCO and Britannica references used by these chapters.
  - Validation: No validator schema changes required; existing checks cover the added data shape.
  - Model: Added a new period ID `ancient-and-pre-sultanate-bengal` for pre-1204 chapters.
  - Validation: Updated allowed period IDs in `scripts/validate-content.mjs`.
  - Backfill: Reassigned all five newly added pre-1204 chapters from `transition-to-sultanate-formation` to `ancient-and-pre-sultanate-bengal` with updated EN/BN `periodLabel`.

## 2026-05-06

### Completed

- Figure data correction and expansion for `2013-shahbag-movement` (Shahbag / Gonojagoron Moncho):
  - Content: Replaced mismatched event figure links in `content/events/2013-shahbag-movement/figure-ids.json` with movement-relevant profiles.
  - Content: Added missing figure entities with EN/BN metadata for core 2013 movement actors.
  - Content: Expanded the `2013-shahbag-movement` chapter with additional related actors requested during curation.
  - Model: Updated `SUPPORTED_FIGURE_IDS` in `src/types/content.ts` for all newly added figure IDs.
  - Validation: No validator logic changes required; integrity enforced through existing ID checks.
  - Backfill: EN/BN parity maintained for all newly created figure metadata files.

- Key-figure rollout for `2009-bdr-mutiny-pilkhana-massacre` (BDR Mutiny / Pilkhana Massacre):
  - Content: Added event-level key figures in `content/events/2009-bdr-mutiny-pilkhana-massacre/figure-ids.json`.
  - Content: Added EN/BN figure metadata for primary 2009 crisis actors, then expanded with additional investigation-era/testimony-linked figures as requested.
  - Model: Updated `SUPPORTED_FIGURE_IDS` in `src/types/content.ts` for all newly added 2009 figure IDs.
  - Validation: Existing `content:validate` checks passed after updates.

- Figure image integrity and recovery workflow hardening:
  - Content QA: Audited referenced figure media for corrupted/non-renderable binaries.
  - Content fix: Removed broken `image` fields from affected figure metadata so UI collapses media sections cleanly without placeholders.
  - Recovery tracking: Updated unresolved-image backlog in `image_sync_recovery_report.json` and retry artifacts for subsequent crawl passes.
  - UI behavior note: Figure/event media display now relies on optional presence of valid `image` metadata; broken references are avoided at content level.

## 2026-05-05

### Completed

- Period-level refactor for the long arc from `1204-bakhtiyar-khalji-s-conquest-of-nadia` to `1757-battle-of-plassey`:
  - Model: Added three historical period IDs in `src/types/content.ts`:
    - `transition-to-sultanate-formation` (`1204–1352`)
    - `independent-bengal-sultanate-era` (`1352–1576`)
    - `mughal-incorporation-and-consolidation` (`1576–1757`)
  - Validation: Extended `scripts/validate-content.mjs` `allowedPeriodIds` to enforce the new period IDs.
  - Content: Added new period metadata entities in `content/periods/` (EN/BN) for all three periods.
  - Backfill: Assigned `periodId`/`periodLabel` across pre-colonial event chapters (`1204-bakhtiyar-khalji-s-conquest-of-nadia`, `1352-bengal-sultanate-independence-and-unification`, `1414-raja-ganesha-seizes-power-in-bengal`, `1494-alauddin-husain-shah-begins-hussain-shahi-rule-in-bengal`, `1576-battle-of-rajmahal`, `1612-mughal-conquest-phase-in-bengal-largely-completed`, `1704-murshid-quli-khan-shifts-the-capital-to-murshidabad`) while keeping `1757-battle-of-plassey` in `colonial-rule-and-resistance` as the transition boundary.
  - Docs: Updated `docs/CONTENT_MODEL.md` supported period ID list.
  - UI/runtime: No code-path changes required because period pages and event-period filters already consume period IDs generically.
- Added a new `2018-a-year-of-protest-control-and-contested-legitimacy` event cluster with four child chapters:
  - Content: Created bilingual parent metadata plus four bilingual child event chapters for the Quota Reform Movement, Safe Road Movement, Digital Security Act, and 11th Parliamentary Election.
  - Sources: Added shared resources for Human Rights Watch's `Creating Panic` report, Human Rights Watch's road-safety protest statement, and Amnesty International's Digital Security Act coverage.
  - Hierarchy: Inserted `2018-a-year-of-protest-control-and-contested-legitimacy` under `1990-mass-uprising` and attached the four sub-events with `parentEvent` / `childEventIds`.
- Added the missing `2014-10th-parliamentary-election` chapter for the `10th Parliamentary Election`:
  - Content: Created bilingual event metadata, timeline, quotes, figure links, and resource links under `content/events/2014-10th-parliamentary-election/`.
  - Sources: Added shared resources for Human Rights Watch's 2014 election violence report and Al Jazeera's reporting on the immediate parliamentary aftermath.
  - Hierarchy: Inserted `2014-10th-parliamentary-election` as a child chapter of `2013-shahbag-movement`, linking the Shahbag-era political climate to the contested January 5 election.
- Added the missing `2009-bdr-mutiny-pilkhana-massacre` Bangladesh chapter for the `BDR Mutiny / Pilkhana Massacre`:
  - Content: Created bilingual event metadata, timeline, quotes, and resource links under `content/events/2009-bdr-mutiny-pilkhana-massacre/`.
  - Sources: Added shared resources for Banglapedia's Bangladesh Rifles entry and Human Rights Watch's reporting on the mutiny's aftermath.
  - Hierarchy: Inserted `2009-bdr-mutiny-pilkhana-massacre` as a child chapter of `2006-caretaker-crisis-and-emergency-rule`, linking the post-emergency transition to the Pilkhana crisis.
- Added the missing `1982-ershad-s-coup-and-the-return-of-military-rule` authoritarian-transition chapter:
  - Content: Created bilingual event metadata, timeline, quotes, figure links, and resource links under `content/events/1982-ershad-s-coup-and-the-return-of-military-rule/`.
  - Sources: Added shared resources for Ershad's political order and broader 1980s Bangladesh history.
  - Figures: Added `hussain-muhammad-ershad` and `abdus-sattar`.
  - Hierarchy: Rewired the late post-liberation chain from `1975 -> 1990` to `1975 -> 1982 -> 1990`.
- Added the missing `1974-famine-emergency-and-state-crisis` crisis chapter:
  - Content: Created bilingual event metadata, timeline, quotes, figure links, and resource links under `content/events/1974-famine-emergency-and-state-crisis/`.
  - Sources: Added shared resources for the 1974 famine, Banglapedia's famine history, and the Special Powers Act.
  - Hierarchy: Rewired the post-liberation crisis chain from `1972 -> 1975` to `1972 -> 1974 -> 1975`.
- Added the missing `1972-state-formation-and-the-1972-constitution` state-formation chapter:
  - Content: Created bilingual event metadata, timeline, quotes, figure links, and resource links under `content/events/1972-state-formation-and-the-1972-constitution/`.
  - Sources: Added shared resources for the 1972 Constitution, constitutional development, and early post-independence political transition.
  - Figures: Added `kamal-hossain`.
  - Hierarchy: Rewired the immediate postwar chain from `1971 -> 1975` to `1971 -> 1972 -> 1975`.
- Added the missing `1970-bhola-cyclone-and-the-1970-election` prewar crisis chapter:
  - Content: Created bilingual event metadata, timeline, quotes, figure links, and resource links under `content/events/1970-bhola-cyclone-and-the-1970-election/`.
  - Sources: Added shared resources covering the Bhola cyclone, the 1970 general election, and Banglapedia background on Pakistan and the Liberation War.
  - Figures: Added `yahya-khan`.
  - Hierarchy: Rewired the autonomy-to-war chain from `1969 -> 1971` to `1969 -> 1970 -> 1971`.
- Added the missing `1946-direct-action-day-and-the-great-calcutta-killing` Direct Action Day chapter:
  - Content: Created bilingual event metadata, timeline, quotes, figure links, and resource links under `content/events/1946-direct-action-day-and-the-great-calcutta-killing/`.
  - Sources: Added dedicated shared resources for Direct Action Day and the 1946 Calcutta riot.
  - Hierarchy: Rewired the late-colonial partition cluster from `1940 -> 1947` to `1940 -> 1946 -> 1947`.
- Added the missing `1940-lahore-resolution` Lahore Resolution chapter:
  - Content: Created bilingual event metadata, timeline, quotes, figure links, and resource links under `content/events/1940-lahore-resolution/`.
  - Sources: Added dedicated shared resources for Banglapedia and Britannica coverage of the Lahore Resolution.
  - Hierarchy: Rewired `1947-partition-and-eastern-bengal` to use `1940-lahore-resolution` as its parent event, making the late-colonial partition path clearer in timeline discovery.
- Added the missing `1905-partition-of-bengal` event chapter for the Partition of Bengal:
  - Content: Created bilingual event metadata, timeline, quotes, figure links, and resource links under `content/events/1905-partition-of-bengal/`.
  - Sources: Added dedicated shared resources for the 1905 partition, Swadeshi movement, and Dhaka Nawab family context.
  - Figures: Added `lord-curzon`, `rabindranath-tagore`, `surendranath-banerjea`, and `nawab-salimullah`.
  - Hierarchy: Rewired the timeline cluster so `1905-partition-of-bengal` is the parent event for `1906-all-india-muslim-league-founded-in-dhaka` and `1911-annulment-of-bengal-partition`, aligning event discovery with the historical sequence.

## 2026-05-04

### Completed

- RM-REL-007 (Movement/theme-to-event linking):
  - Model: Added `SUPPORTED_MOVEMENT_IDS` constant and `MovementId`, `MovementMeta`, `Movement` types.
  - Model: Added `movementId?: MovementId` to `EventMeta` for movement association.
  - Content: Created 5 movement entities in `content/movements/` with EN and BN metadata:
    - colonial-capture-and-resistance (1757–1905)
    - partition-and-political-representation (1905–1947)
    - language-autonomy-and-liberation (1947–1971)
    - state-power-and-democratic-transition (1971–1990)
    - memory-justice-and-civic-dissent (1990–present)
  - Validation: Added movement directory validation checking id parity and required fields (title, description).
  - Validation: Added event-level `movementId` validation to ensure references are valid.
  - Backfill: All 19 events have been assigned appropriate `movementId` values corresponding to their historical movement.
  - Content loaders: Added `isMovementId()`, `assertSupportedMovementId()`, `getMovement(locale, id)`, `getAllMovements(locale)`, and `getEventsByMovementId(locale, id)` functions with caching.
  - UI: Created movement detail pages at `/{locale}/movements/[id]` that display movement metadata and all events within that movement.
  - Static generation: Added `generateStaticParams()` for pre-rendering all locale + movement ID combinations.
  - Build verification: Confirmed successful Next.js build with all 10 movement pages (5 movements × 2 locales) pre-rendered.
- RM-REL-006 (Period-to-event linking):
  - Model: Added `SUPPORTED_PERIOD_IDS` constant and `PeriodId`, `PeriodMeta`, `Period` types.
  - Model: Added `periodId?: PeriodId` to `EventMeta` for period association.
  - Content: Created 5 period entities in `content/periods/` with EN and BN metadata:
    - colonial-rule-and-resistance (1757–1905)
    - partition-and-late-colonial-politics (1905–1947)
    - pakistan-period-and-national-awakening (1947–1971)
    - post-liberation-state-and-democracy (1971–1990)
    - contemporary-memory-and-civic-protest (1990–2024)
  - Validation: Added period directory validation checking id parity and required fields (title, description, startYear, endYear).
  - Validation: Added event-level `periodId` validation to ensure references are valid.
  - Backfill: All 19 events have been assigned appropriate `periodId` values corresponding to their historical period.
  - Content loader: Added `getPeriod(locale, id)`, `getAllPeriods(locale)`, and `getEventsByPeriodId(locale, id)` functions with caching.
  - UI: Created period detail pages at `/{locale}/periods/[id]` that display period metadata and all events within that period.
  - Static generation: Added `generateStaticParams()` for pre-rendering all locale + period ID combinations.
- RM-REL-005 (Why this matters explanation):
  - Model: Added `whyItMatters: string`, `whyItMattersSourceIds?: string[]`, `whyItMattersEvidenceLevel?: EvidenceLevel` to EventMeta.
  - Validation: Event metadata validates that if `whyItMattersSourceIds.length > 0`, then `whyItMattersEvidenceLevel` must be a valid evidence level.
  - UI: Event detail pages render the `Why This Event Matters Today` section with glossary-linked text, inline source citations, and evidence badges.
  - Backfill: All 19 supported events have `whyItMatters` content and citations in both EN and BN locales. Evidence levels set appropriately.
- Typed event relationship rollout:
  - Added typed `relatedEvents` support with `cause`, `effect`, `background`, `parallel`, `legacy`, and `contrast`.
  - Added relationship validation for relation type, target slug integrity, and duplicate prevention.
  - Added `getEventRelationships` in the content access layer.
  - Added event-page relationship sections for historical causality, aftermath, parallel reading, legacy, background, and contrast.
  - Backfilled typed relationships for landmark and key bridge chapters across EN/BN event metadata.
  - Marked roadmap items RM-REL-001 and RM-REL-002 complete.
- Timeline hierarchy and discovery rollout:
  - Added event hierarchy metadata fields across all event locale meta files:
    - `importance`
    - `parentEvent`
    - `childEventIds`
    - `relatedEventIds`
    - `periodLabel`
    - `movementLabel`
  - Extended the content model and validation rules to enforce hierarchy integrity and valid importance values.
  - Added `getEventHierarchy` in the content access layer.
  - Upgraded the full timeline explorer with importance filtering and period-based grouped results.
  - Added timeline-context blocks on event detail pages for parent, cluster, and related chapter discovery.
  - Marked roadmap items RM-006A and RM-006D complete.
- Performance and delivery guardrails:
  - Added `docs/PERFORMANCE.md` with `/bn` Lighthouse + CWV targets, component/image/font/JS policies, and measurement log template.
  - Added performance check commands to README (`pnpm build`, `pnpm lighthouse:mobile`, `pnpm lighthouse:desktop`).
- Homepage roadmap alignment:
  - Implemented RM-006B by limiting landing timeline to 15 landmark events while keeping `Explore Full Timeline` CTA flow.
- Reduced homepage client-side JS cost:
  - Replaced `framer-motion` usage in landing path animations with lightweight CSS animation.
  - Converted animation wrapper to server-compatible rendering.
  - Deferred homepage timeline client bundle with dynamic import + loading placeholder.
- Citation system rollout (RM-001):
  - Added inline timeline claim citation markers (`[1]`, `[2]`) linked to source chips.
  - Extended event narrative rendering to support inline claim-level citation markers.
  - Added optional event metadata fields:
    - `summarySourceIds`
    - `whyItMattersSourceIds`
  - Backfilled citation fields for all event locale metadata files and validated content integrity.
  - Performed manual QA refinement for key events (`1757-battle-of-plassey`, `1906-all-india-muslim-league-founded-in-dhaka`, `2024-anti-discrimination-movement`) to improve claim-to-source pairing quality.
- Roadmap synchronization:
  - Marked RM-006B as complete.
  - Marked RM-001 as complete with full-coverage note.
  - Marked RM-REL-003 as complete (event detail relationship section already shipped).
  - Marked RM-REL-004 as complete (localized Before this / After this navigation on event pages).
- Multi-agent AI integration governance:
  - Added `docs/AI_CONTRACT.md` as the canonical cross-agent schema/validation/change protocol.
  - Added `docs/EDITORIAL_RULES.md` for source policy, neutrality, and localization parity standards.
  - Updated `AGENTS.md` with mandatory contract-following and validator-gated schema-change rules.
  - Updated `docs/ROADMAP.md` with AI integration completion criteria for roadmap item closure.
  - Linked contract docs from `docs/CONTENT_MODEL.md`.
- Source quality badges groundwork (RM-002 foundation):
  - Added `EventResource.quality` support (`primary`, `secondary`, `archive`, `editorial`) in model + content normalization.
  - Added quality badge rendering in resource cards and timeline source chips.
  - Extended `content:validate` to validate allowed `quality` values in resource metadata.
  - Backfilled quality fields for resources used by landing (landmark) events.
  - Added source-quality rubric doc: `docs/SOURCE_QUALITY.md`.
- Source quality editorial curation completion (RM-002):
  - Reviewed and curated quality assignments for all 55 landmark-linked shared resources (EN/BN metadata).
  - Standardized landmark evidence labels with explicit per-resource mapping (including `archive` and `editorial` exceptions such as archive collections and video/novel sources).
- Evidence metadata rollout (RM-005):
  - Added `evidenceLevel` to timeline items and event narrative claim metadata (`summaryEvidenceLevel`, `whyItMattersEvidenceLevel`).
  - Added event-page and timeline UI evidence badges (EN/BN labels).
  - Extended content validation to enforce allowed evidence levels and require timeline evidence levels where citations exist.
  - Backfilled evidence levels across all event locale metadata and timeline entries based on referenced source-quality composition.
- Glossary rollout (RM-003):
  - Added glossary content model and seeded bilingual glossary term entries under `content/glossary/*`.
  - Added SSG glossary routes: `/{locale}/glossary` and `/{locale}/glossary/[term]`.
  - Added controlled glossary term-linking in event summary, why-it-matters, and timeline detail text.
  - Added glossary validation checks and sitemap coverage for glossary index/term routes.
  - Added glossary discoverability link in header navigation.
- Timeline theme filters rollout (RM-004):
  - Added timeline theme metadata support (`language`, `democracy`, `war`, `culture`, `economy`) to timeline model.
  - Backfilled theme values for all event timeline entries (EN/BN).
  - Added theme filter chips to event/home timelines.
  - Added theme filtering in full timeline explorer query flow (`theme` parameter + filter UI + pagination preservation).
  - Extended content validation to enforce non-empty timeline themes with allowed values.
- Section jump navigation rollout (RM-006):
  - Added localized `Jump to` anchor navigation on long event pages.
  - Added in-page anchors for Overview, Timeline, Figures, Resources, Quotes, and Why It Matters sections.
  - Added scroll offset-friendly section targets for sticky-header behavior.

## 2026-05-03

### Completed

- Added full timeline explorer route:
  - `/{locale}/timeline`
  - Includes search, year filter, and pagination.
- Added homepage CTA to open full timeline explorer.
- Added localized timeline explorer entries to sitemap.
- Expanded timeline citations rollout to all events:
  - Added `sourceIds` across timeline entries for `1757-battle-of-plassey`, `1857-sipahi-revolt`, `1947-partition-and-eastern-bengal`, `1969-mass-uprising`, `1971-liberation-war`, `1990-mass-uprising`, and `2024-anti-discrimination-movement` (EN/BN).
- Tightened content validation rules (`pnpm content:validate`):
  - Every timeline item must include non-empty `sourceIds`.
  - Every `sourceId` must exist in both global resources and the event-level `resource-ids.json`.
- Added optional timeline citations support:
  - `TimelineItem.sourceIds` in content type model.
  - Event timeline UI now renders source chips/links when `sourceIds` exist.
  - Event page now passes shared resources to timeline for source label resolution.
- Seeded citations for 1952 timeline entries in both locales:
  - `content/events/1952-language-movement/timeline.en.json`
  - `content/events/1952-language-movement/timeline.bn.json`
- Added new event content chapters:
  - `1757-battle-of-plassey` (Battle of Plassey / পলাশীর যুদ্ধ)
  - `1857-sipahi-revolt` (Sipahi Revolt / সিপাহী বিদ্রোহ)
  - `1969-mass-uprising` (Mass Uprising / গণঅভ্যুত্থান)
- Updated supported event slug registry in `src/types/content.ts`.
- Expanded figure dataset with new chapter-specific profiles and localization:
  - Added Plassey-related figure profiles for `1757-battle-of-plassey`.
  - Added 40 figure profiles for `1857-sipahi-revolt` (EN/BN metadata).
- Fixed `content/site/home.bn.json` malformed JSON string causing prerender failure.
- Updated root layout script handling to use `next/script` for initialization scripts.
- Synced docs with current content contract:
  - Event folder structure includes `book-ids.json`.
  - Content model event file contracts include `book-ids.json`.

## 2026-04-29

### Completed

- Refactored resources to normalized shared model:
  - events reference resources via `resource-ids.json`
  - shared resource records live under `content/resources/<resource-id>/meta.<locale>.json`
- Migrated existing event resource entries (including full 1971 resource set) to shared resources.
- Added content accessor support for shared resources:
  - `getResource`
  - `getEventsByResourceId`
- Updated `getEventContent` to resolve resources by IDs (strict normalized model).
- Synced documentation with current UI and implementation.
- Updated docs to reflect normalized shared resource model.
- Documented event full-figures route: `/{locale}/events/{slug}/figures`.
- Documented event resources categories route: `/{locale}/events/{slug}/resources`.
- Documented timeline progressive loading (`Show more` / `আরও দেখুন`).
- Documented timeline type badge support.
- Documented figure index optimization (`content/figures/index.en.json`, `index.bn.json`).

## 2026-04-28

### Completed

- Implemented light/dark theme support with persistent preference.
- Added early theme initialization in root layout to avoid first-paint mismatch.
- Replaced text-based theme toggle with color-based indicator toggle in header.
- Added timeline `Details` action per event on locale home page.
- Removed separate event card grid from locale home page.
- Refactored content model to normalized relationships:
  - events reference figures via `figure-ids.json`
  - events reference books via `book-ids.json`
- Added dedicated figure detail routes:
  - `/{locale}/figures/{id}`
- Added dedicated book detail routes:
  - `/{locale}/books/{id}`
- Added reverse-lookup content queries:
  - `getEventsByFigureId`
  - `getEventsByBookId`
- Added event-specific figure list route:
  - `/{locale}/events/{slug}/figures`
- Added event-specific categorized resources route:
  - `/{locale}/events/{slug}/resources`
- Added event page top-5 figures + `See full list` flow.
- Added resources by category + subcategory structure (`Read`, `Watch`, `Explore`, `Understand`).
- Added pagination for large figure lists.
- Moved and organized documentation into `docs/` and `docs/archive/`.

### Technical notes

- `src/lib/content.ts` remains the single content access layer.
- Runtime now uses `resource-ids.json` + shared `content/resources/*` for event resources.
- Legacy per-event `figures.<locale>.json` files are removed and unused.
