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

## Two-Stage Delivery Strategy

### Stage 1: Frontend-only (Current focus)

Priority: Build audience, establish SEO authority, and gather real user behaviour data before investing in backend infrastructure.

```txt
Grow organic traffic (SEO)
  ↓
Understand user behaviour (Google Analytics + PostHog)
  ↓
Validate content quality and reader interest areas
  ↓
Establish bilingual discoverability in Bengali and English
  ↓
Generate clear product signals for Stage 2 priorities
```

Core principle for Stage 1:

> Do not build backend features until analytics data confirms what users actually need — not what you assume they need.

Key Stage 1 outputs before proceeding to Stage 2:

```txt
SEO rankings for Bengali history search queries
Organic traffic baseline (monthly active readers)
Top events and figures by engagement
EN vs BN reader ratio
Mobile vs desktop ratio
User drop-off points on long event pages
Search query data (what users look for that doesn't exist yet)
```

> Pre-backend scope boundary: The following categories of features must not be built
> in the static phase regardless of how they are framed:
>
> - Any progress tracking intended to persist across sessions or devices
> - Any badge award or unlock logic
> - Any personalised recommendation engine
> - Any correction or contribution queue requiring an editorial inbox
> - Any version history requiring DB diffs or author attribution
> - Any graph explorer requiring more than 1-degree static relationship display
>
> If a feature in v1–v2 starts to resemble any of the above, defer it to the
> appropriate backend phase rather than approximating it with localStorage or
> client-side state.

### Stage 2: Backend Platform (Future)

Priority: Build auth, user engagement, contribution, and revenue infrastructure — sequenced by dependency, not by ambition. Each phase must be stable before the next begins.

```txt
B1: Auth + User Foundation          ← foundation, everything else depends on this
  ↓
B2: Read Tracking + Habit Engine    ← first user-facing backend feature, low risk
  ↓
B3: Learning Paths + Badges         ← depends on read tracking data
  ↓
B4: Highlights + Annotations + Collections  ← personal engagement, no moderation risk
  ↓
B5: Community + Contribution        ← requires editorial policy and moderation first
  ↓
B6: Monetisation Infrastructure     ← only after active user base is proven
  ↓
B7: Educator + Institutional Platform  ← runs parallel to B6
  ↓
B8: Advanced Search + AI            ← only when content trust is mature
  ↓
B9: Research API + Data Platform    ← final revenue and institutional layer
```

Warning for Phase B5: Do not begin community and contribution features until a written editorial policy and a moderation workflow are in place. A sourced history platform that accepts bad edits loses credibility permanently. Governance must come before the code.

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
- [x] RM-REL-008 Figure-to-event timeline view
- [x] RM-REL-009 Place-to-event timeline view
- [x] RM-REL-010 Book/resource-to-event reverse mapping
- [x] RM-REL-011 Long-term legacy fields for major events
- [x] RM-REL-012 Cultural impact fields for selected events
- [x] RM-REL-013 Identity and memory notes for major historical moments

### Historical truth and reference quality

- [x] RM-TRUTH-001 Claim-level citation model
- [ ] RM-TRUTH-002 Source reliability rubric
- [ ] RM-TRUTH-003 Primary vs secondary source distinction
- [x] RM-TRUTH-004 Contested history marker
- [x] RM-TRUTH-005 Historical debate explanation block
- [ ] RM-TRUTH-006 Editorial neutrality guideline
- [ ] RM-TRUTH-007 Sensitive political history writing guideline
- [ ] RM-TRUTH-008 Version history for major event pages — shifted to B5 (covered by RB-COM-010); requires DB diffs, timestamps, and author attribution — not a static JSON feature
- [ ] RM-TRUTH-009 Correction request workflow — shifted to B5 (covered by RB-COM-001 to RB-COM-003); use a Tally or Typeform embed as placeholder until editorial queue infrastructure exists
- [x] RM-TRUTH-010 Public methodology page

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
- [x] RM-SHARE-002 Dynamic Open Graph image generation per content type (localized EN/BN)
- [x] RM-SHARE-003 Share action UI on detail pages (copy link + native share where available)
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
- [ ] RM-009 Knowledge checks — deferred to B3 (RB-LEARN-005); in v2 use Typeform/Google Form placeholder for "Test your understanding" prompts; static quiz without score storage creates dead-end implementation
- [ ] RM-010 Content density controls (`quick read` vs `deep read`)
- [ ] RM-011 Glossary hover/tooltips in narrative content

### Roadmap-style learning additions

> Scope constraint: localStorage progress, badge award logic, and recommendation engine
> are intentionally deferred to B3. In v2, build path structure and UI only. Do not
> implement persistence, badge awards, or cross-session state in the static phase.

