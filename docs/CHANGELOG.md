# Changelog

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
- Moved documentation to `docs/` folder.

### Technical notes
- `src/lib/content.ts` is now the single content access layer for all entity types.
- Legacy per-event files `heroes.<locale>.json` and `resources.<locale>.json` are retained but no longer used by runtime loaders.
