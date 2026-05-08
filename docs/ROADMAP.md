# Product Roadmap (Traceable)

Aligned with: `docs/archive/deep-research-report.md`

Bengal Unfolded is currently a static JSON + Next.js platform deployed on Vercel. The roadmap keeps the platform static-first while gradually evolving it into a trusted Bengal history reference, interactive learning platform, archive, and future contributor-supported knowledge system.

## Product Identity

Bengal Unfolded is a source-backed visual historical memory platform for Bengal and Bangladesh, designed for learners, readers, teachers, researchers, diaspora communities, and culturally conscious citizens.

It connects events, people, places, books, sources, causes, consequences, culture, and identity.

## Core Learning Principle: Visual Relation-Based History Memory

Users remember history better when they can visually understand:

- what happened
- when it happened
- where it happened
- who was involved
- why it happened
- what happened before
- what happened after
- what larger movement it belongs to
- which books and sources support it
- how it connects to culture, identity, and long-term historical truth

```txt
Timeline-first
  ↓
Relation-first
  ↓
Visualization-first
  ↓
Source-backed learning
  ↓
Historical truth reference
  ↓
Cultural knowledge platform
```

## Legend

- `[x]` Done
- `[ ]` Future

## AI Integration Completion Criteria

For consistency across Codex, Claude, Gemini, OpenCode, and other agents, roadmap items that touch content/features should be considered complete only when:

- model/type changes are updated (`src/types/content.ts`)
- validation rules are updated (`scripts/validate-content.mjs`)
- UI/runtime integration is implemented where relevant
- EN/BN content backfill is completed where relevant
- docs are updated (`docs/CONTENT_MODEL.md`, `docs/AI_CONTRACT.md`, `docs/EDITORIAL_RULES.md`)
- changelog entry is added with model/validation/UI/backfill notes

---

## Strategic Direction

Bengal Unfolded should evolve in this order:

```txt
Static site
  ↓
Trusted sourced history
  ↓
Full timeline explorer
  ↓
Visual relation-based learning
  ↓
Guided learning paths
  ↓
Authenticated resource hub
  ↓
Reader + badges
  ↓
Interactive map / animated history
  ↓
Intellectual community
  ↓
Contributor workflow
  ↓
AI-assisted research and advanced search
  ↓
Historical truth reference platform
```

Core principle:

> Keep static-first architecture unless editorial throughput, account features, or moderation workflows require backend migration.

---

## MVP (Foundation)

### Core platform

- [x] RM-MVP-001 Bilingual routing (`/en`, `/bn`) and locale-aware pages
- [x] RM-MVP-002 Event detail pages
- [x] RM-MVP-003 Timeline-first homepage
- [x] RM-MVP-004 Timeline item `Details` action on homepage
- [x] RM-MVP-005 Light/dark theming with persistence
- [x] RM-MVP-006 Color-based theme toggle in header

### Content architecture

- [x] RM-MVP-007 Normalized model: events -> figure IDs
- [x] RM-MVP-007A Normalized model: events -> resource IDs
- [x] RM-MVP-008 Dedicated figure pages (`/{locale}/figures/{id}`)
- [x] RM-MVP-009 Dedicated book pages (`/{locale}/books/{id}`)
- [x] RM-MVP-010 Reverse lookups (`getEventsByFigureId`, `getEventsByBookId`)
- [x] RM-MVP-011 Event figure full-list page (`/{locale}/events/{slug}/figures`)
- [x] RM-MVP-012 Event resources category page (`/{locale}/events/{slug}/resources`)
- [x] RM-MVP-013 Figure index optimization for large lists (`content/figures/index.<locale>.json`)

### UX completeness

- [x] RM-MVP-014 Event page shows top 5 figures + `See full list`
- [x] RM-MVP-015 Interactive timeline progressive loading (`Show more` / `আরও দেখুন`)
- [x] RM-MVP-016 Timeline type badges for typed entries

