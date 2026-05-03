# Changelog

## 2026-05-04

### Completed
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
  - Performed manual QA refinement for key events (`1757`, `1906`, `2024`) to improve claim-to-source pairing quality.
- Roadmap synchronization:
  - Marked RM-006B as complete.
  - Marked RM-001 as complete with full-coverage note.

## 2026-05-03

### Completed
- Added full timeline explorer route:
  - `/{locale}/timeline`
  - Includes search, year filter, and pagination.
- Added homepage CTA to open full timeline explorer.
- Added localized timeline explorer entries to sitemap.
- Expanded timeline citations rollout to all events:
  - Added `sourceIds` across timeline entries for `1757`, `1857`, `1947`, `1969`, `1971`, `1990`, and `2024` (EN/BN).
- Tightened content validation rules (`pnpm content:validate`):
  - Every timeline item must include non-empty `sourceIds`.
  - Every `sourceId` must exist in both global resources and the event-level `resource-ids.json`.
- Added optional timeline citations support:
  - `TimelineItem.sourceIds` in content type model.
  - Event timeline UI now renders source chips/links when `sourceIds` exist.
  - Event page now passes shared resources to timeline for source label resolution.
- Seeded citations for 1952 timeline entries in both locales:
  - `content/events/1952/timeline.en.json`
  - `content/events/1952/timeline.bn.json`
- Added new event content chapters:
  - `1757` (Battle of Plassey / পলাশীর যুদ্ধ)
  - `1857` (Sipahi Revolt / সিপাহী বিদ্রোহ)
  - `1969` (Mass Uprising / গণঅভ্যুত্থান)
- Updated supported event slug registry in `src/types/content.ts`.
- Expanded figure dataset with new chapter-specific profiles and localization:
  - Added Plassey-related figure profiles for `1757`.
  - Added 40 figure profiles for `1857` (EN/BN metadata).
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
