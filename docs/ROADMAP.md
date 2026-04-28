# Product Roadmap (Traceable)

Aligned with: `docs/archive/deep-research-report.md`

Legend:
- `[x]` Done
- `[ ]` Future

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

## Phase v1 (Trust + Comprehension)

Priority: Highest business value for historical understanding.

- [ ] RM-001 Inline citations on event/timeline claims
- [ ] RM-002 Source quality badges (`Primary`, `Secondary`, `Archive`, `Editorial`)
- [ ] RM-003 Glossary pages + term linking (`/{locale}/glossary/[term]`)
- [ ] RM-004 Timeline thematic filters (`Language`, `Democracy`, `War`, `Culture`, `Economy`)
- [ ] RM-005 Evidence metadata fields (`sourceIds`, `evidenceLevel`) in content model
- [ ] RM-006 Section jump navigation on long event pages

## Phase v2 (Engagement + Learning)

Priority: Increase depth, retention, and guided learning.

- [ ] RM-007 Compare events view (`/{locale}/compare`)
- [ ] RM-008 Learning paths (`beginner`, `student`, `researcher`, `exam-prep`)
- [ ] RM-009 Knowledge checks (short quizzes)
- [ ] RM-010 Content density controls (`quick read` vs `deep read`)
- [ ] RM-011 Glossary hover/tooltips in narrative content

## Phase v3 (Institutional Utility)

Priority: Classroom, research, and archive usability.

- [ ] RM-012 Print/export classroom pack (PDF/print-friendly)
- [ ] RM-013 Sensitive-content handling (`contentWarnings`, display gates)
- [ ] RM-014 Structured citation export (copy-ready reference formats)
- [ ] RM-015 Curated source collections and reading bundles

## Final Phase (Strategic Extensions)

Priority: Add only after editorial quality and moderation maturity.

- [ ] RM-016 Interactive historical map and geo-linked timeline
- [ ] RM-017 Oral-history module (audio/video + transcript UX)
- [ ] RM-018 Contributor workflow with moderation queue
- [ ] RM-019 Advanced search upgrade (if static search is insufficient)
- [ ] RM-020 AI-assisted Q&A with strict citation grounding

## Execution notes

1. Keep static-first architecture unless editorial throughput forces backend migration.
2. Ship v1 trust features before v2 engagement features.
3. Any AI/search expansion must depend on RM-001, RM-002, and RM-005 completion.
4. Update this file by toggling checkboxes only; add a dated entry in `docs/CHANGELOG.md` when items move to done.
