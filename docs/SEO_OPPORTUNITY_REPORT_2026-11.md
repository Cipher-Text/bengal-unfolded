# SEO Opportunity Report

Audit date: 2026-11-09. This report uses the user-supplied August 8–November 7, 2026 baseline and the repository's maintained Search Console log. It is not a replacement for a row-level export.

## Baseline

| Metric | Value |
| --- | ---: |
| Clicks | 428 |
| Impressions | 136,147 |
| Average CTR | approximately 0.31% |
| Average position | 7.61 |
| Available country split | Not supplied |
| Available locale split | Not supplied |

The site is already earning first-page visibility on average. The strongest defensible conclusion is a click-conversion problem, not a proven sitewide indexing failure.

## Prioritized opportunities

| Priority | Query/page theme | Evidence | Recommended action |
| ---: | --- | --- | --- |
| 1 | Mirza Mughal, Mirza Khizr Sultan, Mirza Abu Bakr | Previously logged as high-impression, zero-click figure pages; content and snippets were rewritten in the existing log | Re-export URL/query data after the changes; compare impressions, CTR, position, and query mix before another edit |
| 2 | Alivardi Khan, Mir Madan, Raja Ganesha, Rai Durlabh | Supplied high-impression query list | Inspect the exact landing URLs and dominant query wording; improve only the pages with position 5–20 and weak CTR |
| 3 | Duar War and Sannyasi Rebellion | Supplied high-impression query list; event corpus contains both topics | Make the event title and first paragraph answer the named query directly, then link to figures, places, and source records |
| 4 | Kalpana Datta and other named figures | Supplied high-impression query list; figure directory contains large profile corpus | Test biography intent wording, role/context differentiation, and related-event links in both locales |
| 5 | Bangla partition and language history | Existing log identifies `/bn/events/1947-partition-and-eastern-bengal` as a comparatively successful anchor | Use as a hub page for related partition, Sylhet, Radcliffe, language, migration, and identity chapters |

## Required GSC export

Export two tables for the same date window:

1. Search results by query: query, clicks, impressions, CTR, average position, country, device, search appearance.
2. Search results by page: page, clicks, impressions, CTR, average position, country, device.

Use filters for:

- average position 5–20;
- impressions at least 100;
- CTR below the site median or below 1% for Bangla pages and 0.5% for English pages as an initial testing threshold;
- page path containing `/en/` or `/bn/`;
- query/page combinations with clear historical intent.

Do not compare locale aggregates until page-level and country-level data are available.

## Country and URL-variant checks

The repository cannot establish India versus Bangladesh behavior because no country dimension is present. Segment by country before deciding whether transliteration, Bangla script, or English wording should change.

For each top page, inspect:

- slash and non-slash URL;
- canonical URL in HTML;
- redirect status and final URL;
- `en-US`, `bn-BD`, and `x-default` alternates;
- sitemap inclusion.

Do not change routing until those checks show a real duplicate URL problem.
