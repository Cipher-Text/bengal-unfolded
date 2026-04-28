# Bengal Unfolded

Bilingual static historical storytelling website (`EN`/`BN`) built with Next.js App Router.

## Tech stack
- Next.js (App Router, static generation)
- TypeScript
- Tailwind CSS
- Framer Motion
- JSON content files

## Run locally
```bash
pnpm install
pnpm dev
```

## Build
```bash
pnpm build
pnpm start
```

## Documentation index
- [Content Model](CONTENT_MODEL.md)
- [Project Structure](PROJECT_STRUCTURE.md)
- [Changelog (Done)](CHANGELOG.md)
- [Roadmap (MVP -> Final)](ROADMAP.md)

## Content
- Home:
  - `content/site/home.en.json`
  - `content/site/home.bn.json`
- Event content (per event slug):
  - `meta.<locale>.json`
  - `timeline.<locale>.json`
  - `quotes.<locale>.json`
  - `hero-ids.json`
  - `resources.<locale>.json`
- Shared heroes:
  - `content/heroes/<hero-id>/meta.<locale>.json`
  - Optional performance index:
    - `content/heroes/index.en.json`
    - `content/heroes/index.bn.json`
- Shared books (legacy dedicated book pages):
  - `content/books/<book-id>/meta.<locale>.json`

## Routes
- `/{locale}`: Home timeline with per-item `Details` button.
- `/{locale}/events/{slug}`: Event detail page.
- `/{locale}/events/{slug}/heroes`: Event-specific full hero list (paginated).
- `/{locale}/events/{slug}/resources`: Event-specific categorized resources.
- `/{locale}/heroes`: Global hero list (paginated).
- `/{locale}/heroes/{id}`: Dedicated hero detail page + related events.
- `/{locale}/books/{id}`: Dedicated book detail page + related events.

## Current UX behaviors
- Light/dark theme with persistent preference.
- Color-based theme toggle button in header.
- Event page shows top 5 heroes, then `See full list` / `সম্পূর্ণ তালিকা দেখুন`.
- Event timeline supports progressive loading (`Show more` / `আরও দেখুন`).
- Timeline type badge is shown when `type` exists.
- Resources are grouped by category and subcategory on `/{locale}/events/{slug}/resources`.

## Notes
- Relationship model supports one hero across multiple events.
- Event resources are now loaded from `resources.<locale>.json`.
- Legacy per-event `heroes.<locale>.json` files are removed and unused.

## Future backend migration
Keep UI/pages unchanged and swap data provider inside `src/lib/content.ts` to Strapi, Payload, Directus, or PostgreSQL.