- [ ] RM-011A Learning path detail pages (`/{locale}/paths/[slug]`)
- [ ] RM-011B Roadmap-style step UI for history topics with visual learning path display
- [ ] RM-011F Topic difficulty labels (`beginner`, `intermediate`, `advanced`)

**Removed from v2 (violate pre-backend scope boundary):**
- ~~RM-011C Local progress tracking~~ → deferred to B3 (RB-LEARN-003)
- ~~RM-011D Learning badge display~~ → deferred to B3 (RB-LEARN-010/011); badges without accounts have no value
- ~~RM-011E Static "what to read next" suggestion~~ → deferred to B3 (RB-LEARN-014); use "Browse all paths" link instead of hardcoded logic

### Visualization-first learning model

- [ ] RM-VIS-001 Visual event cards with timeline, place, figures, and source indicators
- [ ] RM-VIS-002 Cause -> event -> effect visual chain
- [ ] RM-VIS-003 Before/after event navigation cards
- [ ] RM-VIS-004 Relationship graph for event detail pages
- [ ] RM-VIS-005 Period-based visual grouping on timeline explorer
- [ ] RM-VIS-006 Figure-event connection visualization
- [ ] RM-VIS-007 Book/source-to-event connection visualization
- [ ] RM-VIS-008 Place-event mini map on event pages
- [ ] RM-VIS-009 Event comparison visual layout
- [ ] RM-VIS-010 Animated historical flow prototype for one flagship topic
- [ ] RM-VIS-011 Visual source confidence indicator
- [ ] RM-VIS-012 Visual `historical debate / contested interpretation` marker
- [ ] RM-VIS-013 Cultural memory visual blocks for identity, language, literature, and movements

**Removed from v2:**
- ~~Theme-colored timeline lanes~~ → removed; events span multiple themes simultaneously (Language Movement = language + identity + democracy + culture); use theme filter badges (RM-004) instead
- ~~Visual learning path roadmap UI~~ → merged into RM-011B

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

**Removed from v2:**
- ~~RM-CULT-010 Cultural preservation archive~~ → deferred to B9; this is an entire product vertical (digitization workflows, copyright clearance, partner agreements, separate content model), not a single checkbox feature; replace with archive partnership strategy in B9

### Historical knowledge graph and relational learning system

Priority: Build scalable, source-backed historical intelligence using normalized entities, relationship semantics, and visual exploration. **Scope constraint:** Static phase supports 1-degree relationships only. Multi-hop graph queries, dynasty/alliance models, and interactive graph views require database-backed infrastructure (B8/B9).

- [ ] RM-KG-001 Normalized historical entity relationship model across events, figures, places, books/resources, themes, periods, and institutions (1-degree relationships only in v2)
- [ ] RM-KG-002 Linked entity edges (`figure <-> event`, `event <-> place`, `figure <-> resource`, `theme <-> event`) with relation-type taxonomy
- [ ] RM-KG-003 Historical metadata schema for relationship provenance, temporal scope, geographic scope, and editorial status
- [ ] RM-KG-004 Related figures and related events system with weighted relevance and relationship context
- [ ] RM-KG-005 Historical territory/location mapping with time-aware boundary/region references and approximation labels
- [ ] RM-KG-006 Source attribution system at relationship-edge level (not only entity/page level)
- [ ] RM-KG-007 Evidence confidence system for entities and relationships (`high`, `medium`, `low`, `disputed`, `unknown`)
- [ ] RM-KG-008 Primary vs secondary source classification rules enforced in relation and claim metadata
- [ ] RM-KG-009 Glossary and historical terminology system connected to entities, periods, and contested concepts
- [ ] RM-KG-010 `Explore Next` recommendation engine — static related-events display only in v2 (covered by RM-REL-003); personalised engine shifted to B3 after read tracking exists; ML-powered version shifted to B8
- [ ] RM-KG-011 Thematic learning paths generated from graph-linked events, figures, places, and sources
- [ ] RM-KG-012 Cross-era historical linking (idea continuity, policy legacy, institutional inheritance, recurring conflicts)
- [ ] RM-KG-013 Historical debate/disputed interpretation section backed by competing sourced viewpoints
- [ ] RM-KG-014 Entity preview cards and hover previews with key metadata, relation summary, and source indicators
- [ ] RM-KG-015 Map-based exploration mode connecting events, routes, institutions, and cultural centers to graph entities

