# SEO Trends and Opportunity Scoring Workflow

This workflow is intentionally static-data-first. It does not scrape Google Trends or add a backend.

## Inputs

### Search Console CSV

Required columns:

`date_start,date_end,dimension_type,query,page,country,device,clicks,impressions,ctr,position`

`dimension_type` is `query`, `page`, or `query_page`.

### Google Trends CSV

Required columns:

`keyword,market,locale,period_start,period_end,interest_index,source_exported_at,category`

`interest_index` is a relative 0–100 Trends value, not an absolute search volume. Keep Bangladesh and India as separate markets. Store Bengali script, English, and transliteration variants as separate keyword rows.

### Content inventory

Use the repository's JSON content as the source of truth for IDs, titles, locales, relationships, source IDs, stubs, and existing SEO fields. Do not create a new content model field for keyword research.

## Normalization

Normalize each metric within its comparable market and time window:

```text
normalized(value) = (value - min) / (max - min)
```

If `max == min`, use `0.5` and record the degenerate range. For CTR opportunity, invert normalized CTR; for ranking feasibility, give the highest score to positions 5–20 and lower scores outside that band.

## Score

```text
opportunity_score =
  0.35 * search_console_opportunity +
  0.25 * trends_interest +
  0.20 * historical_relevance +
  0.10 * ranking_feasibility +
  0.10 * seasonal_timing
```

Recommended component definitions:

- Search Console opportunity: impressions × normalized CTR gap, adjusted for position.
- Trends interest: normalized relative interest for the matching market and language variant.
- Historical relevance: editorial score based on Bengal Unfolded scope, source availability, and importance; never a proxy for popularity alone.
- Ranking feasibility: a conservative score for existing pages ranking 5–20 or topic clusters with strong internal relationships.
- Seasonal timing: a documented anniversary or recurring interest window; use `0.5` when no evidence exists.

## Decision rules

1. Match a keyword to an existing page before proposing a new page.
2. Prefer updating an existing page when intent and entity match.
3. Propose a new page only when no suitable canonical page exists and sources are available.
4. Preserve EN/BN variants and record whether the keyword is script, translation, or transliteration.
5. Never let a high score override source quality, uncertainty labels, or sensitive-history rules.
6. Keep score, evidence, assumptions, and missing inputs in the report output.

## Repeatable run

1. Export GSC query/page tables.
2. Export Trends CSVs for Bangladesh and India without scraping.
3. Validate column headers and date ranges.
4. Join keywords to existing titles, aliases, event slugs, figure IDs, topics, and glossary terms.
5. Calculate scores and produce a ranked CSV.
6. Have an editor review historical relevance and source sufficiency.
7. Update one major snippet variable at a time.
8. Recheck after 21–28 days and retain the result, including failures.