### Documentation and governance

- [x] RM-MVP-017 Docs moved into `docs/`
- [x] RM-MVP-018 Archive docs organized under `docs/archive/`
- [x] RM-MVP-019 Changelog and roadmap maintained with checkbox trace

---

## Phase v1 (Trust + Comprehension)

Priority: Highest business value for historical understanding.

This phase should make Bengal Unfolded trustworthy, readable, and structurally ready for deeper historical coverage.

### Source trust and evidence

- [x] RM-001 Inline citations on event/timeline claims (timeline claim markers + event narrative claim-level source IDs across all events)
- [x] RM-001A Inline citation starter implemented (foundation milestone; superseded by RM-001 full coverage)
- [x] RM-002 Source quality badges (`Primary`, `Secondary`, `Archive`, `Editorial`) (landmark resource editorial curation completed)
- [x] RM-002A Source quality system foundation (type/model/UI badges/validation + landmark resource backfill)
- [x] RM-003 Glossary pages + term linking (`/{locale}/glossary/[term]`)
- [x] RM-004 Timeline thematic filters (`Language`, `Democracy`, `War`, `Culture`, `Economy`)
- [x] RM-005 Evidence metadata fields (`sourceIds`, `evidenceLevel`) in content model
- [x] RM-006 Section jump navigation on long event pages

### Timeline hierarchy and discovery

- [x] RM-006A Timeline importance levels (`landmark`, `major`, `high`, `medium`, `reference`)
- [x] RM-006B Homepage landmark timeline limit with `Explore Full Timeline` CTA
- [x] RM-006C Full timeline explorer page with search, filters, and pagination
- [x] RM-006D Parent-child event clustering (`parentEvent`, `children`, `relatedEvents`)
- [x] RM-006E Sensitive event metadata (`sensitive`, `contentWarnings`, `requiresSources`)

### Relationship-first memory model

- [x] RM-REL-001 Cause/effect fields in event content model
- [x] RM-REL-002 Related event relationship types (`cause`, `effect`, `parallel`, `background`, `legacy`, `contrast`)
- [x] RM-REL-003 Event detail page relationship section
- [x] RM-REL-004 `Before this / After this` event navigation
- [x] RM-REL-005 `Why this matters` contextual explanation block
- [x] RM-REL-006 Period-to-event linking
- [x] RM-REL-007 Movement/theme-to-event linking
- [ ] RM-REL-008 Figure-to-event timeline view
- [ ] RM-REL-009 Place-to-event timeline view
- [ ] RM-REL-010 Book/resource-to-event reverse mapping
- [ ] RM-REL-011 Long-term legacy fields for major events
- [ ] RM-REL-012 Cultural impact fields for selected events
- [ ] RM-REL-013 Identity and memory notes for major historical moments

### Historical truth and reference quality

- [ ] RM-TRUTH-001 Claim-level citation model
- [ ] RM-TRUTH-002 Source reliability rubric
- [ ] RM-TRUTH-003 Primary vs secondary source distinction
- [ ] RM-TRUTH-004 Contested history marker
- [ ] RM-TRUTH-005 Historical debate explanation block
- [ ] RM-TRUTH-006 Editorial neutrality guideline
- [ ] RM-TRUTH-007 Sensitive political history writing guideline
- [ ] RM-TRUTH-008 Version history for major event pages
- [ ] RM-TRUTH-009 Correction request workflow
- [ ] RM-TRUTH-010 Public methodology page

### Recommended v1 behavior

Landing page should show only curated landmark events, for example 12-15 events. The full timeline page should show all events with search, filters, and pagination.

```txt
Landing Page
  ↓
15 landmark events
  ↓
Explore Full Timeline
  ↓
Timeline Explorer
  ↓
Search + Filter + Pagination
```

Recommended filter fields:

```txt
Period
Category
Importance
Century
View mode
```

