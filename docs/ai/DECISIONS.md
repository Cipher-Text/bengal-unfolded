# Decisions (AI)

Last verified: 2026-05-08

## Active architectural decisions

1. Filesystem content store (no DB/CMS)
- Decision: Keep source-of-truth content as JSON under `content/`.
- Evidence: `src/lib/content.ts` loads from filesystem; no DB adapters present.

2. Bilingual split by file (`meta.en.json` / `meta.bn.json`)
- Decision: Each entity stores locale variants as separate files.
- Evidence: event/figure/resource/period/movement/glossary structures.

3. Strong allow-lists for addressable IDs/slugs
- Decision: Route-valid IDs/slugs are controlled through exported constants in `src/types/content.ts`.
- Impact: New IDs generally require content files plus constant updates.

4. Server-first rendering with limited client interactivity
- Decision: Prefer Server Components; use client components only where interaction/state is needed.
- Current client components: `EventTimeline`, `ThemeToggle`.

5. Canonical locale posture
- Decision: Root redirects to Bangla (`/bn`) and metadata alternates set `x-default` to Bangla paths.
- Evidence: `src/app/page.tsx`, `src/lib/seo.ts`, `src/app/layout.tsx`.

6. Backward compatibility in loader normalization
- Decision: Keep normalization fallbacks for legacy fields (`author/creator/type`, optional `group`, etc.).
- Evidence: `normalizeEventResource`, `normalizeBook`, `normalizeFigure`.

## Validation decisions encoded in scripts

- Event relationships: strict relation-type enum + no self-reference + no duplicates.
- Timeline claims: enforce `sourceIds`, `evidenceLevel`, `themes`.
- Summary/why-it-matters evidence fields required when source arrays are present.
- Resource quality enum enforced when provided.
- Glossary related terms must reference existing glossary IDs.

## Known doc-level uncertainty requiring human confirmation

- Whether the default locale should remain `/bn` (current code) or switch to `/en` in future.
- Whether to add explicit image-file existence checks to `scripts/validate-content.mjs` (current validator does not enforce this).