**Removed from v2 (require graph database or expert authoring overhead with minimal reader value):**
- ~~Dynasty/family relationship model~~ → removed or deferred to B9; requires expert historical judgment on every edge, high authoring cost, minimal reader value (family relationships that explain events belong in narrative prose)
- ~~Alliance/rivalry relationship model~~ → removed or deferred to B9; same issues as dynasty model, plus politically loaded terms for contested history
- ~~Timeline participation linking~~ → removed; redundant with `figureIds` on events; if role context matters for specific event, write it in narrative
- ~~Quote/archive reference support~~ → deferred to B9 (Research API); third citation layer on top of `sourceIds` and claim-level citations, academic-researcher tool not general reader feature
- ~~Graph-based navigation~~ → already shifted to B8/B9 in notes, checkbox removed from v2
- ~~Interactive relationship graph view~~ → already shifted to B8/B9 in notes, checkbox removed from v2

### Relationship ID migration and compatibility

- [ ] RM-KG-ID-001 Replace remaining plain-text relationship references with entity ID arrays where applicable
- [ ] RM-KG-ID-002 Standardize forward/reverse relationship fields: `relatedFigureIds`, `relatedEventIds`, `locationIds`, `themeIds`, `resourceIds`, `sourceIds`
- [ ] RM-KG-ID-003 Add canonical relationship object shape: `{ targetId, targetType, relationType, startDate, endDate, sourceIds, confidence, contested }`
- [ ] RM-KG-ID-004 Enforce ID referential integrity in `scripts/validate-content.mjs` (missing IDs, circular links, orphan nodes, invalid relation types)
- [ ] RM-KG-ID-005 Update `src/types/content.ts` and `docs/CONTENT_MODEL.md` to require ID-based relationship contracts for all new relational fields

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
- [ ] RM-015B Reading progress for books/resources — shifted to B2 (server-persisted alongside RB-READ-001/002); localStorage version not worth building for a cross-device diaspora and mobile audience
- [ ] RM-015C Bookmark and continue-reading UX — shifted to B2 (server-persisted); until then show copy-link button only so users can save URLs manually
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

### Time-aware historical maps and spatial visualization

Priority: Evolve from static map visuals to timeline-aware, source-backed, structured spatial learning. **Scope constraint:** Build map MVP (RM-MAP-001 to RM-MAP-006) first, stabilize with at least two flagship layers, then add advanced features.

- [ ] RM-MAP-001 Event-location mapping system linking events to one or many historical locations
- [ ] RM-MAP-002 Time-aware historical maps with date/year-sensitive spatial state changes
- [ ] RM-MAP-003 Multiple map layers per event (base geography, movement, territory, context overlays)
- [ ] RM-MAP-004 Location points linked to entities (`events`, `figures`, `books/resources`, `themes`)
- [ ] RM-MAP-005 Route visualization model for migration, campaigns, trade, travel, invasion, resistance, and political movement
- [ ] RM-MAP-006 Territory/polygon support for changing boundaries, control zones, and influence regions
- [ ] RM-MAP-007 Map timeline slider for chronological exploration
- [ ] RM-MAP-008 Year/date-based map state transitions with source-linked annotations
- [ ] RM-MAP-009 Related event and figure overlays on map view
- [ ] RM-MAP-010 Place detail pages with timeline context and reverse-linked events/figures/resources
- [ ] RM-MAP-011 Clickable locations that deep-link to events, figures, books/resources, and themes
- [ ] RM-MAP-012 Historical layer taxonomy: battle, empire, migration, trade, political, cultural, religious, economic, administrative
- [ ] RM-MAP-013 Source attribution required for every map layer and major geometry change
- [ ] RM-MAP-014 Evidence confidence model for uncertain historical geography (`high`, `medium`, `low`, `disputed`, `approximate`)
- [ ] RM-MAP-015 Disputed boundary and approximate-location rendering rules
- [ ] RM-MAP-016 Map-based `Explore Next` flow using nearby/related entities and timeline adjacency
- [ ] RM-MAP-017 GeoJSON-compatible storage and ingestion path for structured spatial data
- [ ] RM-MAP-018 Responsive map UX patterns for mobile-first learners

**Deferred (premature for v4):**
- ~~Map comparison mode~~ → deferred until RM-MAP-001 to RM-MAP-006 are stable and at least two flagship map layers exist with verified sources; requires two fully accurate historical layers with disputed boundary rendering
- ~~Admin/content model support for map authoring~~ → moved to B7 (RB-EDU-013); requires authenticated dashboard, review workflow, role-based access — backend feature, not v4 frontend feature

### Spatial data architecture note

Recommended direction: store historical maps as structured data, not static images, so timeline state, overlays, evidence metadata, and relation links remain queryable and maintainable.

Suggested field direction for future compatibility:

```txt
locationIds
mapLayerIds
routeIds
territoryIds
timeRange
geoJsonRef
evidenceLevel
sourceIds
```

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

## Stage 2: Backend Platform