Recommended view modes:

```txt
Simple   → landmark only
Detailed → landmark + major + high
Expert   → all events
```

---

## Phase v1.5 (Sharing + Distribution)

Priority: Improve discoverability and social distribution with minimal architecture change.

### Social sharing baseline

- [ ] RM-SHARE-001 Social metadata baseline for event/figure/book pages (`title`, `description`, `image`)
- [ ] RM-SHARE-002 Dynamic Open Graph image generation per content type (localized EN/BN)
- [ ] RM-SHARE-003 Share action UI on detail pages (copy link + native share where available)
- [ ] RM-SHARE-004 Canonical URL and locale-aware metadata consistency checks
- [ ] RM-SHARE-005 Optional downloadable share card images for manual posting
- [x] RM-SHARE-006 Dynamic topic hubs and cluster linking (`/{locale}/topics`, `/{locale}/topics/{slug}`) with sitemap and multi-entity internal links

---

## Phase v2 (Discovery + Guided Learning)

Priority: Increase depth, retention, and guided learning.

This phase should make Bengal Unfolded feel like a structured learning platform, similar in spirit to roadmap-style learning, but focused on Bengal history and culture.

### Existing planned items

- [ ] RM-007 Compare events view (`/{locale}/compare`)
- [ ] RM-008 Learning paths (`beginner`, `student`, `researcher`, `exam-prep`)
- [ ] RM-009 Knowledge checks (short quizzes)
- [ ] RM-010 Content density controls (`quick read` vs `deep read`)
- [ ] RM-011 Glossary hover/tooltips in narrative content

### Roadmap-style learning additions

- [ ] RM-011A Learning path detail pages (`/{locale}/paths/[slug]`)
- [ ] RM-011B Roadmap-style step UI for history topics
- [ ] RM-011C Local progress tracking with `localStorage`
- [ ] RM-011D Basic learning badges without account dependency
- [ ] RM-011E Recommended next topic engine based on completed path
- [ ] RM-011F Topic difficulty labels (`beginner`, `intermediate`, `advanced`)

### Visualization-first learning model

- [ ] RM-VIS-001 Visual event cards with timeline, place, figures, and source indicators
- [ ] RM-VIS-002 Cause -> event -> effect visual chain
- [ ] RM-VIS-003 Before/after event navigation cards
- [ ] RM-VIS-004 Relationship graph for event detail pages
- [ ] RM-VIS-005 Period-based visual grouping on timeline explorer
- [ ] RM-VIS-006 Theme-colored timeline lanes
- [ ] RM-VIS-007 Figure-event connection visualization
- [ ] RM-VIS-008 Book/source-to-event connection visualization
- [ ] RM-VIS-009 Place-event mini map on event pages
- [ ] RM-VIS-010 Visual learning path roadmap UI
- [ ] RM-VIS-011 Event comparison visual layout
- [ ] RM-VIS-012 Animated historical flow prototype for one flagship topic
- [ ] RM-VIS-013 Visual source confidence indicator
- [ ] RM-VIS-014 Visual `historical debate / contested interpretation` marker
- [ ] RM-VIS-015 Cultural memory visual blocks for identity, language, literature, and movements

### Cultural knowledge platform

- [ ] RM-CULT-001 Culture topic pages: language, literature, music, art, education, religion, festivals, institutions
- [ ] RM-CULT-002 Cultural figures and institution profiles
- [ ] RM-CULT-003 Culture-to-event linking
- [ ] RM-CULT-004 Literature-to-history linking
- [ ] RM-CULT-005 Language and identity learning path
- [ ] RM-CULT-006 Cultural map of Bengal
- [ ] RM-CULT-007 Glossary of cultural terms
- [ ] RM-CULT-008 Timeline of cultural movements
- [ ] RM-CULT-009 Diaspora culture section
- [ ] RM-CULT-010 Cultural preservation archive

### Example learning paths

