# Source Quality Rubric

This rubric supports RM-002 and RM-TRUTH-003 by standardizing `quality` values in `content/resources/*/meta.<locale>.json`, with explicit primary-vs-secondary distinction rules.

Allowed values:

- `primary`
- `secondary`
- `archive`
- `editorial`

## Definitions

- `primary`: Original or first-hand material (official records, direct testimony, first-party datasets/documents).
- `secondary`: Analytical or interpretive works based on primary materials (reference entries, research books, scholarly explainers).
- `archive`: Curated repositories of historical records, collections, or document/photo archives.
- `editorial`: Opinionated or narrative-focused material (films, dramatized works, essays/op-eds, non-scholarly commentary).

## Primary vs Secondary Distinction (RM-TRUTH-003)

Use these tests in order:

1. Origin test: If the source is created by a direct participant, institution of record, or contemporaneous recorder, classify as `primary`.
2. Processing test: If the source mainly interprets, compares, summarizes, or explains other sources, classify as `secondary`.
3. Proximity test: Temporal closeness alone does not make a source `primary`; the source must still be first-hand or a record of first-hand evidence.
4. Reproduction test: A modern reprint or digital copy of an original document remains `primary` if it preserves the original record materially.
5. Commentary boundary: If analysis dominates over record-preservation, use `secondary` even when primary excerpts are quoted.

Quick examples:

- Government gazette, court record, treaty text, census sheet, contemporary telegram -> `primary`
- Encyclopedia entry, historian monograph chapter, survey article, classroom explainer -> `secondary`

## Assignment Rules

1. Prefer `primary` when a source directly records the event/person/context.
2. Use `secondary` for research or reference synthesis.
3. Use `archive` for collection/index repositories and archival portals.
4. Use `editorial` when persuasive framing or storytelling dominates over documentation.
5. If uncertain between `secondary` and `editorial`, default to `secondary` only when evidence method is explicit.

## Notes

- A source-quality badge indicates evidence class, not truthfulness.
- Quality tags should be reviewed editorially for high-impact events.
- `pnpm run content:validate` enforces required `quality` presence and allowed enum values.
