# Product Roadmap (Traceable)

Aligned with: `docs/archive/deep-research-report.md`

This roadmap tracks product evolution from MVP to final phase with explicit checkbox trace.

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

### Content architecture
- [x] RM-MVP-006 Normalized model: events -> hero IDs
- [x] RM-MVP-007 Normalized model: events -> book IDs
- [x] RM-MVP-008 Dedicated hero pages (`/{locale}/heroes/{id}`)
- [x] RM-MVP-009 Dedicated book pages (`/{locale}/books/{id}`)
- [x] RM-MVP-010 Reverse lookups (`getEventsByHeroId`, `getEventsByBookId`)

### Documentation and governance
- [x] RM-MVP-011 Docs moved into `docs/`
- [x] RM-MVP-012 Changelog and roadmap docs created

## Phase v1 (Trust + Comprehension)

Priority: Highest business value for historical understanding.

- [ ] RM-001 Inline citations on event/timeline claims
- [ ] RM-002 Source quality badges (`Primary`, `Secondary`, `Archive`, `Editorial`)
- [ ] RM-003 Glossary pages + term linking (`/{locale}/glossary/[term]`)
- [ ] RM-004 Timeline thematic filters (`Language`, `Democracy`, `War`, `Culture`, `Economy`)
- [ ] RM-009 Evidence metadata fields (`sourceIds`, `evidenceLevel`) in content model
- [ ] RM-010 Section jump navigation on long event pages

## Phase v2 (Engagement + Learning)

Priority: Increase depth, retention, and guided learning.

- [ ] RM-005 Compare events view (`/{locale}/compare`)
- [ ] RM-006 Learning paths (`beginner`, `student`, `researcher`, `exam-prep`)
- [ ] RM-007 Knowledge checks (short quizzes)
- [ ] RM-011 Content density controls (`quick read` vs `deep read`)
- [ ] RM-012 Glossary hover/tooltips in narrative content

## Phase v3 (Institutional Utility)

Priority: Classroom, research, and archive usability.

- [ ] RM-008 Print/export classroom pack (PDF/print-friendly)
- [ ] RM-013 Source collection model (if books/resources split is needed)
- [ ] RM-014 Sensitive-content handling (`contentWarnings`, display gates)
- [ ] RM-015 Structured citation export (copy-ready reference formats)

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
3. Any AI/search expansion must depend on RM-001, RM-002, and RM-009 completion.
4. Update this file by toggling checkboxes only; add a matching dated entry in `docs/CHANGELOG.md` when items move to done.
