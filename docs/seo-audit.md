# SEO Audit and Fixes - Bengal Unfolded

Date: 2026-05-08
Canonical domain: `https://bengalunfolded.com`

## Status legend
- `[x]` Completed
- `[ ]` Pending
- `[~]` In progress / partial

## Status snapshot
- `[x]` Technical SEO baseline (metadata, canonical, sitemap, robots, OG, core JSON-LD, hreflang)
- `[~]` Content SEO growth system (Search Console loop, keyword clusters, topic hubs, FAQ program)
- `[ ]` URL architecture migration (`/events/{id}` -> semantic slugs with redirects)

## Scope checked
- Metadata (global and route-level)
- Canonical URLs
- `sitemap.xml`
- `robots.txt`
- Open Graph and Twitter cards
- JSON-LD schema
- `hreflang` alternates for bilingual routes
- Image alt-text posture
- H1 structure
- Internal links
- `www` to non-`www` canonical consistency
- Current route/content structure fit for SEO growth

## Current structure snapshot (for SEO planning)
- Locale-first routing: `/{locale}/...` (`bn`, `en`)
- Existing deep content routes:
  - `/{locale}/events/{slug}`
  - `/{locale}/events/{slug}/figures`
  - `/{locale}/events/{slug}/resources`
  - `/{locale}/figures/{id}`
  - `/{locale}/books/{id}`
  - `/{locale}/resources/{id}`
  - `/{locale}/movements/{id}`
  - `/{locale}/periods/{id}`
  - `/{locale}/glossary/{term}`
- Content model is folder-based in `content/` with bilingual JSON documents.
- `/topics/*` route family is now live with dynamic multi-topic hubs.

## Findings and fixes applied (technical SEO)

### 1) Metadata quality and consistency
- Added shared SEO helpers in `src/lib/seo.ts`.
- Standardized per-page metadata generation (title, description, canonical, alternates, OG, Twitter).
- Ensured bilingual alternates use locale tags (`en-US`, `bn-BD`) and `x-default` where appropriate.

Files updated:
- `src/lib/seo.ts`
- `src/app/layout.tsx`
- `src/app/[locale]/page.tsx`
- `src/app/[locale]/events/[slug]/page.tsx`
- `src/app/[locale]/figures/[id]/page.tsx`
- `src/app/[locale]/books/[id]/page.tsx`
- `src/app/[locale]/figures/page.tsx`
- `src/app/[locale]/events/[slug]/figures/page.tsx`
- `src/app/[locale]/events/[slug]/resources/page.tsx`

### 2) Canonical URL and domain strategy
- Confirmed metadata base and canonical references align to `https://bengalunfolded.com`.
- Added host-level redirect rule to enforce `www.bengalunfolded.com` -> `https://bengalunfolded.com`.

File updated:
- `next.config.ts`

### 3) Open Graph / Twitter cards
- Replaced placeholder social image usage with a dedicated default OG image.
- Added absolute OG image URL and consistent Twitter card metadata through helper.

Files added/updated:
- `public/og-default.svg`
- `src/lib/seo.ts`
- route metadata files listed above

### 4) JSON-LD structured data
- Added site-level `WebSite` JSON-LD.
- Added `WebPage` JSON-LD on locale homepage.
- Added `Event` JSON-LD for event pages.
- Added `Person` JSON-LD for figure detail pages.
- Added `Book` JSON-LD for book detail pages.

Files updated:
- `src/app/layout.tsx`
- `src/app/[locale]/page.tsx`
- `src/app/[locale]/events/[slug]/page.tsx`
- `src/app/[locale]/figures/[id]/page.tsx`
- `src/app/[locale]/books/[id]/page.tsx`

### 5) Sitemap and hreflang
- Added alternate-language mapping per URL entry in `sitemap.ts`.
- Kept all existing routes intact.

File updated:
- `src/app/sitemap.ts`

### 6) robots.txt
- Confirmed crawl allow and sitemap declaration.
- Normalized host value to canonical host form.

File updated:
- `src/app/robots.ts`

### 7) H1 structure
- Verified primary templates use a single page-level H1 via `HeroSection`.
- No H1 duplication introduced by this update.

### 8) Internal links
- Existing internal links between home/events/figures/resources/books are present and remain valid.
- Pagination URLs keep existing route patterns unchanged.

### 9) Image alt text posture
- No in-content `<img>`/`next/image` components are currently rendered in route templates.
- Added explicit semantic text in social image asset metadata and OG image alt in metadata.

## Verification run
- `pnpm build`: passed.
- `pnpm lint`: passed with one existing warning (`@next/next/no-page-custom-font` in `src/app/layout.tsx`), no errors.

## Additional fix done during verification
- Resolved a React lint error (`react-hooks/set-state-in-effect`) in `src/components/ThemeToggle.tsx` so lint no longer fails.

