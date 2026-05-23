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

## 2026 schema extensions (optional, backward-compatible)

These fields are additive and optional. Existing JSON files remain valid when these fields are absent.

Why these fields exist:

- SEO:
  - entity-level `seoTitle`/`seoDescription`
  - short direct-answer fields (`shortAnswer`, `quickAnswer`)
- Entity disambiguation:
  - aliases (`alternateNames`, `searchAliases`, `historicalNames`)
  - temporal markers (`birthYear`, `deathYear`, `activePeriod`)
- Future map visualization:
  - `Place.lat/lon` and `Event.mapPoints[]`
- Learning paths:
  - `Topic.learningPath[]` for cross-entity guided reading
- Evidence quality:
  - `Resource.sourceQuality` and `Resource.evidenceLevel`
- Backend migration readiness:
  - explicit relation IDs and FAQ/citation-ready nested structures that can be mapped 1:1 from CMS records

### Figure optional fields

- `seoTitle?: string`
- `seoDescription?: string`
- `shortAnswer?: string`
- `birthYear?: string`
- `deathYear?: string`
- `activePeriod?: string`
- `primaryEventIds?: string[]`
- `relatedPlaceIds?: string[]`
- `alternateNames?: string[]`
- `searchAliases?: string[]`
- `faq?: Array<{ question: string; answer: string; sourceIds?: string[] }>`

Example:

```json
{
  "name": "Example Figure",
  "role": "Political organizer",
  "group": "leader",
  "contribution": "Organized key campaigns.",
  "context": "Late colonial Bengal.",
  "impact": "Influenced mass politics.",
  "seoTitle": "Example Figure and Mass Politics",
  "seoDescription": "Profile and historical significance of Example Figure.",
  "shortAnswer": "A major organizer in late colonial Bengal.",
  "birthYear": "1890",
  "deathYear": "1958",
  "activePeriod": "1915-1950",
  "primaryEventIds": ["1940-lahore-resolution"],
  "relatedPlaceIds": ["bengal-region"],
  "alternateNames": ["Example Ali", "E. Ali"],
  "searchAliases": ["example leader", "ali organizer"],
  "faq": [
    {
      "question": "Why is this figure important?",
      "answer": "They connected local activism to wider constitutional politics.",
      "sourceIds": ["history-banglapedia"]
    }
  ]
}
```

### Event optional fields

- `seoTitle?: string`
- `seoDescription?: string`
- `quickAnswer?: string`
- `causes?: string[]`
- `consequences?: string[]`
- `misconceptions?: Array<{ title: string; explanation: string; sourceIds?: string[] }>`
- `faq?: Array<{ question: string; answer: string; sourceIds?: string[] }>`
- `mapPoints?: Array<{ placeId: string; label: string; lat?: number; lon?: number; role?: 'battlefield' | 'capital' | 'route' | 'birthplace' | 'deathplace' | 'treaty-place' | 'movement-center' | 'administrative-center' | 'other'; year?: string; note?: string }>`

Example:

```json
{
  "slug": "1940-lahore-resolution",
  "year": "1940",
  "title": "Lahore Resolution",
  "subtitle": "A constitutional turning point",
  "summary": "Set a new political direction.",
  "themeColor": "#1f6f78",
  "ctaLabel": "Explore",
  "heroTagline": "A major shift in representation politics",
  "whyItMatters": "It shaped later constitutional debates.",
  "importance": "major",
  "seoTitle": "Lahore Resolution Explained",
  "seoDescription": "Context, causes, and consequences of the Lahore Resolution.",
  "quickAnswer": "It formalized a separate-state demand framework.",
  "causes": ["Representation disputes", "Constitutional deadlock"],
  "consequences": ["Reframed provincial politics", "Accelerated partition debates"],
  "misconceptions": [
    {
      "title": "It was a fully detailed partition blueprint",
      "explanation": "The text was broad and later interpreted differently.",
      "sourceIds": ["lahore-resolution-banglapedia"]
    }
  ],
  "faq": [
    {
      "question": "Did it immediately create Pakistan?",
      "answer": "No, it became a later political foundation.",
      "sourceIds": ["lahore-resolution-banglapedia"]
    }
  ],
  "mapPoints": [
    {
      "placeId": "bengal-region",
      "label": "Political reception in Bengal",
      "role": "movement-center",
      "year": "1940"
    }
  ]
}
```

### Topic optional fields

- `seoTitle?: string`
- `seoDescription?: string`
- `beginnerSummary?: string`
- `advancedSummary?: string`
- `primaryKeywords?: string[]`
- `secondaryKeywords?: string[]`
- `faq?: Array<{ question: string; answer: string; sourceIds?: string[] }>`
- `learningPath?: Array<{ type: 'event' | 'figure' | 'resource' | 'place' | 'period' | 'topic'; id: string; reason?: string }>`

Example:

