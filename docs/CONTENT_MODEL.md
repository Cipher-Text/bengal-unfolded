# Content Model

Static JSON now, adapter-based backend later.

## Core types
- `HomeContent`
- `EventMeta`
- `TimelineItem`
- `Figure`
- `Book`
- `EventResource`
- `Quote`
- `EventContent`

## Relationship model
- `event -> figures` is many-to-many via `content/events/<slug>/figure-ids.json`.
- Figure detail pages perform reverse lookup to list related events.
- `event -> resources` is many-to-many via `content/events/<slug>/resource-ids.json`.
- Shared resource metadata is stored in `content/resources/<resource-id>/meta.<locale>.json`.
- `event <-> books` is many-to-many via `content/events/<slug>/resource-ids.json` where book IDs are resource IDs.
- `book <-> writers` supports many-to-many at schema level with `authors: string[]` on book metadata (legacy `author` is still supported for backward compatibility).
- `book` entity is still supported for dedicated book pages and reverse lookups.

## File contracts
- Event files:
  - `meta.<locale>.json`
  - `timeline.<locale>.json`
  - `quotes.<locale>.json`
  - `figure-ids.json`
  - `resource-ids.json`
- Figure files:
  - `content/figures/<figure-id>/meta.en.json`
  - `content/figures/<figure-id>/meta.bn.json`
  - Optional index for faster loading:
    - `content/figures/index.en.json`
    - `content/figures/index.bn.json`
- Book files:
  - No separate `books` storage.
  - Book pages resolve from `content/resources/<book-id>/meta.<locale>.json`.
- Resource files:
  - `content/resources/<resource-id>/meta.en.json`
  - `content/resources/<resource-id>/meta.bn.json`

## Timeline schema
- `TimelineItem` fields:
  - `year` (string)
  - `title` (string)
  - `detail` (string)
  - `sourceIds` (required `string[]`, must be non-empty and use IDs from event `resource-ids.json`)
  - `type?` (optional enum)
  - `href?` (optional link)
  - `ctaLabel?` (optional link label)

## Event metadata note
- `EventMeta.showOnLanding?` (optional boolean): set `false` to hide an event from the locale landing page timeline while keeping it available in full timeline and direct event routes.
- `EventMeta.importance` (required): `landmark | major | high | medium | reference`
- `EventMeta.parentEvent?` (optional): parent cluster anchor event slug
- `EventMeta.childEventIds?` (optional): ordered child chapter slugs for cluster discovery
- `EventMeta.relatedEvents?` (optional): ordered typed historical relationships with `{ eventId, relationType }`
- `EventMeta.relatedEventIds?` (optional): ordered lateral chapter links for discovery
- `EventMeta.periodLabel?` (optional): localized period/group label used by explorer grouping
- `EventMeta.movementLabel?` (optional): localized movement/context label used by explorer and event pages

`relationType` supports:
- `cause`
- `effect`
- `background`
- `parallel`
- `legacy`
- `contrast`

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
  - `attribution` (credit line; supports writer/director/cartographer/organization; loader falls back to legacy `creator` or `author`)
  - `creatorType?` (`person` | `organization`) used for creator page schema typing and SEO; defaults to `person` when omitted
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
- `getFigure`
- `getBook`
- `getAllFigures`
- `getAllBooks`
- `getAllResourceIds`
- `getAllResources`
- `getEventsByFigureId`
- `getEventsByBookId`
- `getFiguresByEventSlug`
- `getResource`
- `getEventsByResourceId`
- `getAllCreators`
- `getCreatorById`
- `getResourcesByCreatorId`

Implementation note:
- `getAllFigures` first tries `content/figures/index.<locale>.json`, then falls back to per-figure files.
- `getEventContent` resolves resources from `resource-ids.json` through shared `content/resources/*`.

Future migration: replace filesystem reads in `src/lib/content.ts` with Strapi/Payload/Directus/PostgreSQL adapters while preserving signatures.
