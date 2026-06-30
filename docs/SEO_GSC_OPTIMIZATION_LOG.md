# Search Console Optimization Log

This log tracks Search Console-driven SEO work for Bengal Unfolded. It is for weekly title, description, content-depth, internal-link, and indexing actions based on Google Search Console Performance exports.

Source baseline for the first cycle: user-provided Google Search Console Performance export for `bengalunfolded.com`, Web search, Apr 29-Jun 27, 2026.

## Weekly Workflow

1. Export GSC Performance data for Web search.
2. Filter for pages or queries with:
   - impressions >= 100,
   - average position 4-12,
   - CTR below 0.50% for EN or below 1.00% for BN,
   - clear historical intent that matches Bengal Unfolded content.
3. For each selected URL, record:
   - current title and meta description state,
   - dominant query intent,
   - likely CTR issue,
   - planned action,
   - deployment date,
   - recheck date after at least 21-28 days.
4. Change one major snippet variable at a time when possible:
   - title first,
   - then meta description,
   - then intro/FAQ/internal links.
5. After deployment:
   - submit URL inspection or request indexing for high-priority pages,
   - compare the next 28-day window against the previous 28-day window,
   - keep the result even when the change underperforms.

## Metrics To Record

| Field | Meaning |
| --- | --- |
| Date logged | Date the opportunity was added here |
| Locale | `en` or `bn` |
| URL | Canonical site path |
| Query/topic | Query or topic cluster from GSC |
| Baseline impressions | GSC impressions for the measured range |
| Baseline clicks | GSC clicks for the measured range |
| Baseline CTR | GSC CTR for the measured range |
| Baseline position | GSC average position for the measured range |
| Diagnosis | Why the page may be under-clicked |
| Action | Specific change planned or made |
| Status | `queued`, `changed`, `deployed`, `recheck`, `closed` |
| Recheck date | Earliest date to compare a fresh 21-28 day window |
| Result | Follow-up outcome |

## Site Baseline

| Metric | Value |
| --- | ---: |
| Clicks | 87 |
| Impressions | 28,710 |
| Average CTR | 0.30% |
| Average position | 11.43 |
| Date range | Apr 29-Jun 27, 2026 |

## First Optimization Batch

Logged: 2026-06-30

| Priority | Locale | URL | Query/topic | Baseline | Diagnosis | Action | Status | Recheck date |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | en/bn | `/en/figures/mirza-khizr-sultan`, `/bn/figures/mirza-khizr-sultan` | Mirza Khizr Sultan | 2,584 impressions, 0 clicks, avg position 10.13 | High visibility with no clicks. EN/BN already have custom `seoTitle` and `seoDescription`, so next work should test stronger above-fold answer and internal links rather than treating this as missing metadata. | Audit GSC queries, compare SERP competitors, strengthen first-screen answer, add/support FAQ only if visible on page, and add links from 1857-related event/topic pages. | queued | 2026-07-28 |
| 2 | en/bn | `/en/figures/mirza-abu-bakr`, `/bn/figures/mirza-abu-bakr` | Mirza Abu Bakr | 253 impressions, 0 clicks, avg position 7.61 | Ranking is good enough to earn clicks, but previous figure metadata lacked explicit `seoTitle`/`seoDescription`; fallback title may have been too generic. | Added localized `seoTitle` and `seoDescription` focused on 1857 Delhi resistance, Mughal prince context, rebel mobilization, and anti-colonial uprising. Internal-link work remains separate. | changed | 2026-07-28 |
| 3 | en/bn | `/en/figures/mir-madan`, `/bn/figures/mir-madan` | Mir Madan | 130 impressions, 0 clicks, avg position 5.95 | Strong ranking but likely weak SERP differentiation against broad Plassey results. Previous metadata lacked explicit `seoTitle`/`seoDescription`. | Added localized snippet fields emphasizing Plassey, Siraj ud-Daulah, artillery command, battlefield death, and impact on the Nawab's camp. Internal-link work remains separate. | changed | 2026-07-28 |
| 4 | en/bn | `/en/figures/shaista-khan`, `/bn/figures/shaista-khan` | Shaista Khan | 103 impressions, 0 clicks, avg position 9.02 | BN page already has custom snippet fields; EN state should be checked before changing. Query intent may want quick biography plus Chittagong/Mughal Bengal connection. | Audit EN metadata, keep BN/EN meaning aligned, strengthen internal links from Mughal Bengal and Chittagong pages. | queued | 2026-07-28 |
| 5 | bn | `/bn/events/1947-partition-and-eastern-bengal` | 1947 Partition and Eastern Bengal | 9 clicks, 599 impressions, avg position 7.95 | Strongest known BN event page; opportunity is expansion and hub routing rather than basic snippet repair. | Treat as anchor page: improve links into related partition, language movement, and Bangladesh-history topic hubs; do not over-edit a page that is already earning clicks without query-level evidence. | queued | 2026-07-28 |

## Open Checks

- Confirm whether FAQ content should be emitted as `FAQPage` JSON-LD. Event pages currently render FAQ-like entries when quote sources start with `FAQ`, but schema should only be added when the FAQ is visibly present and editorially valid.
- Compare English and Bangla CTR by URL, not only by locale aggregate, before prioritizing translation work.
- Segment United States impressions by query before labeling the traffic irrelevant.
- Track homepage or non-locale paths separately, because the provided locale click totals do not exactly equal the total click count.

## Change History

| Date | Change |
| --- | --- |
| 2026-06-30 | Added explicit EN/BN figure `seoTitle` and `seoDescription` fields for Mirza Abu Bakr and Mir Madan; marked both first-batch rows as `changed`. |
| 2026-06-30 | Created weekly GSC optimization workflow and logged the first five opportunities from the Apr 29-Jun 27, 2026 Search Console export. |