---

## Next SEO Priorities - Content, Keywords, and Growth

### Priority level
- Technical SEO foundation: Mostly complete
- Current focus: Keyword strategy, content hubs, search-intent pages, internal linking, and Search Console improvement loop

## 1) Search Console workflow (must add)

Bengal Unfolded should be monitored weekly in Google Search Console.

Track:
- Queries with high impressions but low CTR
- Pages with impressions but no clicks
- Pages ranking between positions 8–30
- Country/language performance
- Indexed vs not indexed pages

Weekly actions:
- Improve titles for pages with impressions but low CTR
- Add FAQ sections to pages receiving question-style queries
- Add internal links to pages with impressions but weak ranking
- Submit important updated URLs for re-indexing

Reference:
- Search Console provides query, page, click, impression, CTR, and average position performance data.

## 2) Keyword cluster strategy

Bengal Unfolded should not target isolated keywords. It should build connected topic clusters.

### Cluster A: Bangladesh History Timeline
Target keywords:
- বাংলাদেশের ইতিহাস
- বাংলাদেশের ইতিহাস টাইমলাইন
- Bangladesh history timeline
- history of Bangladesh
- Bangladesh history explained
- ancient Bengal history
- modern Bangladesh history

Current implemented hub pages:
- `/bn/topics/bangladesh-history`
- `/en/topics/bangladesh-history`

### Cluster B: Partition and Bengal Identity
Target keywords:
- বঙ্গভঙ্গ ১৯০৫
- বঙ্গভঙ্গ কেন হয়েছিল
- Partition of Bengal 1905
- 1947 partition of Bengal
- দেশভাগ ১৯৪৭
- বাংলা ভাগ কেন হলো
- Bengal partition explained

Recommended pages:
- `/bn/events/bengal-partition-1905`
- `/en/events/bengal-partition-1905`
- `/bn/events/bengal-partition-1947`
- `/en/events/bengal-partition-1947`
- `/bn/topics/partition-of-bengal-1905`
- `/en/topics/partition-of-bengal-1905`

### Cluster C: Language and Identity
Target keywords:
- ভাষা আন্দোলন
- ভাষা আন্দোলনের ইতিহাস
- ২১ ফেব্রুয়ারি ইতিহাস
- Language Movement 1952
- Bengali Language Movement
- why language movement happened
- language movement timeline

Recommended pages:
- `/bn/events/language-movement-1952`
- `/en/events/bengali-language-movement-1952`
- `/bn/topics/language-movement-and-mother-language-day`
- `/en/topics/language-movement-and-mother-language-day`

### Cluster D: Liberation War
Target keywords:
- মুক্তিযুদ্ধ ১৯৭১
- বাংলাদেশের মুক্তিযুদ্ধ
- মুক্তিযুদ্ধের ইতিহাস
- Liberation War of Bangladesh
- Bangladesh Liberation War timeline
- Operation Searchlight
- ৭ মার্চ ভাষণ
- ১৬ ডিসেম্বর ১৯৭১

Recommended pages:
- `/bn/topics/liberation-war-1971`
- `/en/topics/liberation-war-1971`
- `/bn/events/operation-searchlight-1971`
- `/en/events/operation-searchlight-1971`
- `/bn/events/victory-day-1971`
- `/en/events/victory-day-1971`

### Cluster E: Political Movements
Target keywords:
- ৬ দফা আন্দোলন
- ছয় দফা দাবি
- Six Point Movement
- আগরতলা মামলা
- ১৯৬৯ গণঅভ্যুত্থান
- 1970 Pakistan election
- 1970 election Bangladesh

Recommended pages:
- `/bn/events/six-point-movement-1966`
- `/en/events/six-point-movement-1966`
- `/bn/events/mass-uprising-1969`
- `/en/events/mass-uprising-1969`
- `/bn/events/pakistan-election-1970`
- `/en/events/pakistan-election-1970`

Why this matters:
- Strong cluster architecture helps search engines understand entity relationships and topical depth across the site.

## 3) URL slug improvement plan

Current numeric-ID URLs are stable but not ideal for search clarity where a semantic slug can be used.

Example current-style reference:
- `/bn/events/1940`

Recommended SEO-friendly version:
- `/bn/events/lahore-resolution-1940`
- `/en/events/lahore-resolution-1940`

Migration rules:
- Keep old numeric URLs working
- Add `301` redirects from old URLs to new slug URLs
- Update sitemap to include canonical slug URLs
- Update internal links to point to slug URLs
- Keep canonical tag pointing to final slug URL

Recommended URL format:
- `/{locale}/events/{topic-name}-{year}`
- `/{locale}/figures/{person-name}`
- `/{locale}/books/{book-title}`
- `/{locale}/topics/{topic-name}`

## 4) SEO title and meta description formula

### Event page title formula

