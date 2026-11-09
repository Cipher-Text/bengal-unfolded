# Bengal Unfolded SEO Repository Audit

Audit date: 2026-11-09 (Asia/Dhaka)

## Executive summary

Bengal Unfolded is a static-first Next.js 16.2.4 App Router site. It exports directory-style HTML with `trailingSlash: true`, stores bilingual historical content as JSON, and generates metadata, sitemap, robots, Open Graph images, and JSON-LD at build time.

The technical foundation is substantially in place. The main growth constraint is not an identified indexing defect; it is search-result click conversion and the depth/uniqueness of some historical chapters. The repository contains no raw Search Console or Google Trends export, so query-level and country-level conclusions must remain limited to the supplied baselines and the maintained optimization log.

## Architecture discovered

| Area | Finding | Evidence |
| --- | --- | --- |
| Framework | Next.js 16.2.4, React 19.2.4, TypeScript, Tailwind/PostCSS | `package.json` |
| Routing | App Router with locale segment `/{locale}` | `src/app/[locale]/**` |
| Rendering | Static export with directory URLs | `next.config.ts` |
| Locales | English and Bangla: `en`, `bn` | `src/types/content.ts`, `src/app/[locale]/layout.tsx` |
| Content | JSON directories for events, figures, periods, movements, places, topics, resources, glossary, site content | `content/**`, `src/lib/content.ts` |
| SEO helper | Shared canonical, language alternate, OG, Twitter, description handling | `src/lib/seo.ts` |
| Discovery | Generated sitemap and robots metadata routes | `src/app/sitemap.ts`, `src/app/robots.ts` |
| Measurement | GA4 and Microsoft Clarity scripts with environment-variable fallbacks | `src/app/layout.tsx` |
| CI | Content validation, figure audit, lint, TypeScript, build, static verification, build-size reporting, Playwright | `.github/workflows/ci.yml` |

## Corpus inventory

| Entity | Count | Locale parity | Notes |
| --- | ---: | --- | --- |
| Events | 168 | Complete | 24 explicitly marked `stub` |
| Figures/organisations | 552 | Complete | 156 lack an image asset; 24 have no event relationship |
| Periods | 9 | Complete | Era navigation and period pages are present |
| Movements | 5 | Complete | Movement detail routes are present |
| Places | 60 | Complete | Place index/detail routes are present |
| Topics | 17 | Complete | Learning paths are derived from topic data |
| Resources | 580 | Complete | 215 have no outbound `href`; 12 lack `whyItMatters` |
| Glossary terms | 34 | Complete | Detail routes are present |

Relationship totals from the repository are 1,025 event-to-figure references and 1,071 event-to-resource references. The content validator reports valid relationships and 168 valid events.

## SEO strengths

- Canonical origin is centralized as `https://bengalunfolded.com`.
- Locale pages emit canonical URLs plus `en-US`, `bn-BD`, and `x-default` alternates through `buildPageMetadata`.
- Root, event, figure, topic, place, period, movement, resource, creator, and utility routes have dynamic metadata functions.
- Event pages emit article/event/breadcrumb structured data; figure pages emit Person and BreadcrumbList structured data; several entity routes emit type-specific JSON-LD.
- The static verifier checks canonical URLs, alternates, OG image markers, sitemap coverage, robots, internal links, assets, and generated social images.
- The site renders substantial server HTML for static pages; filtering is kept in small client islands.
- Existing internal linking is relationship-driven: events connect to figures/resources/related events/topics, and figure pages connect back to events/resources/places/topics.
- The editorial contract requires source IDs, evidence levels, locale parity, and cautious treatment of sensitive history.

## Confirmed issues and opportunities

| Severity | Evidence | SEO impact | Proposed correction | Verification |
| --- | --- | --- | --- | --- |
| High opportunity | Supplied baseline: 428 clicks, 136,147 impressions, CTR about 0.31%, average position 7.61; high-impression queries include Mirza Mughal, Mirza Khizr Sultan, Alivardi Khan, Duar War, Mir Madan, Kalpana Datta, Raja Ganesha, Azimullah Khan, Rai Durlabh, Sannyasi Rebellion | Pages are visible but under-clicked | Re-test titles, descriptions, answer-first introductions, and related links using fresh URL/query GSC exports | Compare 28-day windows by URL and query; do not infer causality from aggregate totals |
| High content risk | 24 events have `stub: true` | Thin or templated chapters may rank weakly and reduce trust | Research and backfill in EN/BN with sources before promoting them as complete | `pnpm content:validate`; editorial review |
| Medium opportunity | 159 events lack custom `seoTitle`/`seoDescription`, although runtime fallbacks exist | Fallback snippets may be less differentiated for search intent | Prioritize only pages supported by GSC evidence; avoid mass metadata edits | Static HTML metadata inspection plus GSC recheck |
| Medium content opportunity | 215 of 580 resources have no outbound link | Weak source utility and lower trust/reader continuation | Add links only when source records are verified; do not invent URLs | Resource audit and link validation |
| Medium discoverability opportunity | 24 figure records have no event relationship | Potential orphan profiles and weak topical context | Either connect them to a documented event or keep them out of promoted discovery surfaces | Relationship validator and orphan report |
| Low operational issue | Local `node_modules` lacks declared `@playwright/test`; build/type checks also see stale `.next/dev/types` | Local CI reproduction is blocked | Reinstall with the frozen lockfile and clear generated build output before validation | `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm exec tsc --noEmit` |

No URL migration is recommended from repository evidence alone. The configured policy is trailing-slash directory URLs; a live redirect/canonical comparison needs a reachable production response or Search Console URL export.

## Analytics and external-input gaps

- No raw GSC CSV, API export, country breakdown, query/page table, or URL inspection export is present in the repository.
- The maintained log contains historical aggregate baselines and selected opportunities, but not row-level data for the supplied August 8–November 7 baseline.
- No Google Trends export is present.
- GA4 and Clarity IDs are embedded through environment-variable fallbacks, but no analytics export is present for analysis.
- The live site was reachable through indexed page content, but this environment could not directly fetch `robots.txt`, `sitemap.xml`, or compare slash variants; production verification remains required.

## Scope decision

This audit does not mass-edit historical text, add unsupported citations, or create duplicate pages. The recommended next work is evidence-led snippet testing and source-backed completion of stubs, followed by a fresh static build once the local dependency state is repaired.