```txt
Understand Ancient Bengal
Understand Bengal Sultanate
Understand Colonial Bengal
Understand 1947 Partition
Understand Language Movement
Understand Liberation War 1971
Understand Post-1971 Bangladesh Politics
Understand Bengal Literature and Culture
```

### Example path structure

```txt
Learning Path: Understand 1947 Partition

Step 1: Background of British India
Step 2: Lahore Resolution 1940
Step 3: Direct Action Day 1946
Step 4: Mountbatten Plan 1947
Step 5: Partition of Bengal
Step 6: Migration and violence
Step 7: Long-term impact on East Bengal
Step 8: Knowledge check
Step 9: Recommended sources and books
```

### Example badges

```txt
Bengal Beginner
Partition Explorer
Language Movement Learner
Liberation War Reader
Map Explorer
Source Checker
Archive Reader
Timeline Master
Culture Explorer
Research Contributor
```

---

## Phase v3 (Reader + Institutional Utility)

Priority: Classroom, research, archive, and reading usability.

This phase should support students, teachers, researchers, and serious readers.

### Existing planned items

- [ ] RM-012 Print/export classroom pack (PDF/print-friendly)
- [ ] RM-013 Sensitive-content handling (`contentWarnings`, display gates)
- [ ] RM-014 Structured citation export (copy-ready reference formats)
- [ ] RM-015 Curated source collections and reading bundles

### Online reader and archive additions

- [ ] RM-015A Online book/resource reader shell
- [ ] RM-015B Reading progress for books/resources using `localStorage`
- [ ] RM-015C Bookmark and continue-reading UX
- [ ] RM-015D Book/resource table of contents
- [ ] RM-015E Book-to-event linking (`bookId -> eventIds`, `chapterId -> eventIds`)
- [ ] RM-015F Public-domain/licensed-resource policy page

### Authenticated resource hub

- [ ] RM-HUB-001 Resource library landing page
- [ ] RM-HUB-002 Filter resources by type: book, article, document, archive, map, speech, video, audio, photo, dataset
- [ ] RM-HUB-003 Resource detail pages with citation metadata
- [ ] RM-HUB-004 Public-domain/licensed-resource policy enforcement
- [ ] RM-HUB-005 Personal reading list for authenticated users
- [ ] RM-HUB-006 Saved sources and private collections
- [ ] RM-HUB-007 Institution/teacher curated resource bundles
- [ ] RM-HUB-008 Archive partner attribution fields
- [ ] RM-HUB-009 Source request / missing source suggestion form
- [ ] RM-HUB-010 Resource verification status

### Reader feature ideas

```txt
Continue reading
Reading progress
Bookmarks
Highlights
Notes
Search inside book
Chapter navigation
Related events from book
Related people from book
Citation export
```

### Copyright and resource policy

Only publish full readable books/resources when they are:

```txt
Public domain
Owned by Bengal Unfolded / FactLens / partner organizations
Licensed with permission
Open access with allowed redistribution
```

For copyrighted books without permission, keep only:

```txt
Metadata
Summary
Topic mapping
External official/archive link
Citation information
```

---

## Phase v4 (Interactive History)

Priority: Make history visually explorable after trust and learning foundations are stable.

This phase should introduce animated and map-based historical exploration without turning sensitive history into entertainment.

### Interactive map and animation MVP

- [ ] RM-016A Static geo-linked places in event pages
- [ ] RM-016B Map view for events with known locations
- [ ] RM-016C Animated timeline prototype for one flagship event
- [ ] RM-016D Movement/migration/war-step JSON schema
- [ ] RM-016E Scrollytelling prototype for one major topic
- [ ] RM-016F Map legend, source note, and approximation labels

### Suggested first interactive topics

```txt
1. 1971 Liberation War interactive timeline + map
2. 1947 Partition migration map
3. 1952 Language Movement route/story view
4. 1990 Mass Uprising spread
5. Bengal Renaissance institutions and idea spread
```

