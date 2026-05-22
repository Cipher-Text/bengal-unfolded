# Editorial Rules

These rules keep writing quality and historical framing consistent across human and AI contributors.

## Voice and tone

- Neutral, evidence-first, non-propagandistic writing.
- Avoid absolute claims unless strongly sourced.
- Prefer precise time/place/actor references over vague statements.

## Claim and source policy

- Historical claims should include supporting `sourceIds`.
- Interpretive statements should be clearly signposted as interpretation/context.
- Sensitive or potentially contested claims must use high-quality sources where available.
- Do not label a source as `primary` unless it is first-hand or an institutional record; analysis/synthesis sources are `secondary` (see `docs/SOURCE_QUALITY.md`).

## Sensitive history policy

- Avoid inflammatory framing.
- Distinguish:
  - verified fact
  - contested interpretation
  - editorial context
- When disagreement exists in sources, summarize disagreement instead of choosing rhetoric.
- For chapters with high violence/trauma/political-risk context, set event metadata:
  - `sensitive: true`
  - `contentWarnings: string[]` (localized, specific, non-empty)
  - `requiresSources: true` so summary and why-it-matters claims remain citation-backed.

## Localization policy (EN/BN)

- Preserve meaning across locales; avoid adding new factual claims in only one locale.
- Keep proper nouns and year/date references aligned.
- If one locale is updated for factual content, update the other locale in the same change set.

## Figure page enrichment policy

For enriched figure pages (timeline, legacy, affiliations):

- prefer structured fields over long unstructured prose
- include event links (`eventId`) for timeline claims
- include citations for impact/legacy claims
- keep role descriptions specific to event context and year range

## Prohibited shortcuts

- No unsourced factual additions.
- No schema additions without validator and contract updates.
- No roadmap completion marking without actual implementation.
