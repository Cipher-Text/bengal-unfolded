# Content Model

Static JSON now, adapter-based backend later.

Contract companion docs:

- `docs/AI_CONTRACT.md`
- `docs/EDITORIAL_RULES.md`

## Core types

- `HomeContent`
- `EventMeta`
- `TimelineItem`
- `Figure`
- `Period`
- `Book`
- `EventResource`
- `Quote`
- `EventContent`
- `Topic`

## Figure schema

- `Figure` metadata is stored at `content/figures/<figure-id>/meta.<locale>.json`.
- Common fields currently used:
  - `name` (required string)
  - `name_en` (optional string; useful for BN locale canonical name mapping)
  - `role` (required string)
  - `group` (required string; commonly `leader` or `collective`)
  - `contribution` (required string)
  - `context` (required string)
  - `impact` (required string)
  - `highlight` (optional string)
  - `tags` (optional `string[]`)
  - `image` (optional string path, typically `/figures/<filename>`)

Image rendering policy:

- Figure and event detail views should render figure photos only when `image` exists and points to a valid asset.
- If `image` is missing or removed during integrity cleanup, UI should collapse media blocks instead of showing placeholders/broken avatars.
- Preferred figure asset location is `public/figures/`; legacy/staging paths such as `public/draft/` must not be referenced by figure metadata.
- If an image filename or extension changes, update `image` in both `meta.en.json` and `meta.bn.json` for the affected figure in the same commit.

## Relationship model

- `event -> figures` is many-to-many via `content/events/<slug>/figure-ids.json`.
- Figure detail pages perform reverse lookup to list related events.
- `event -> resources` is many-to-many via `content/events/<slug>/resource-ids.json`.
- Shared resource metadata is stored in `content/resources/<resource-id>/meta.<locale>.json`.
- `event <-> books` is many-to-many via `content/events/<slug>/resource-ids.json` where book IDs are resource IDs.
- `book <-> writers` supports many-to-many at schema level with `authors: string[]` on book metadata (legacy `author` is still supported for backward compatibility).
- `book` entity is still supported for dedicated book pages and reverse lookups.
- `event -> period` is many-to-one via `eventMeta.periodId`.
- Period detail pages perform reverse lookup to list all events within that period.
- `event -> place` is many-to-one via `eventMeta.placeId`.
- Place detail pages perform chronological reverse lookup to list all events tied to that place.
- `topic -> events` is many-to-many via `content/topics/<topic-slug>/meta.<locale>.json` `eventSlugs`.
- `topic -> figures` is optional many-to-many via `figureIds`.
- `topic -> resources` is optional many-to-many via `resourceIds`.

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
- Period files:
  - `content/periods/<period-id>/meta.en.json`
  - `content/periods/<period-id>/meta.bn.json`
- Resource files:
  - `content/resources/<resource-id>/meta.en.json`
  - `content/resources/<resource-id>/meta.bn.json`
- Topic files:
  - `content/topics/<topic-slug>/meta.en.json`
  - `content/topics/<topic-slug>/meta.bn.json`
- Place files:
  - `content/places/<place-id>/meta.en.json`
  - `content/places/<place-id>/meta.bn.json`

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
- `EventMeta.sensitive?` (optional boolean): marks chapters that require sensitive-history caution UI treatment
- `EventMeta.contentWarnings?` (optional `string[]`): localized warning labels displayed on sensitive chapters
- `EventMeta.requiresSources?` (optional boolean): when `true`, event summary and why-it-matters claims must include source IDs
- `EventMeta.longTermLegacy?` (optional string; required for `importance: major`): long-horizon consequence narrative
- `EventMeta.longTermLegacySourceIds?` (optional `string[]`): citations for long-term legacy narrative
- `EventMeta.longTermLegacyEvidenceLevel?` (optional `high | medium | low`): evidence strength for long-term legacy narrative
- `EventMeta.culturalImpact?` (optional string; required for `importance: landmark`): culture-facing memory and influence narrative
- `EventMeta.culturalImpactSourceIds?` (optional `string[]`): citations for cultural impact narrative
- `EventMeta.culturalImpactEvidenceLevel?` (optional `high | medium | low`): evidence strength for cultural impact narrative
- `EventMeta.identityMemoryNotes?` (optional string; required for `importance: major | landmark`): identity and collective memory framing for major historical moments
- `EventMeta.identityMemorySourceIds?` (optional `string[]`): citations for identity-memory narrative
- `EventMeta.identityMemoryEvidenceLevel?` (optional `high | medium | low`): evidence strength for identity-memory narrative
- `EventMeta.claimCitations?` (optional `EventClaimCitation[]`; required non-empty for `importance: major | landmark`): claim-level citation entries rendered on event pages