### Animation types

```txt
Animated map movement
Animated timeline story
Scrollytelling
Migration flow
Protest spread
War movement
Territorial or political change over time
```

### Historical visualization caution

Every visual movement should be:

```txt
Source-backed
Respectful
Clearly labeled
Educational, not game-like
Approximate where exact records vary
```

Recommended note for animated maps:

```txt
This visualization is an educational interpretation based on available historical sources. Some routes, locations, or sequences may be approximate where exact historical records vary.
```

---

## Final Phase (Strategic Extensions)

Priority: Add only after editorial quality and moderation maturity.

These features require stronger governance, moderation, backend infrastructure, and source quality controls.

### Existing strategic items

- [ ] RM-017 Oral-history module (audio/video + transcript UX)
- [ ] RM-018 Contributor workflow with moderation queue
- [ ] RM-019 Advanced search upgrade if static search is insufficient
- [ ] RM-020 AI-assisted Q&A with strict citation grounding

AI features must not answer from unsourced historical content. Any AI-assisted Q&A must be citation-grounded, source-aware, and clearly distinguish confirmed fact, interpretation, and contested history.

### Account, community, and institutional additions

- [ ] RM-021 User accounts and reader profiles
- [ ] RM-022 Cloud-synced progress, bookmarks, and badges
- [ ] RM-023 Contributor submission dashboard
- [ ] RM-024 Editorial review and version history
- [ ] RM-025 Public API for events, people, places, and sources
- [ ] RM-026 Institution/classroom dashboard
- [ ] RM-027 Premium research workspace

### Intellectual community platform

- [ ] RM-COM-001 Researcher profile pages
- [ ] RM-COM-002 Contributor profile pages
- [ ] RM-COM-003 Topic-based discussion spaces
- [ ] RM-COM-004 Moderated historical Q&A
- [ ] RM-COM-005 Expert commentary attached to events
- [ ] RM-COM-006 Reading circles or study groups
- [ ] RM-COM-007 Institution and educator profiles
- [ ] RM-COM-008 Public contributor recognition
- [ ] RM-COM-009 Editorially reviewed community submissions
- [ ] RM-COM-010 Community moderation policy

### Future user roles

```txt
Visitor
Registered Reader
Contributor
Research Volunteer
Editor
Reviewer
Admin
```

### Contribution workflow

```txt
User submission
  ↓
Editorial queue
  ↓
Source verification
  ↓
Reviewer approval
  ↓
Published version
  ↓
Version history saved
```

---

## Revenue Roadmap

Revenue should not weaken trust. Bengal Unfolded should remain educational and source-first.

### Early revenue options

- [ ] REV-001 Donation/support section
- [ ] REV-002 bKash/Nagad support option for Bangladesh audience
- [ ] REV-003 Diaspora support option through international payment provider
- [ ] REV-004 Sponsored research/archive digitization campaigns
- [ ] REV-005 Sponsored learning paths with editorial independence note

### Learning and institutional revenue

- [ ] REV-006 Premium downloadable PDF notes
- [ ] REV-007 Classroom packs for teachers
- [ ] REV-008 Printable historical timelines and maps
- [ ] REV-009 Certificate or verified badge for completed learning paths
- [ ] REV-010 Institution/school dashboard

### Research and archive revenue

- [ ] REV-011 Advanced research workspace
- [ ] REV-012 Citation export and private collections
- [ ] REV-013 Dataset/API access for institutions
- [ ] REV-014 Custom historical visualization or archive projects

### Sponsorship wording guideline

```txt
This learning path is supported by [Sponsor Name]. Editorial independence is maintained by Bengal Unfolded.
```

---

## Recommended Visualization Modes

1. Timeline View
   Chronological flow of events.
2. Geo Map View
   Events connected to places, regions, routes, migrations, protests, battles, institutions, and cultural centers.
