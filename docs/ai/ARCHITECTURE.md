# Architecture (AI)

Last verified: 2026-05-14

## High-level

- Next.js App Router project.
- Server-first rendering with filesystem-backed content.
- No internal REST/GraphQL API layer; route components call `src/lib/content.ts` directly.

## Structure

- App routes: `src/app/`
- UI components: `src/components/`
- Data access: `src/lib/content.ts`
- SEO helpers: `src/lib/seo.ts`
- Types/contracts: `src/types/content.ts`
- Content validator: `scripts/validate-content.mjs`
- Content data: `content/`

## Route model

Global:
- `/` -> redirects to `/bn`
- `robots.txt` from `src/app/robots.ts`
- `sitemap.xml` from `src/app/sitemap.ts`

Locale-scoped routes:
- `/:locale`
- `/:locale/timeline`
- `/:locale/events/:slug`
- `/:locale/events/:slug/figures`
- `/:locale/events/:slug/resources`
- `/:locale/figures`
- `/:locale/figures/:id`
- `/:locale/books/:id`
- `/:locale/resources/:id`
- `/:locale/creators/:id`
- `/:locale/glossary`
- `/:locale/glossary/:term`
- `/:locale/periods/:id`
- `/:locale/movements/:id`
- `/:locale/places`
- `/:locale/places/:id`
- `/:locale/topics`
- `/:locale/topics/:slug`

## Data flow

1. Route receives params (`locale`, `slug`, `id`, etc.).
2. Guard functions in `content.ts` assert allowed IDs/slugs/locales.
3. Content files are read from disk and normalized.
4. Route renders Server Components + selective Client Components.

## Caching and normalization

- JSON reads are cached with React `cache()`.
- Loader normalizers provide backward compatibility:
  - `normalizeEventResource()`
  - `normalizeFigure()`
  - `normalizeBook()`
- Creator graph is derived from resources (`creatorsCached`).

## Client components (current)

- `src/components/EventTimeline.tsx`
- `src/components/ThemeToggle.tsx`
- `src/components/HeaderScroll.tsx`
- `src/components/ShareActions.tsx`

Other components in `src/components/` are server-compatible.

## Redirects (next.config.ts)

- `/[locale]/heroes` -> `/[locale]/figures` (permanent)
- `/[locale]/heroes/[id]` -> `/[locale]/figures/[id]` (permanent)
- `/[locale]/events/[slug]/heroes` -> `/[locale]/events/[slug]/figures` (permanent)
- `www.bengalunfolded.com/*` -> `https://bengalunfolded.com/*` (permanent)
