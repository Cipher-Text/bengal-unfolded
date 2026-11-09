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

## Attached export findings

The supplied files contain 1,000 query rows, 1,000 page rows, and zero search-appearance data rows. The query and page files are therefore top-row reports, not complete site totals. The page rows sum to 430 clicks and 132,891 impressions, close to but not identical with the supplied site baseline. The query rows sum to only 65 clicks and 95,039 impressions and must not be used as site totals.

### Confirmed URL-variant problem

After normalizing paths by removing a final slash, 131 URL groups in `Pages.csv` contain both slash and non-slash forms. Non-slash rows account for 108,140 impressions and 383 clicks in the export. This is strong evidence that both URL forms were discoverable in Google during the export window. A live browser check on 2026-11-09 shows current production behavior redirects the non-slash form to the slash form before rendering the page, so the export does not prove that duplicate HTML is currently being served.

The largest split is:

| Normalized URL | Combined impressions | Combined clicks | Observation |
| --- | ---: | ---: | --- |
| `/en/figures/mirza-mughal` | 64,165 | 7 | 47,664 non-slash + 16,501 slash impressions |
| `/en/figures/mirza-khizr-sultan` | 11,798 | 3 | 10,619 non-slash + 1,179 slash impressions |
| `/en/figures/khan-bahadur-khan-rohilla` | 1,866 | 0 | Both forms rank around positions 7–9 |
| `/en/figures/mir-madan` | 1,465 | 4 | Both forms are present |
| `/bn/events/1947-partition-and-eastern-bengal` | 721 | 14 | Main traffic is non-slash, but slash form is also visible |

Live verification for `/bn/events/1947-partition-and-eastern-bengal` and `/en/figures/mirza-mughal` confirmed:

- non-slash URL resolves to the slash URL;
- canonical points to the slash URL;
- `en-US`, `bn-BD`, and `x-default` alternates point to slash URLs.

Recommended order:

1. Keep canonical, sitemap, internal links, and Open Graph URLs on the slash form.
2. Confirm the redirect status code at the edge/server layer, not only the browser's final URL.
3. Recheck Search Console after the current redirect has been live long enough for recrawling.

No routing change is recommended from this export alone because current browser behavior already consolidates the tested variants.

### Highest CTR opportunities from the page export

| Page | Clicks | Impressions | CTR | Position | Action |
| --- | ---: | ---: | ---: | ---: | --- |
| `/en/figures/mirza-mughal` plus slash variant | 7 | 64,165 | approximately 0.01% | 3.59–6.42 | Resolve URL split first, then re-test snippet and query intent |
| `/en/figures/mirza-khizr-sultan` plus slash variant | 3 | 11,798 | approximately 0.03% | 5.16–5.40 | Resolve URL split, then inspect title/query mismatch |
| `/en/figures/alivardi-khan` | 1 | 2,711 | 0.04% | 10.71 | Improve answer-first title/description after URL check |
| `/en/figures/khan-bahadur-khan-rohilla` plus slash variant | 0 | 1,866 | 0.00% | 7.10–9.22 | Verify page intent, title, and source-backed profile distinction |
| `/en/figures/mir-madan` plus slash variant | 4 | 1,465 | approximately 0.28% | 6.38–12.36 | Consolidate URLs, then test Plassey-specific snippet |
| `/en/resources/duar-war-reference/` | 0 | 839 | 0.00% | 9.97 | Review whether users expect an event page rather than a source record |
| `/en/figures/azimullah-khan` | 0 | 668 | 0.00% | 9.52 | Add clear role/context promise if supported by sources |
| `/en/figures/kalpana-datta` | 0 | 572 | 0.00% | 9.03 | Improve profile differentiation and event links |

The query export reinforces these priorities: `mirza mughal` has 64,458 impressions at position 5.69 with 0.01% CTR; `mirza khizr sultan` has 10,057 impressions at position 5.16 with 0.01% CTR; `duar war` has 1,899 impressions at position 9.96 with zero clicks; and `alivardi khan` has 2,585 impressions at position 10.50 with 0.04% CTR.

## Prioritized opportunities

| Priority | Query/page theme | Evidence | Recommended action |
| ---: | --- | --- | --- |
| 1 | Mirza Mughal, Mirza Khizr Sultan, Mirza Abu Bakr | Previously logged as high-impression, zero-click figure pages; content and snippets were rewritten in the existing log | Re-export URL/query data after the changes; compare impressions, CTR, position, and query mix before another edit |
| 2 | Alivardi Khan, Mir Madan, Raja Ganesha, Rai Durlabh | Supplied high-impression query list | Inspect the exact landing URLs and dominant query wording; improve only the pages with position 5–20 and weak CTR |
| 3 | Duar War and Sannyasi Rebellion | Supplied high-impression query list; event corpus contains both topics | Make the event title and first paragraph answer the named query directly, then link to figures, places, and source records |
| 4 | Kalpana Datta and other named figures | Supplied high-impression query list; figure directory contains large profile corpus | Test biography intent wording, role/context differentiation, and related-event links in both locales |
| 5 | Bangla partition and language history | Existing log identifies `/bn/events/1947-partition-and-eastern-bengal` as a comparatively successful anchor | Use as a hub page for related partition, Sylhet, Radcliffe, language, migration, and identity chapters |

## Required GSC export

The attached export is sufficient for an initial opportunity ranking, but a second export with country, device, and query-page dimensions is still required for localization decisions and causal testing.

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

Do not change routing unless a direct status check shows the non-slash form returns a successful HTML response instead of a permanent redirect.