3. Relation Graph View
   Event -> figure -> place -> book -> source -> related event.
4. Memory Flow View
   Cause -> event -> effect -> long-term impact.
5. Cultural Map View
   Language, literature, education, religion, art, institutions, movements, and identity formation.
6. Source/Evidence View
   Claims, citations, source quality, primary/secondary/archive/editorial references, and confidence level.

---

## Future Technical Architecture

### Current architecture

```txt
Next.js
Static JSON
Vercel
No backend
```

### Static-first near-term architecture

```txt
Next.js App Router
TypeScript
Static JSON content
Zod schema validation
Local search
localStorage progress
Vercel deployment
GitHub-based content review
```

### Backend-ready future architecture

```txt
Frontend: Next.js on Vercel
Backend: Spring Boot or CMS-backed API
Database: PostgreSQL
Auth: Keycloak or NextAuth
Object storage: Cloudflare R2 or MinIO
Search: Meilisearch / Typesense first, Elasticsearch later if needed
```

### Advanced reference architecture

```txt
Users
  ↓
Next.js Frontend
  ↓
Backend API
  ↓
PostgreSQL + Search Engine + Object Storage
  ↓
Optional Knowledge Graph / Linked Data Layer
```

---

## Recommended Content Model Additions

### Event fields

```json
{
  "importance": "landmark",
  "timelineLevel": 1,
  "showOnHome": true,
  "homeOrder": 1,
  "parentEvent": null,
  "children": [],
  "relatedEvents": [
    {
      "eventId": "example-event",
      "relationType": "background"
    }
  ],
  "causes": [],
  "effects": [],
  "legacy": [],
  "culturalImpact": [],
  "identityMemoryNotes": [],
  "category": ["politics", "language", "war"],
  "themes": ["identity", "democracy"],
  "period": "pakistan-period",
  "places": [],
  "figureIds": [],
  "resourceIds": [],
  "sourceIds": [],
  "evidenceLevel": "well-documented",
  "contested": false,
  "sensitive": false,
  "contentWarnings": []
}
```

### Source fields

```json
{
  "id": "source-001",
  "title": "Example Source Title",
  "sourceType": "primary",
  "publisher": "Archive Name",
  "publicationDate": "1972-01-01",
  "language": ["bn", "en"],
  "url": "",
  "archiveRef": "",
  "reliability": "high",
  "citationFormat": "",
  "notes": ""
}
```

### Resource fields

```json
{
  "id": "resource-001",
  "resourceType": "book",
  "title": "Example Book",
  "creator": "Author Name",
  "year": 1998,
  "license": "public-domain",
  "accessType": "fulltext",
  "relatedEventIds": [],
  "relatedFigureIds": [],
  "relatedPlaceIds": [],
  "sourceIds": [],
  "verificationStatus": "verified"
}
```

### Place fields

```json
{
  "id": "dhaka",
  "name": "Dhaka",
  "type": "city",
  "region": "Bangladesh",
  "coordinates": {
    "lat": 23.8103,
    "lng": 90.4125
  },
  "relatedEventIds": [],
  "historicalNotes": []
}
```

### Theme fields

```json
{
  "id": "identity",
  "name": "Identity",
  "description": "Theme-level grouping for memory and interpretation.",
  "relatedEventIds": [],
  "relatedFigureIds": [],
  "relatedResourceIds": []
}
```

### Sensitive event example

```json
{
  "id": "assassination-sheikh-mujibur-rahman-1975",
  "importance": "major",
  "timelineLevel": 2,
  "showOnHome": false,
  "parentEvent": "post-liberation-political-crisis-1975",
  "sensitive": true,
  "contentWarnings": ["political violence"],
  "requiresSources": true,
  "evidenceLevel": "well-documented"
}
```

### Homepage cluster example

