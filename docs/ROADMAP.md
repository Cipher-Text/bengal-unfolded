# Product Roadmap (Traceable)

Aligned with: `docs/archive/deep-research-report.md`

Bengal Unfolded is currently a static JSON + Next.js platform deployed on Vercel. The roadmap keeps the platform static-first while gradually evolving it into a trusted Bengal history reference, interactive learning platform, archive, and future contributor-supported knowledge system.

## Legend

- `[x]` Done
- `[ ]` Future

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
Guided learning paths
  ↓
Reader + badges
  ↓
Interactive map / animated history
  ↓
Accounts + contributor workflow
  ↓
AI-assisted research and advanced search
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

- [x] RM-MVP-007 Normalized model: events -> hero IDs
- [x] RM-MVP-007A Normalized model: events -> resource IDs
- [x] RM-MVP-008 Dedicated hero pages (`/{locale}/heroes/{id}`)
- [x] RM-MVP-009 Dedicated book pages (`/{locale}/books/{id}`)
- [x] RM-MVP-010 Reverse lookups (`getEventsByHeroId`, `getEventsByBookId`)
- [x] RM-MVP-011 Event hero full-list page (`/{locale}/events/{slug}/heroes`)
- [x] RM-MVP-012 Event resources category page (`/{locale}/events/{slug}/resources`)
- [x] RM-MVP-013 Hero index optimization for large lists (`content/heroes/index.<locale>.json`)

### UX completeness

- [x] RM-MVP-014 Event page shows top 5 heroes + `See full list`
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

- [ ] RM-001 Inline citations on event/timeline claims
- [ ] RM-002 Source quality badges (`Primary`, `Secondary`, `Archive`, `Editorial`)
- [ ] RM-003 Glossary pages + term linking (`/{locale}/glossary/[term]`)
- [ ] RM-004 Timeline thematic filters (`Language`, `Democracy`, `War`, `Culture`, `Economy`)
- [ ] RM-005 Evidence metadata fields (`sourceIds`, `evidenceLevel`) in content model
- [ ] RM-006 Section jump navigation on long event pages

### Timeline hierarchy and discovery

- [ ] RM-006A Timeline importance levels (`landmark`, `major`, `high`, `medium`, `reference`)
- [ ] RM-006B Homepage landmark timeline limit with `Explore Full Timeline` CTA
- [ ] RM-006C Full timeline explorer page with search, filters, and pagination
- [ ] RM-006D Parent-child event clustering (`parentEvent`, `children`, `relatedEvents`)
- [ ] RM-006E Sensitive event metadata (`sensitive`, `contentWarnings`, `requiresSources`)

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

### Account, community, and institutional additions

- [ ] RM-021 User accounts and reader profiles
- [ ] RM-022 Cloud-synced progress, bookmarks, and badges
- [ ] RM-023 Contributor submission dashboard
- [ ] RM-024 Editorial review and version history
- [ ] RM-025 Public API for events, people, places, and sources
- [ ] RM-026 Institution/classroom dashboard
- [ ] RM-027 Premium research workspace

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
  "relatedEvents": [],
  "category": ["politics", "language", "war"],
  "period": "pakistan-period",
  "sensitive": false,
  "contentWarnings": [],
  "sourceIds": [],
  "evidenceLevel": "well-documented"
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

### Learning path fields

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
3. Add timeline hierarchy before adding large numbers of detailed events.
4. Sensitive political events should use neutral wording, source-backed claims, and contextual framing.
5. Any AI/search expansion must depend on RM-001, RM-002, and RM-005 completion.
6. Online book reading must respect copyright and licensing.
7. Interactive history should be educational, respectful, and source-backed.
8. Update this file by toggling checkboxes only.
9. Add a dated entry in `docs/CHANGELOG.md` when items move to done.

---

## Immediate Next Sprint Recommendation

Recommended next sprint items:

- [ ] RM-001 Inline citations on event/timeline claims
- [ ] RM-002 Source quality badges
- [ ] RM-005 Evidence metadata fields
- [ ] RM-006A Timeline importance levels
- [ ] RM-006B Homepage landmark timeline limit with `Explore Full Timeline` CTA
- [ ] RM-006C Full timeline explorer with search, filters, and pagination
- [ ] RM-006D Parent-child event clustering

Reason:

These items directly support the current product direction: homepage with major events, detailed full timeline, source trust, and long-term scalability.
