# Product Roadmap

This roadmap tracks proposed features by business value, user impact, and implementation phase.

## Prioritization criteria
- User understanding impact
- Trust and source credibility
- Revisit/retention impact
- Implementation effort

## Phase 1 (Near-term, high impact)
- Inline citation support (claim-to-source links)
  - Value: Trust and academic usability
  - Trace: Add citation fields in timeline/event content and render reference anchors
- Source quality badges (`Primary`, `Secondary`, `Archive`, `Opinion`)
  - Value: Faster source evaluation by readers
  - Trace: Extend book/source metadata and card UI
- Glossary pages + term linking
  - Value: Better comprehension for students/new readers
  - Trace: Add `content/glossary` and `/{locale}/glossary/[term]`
- Timeline thematic filters (`Language`, `Democracy`, `War`, `Culture`, `Economy`)
  - Value: Faster exploration and higher engagement
  - Trace: Add category tags to events and filter UI on home timeline

## Phase 2 (Mid-term, engagement)
- Compare Events view
  - Value: Pattern recognition across history periods
  - Trace: New route `/{locale}/compare` with 2-event selection
- Learning paths (`Beginner`, `Student`, `Researcher`, `Exam prep`)
  - Value: Guided onboarding and deeper completion rates
  - Trace: New curated collections in content model and route pages
- Knowledge checks (short quizzes)
  - Value: Better retention and classroom use
  - Trace: Add optional quiz JSON per event and results UI

## Phase 3 (Long-term, strategic)
- Interactive historical map
  - Value: Spatial context and stronger storytelling
  - Trace: Geo fields on events + map visualization page
- Oral history module (audio/video snippets)
  - Value: Unique historical voice and emotional engagement
  - Trace: Media references and playback components
- Educator toolkit/export bundles (PDF/print)
  - Value: Institutional adoption (schools, NGOs, archives)
  - Trace: Export templates and lesson-plan metadata

## Traceability format
For each accepted roadmap item, create an implementation ticket with:
- `ID`: short code (example: `RM-001`)
- `Goal`: user/business outcome
- `Scope`: content, UI, data changes
- `Dependencies`: blocked by what
- `Acceptance criteria`: measurable done state
- `Status`: `planned | in-progress | shipped`

## Proposed initial tickets
- `RM-001`: Inline citations on event pages
- `RM-002`: Source quality badges and legend
- `RM-003`: Glossary pages with term links
- `RM-004`: Timeline filters on home page
