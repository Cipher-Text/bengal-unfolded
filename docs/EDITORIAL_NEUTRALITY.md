# Editorial Neutrality Guideline

This guideline defines how Bengal Unfolded presents politically sensitive and contested history without advocacy framing.

## Purpose

- Preserve reader trust through evidence-first writing.
- Separate verifiable facts from interpretation.
- Reduce wording bias across EN/BN content.

## Neutrality Rules

1. Fact first:
- Write observable facts before interpretation.
- Prefer concrete actor, date, place, and action statements.

2. Attribution required:
- Attribute interpretive claims to identifiable sources or historians.
- Do not present contested interpretation as settled fact.

3. Loaded-language control:
- Avoid praise/condemnation adjectives unless in attributed quotation.
- Avoid rhetorical framing that implies moral certainty without citation.

4. Balance in contested sections:
- If credible sources disagree, summarize major viewpoints.
- Represent disagreement proportionally to source quality and evidentiary basis.

5. Scope discipline:
- Keep summary paragraphs descriptive, not argumentative.
- Move analysis framing to clearly labeled context sections when needed.

6. EN/BN parity:
- Do not introduce stronger political claims in only one locale.
- Maintain equivalent factual meaning and uncertainty level across locales.

## Required Handling for Sensitive or Contested Events

For events with violence, political trauma, or major historiographical disagreement:

- Set `sensitive: true`.
- Set `requiresSources: true`.
- Use `contested: true` when disagreement is material.
- Provide non-empty `historicalDebate` and `historicalDebateSourceIds` when `contested: true`.
- Keep `contentWarnings` specific and non-inflammatory.

## Prohibited Patterns

- Unsourced certainty language for disputed claims.
- One-sided characterization when multiple credible interpretations exist.
- Editorial verdict wording in event summaries.
- Locale drift where EN and BN imply different factual conclusions.

## QA Checklist (Pre-merge)

- Claims in `summary` and `whyItMatters` are citation-backed when required.
- Contested markers and debate fields are present where applicable.
- Wording avoids loaded terms unless quoted and attributed.
- EN/BN carry equivalent factual meaning.
- Source-quality tags (`primary`, `secondary`, `archive`, `editorial`) are consistent with `docs/SOURCE_QUALITY.md`.
