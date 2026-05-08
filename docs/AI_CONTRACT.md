# AI Integration Contract

This document is the canonical integration contract for any AI/code agent changing content model, content data, validators, and UI bindings.

## Scope

Applies to:

- Codex
- Claude
- Gemini
- OpenCode
- any other automation agent

## Source of truth

The canonical implementation must stay consistent across:

- `src/types/content.ts` (TypeScript model)
- `scripts/validate-content.mjs` (enforcement)
- `content/**` (data)
- `docs/CONTENT_MODEL.md` (human-readable model)

## Change protocol

For every schema or field change:

1. Update `src/types/content.ts`.
2. Update `scripts/validate-content.mjs` with hard checks.
3. Backfill required content values in `content/**`.
4. Update docs (`docs/CONTENT_MODEL.md` and this file if contract changed).
5. Add changelog entry in `docs/CHANGELOG.md` with:
   - Model changes
   - Validation changes
   - UI changes
   - Backfill status
   - Risk/known gaps
6. Run `pnpm content:validate` (required).

## Contract rules

- IDs must reference existing entities.
- Arrays must not contain duplicates where relationship uniqueness is required.
- Enum-like fields must only use allowed values.
- If a claim has citations, its evidence-level metadata is required.
- EN/BN parity is required for required locale files.
- Figure `image` paths in `content/figures/*/meta.<locale>.json` must point to existing files in `public/figures/` (no broken references).
- Image cleanup (delete/rename/format swap such as `.jpeg` -> `.jpg`) must update figure metadata paths in both locales in the same change set.
- Topic metadata under `content/topics/*/meta.<locale>.json` must keep EN/BN parity and valid linked IDs (`eventSlugs`, `figureIds`, `resourceIds`).

## Event relationship contract

- `relatedEvents` shape: `{ eventId, relationType }[]`
- `eventId` must reference a valid event slug and must not self-reference.
- `relationType` allowed:
  - `cause`
  - `effect`
  - `background`
  - `parallel`
  - `legacy`
  - `contrast`
- duplicate pair (`relationType:eventId`) is invalid.

## Evidence contract

- Timeline items require:
  - `sourceIds` non-empty array
  - `evidenceLevel` in `high | medium | low`
  - `themes` non-empty array with allowed theme enums
- Event summary/why-it-matters:
  - if `summarySourceIds` exists and is non-empty, `summaryEvidenceLevel` is required
  - if `whyItMattersSourceIds` exists and is non-empty, `whyItMattersEvidenceLevel` is required
  - if `longTermLegacySourceIds` exists and is non-empty, `longTermLegacyEvidenceLevel` is required
  - if `culturalImpactSourceIds` exists and is non-empty, `culturalImpactEvidenceLevel` is required
  - if `requiresSources` is `true`, both `summarySourceIds` and `whyItMattersSourceIds` must be non-empty
  - if `importance` is `major`, `longTermLegacy` must be present and non-empty
  - if `importance` is `landmark`, `culturalImpact` must be present and non-empty

## Sensitive event contract

- `sensitive` must be boolean when provided.
- `requiresSources` must be boolean when provided.
- `contentWarnings` must be an array of non-empty localized strings when provided.

## Definition of done (AI-integrated feature)

A feature is done only when all are complete:

- model updated
- validator updated
- UI/runtime usage updated (if needed)
- content backfilled (if needed)
- docs updated
- roadmap status updated
- changelog entry added
- `pnpm content:validate` passes