`EventClaimCitation` fields:

- `id` (required string): stable claim identifier inside an event
- `section` (required): `summary | whyItMatters | longTermLegacy | culturalImpact | identityMemoryNotes`
- `claim` (required string): claim text
- `sourceIds` (required non-empty `string[]`): supporting source IDs listed in event `resource-ids.json`
- `evidenceLevel` (required): `high | medium | low`
- `EventMeta.parentEvent?` (optional): parent cluster anchor event slug
- `EventMeta.childEventIds?` (optional): ordered child chapter slugs for cluster discovery
- `EventMeta.relatedEvents?` (optional): ordered typed historical relationships with `{ eventId, relationType }`
- `EventMeta.relatedEventIds?` (optional): ordered lateral chapter links for discovery
- `EventMeta.periodId?` (optional): `PeriodId` reference for historical period grouping
- `EventMeta.periodLabel?` (optional): localized period/group label used by explorer grouping
- `EventMeta.movementLabel?` (optional): localized movement/context label used by explorer and event pages
- `EventMeta.placeId?` (optional): `PlaceId` reference for place-to-event historical grouping
- `EventMeta.placeLabel?` (optional): localized place label shown on event detail pages

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

## Period schema

- `PeriodMeta` / `Period` fields:
  - `id` (required): period identifier
  - `title` (required): period name
  - `subtitle` (required): period date range (e.g., "1947–1971")
  - `description` (required): historical context and significance
  - `startYear` (required): earliest year in period
  - `endYear` (required): latest year in period
  - `themeColor` (required): hex color for visual theming
  - `icon?` (optional): icon identifier for visual representation

Supported period IDs:

- `ancient-and-pre-sultanate-bengal`
- `transition-to-sultanate-formation`
- `independent-bengal-sultanate-era`
- `mughal-incorporation-and-consolidation`
- `colonial-rule-and-resistance`
- `partition-and-late-colonial-politics`
- `pakistan-period-and-national-awakening`
- `post-liberation-state-and-democracy`
- `contemporary-memory-and-civic-protest`

## Movement schema

- `MovementMeta` / `Movement` fields:
  - `id` (required): movement identifier
  - `title` (required): movement name
  - `subtitle` (required): movement time frame or descriptor (e.g., "1947–1971")
  - `description` (required): historical context and significance of the movement
  - `themeColor` (required): hex color for visual theming
  - `icon?` (optional): icon identifier for visual representation

Supported movement IDs:

- `colonial-capture-and-resistance`
- `partition-and-political-representation`
- `language-autonomy-and-liberation`
- `state-power-and-democratic-transition`
- `memory-justice-and-civic-dissent`

## Place schema

- `PlaceMeta` / `Place` fields:
  - `id` (required): place identifier
  - `title` (required): place name
  - `subtitle` (required): short location context
  - `description` (required): historical relevance summary
  - `regionType` (required): `region | city | district | site`
  - `themeColor` (required): hex color for visual theming

Supported place IDs:

- `bengal-region`

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

## Topic schema

- `TopicMeta` / `Topic` fields:
  - `slug` (required): topic identifier used in route `/topics/{slug}`
  - `priority?` (optional): non-negative integer for editorial ordering (lower renders first)
  - `title` (required): topic hub title
  - `tagline` (required): short hook line
  - `intro` (required): introductory learning context
  - `description` (required): SEO summary / overview sentence
  - `eventSlugs` (required, non-empty): `EventSlug[]` linked chapters
  - `figureIds?` (optional): `FigureId[]` related figures
  - `resourceIds?` (optional): `ResourceId[]` related resources
  - `keywords?` (optional): `string[]` keyword cluster hints

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
- `getEventsByBookIdChronological`
- `getFiguresByEventSlug`
- `getResource`
- `getEventsByResourceId`
- `getEventsByResourceIdChronological`
- `getAllCreators`
- `getCreatorById`
- `getResourcesByCreatorId`
- `getAllTopicSlugs`
- `getTopic`
- `getAllTopics`
- `getTopicsByEventSlug`
- `getTopicsByFigureId`
- `getTopicsByResourceId`
- `getPlace`
- `getAllPlaces`
- `getEventsByPlaceId`
- `getEventsByPlaceIdChronological`

Implementation note:

- `getAllFigures` first tries `content/figures/index.<locale>.json`, then falls back to per-figure files.
- `getEventContent` resolves resources from `resource-ids.json` through shared `content/resources/*`.

Future migration: replace filesystem reads in `src/lib/content.ts` with Strapi/Payload/Directus/PostgreSQL adapters while preserving signatures.