Detailed phase breakdown for the backend platform. These phases expand on the high-level items in the Final Phase section above (RM-021 to RM-027, RM-COM-001 to RM-COM-010) and Phase v3 (authenticated resource hub, reader features). Each phase has its own completion criteria aligned with the AI Integration Completion Criteria defined above.

---

### Phase B1 — Auth and User Foundation

Priority: Highest. Nothing in Stage 2 works without this. Ship nothing else in backend until auth is solid and stable.

- [ ] RB-AUTH-001 User registration with email and password
- [ ] RB-AUTH-002 Google OAuth login
- [ ] RB-AUTH-003 Magic link login (passwordless, lower friction for casual readers)
- [ ] RB-AUTH-004 Email verification flow
- [ ] RB-AUTH-005 Password reset flow
- [ ] RB-AUTH-006 User profile page (`/{locale}/profile`)
- [ ] RB-AUTH-007 Avatar, display name, and bio on profile
- [ ] RB-AUTH-008 Language preference and theme preference saved to account
- [ ] RB-AUTH-009 Account settings page (email, notifications, privacy)
- [ ] RB-AUTH-010 Session management and secure logout
- [ ] RB-AUTH-011 Delete account with data removal (GDPR compliance)
- [ ] RB-AUTH-012 Role system (`visitor`, `reader`, `contributor`, `editor`, `admin`)
- [ ] RB-AUTH-013 Role-based access control enforced at API and page level

Expands: RM-021 (user accounts and reader profiles)

---

### Phase B2 — Read Tracking and Habit Engine

Priority: First user-facing backend feature after auth. Low risk, high signal. Generates the behavioural data that every later phase depends on.

- [ ] RB-READ-001 Mark event as read (server-persisted, replaces localStorage fallback)
- [ ] RB-READ-002 Reading progress per event (scroll depth tracking)
- [ ] RB-READ-003 Reading history page (`/{locale}/profile/history`)
- [ ] RB-READ-004 Reading streak counter (consecutive active days)
- [ ] RB-READ-005 Streak protection grace period (miss one day without losing streak)
- [ ] RB-READ-006 "On this day in Bengal" daily feature (auto-surfaced events by date)
- [ ] RB-READ-007 "Continue where you left off" personalised section on homepage
- [ ] RB-READ-008 Reading stats dashboard (events read, figures explored, eras covered)
- [ ] RB-READ-009 Weak era detection ("You have not read much about the Sultanate period")
- [ ] RB-READ-010 Reading time estimates displayed per event
- [ ] RB-READ-011 Weekly reading summary email digest (opt-in)
- [ ] RB-READ-013 Reading progress for books/resources (migrated from RM-015B; server-persisted scroll depth per book/resource per user)
- [ ] RB-READ-014 Bookmark and continue-reading UX (migrated from RM-015C; server-persisted bookmarks replacing manual copy-link placeholder)

**Deferred to post-B6:**
- ~~RB-READ-012 Daily history card push notification~~ → deferred until proven active user base exists; web push has 2-5% opt-in rates, high engineering cost relative to engagement for early-stage platform; prioritize email digest (RB-READ-011) instead

Expands: RM-022 (cloud-synced progress and bookmarks)

---

### Phase B3 — Learning Paths and Badges

Priority: Core engagement and retention mechanic. Depends on read tracking being stable.

- [ ] RB-LEARN-001 Learning path data model (steps, events, quizzes, difficulty)
- [ ] RB-LEARN-002 Learning path detail pages (`/{locale}/paths/[slug]`)
- [ ] RB-LEARN-003 Path enrolment and server-persisted progress tracking (replaces localStorage approach from removed RM-011C)
- [ ] RB-LEARN-004 Step completion tracking with visual roadmap UI
- [ ] RB-LEARN-005 Knowledge quiz engine (3 to 5 questions per event or path step; replaces static quiz from RM-009)
- [ ] RB-LEARN-006 Quiz result storage and scoring history
- [ ] RB-LEARN-007 Bangladesh SSC and HSC national curriculum topic tagging on events
- [ ] RB-LEARN-008 Curriculum-aligned learning paths for exam preparation
- [ ] RB-LEARN-009 Difficulty labels (`beginner`, `intermediate`, `advanced`) on paths
- [ ] RB-LEARN-010 Badge award system (path completion, streak milestones, era mastery; replaces badge display from removed RM-011D)
- [ ] RB-LEARN-011 Badge display on public profile page
- [ ] RB-LEARN-012 Shareable badge card (generated image for social sharing)
- [ ] RB-LEARN-013 Completion certificate (printable PDF, institution-branded option)
- [ ] RB-LEARN-014 Recommended next path engine (based on completed steps and weak eras; replaces hardcoded editorial picks from removed v2 static recommendations)
- [ ] RB-LEARN-015 Path discovery page (`/{locale}/paths`) with filter by level and theme

