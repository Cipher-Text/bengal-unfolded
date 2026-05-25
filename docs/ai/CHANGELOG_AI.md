# AI Docs Changelog

## 2026-05-26

Changed docs:
- `docs/ai/PROJECT_CONTEXT.md` (refreshed verification date and current content inventory counts)
- `docs/ai/ARCHITECTURE.md` (refreshed verification date and added missing locale route entries)
- `docs/ai/API_MAP.md` (refreshed verification date; added topic/place accessors and route mappings)
- `docs/ai/DECISIONS.md` (refreshed verification date)
- `docs/ai/CHANGELOG_AI.md` (this entry)

Important project changes/state discovered:
- AI docs were stale relative to current content inventory (`events`, `figures`, `resources`, `topics`, `places`).
- AI API map was missing topic/place functions and sitemap topic-slug dependency.

## 2026-05-08

Changed docs:
- `docs/ai/PROJECT_CONTEXT.md` (new)
- `docs/ai/ARCHITECTURE.md` (new)
- `docs/ai/COMMANDS.md` (new)
- `docs/ai/API_MAP.md` (new)
- `docs/ai/DECISIONS.md` (new)
- `docs/ai/CHANGELOG_AI.md` (new)

Important project changes/state discovered:
- `docs/ai/` documentation set was missing and has now been created from current code.
- Routing is locale-first and root now redirects to `/bn`.
- App includes period and movement detail routes plus glossary and creator/resource graph pages.
- Content runtime is fully filesystem-based (`content/`) with no DB/migration layer.
- Validator enforces event/resource/period/movement/glossary integrity, evidence metadata, and relationship constraints.
- No Docker/deployment manifest files found in repository root.

Unknown items needing human confirmation:
- Confirm intended default locale is Bangla (`/bn`) for production and docs.
- Confirm whether image-asset existence checks should be added to the validator (currently only documented in contracts/model docs, not enforced in script).