```json
{
  "id": "post-liberation-political-crisis-1975",
  "importance": "landmark",
  "timelineLevel": 1,
  "showOnHome": true,
  "homeOrder": 13,
  "children": [
    "assassination-sheikh-mujibur-rahman-1975",
    "jail-killing-1975",
    "november-1975-political-transition"
  ]
}
```

### LearningPath fields

```json
{
  "id": "partition-1947",
  "title_bn": "১৯৪৭ সালের দেশভাগ বুঝুন",
  "title_en": "Understand the 1947 Partition",
  "level": "beginner",
  "estimatedReadTime": "2 hours",
  "steps": [
    {
      "title": "Background of British India",
      "type": "article",
      "slug": "background-of-british-india"
    },
    {
      "title": "Lahore Resolution 1940",
      "type": "event",
      "slug": "lahore-resolution-1940"
    },
    {
      "title": "Knowledge Check",
      "type": "quiz",
      "slug": "partition-basic-quiz"
    }
  ]
}
```

### CommunityProfile fields

```json
{
  "id": "profile-001",
  "role": "researcher",
  "displayName": "Example Researcher",
  "bio": "",
  "institution": "",
  "topics": [],
  "contributions": [],
  "verificationStatus": "pending"
}
```

### Claim fields

```json
{
  "id": "claim-001",
  "eventId": "example-event",
  "statement": "Example historical claim.",
  "sourceIds": [],
  "confidence": "high",
  "claimType": "fact",
  "contested": false,
  "interpretationNotes": "",
  "reviewStatus": "editorial-reviewed"
}
```

### Animated movement fields

```json
{
  "id": "liberation-war-1971-map",
  "title": "Liberation War 1971 Interactive Map",
  "steps": [
    {
      "date": "1971-03-25",
      "title": "Operation Searchlight",
      "description": "Military crackdown begins",
      "locations": [
        {
          "name": "Dhaka",
          "lat": 23.8103,
          "lng": 90.4125
        }
      ],
      "arrows": [],
      "regions": [],
      "sourceIds": []
    }
  ]
}
```

---

## Execution Notes

1. Keep static-first architecture unless editorial throughput forces backend migration.
2. Ship v1 trust features before v2 engagement features.
3. Do not add many new events before relation and source models are stable.
4. Add timeline hierarchy before adding large numbers of detailed events.
5. Every landmark event should have source metadata.
6. Every major event should have relation metadata.
7. Every sensitive event should have neutral wording and strong sources.
8. Visualization must be educational, respectful, and source-backed.
9. Community features require moderation policy first.
10. Authenticated features should be added only when local/static progress becomes insufficient.
11. Resource hub must respect copyright and licensing.
12. AI features must depend on citation and source trust foundation.
13. Any AI/search expansion must depend on RM-001, RM-002, and RM-005 completion.
14. Update this file by toggling checkboxes only.
15. Add a dated entry in `docs/CHANGELOG.md` when items move to done.

---

## Immediate Next Sprint Recommendation

Recommended next sprint items:

- [x] RM-001 Inline citations on event/timeline claims
- [x] RM-002 Source quality badges
- [x] RM-005 Evidence metadata fields
- [x] RM-006A Timeline importance levels
- [x] RM-006D Parent-child event clustering
- [x] RM-REL-001 Cause/effect fields in event content model
- [x] RM-REL-002 Related event relationship types (`cause`, `effect`, `parallel`, `background`, `legacy`, `contrast`)
- [ ] RM-VIS-001 Visual event cards with timeline, place, figures, and source indicators
- [ ] RM-VIS-002 Cause -> event -> effect visual chain
- [ ] RM-VIS-003 Before/after event navigation cards
- [ ] RM-VIS-009 Place-event mini map on event pages
- [ ] RM-TRUTH-010 Public methodology page

Reason:

The next sprint should establish Bengal Unfolded's foundation as a visual, source-backed, relationship-based learning and historical truth platform before adding too many events or community features.