**Removed (migration duplicates):**
- ~~RB-LEARN-016~~ → duplicate of RB-LEARN-003
- ~~RB-LEARN-017~~ → duplicate of RB-LEARN-010
- ~~RB-LEARN-018~~ → duplicate of RB-LEARN-014

Expands: RM-008 (learning paths), RM-011A to RM-011F (roadmap-style step UI, local progress, badges, recommendations)

---

### Phase B4 — Highlights, Annotations, and Collections

Priority: Personal engagement layer with no moderation risk. Private by default.

- [ ] RB-NOTE-001 Highlight text on event pages (saved per user, server-persisted)
- [ ] RB-NOTE-002 Private annotation on highlights
- [ ] RB-NOTE-003 Public annotation option (goes to moderation queue before visible to others)
- [ ] RB-NOTE-004 Personal research notebook (`/{locale}/profile/notebook`)
- [ ] RB-NOTE-005 Tag and organise highlights by theme or era
- [ ] RB-NOTE-006 Export notebook as formatted PDF
- [ ] RB-NOTE-007 Bookmark events and figures for later reading
- [ ] RB-NOTE-008 Reader collections ("My 1971 Reading List", "Partition Sources")
- [ ] RB-NOTE-009 Public collections with shareable link
- [ ] RB-NOTE-010 Collection discovery page (curated and community collections)
- [ ] RB-NOTE-011 Citation export per event, figure, or resource (Chicago, APA, MLA formats)
- [ ] RB-NOTE-012 "Cite this page" one-click button on all content pages
- [ ] RB-NOTE-013 "Share with family" printable one-page event summary (Bengali font, clean print layout)

Expands: RM-015B (reading progress), RM-015C (bookmarks and continue reading), RM-HUB-005 (personal reading list), RM-012 (print/export), RM-014 (citation export)

---

### Phase B5 — Community and Contribution

Priority: Highest governance risk. Do not begin this phase until a written editorial policy and a staffed moderation workflow exist. Governance first, code second.

#### Pre-requisite checklist before starting B5

```txt
[ ] Written editorial neutrality policy published
[ ] Written sensitive history writing policy published
[ ] At least one editor committed to reviewing submissions daily
[ ] Moderation queue infrastructure ready (internal dashboard)
[ ] Correction and source request forms designed
[ ] Abuse reporting and escalation flow documented
```

#### Contribution features

- [ ] RB-COM-001 Structured correction request form ("I think this detail needs a source")
- [ ] RB-COM-002 Source suggestion form (suggest a missing primary source for an event)
- [ ] RB-COM-003 Editorial inbox for all correction and source requests
- [ ] RB-COM-004 Moderated discussion threads per event (curated questions, not open comments)
- [ ] RB-COM-005 Reader question submission ("I want to understand X better")
- [ ] RB-COM-006 Expert commentary system (verified historians add a commentary block to events)
- [ ] RB-COM-007 Contributor profile pages (`/{locale}/contributors/[id]`)
- [ ] RB-COM-008 Contribution history and attribution shown on content pages
- [ ] RB-COM-009 Editorial review queue (internal dashboard for editors)
- [ ] RB-COM-010 Content version history for major event pages
- [ ] RB-COM-011 Contributor point system for internal tracking only (points per accepted correction, source, annotation; not publicly ranked)
- [ ] RB-COM-013 Voting on community annotations (`helpful` or `not helpful`, not accuracy voting)
- [ ] RB-COM-014 Abuse report flow with escalation to editor
- [ ] RB-COM-015 Community moderation policy page (public)

**Removed (creates perverse incentives on sourced history platform):**
- ~~RB-COM-012 Contributor leaderboard~~ → removed entirely; leaderboards optimize for volume not accuracy; highest-point contributor is most prolific not most reliable; on platforms where credibility is core value, public ranking creates reputational risk; use editorial badges awarded by editors instead (similar to Wikipedia barnstars)

Voting design note: votes on a history platform must not affect credibility scores. Popular is not the same as accurate. Votes should affect discoverability only, never the evidence level or contested status of a claim.

Expands: RM-018 (contributor workflow), RM-023 (contributor submission dashboard), RM-024 (editorial review and version history), RM-COM-001 to RM-COM-010

---

### Phase B6 — Monetisation Infrastructure

Priority: Build after you have a proven active user base. Do not build a paywall before you have consistent organic traffic.

Signal to look for before starting B6:

```txt
5,000+ monthly active readers
Clear top-20 most-read events
Measurable return visitor rate
Analytics showing users hitting feature gaps (citation export, offline, etc.)
```