Bangla:
- `{year} সালের {event}: {primary context}, {region/topic} ও ইতিহাস`

English:
- `{Event Name} {Year}: {Region}, Context, and Historical Impact Explained`

### Example

Weak:
- `লাহোর প্রস্তাব - Bengal Unfolded`

Better:
- `১৯৪০ সালের লাহোর প্রস্তাব: বাংলার রাজনীতি, পাকিস্তান ও দেশভাগের পটভূমি`

English:
- `Lahore Resolution 1940: Bengal, Pakistan Politics, and Partition Explained`

### Meta description formula

Bangla:
- `{event} কী, কেন গুরুত্বপূর্ণ, কারা জড়িত ছিলেন, এবং বঙ্গ/বাংলাদেশের ইতিহাসে এর প্রভাব কী — সহজ ভাষায় টাইমলাইন, ব্যক্তি, প্রেক্ষাপট ও উৎসসহ জানুন।`

English:
- `Learn what {event} was, why it mattered, who was involved, and how it shaped Bengal and Bangladesh through timeline, people, context, and sources.`

Note:
- Search engines may generate snippets dynamically, but strong titles/descriptions improve SERP clarity and CTR.

## 5) FAQ content blocks

Every important event, figure, book, and topic page should include FAQ content.

Recommended FAQ examples:

### Lahore Resolution
- লাহোর প্রস্তাব কী?
- লাহোর প্রস্তাব কে উত্থাপন করেন?
- লাহোর প্রস্তাবের সাথে পাকিস্তান সৃষ্টির সম্পর্ক কী?
- বাংলার রাজনীতিতে লাহোর প্রস্তাব কেন গুরুত্বপূর্ণ?

### 1947 Partition
- ১৯৪৭ সালে বাংলা কেন ভাগ হয়েছিল?
- দেশভাগের ফলে পূর্ব বাংলার ওপর কী প্রভাব পড়ে?
- ১৯০৫ বঙ্গভঙ্গ ও ১৯৪৭ দেশভাগের মধ্যে পার্থক্য কী?

### Language Movement
- ভাষা আন্দোলন কেন হয়েছিল?
- ২১ ফেব্রুয়ারি ১৯৫২ সালে কী ঘটেছিল?
- ভাষা আন্দোলন কীভাবে বাংলাদেশের স্বাধীনতার পথে প্রভাব ফেলে?

### Liberation War
- বাংলাদেশের মুক্তিযুদ্ধের প্রধান কারণ কী ছিল?
- অপারেশন সার্চলাইট কী?
- ৭ মার্চের ভাষণ কেন গুরুত্বপূর্ণ?
- ১৬ ডিসেম্বর কেন বিজয় দিবস?

## 6) BreadcrumbList JSON-LD (must do)

Add `BreadcrumbList` schema to:
- `/{locale}/events/{slug}`
- `/{locale}/figures/{id}`
- `/{locale}/books/{id}`
- `/{locale}/topics/{slug}` (when introduced)
- `/{locale}/events/{slug}/figures`
- `/{locale}/events/{slug}/resources`

Example structure:
- Home > Events > Lahore Resolution 1940
- Home > Figures > A. K. Fazlul Huq
- Home > Books > {Book Title}

## 7) Historical image SEO policy

When in-content images are introduced, each image should include:
- Descriptive filename
- Descriptive alt text
- Caption
- Source/credit metadata
- Related event/person/place reference

Filename examples:
- `language-movement-1952-bangladesh-history.webp`
- `bengal-partition-1947-map.webp`
- `six-point-movement-1966-sheikh-mujib.webp`
- `lahore-resolution-1940-bengal-politics.webp`

Alt text examples:
- `১৯৫২ সালের ভাষা আন্দোলনের ইতিহাস ও বাংলা ভাষার অধিকার আন্দোলনের প্রতীকী চিত্র`
- `১৯৪৭ সালের দেশভাগে বাংলা বিভক্তির ঐতিহাসিক মানচিত্র`

## 8) Bilingual SEO quality rule

Hreflang setup is technical infrastructure; language quality must be handled editorially.

Bangla pages:
- Use common Bangla search phrases
- Use Bengali dates where helpful
- Explain historical terms simply

English pages:
- Target diaspora, researchers, students, and international readers
- Use terms like Bengal, Bangladesh, Partition, Language Movement, Liberation War, South Asia

Technical rule:
- Keep hreflang alternates for bilingual equivalent pages
- Include `x-default` where appropriate
- Ensure canonical points to same-language canonical URL

## 9) Required topic hub pages

Create topic hubs to connect event pages into thematic knowledge architecture.

