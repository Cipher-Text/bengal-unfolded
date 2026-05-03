# Source Quality Rubric

This rubric supports RM-002 by standardizing `quality` values in `content/resources/*/meta.<locale>.json`.

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

## Assignment Rules

1. Prefer `primary` when a source directly records the event/person/context.
2. Use `secondary` for research or reference synthesis.
3. Use `archive` for collection/index repositories and archival portals.
4. Use `editorial` when persuasive framing or storytelling dominates over documentation.
5. If uncertain between `secondary` and `editorial`, default to `secondary` only when evidence method is explicit.

## Notes

- A source-quality badge indicates evidence class, not truthfulness.
- Quality tags should be reviewed editorially for high-impact events.
- `pnpm run content:validate` enforces allowed values when `quality` is present.