#### Subscription tiers

```txt
Free (permanent)
  All bilingual content, timelines, figures, sources, glossary
  No paywall on core history content — this is the mission

Reader Pro (~$3 to $5 per month / ~300 to 500 BDT per month)
  Reading streak and progress tracking
  Personal research notebook and highlight export
  Citation export (Chicago, APA, MLA)
  Offline reading (PWA)
  Ad-free experience
  Monthly deep-dive PDF on one major topic
  Early access to new content

Educator Plan (~$10 to $15 per month or per institution)
  Classroom creation and student progress dashboard
  Quiz assignment and class result view
  Printable classroom packs (timeline, figures, sources per event)
  SSC/HSC curriculum-aligned reading assignments
  Institution certificate for completed paths
  Teacher resource library

Research Workspace (~$20 to $30 per month)
  Private collections with API access
  Advanced citation manager and bulk export
  Dataset export (JSON/CSV)
  Cross-event relationship query tool
  Early access to new source additions
```

#### Implementation items

- [ ] RB-REV-001 Subscription tier model definition and feature gate system
- [ ] RB-REV-002 Stripe integration (international cards, diaspora audience)
- [ ] RB-REV-003 SSLCommerz or ShurjoPay integration (bKash, Nagad, local cards for Bangladesh)
- [ ] RB-REV-004 Reader Pro feature gates (notebook export, citation manager, offline)
- [ ] RB-REV-005 Educator Plan feature gates (classroom, student progress, assignments)
- [ ] RB-REV-006 Research Workspace feature gates (API access, dataset export, bulk citation)
- [ ] RB-REV-007 Subscription management dashboard (upgrade, downgrade, cancel)
- [ ] RB-REV-008 Invoice generation for institutional and educator billing
- [ ] RB-REV-009 Printable historical map sales (Stripe one-time purchase)
- [ ] RB-REV-010 Curated reading bundle sales (PDF, annotated source list)
- [ ] RB-REV-011 Archive digitization crowdfund campaign pages
- [ ] RB-REV-012 Sponsored learning path system (editorial independence note required on page)

Expands: REV-001 to REV-014 (existing revenue roadmap items), RM-HUB-005 to RM-HUB-006

---

### Phase B7 — Educator and Institutional Platform

Priority: Runs parallel to B6. Largest long-term revenue opportunity. SSC/HSC syllabus alignment is the single biggest unlock for the Bangladesh market.

- [ ] RB-EDU-001 Educator account type with separate onboarding flow
- [ ] RB-EDU-002 Classroom creation (teacher adds students, assigns reading)
- [ ] RB-EDU-003 Reading assignment creation (assign events or paths to a class)
- [ ] RB-EDU-004 Student progress dashboard (teacher view, per-student breakdown)
- [ ] RB-EDU-005 Quiz assignment and class result view per assignment
- [ ] RB-EDU-006 SSC and HSC chapter tagging on events (Bangladesh curriculum alignment)
- [ ] RB-EDU-007 Printable classroom pack generator (timeline, figures, sources per event)
- [ ] RB-EDU-008 Institution profile pages (`/{locale}/institutions/[id]`)
- [ ] RB-EDU-009 Institutional subscription billing and seat management
- [ ] RB-EDU-010 Verified educator badge on contributor profiles
- [ ] RB-EDU-011 Teacher resource library (lesson plan templates per topic)
- [ ] RB-EDU-012 Student reading certificates (per completed path)
- [ ] RB-EDU-013 Map authoring and review dashboard (authenticated tool for creating, validating, and reviewing historical map layers with role-based access and editorial workflow)

Expands: RM-026 (institution/classroom dashboard), REV-007 (classroom packs for teachers), REV-009 (verified badge for completed paths), REV-010 (institution dashboard)

---

### Phase B8 — Advanced Search and AI

Priority: Only begin after source trust infrastructure (RM-001, RM-002, RM-005) is fully mature and the content base is large enough to make search meaningful. AI features must be citation-grounded with no exceptions.

