# Content Model

Static JSON now, adapter-based backend later.

## Core types
- `HomeContent`
- `EventMeta`
- `TimelineItem`
- `Hero`
- `Book`
- `Quote`
- `EventContent`

## Relationship model
- `event -> heroes` is many-to-many via `content/events/<slug>/hero-ids.json`.
- `event -> books` is many-to-many via `content/events/<slug>/book-ids.json`.
- Hero detail pages perform reverse lookup to list related events.
- Book detail pages perform reverse lookup to list related events.

## File contracts
- Event files:
  - `meta.<locale>.json`
  - `timeline.<locale>.json`
  - `quotes.<locale>.json`
  - `hero-ids.json`
  - `book-ids.json`
- Hero files:
  - `content/heroes/<hero-id>/meta.en.json`
  - `content/heroes/<hero-id>/meta.bn.json`
- Book files:
  - `content/books/<book-id>/meta.en.json`
  - `content/books/<book-id>/meta.bn.json`

## Runtime accessors
`src/lib/content.ts` is the single content access layer and currently exposes:
- `getHomeContent`
- `getEventMeta`
- `getEventContent`
- `getAllEvents`
- `getHero`
- `getBook`
- `getAllHeroes`
- `getAllBooks`
- `getEventsByHeroId`
- `getEventsByBookId`

Future migration: replace `src/lib/content.ts` filesystem reads with Strapi/Payload/Directus/PostgreSQL adapters while preserving function signatures.
