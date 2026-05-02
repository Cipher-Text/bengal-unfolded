# Content Model

Static JSON now, adapter-based backend later.

## Core types
- `HomeContent`
- `EventMeta`
- `TimelineItem`
- `Hero`
- `Book`
- `EventResource`
- `Quote`
- `EventContent`

## Relationship model
- `event -> heroes` is many-to-many via `content/events/<slug>/hero-ids.json`.
- Hero detail pages perform reverse lookup to list related events.
- `event -> resources` is many-to-many via `content/events/<slug>/resource-ids.json`.
- Shared resource metadata is stored in `content/resources/<resource-id>/meta.<locale>.json`.
- `book` entity is still supported for dedicated book pages and reverse lookups.

## File contracts
- Event files:
  - `meta.<locale>.json`
  - `timeline.<locale>.json`
  - `quotes.<locale>.json`
  - `hero-ids.json`
  - `resource-ids.json`
  - `book-ids.json`
- Hero files:
  - `content/heroes/<hero-id>/meta.en.json`
  - `content/heroes/<hero-id>/meta.bn.json`
  - Optional index for faster loading:
    - `content/heroes/index.en.json`
    - `content/heroes/index.bn.json`
- Book files:
  - `content/books/<book-id>/meta.en.json`
  - `content/books/<book-id>/meta.bn.json`
- Resource files:
  - `content/resources/<resource-id>/meta.en.json`
  - `content/resources/<resource-id>/meta.bn.json`

## Timeline schema
- `TimelineItem` fields:
  - `year` (string)
  - `title` (string)
  - `detail` (string)
  - `type?` (optional enum)
  - `href?` (optional link)
  - `ctaLabel?` (optional link label)

`type` supports:
- `judicial_event`
- `protest_start`
- `movement_escalation`
- `nationwide_movement`
- `violence`
- `state_crackdown`
- `peak_conflict`
- `policy_change`
- `policy_implementation`
- `movement_shift`
- `political_crisis`

## Resource schema
- `EventResource` fields:
  - `id`
  - `title`
  - `author`
  - `note`
  - `category` in `read | watch | explore | understand`
  - `subcategory` in:
    - `historical-literature`
    - `novel`
    - `memoir`
    - `movie`
    - `documentary`
    - `drama`
    - `archive`
    - `documents`
    - `photos`
    - `research`
    - `papers`
  - `href?`

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
- `getHeroesByEventSlug`
- `getResource`
- `getEventsByResourceId`

Implementation note:
- `getAllHeroes` first tries `content/heroes/index.<locale>.json`, then falls back to per-hero files.
- `getEventContent` resolves resources from `resource-ids.json` through shared `content/resources/*`.

Future migration: replace filesystem reads in `src/lib/content.ts` with Strapi/Payload/Directus/PostgreSQL adapters while preserving signatures.