- [ ] RB-SRCH-001 Full-text search across events, figures, resources, and glossary
- [ ] RB-SRCH-002 Bilingual search (query in EN returns BN results and vice versa)
- [ ] RB-SRCH-003 Filter search by era, theme, importance, evidence level, and content type
- [ ] RB-SRCH-004 Typesense integration and indexed content pipeline
- [ ] RB-SRCH-005 Search analytics (what users search for → surfaces content gaps)
- [ ] RB-SRCH-006 No-results suggestions ("Did you mean..." and related event links)
- [ ] RB-AI-001 AI Q&A grounded strictly in site content and cited sources (no hallucination)
- [ ] RB-AI-002 "Explain this event simply" summariser with source footnotes
- [ ] RB-AI-003 AI-powered learning path recommendation (based on reading history and weak eras)
- [ ] RB-AI-004 Semantic search (meaning-based retrieval, not keyword-only)
- [ ] RB-AI-005 AI content gap detector (flags events missing sources, relations, or BN parity)
- [ ] RB-AI-006 AI translation assistant for BN content drafts (editor-reviewed before publish)
- [ ] RB-AI-007 FastAPI service setup with Supabase PostgreSQL connection, LangChain or direct Anthropic SDK integration, and citation-grounding middleware (every AI response must carry traceable source IDs before being returned to the client)
- [ ] RB-AI-008 Graph-based entity navigation with progressive disclosure (requires indexed relationship tables in PostgreSQL)
- [ ] RB-AI-009 Interactive relationship graph explorer at `/{locale}/graph` (filters by relation type, era, theme, evidence confidence; requires graph query layer)

AI rule: Every AI-generated or AI-assisted response must be grounded in cited source content. No AI feature may answer from unsourced historical content or generate claims without traceable source IDs.

Expands: RM-019 (advanced search), RM-020 (AI-assisted Q&A with citation grounding)

---

### Phase B9 — Research API and Data Platform

Priority: Final revenue and institutional layer. For universities, researchers, journalists, and developers building on Bengal history data.

- [ ] RB-API-001 Public REST API (events, figures, resources, timelines, relations)
- [ ] RB-API-002 API key management per account
- [ ] RB-API-003 API rate limiting by subscription tier
- [ ] RB-API-004 Dataset export (structured JSON and CSV for events, figures, and relations)
- [ ] RB-API-005 GraphQL endpoint for complex relational queries
- [ ] RB-API-006 Research workspace UI (`/{locale}/workspace`)
- [ ] RB-API-007 Private collections with API access
- [ ] RB-API-008 Bulk citation export across collections
- [ ] RB-API-009 API documentation site (developer-facing)
- [ ] RB-API-010 Institutional API licensing and SLA

Expands: RM-025 (public API), RM-027 (premium research workspace), REV-013 (dataset/API access for institutions)

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

### Subscription revenue (Stage 2)

- [ ] REV-015 Reader Pro subscription tier (individual, monthly and annual billing)
- [ ] REV-016 Educator Plan subscription tier (per teacher or per institution)
- [ ] REV-017 Research Workspace subscription tier (monthly, API-included)
- [ ] REV-018 Stripe integration for international card payments
- [ ] REV-019 SSLCommerz or ShurjoPay integration for bKash, Nagad, and local cards
- [ ] REV-020 Subscription management dashboard (upgrade, downgrade, cancel)
- [ ] REV-021 Invoice and receipt generation for institutional billing

### Engagement and social revenue

- [ ] REV-022 "On this day in Bengal" daily email (free tier with Reader Pro upgrade prompt)
- [ ] REV-023 Shareable badge and certificate system (free to earn, PDF export is Reader Pro)
- [ ] REV-024 Public reader collections (free), private annotated collections (Reader Pro)
- [ ] REV-025 Diaspora family history connector ("Your region is Sylhet — here are connected events") — static diaspora content pages in v2 (RM-CULT-009); personalised connector experience requires auth and profile (B1) and is a B6-phase revenue feature

### Curriculum and institutional revenue

- [ ] REV-026 SSC and HSC curriculum-aligned learning paths (Educator Plan feature)
- [ ] REV-027 Student progress and quiz dashboard for teachers (Educator Plan)
- [ ] REV-028 Institution profile and branding on shared resources (Educator Plan)

### Archive and research revenue

- [ ] REV-029 Public REST API with rate-limited free tier and paid tiers
- [ ] REV-030 Structured dataset access (JSON/CSV export for researchers)
- [ ] REV-031 Commissioned deep-dive content on requested topics (rare, premium)

### Sponsorship wording guideline

```txt
This learning path is supported by [Sponsor Name]. Editorial independence is maintained by Bengal Unfolded.
```

### Revenue sequencing note