```json
{
  "slug": "partition-and-identity",
  "title": "Partition and Identity",
  "tagline": "State formation and belonging",
  "intro": "How identity was negotiated through rupture.",
  "description": "Tracks political, social, and memory shifts.",
  "eventSlugs": ["1947-partition-and-eastern-bengal"],
  "seoTitle": "Partition and Identity in Bengal",
  "seoDescription": "A structured pathway through partition-era identity formation.",
  "beginnerSummary": "A quick overview of identity and partition politics.",
  "advancedSummary": "Compares legal frameworks, representation, and memory narratives.",
  "primaryKeywords": ["partition", "identity", "representation"],
  "secondaryKeywords": ["migration", "memory", "citizenship"],
  "faq": [
    {
      "question": "Why is identity central to partition history?",
      "answer": "Identity shaped claims to representation and state power."
    }
  ],
  "learningPath": [
    {
      "type": "event",
      "id": "1947-partition-and-eastern-bengal",
      "reason": "Start with the central rupture point."
    },
    {
      "type": "resource",
      "id": "partition-of-british-india-national-archives",
      "reason": "Then read a primary archival source."
    }
  ]
}
```

### Resource optional fields

- `sourceQuality?: 'primary' | 'secondary' | 'archive' | 'academic' | 'editorial' | 'reference' | 'unknown'`
- `evidenceLevel?: 'high' | 'medium' | 'low'`
- `relatedEventIds?: string[]`
- `relatedFigureIds?: string[]`
- `relatedTopicIds?: string[]`
- `whyItMatters?: string`

Example:

```json
{
  "title": "Example Archival Resource",
  "attribution": "National Archives",
  "quality": "archive",
  "sourceQuality": "primary",
  "evidenceLevel": "high",
  "relatedEventIds": ["1947-partition-and-eastern-bengal"],
  "relatedFigureIds": ["muhammad-ali-jinnah"],
  "relatedTopicIds": ["partition-and-identity"],
  "whyItMatters": "Provides direct documentary context for constitutional claims."
}
```

### Place optional fields

- `lat?: number`
- `lon?: number`
- `modernCountry?: string`
- `historicalNames?: string[]`
- `relatedEventIds?: string[]`
- `relatedFigureIds?: string[]`
- `mapNote?: string`

Example:

```json
{
  "id": "bengal-region",
  "title": "Bengal Region",
  "subtitle": "Historical macro-region",
  "description": "Central to multiple state formations.",
  "regionType": "region",
  "themeColor": "#24527a",
  "lat": 23.685,
  "lon": 90.3563,
  "modernCountry": "Bangladesh/India",
  "historicalNames": ["Banga", "Bangala"],
  "relatedEventIds": ["1947-partition-and-eastern-bengal"],
  "relatedFigureIds": ["sheikh-mujibur-rahman"],
  "mapNote": "Coordinates are representative, not boundary centroids."
}
```

## Migration note

- Static JSON under `content/**` remains the source of truth today.
- No backend/CMS is required for this phase.
- Future backend or CMS integrations must preserve these contracts.
- Use an adapter layer to map backend records into the same TypeScript types in `src/types/content.ts`.

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
- Product policy: figure photos are rendered on figure detail pages only (`/{locale}/figures/{id}`), not on event key-figure cards.
- Preferred figure detail photo presentation:
  - Primary media ratio: `4:5` portrait.
  - Fallback ratio for archival landscape images: `3:2`.
  - Image fit: `object-contain` (avoid historical photo cropping).
  - Default color treatment: near-monochrome with subtle warm tone (grayscale + light sepia + mild contrast lift).

### ChatGPT photo-conversion prompt (uploader workflow)

Use this prompt when uploading a source photo to ChatGPT for figure-page preparation:

```text
I am uploading a historical figure photo for a website profile page.

Edit this image with the following exact rules:
1) Output ratio: 4:5 portrait. If the source is very wide and portrait crop is not safe, produce a second version in 3:2.
2) Do not crop out the main subject’s face or identifying features.
3) Keep full subject visibility preference (object-contain style composition), avoid aggressive zoom.
4) Color treatment: near-monochrome archival look:
   - grayscale base
   - subtle warm sepia tone
   - mild contrast increase
   - no vivid color boost
5) Preserve historical authenticity: no face reshaping, no beautification, no modern stylization.
6) Clean only minor dust/noise artifacts if present; do not alter factual visual details.
7) Keep background natural; do not replace background.
8) Return a web-ready JPG/PNG suitable for profile usage.

Deliver:
- Primary output: 4:5 version
- Optional fallback: 3:2 version (only if needed for composition safety)
```

Suggested naming after export:

- `public/figures/<figure-id>.jpg` (preferred)
- then set `image` in:
  - `content/figures/<figure-id>/meta.en.json`
  - `content/figures/<figure-id>/meta.bn.json`

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
- `EventMeta.contested?` (optional boolean): marks a chapter as containing a significant disputed interpretation or unresolved historical framing question
- `EventMeta.historicalDebate?` (optional string; required when `contested: true`): short, neutral explanation of the main historical disagreement or interpretive split
- `EventMeta.historicalDebateSourceIds?` (optional `string[]`; required when `contested: true`): citations for the debate explanation
- `EventMeta.historicalDebateEvidenceLevel?` (optional `high | medium | low`): evidence strength for the debate explanation
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
  - `quality` in `primary | secondary | archive | editorial`
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

Source quality classification is governed by [docs/SOURCE_QUALITY.md](./SOURCE_QUALITY.md).

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