Implemented hub pages:
- `/bn/topics/bangladesh-history`
- `/en/topics/bangladesh-history`
- `/bn/topics/partition-and-identity`
- `/en/topics/partition-and-identity`
- `/bn/topics/democracy-and-civic-movements`
- `/en/topics/democracy-and-civic-movements`
- `/bn/topics/partition-of-bengal-1905`
- `/en/topics/partition-of-bengal-1905`
- `/bn/topics/language-movement-and-mother-language-day`
- `/en/topics/language-movement-and-mother-language-day`
- `/bn/topics/liberation-war-1971`
- `/en/topics/liberation-war-1971`

Still recommended:
- `/bn/topics/pakistan-period`
- `/en/topics/pakistan-period`
- `/bn/topics/bengal-culture`
- `/en/topics/bengal-culture`

Each hub should include:
- Overview
- Timeline
- Key events
- Key figures
- Related books
- Related sources
- Related places
- FAQ

## 10) SEO publishing priority

### First 10 priority pages
1. বাংলাদেশের ইতিহাস টাইমলাইন / Bangladesh History Timeline
2. ১৯০৫ বঙ্গভঙ্গ / Partition of Bengal 1905
3. ১৯৪০ লাহোর প্রস্তাব / Lahore Resolution 1940
4. ১৯৪৭ দেশভাগ / Partition of Bengal 1947
5. ১৯৫২ ভাষা আন্দোলন / Language Movement 1952
6. ১৯৬৬ ছয় দফা / Six Point Movement 1966
7. ১৯৬৯ গণঅভ্যুত্থান / Mass Uprising 1969
8. ১৯৭০ নির্বাচন / Pakistan Election 1970
9. ২৫ মার্চ ১৯৭১ / Operation Searchlight
10. ১৬ ডিসেম্বর ১৯৭১ / Victory Day

### Next 10 priority pages
1. Bengal Sultanate
2. Battle of Plassey 1757
3. Permanent Settlement 1793
4. Indigo Revolt
5. Bengal Renaissance
6. 1943 Bengal Famine
7. Tebhaga Movement
8. 1974 Bangladesh Famine
9. BDR Mutiny 2009
10. Shapla Chattar 2013

## 11) Monthly SEO maintenance checklist

Every month:
- Review Search Console performance
- Find top 20 queries by impression
- Find pages with low CTR
- Rewrite weak titles/meta
- Add FAQ to 5 pages
- Add internal links to 10 pages
- Check sitemap coverage
- Check 404/redirect issues
- Check Core Web Vitals
- Add/update historical sources
- Improve one topic hub

## 12) SEO implementation risk classification

Use this classification before execution to avoid breaking existing design, structure, or behavior.

### Low risk (content/config level, minimal structural impact)
- Search Console weekly workflow
- Keyword cluster mapping and editorial targeting
- Title/meta formula improvements
- FAQ content blocks on existing pages
- Monthly SEO maintenance checklist
- Historical image SEO policy (applies when adding images)
- Bilingual content quality rules

Expected impact:
- No route changes
- No layout breakage expected
- Mostly content/metadata/editorial operations

### Medium risk (template/schema changes, usually safe with testing)
- BreadcrumbList JSON-LD rollout on deep pages
- FAQPage schema on FAQ-enabled pages
- Additional internal linking modules inside existing templates

Control measures:
- Validate structured data page by page
- Keep one H1 rule unchanged
- Check canonical/hreflang outputs after each template update

### High risk (routing/URL architecture changes)
- Event URL migration from numeric IDs to descriptive slugs
- Introduction of new `/topics/*` route family and hub architecture
- Large-scale canonical and sitemap migration tied to new routes

Control measures:
- Keep old URLs live with `301` redirects
- Update internal links and sitemap in the same release window
- Verify canonical targets for old and new URLs
- Roll out in phases (pilot set -> monitor -> full migration)

## Remaining recommendations v2

- [ ] Add Search Console weekly workflow and track query/page performance.
- [~] Create keyword clusters for Bangladesh history, Bengal partition, language movement, liberation war, political movements, and Bengal culture.
- [~] Create topic hub pages under `/topics`.
- [ ] Improve event URLs from numeric-only identifiers to descriptive slugs with `301` redirects.
- [ ] Add `BreadcrumbList` JSON-LD to all deep pages.
- [x] Add FAQ content and `FAQPage` schema to priority pages where appropriate.
- [ ] Add title/meta formulas for event, figure, book, and topic pages.
- [ ] Add historical image SEO policy for future in-content images.
- [ ] Add bilingual content quality rules, not only hreflang technical tags.
- [ ] Build a monthly SEO improvement loop based on Search Console data.

## Google references
1. Google Search Console: https://search.google.com/search-console/about
2. SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
3. Image SEO Best Practices: https://developers.google.com/search/docs/appearance/google-images
4. Localized Versions / hreflang: https://developers.google.com/search/docs/specialty/international/localized-versions
5. Search Console Guide: https://developers.google.com/search/docs/monitor-debug/search-console-start