```txt
Stage 1 (Frontend only)
  → No revenue infrastructure needed
  → Focus entirely on audience and organic growth

Stage 2 Phase B1-B4
  → No paywall
  → Build habit and loyalty first

Stage 2 Phase B6
  → Introduce Reader Pro only after 5,000+ monthly active readers
  → Introduce Educator Plan only after teachers are using it informally
  → Never paywall core history content — it is the mission, not the product
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

### Recommended Stage 2 tech stack

The API layer uses a two-layer approach: Next.js API Routes for all non-AI backend work (B1–B4), and FastAPI (Python) introduced as a dedicated AI/ML service at Phase B8. This avoids premature complexity while positioning the platform correctly for the Python AI/ML ecosystem at the point it is actually needed.

Rationale for FastAPI at Phase B8: The Python ecosystem (LangChain, sentence-transformers, Hugging Face, pgvector clients, Anthropic SDK) is significantly more mature for the planned AI features — semantic search, citation-grounded Q&A, content gap detection, and embedding-based recommendations — than any TypeScript equivalent. Next.js API Routes handle all non-AI backend work through B1–B7 to keep the stack simple during the audience-building phases. FastAPI is introduced only when AI/ML workloads genuinely require it. Supabase PostgreSQL remains the shared data layer for both services throughout.

```txt
Layer               Recommended choice              Reason

Frontend            Next.js (current)               No change
API layer (B1–B7)   Next.js API Routes               Same repo, same types, zero friction
API layer (B8–B9)   FastAPI (Python, separate svc)  Python AI/ML ecosystem: LangChain,
                                                    sentence-transformers, Hugging Face,
                                                    Anthropic SDK, pgvector clients
ORM                 Prisma                           TypeScript-native, migrations in git
Database            PostgreSQL via Supabase      Managed DB + Auth + Storage in one, generous free tier
Auth                Supabase Auth                Email, Google OAuth, magic link — done in hours
Search              Typesense                    Open source, self-hostable, fast Bengali/Unicode support
Cache               Redis via Upstash            Serverless Redis, Vercel-friendly, pay per request
File storage        Cloudflare R2                Zero egress fees, S3-compatible, better than AWS S3 for media
Email               Resend                       Developer-friendly, excellent template support
Payments (global)   Stripe                       International cards, diaspora audience
Payments (BD)       SSLCommerz or ShurjoPay      bKash, Nagad, local card support for Bangladesh
Analytics           PostHog                      Open source, self-hostable, replaces GA for product analytics
Background jobs     Trigger.dev                  Serverless job queue, TypeScript-native, badge calculations, digests
Deployment          Vercel (frontend)            Current
                    Railway or Supabase (DB)     Managed PostgreSQL in production
```

Migration path:

```txt
Phase B1-B2
  Next.js API Routes + Prisma + Supabase (DB + Auth)
  No separate backend service needed

Phase B3-B5
  Add Upstash Redis (session cache, rate limiting)
  Add Typesense (search index)
  Add Trigger.dev (badge jobs, email digests)

Phase B6-B7
  Add Stripe + SSLCommerz/ShurjoPay (payments)
  Add Resend (transactional email)

Phase B8-B9
  Add PostHog (product analytics)
  Add GraphQL layer on Next.js API Routes (if REST becomes complex for non-AI queries)
  Introduce FastAPI as a dedicated AI/ML service (separate deployment, Python)
    → FastAPI connects to Supabase PostgreSQL (shared data layer with Next.js)
    → FastAPI handles: semantic search, citation-grounded Q&A, embeddings, recommendations
    → Next.js API Routes remain the source of truth for auth, reading, paths, notes, payments
    → Both services read/write the same Supabase DB — no data duplication
  Deploy FastAPI on Railway or Fly.io (Docker, Python runtime)
```

### Advanced reference architecture

```txt
Users
  ↓
Next.js Frontend (Vercel)
  ↓
┌─────────────────────────────────────────────────────────┐
│  Next.js API Routes (B1–B7)    FastAPI / Python (B8–B9) │
│  Auth, reading, paths, notes,  Semantic search, Q&A,    │
│  payments, collections, API    embeddings, gap detect,   │
│  keys, subscriptions           recommendations, translate│
└─────────────┬───────────────────────────┬───────────────┘
              │                           │
              └──────────┬────────────────┘
                         ↓
           Supabase PostgreSQL + Supabase Auth
           (shared data layer for both services)
                         ↓
  Typesense (search) + Upstash Redis (cache) + Cloudflare R2 (assets)
                         ↓
  Trigger.dev (background jobs: badges, digests, gap detection)
                         ↓
  Optional Knowledge Graph / Linked Data Layer (Phase B9+)
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
16. **Feature Review 2026-05-21:** Removed 19 items that violated pre-backend scope boundary, required graph database infrastructure, or created perverse incentives. Key changes: deferred progress tracking/badges/recommendations to B3; removed dynasty/alliance/participation models; removed contributor leaderboard; consolidated knowledge graph to 1-degree relationships in static phase. All section numbering revised for consistency.

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
- [ ] RM-VIS-008 Place-event mini map on event pages
- [ ] RM-TRUTH-010 Public methodology page

Reason:

The next sprint should establish Bengal Unfolded's foundation as a visual, source-backed, relationship-based learning and historical truth platform before adding too many events or community features.
