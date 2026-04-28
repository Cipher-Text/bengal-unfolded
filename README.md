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

## Content
- Home:
  - `content/site/home.en.json`
  - `content/site/home.bn.json`
- Events:
  - `content/events/<slug>/meta.<locale>.json`
  - `content/events/<slug>/timeline.<locale>.json`
  - `content/events/<slug>/quotes.<locale>.json`
  - `content/events/<slug>/hero-ids.json`
  - `content/events/<slug>/book-ids.json`
- Shared Heroes:
  - `content/heroes/<hero-id>/meta.<locale>.json`
- Shared Books:
  - `content/books/<book-id>/meta.<locale>.json`

## Routes
- `/{locale}`: Home timeline with per-item `Details` button.
- `/{locale}/events/{slug}`: Event detail page.
- `/{locale}/heroes/{id}`: Dedicated hero detail page + linked events.
- `/{locale}/books/{id}`: Dedicated book detail page + linked events.

## Authoring workflow
1. Add entity IDs in `src/types/content.ts`:
   - `SUPPORTED_EVENT_SLUGS`
   - `SUPPORTED_HERO_IDS`
   - `SUPPORTED_BOOK_IDS`
2. Add or update shared hero/book metadata under:
   - `content/heroes/<hero-id>/meta.en.json`
   - `content/heroes/<hero-id>/meta.bn.json`
   - `content/books/<book-id>/meta.en.json`
   - `content/books/<book-id>/meta.bn.json`
3. For each event, wire relationships:
   - `content/events/<slug>/hero-ids.json`
   - `content/events/<slug>/book-ids.json`
4. Run `pnpm build` to validate all static routes and content integrity.

## Notes
- This repo now uses normalized many-to-many relationships:
  - one hero can appear in many events
  - one book can be referenced in many events
- Legacy per-event files `heroes.<locale>.json` and `resources.<locale>.json` are no longer used by `src/lib/content.ts`.

## Future backend migration
Keep UI/pages unchanged and swap data provider inside `src/lib/content.ts` to Strapi, Payload, Directus, or PostgreSQL.
