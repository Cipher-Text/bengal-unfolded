# SEO Audit and Fixes - Bengal Unfolded

Date: 2026-05-01
Canonical domain: `https://bengalunfolded.com`

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

## Findings and fixes applied

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
- Confirmed metadata base and canonical references now align to `https://bengalunfolded.com`.
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

### 9) Image alt text
- No in-content `<img>`/`next/image` components are currently rendered in route templates.
- Added explicit semantic text in social image asset metadata and OG image alt in metadata.

## Verification run
- `pnpm build`: passed.
- `pnpm lint`: passed with one existing warning (`@next/next/no-page-custom-font` in `src/app/layout.tsx`), no errors.

## Additional fix done during verification
- Resolved a React lint error (`react-hooks/set-state-in-effect`) in `src/components/ThemeToggle.tsx` so lint no longer fails.

## Remaining recommendations
1. Add route-specific generated OG images (`opengraph-image.tsx`) for key event pages to improve share CTR and contextual relevance.
2. If content images are added later, enforce descriptive `alt` text linting and include caption/source metadata for historical assets.
3. Add `BreadcrumbList` JSON-LD to deeper pages (`/events/*`, `/figures/*`, `/books/*`) for richer SERP presentation.
4. Consider replacing Google Fonts `<link>` tags in root layout with Next.js font optimization to remove the current lint warning.
