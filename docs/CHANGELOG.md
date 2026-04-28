# Changelog

## 2026-04-29

### Completed
- Synced documentation with current UI and implementation.
- Updated docs to reflect active event resources model (`resources.<locale>.json`).
- Documented event full-heroes route: `/{locale}/events/{slug}/heroes`.
- Documented event resources categories route: `/{locale}/events/{slug}/resources`.
- Documented timeline progressive loading (`Show more` / `আরও দেখুন`).
- Documented timeline type badge support.
- Documented hero index optimization (`content/heroes/index.en.json`, `index.bn.json`).

## 2026-04-28

### Completed
- Implemented light/dark theme support with persistent preference.
- Added early theme initialization in root layout to avoid first-paint mismatch.
- Replaced text-based theme toggle with color-based indicator toggle in header.
- Added timeline `Details` action per event on locale home page.
- Removed separate event card grid from locale home page.
- Refactored content model to normalized relationships:
  - events reference heroes via `hero-ids.json`
  - events reference books via `book-ids.json`
- Added dedicated hero detail routes:
  - `/{locale}/heroes/{id}`
- Added dedicated book detail routes:
  - `/{locale}/books/{id}`
- Added reverse-lookup content queries:
  - `getEventsByHeroId`
  - `getEventsByBookId`
- Added event-specific hero list route:
  - `/{locale}/events/{slug}/heroes`
- Added event-specific categorized resources route:
  - `/{locale}/events/{slug}/resources`
- Added event page top-5 heroes + `See full list` flow.
- Added resources by category + subcategory structure (`Read`, `Watch`, `Explore`, `Understand`).
- Added pagination for large hero lists.
- Moved and organized documentation into `docs/` and `docs/archive/`.

### Technical notes
- `src/lib/content.ts` remains the single content access layer.
- Runtime now uses `resources.<locale>.json` for event resources.
- Legacy per-event `heroes.<locale>.json` files are removed and unused.
