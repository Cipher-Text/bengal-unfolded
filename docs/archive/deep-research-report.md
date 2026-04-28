# Bengal Unfolded: Feature, Content, UX, Structure, and Design Review

Date: 2026-04-28
Status: Archived strategy review (revised)

## 1) Current Product Snapshot

Bengal Unfolded currently delivers a strong static-first foundation:
- Bilingual routing (`/en`, `/bn`)
- Event detail pages
- Shared hero and book entities with dedicated detail pages
- Timeline-first homepage with per-item `Details` actions
- Light/dark theme toggle with persisted preference

This is a good base for a historical learning product because it already supports reusable entities and cross-linking, which are essential for deeper understanding.

## 2) Feature Observations

### What is working well now
- Entity normalization (`events` linked to shared `heroes` and `books`) prevents duplicate content drift.
- Reverse links (hero/book -> related events) improve exploration and context building.
- Timeline-first homepage reduces navigation friction for first-time users.

### Highest-value feature gaps
- Inline citations at claim level are missing.
- No source confidence/quality labeling.
- No glossary for hard historical/political terms.
- No thematic filtering on timeline (language, democracy, war, culture).
- No compare mode for two events.

### Recommended feature order
1. Inline citations + source badges
2. Glossary + term linking
3. Timeline thematic filters
4. Compare events view
5. Learning paths and short quizzes

## 3) Content Model Observations

### Current model strengths
- Separation of concerns is good:
  - `events`: narrative containers
  - `heroes`: reusable people records
  - `books`: reusable source/resource records
- Locale handling is explicit and consistent (`meta.en.json`, `meta.bn.json`).

### Current model gaps
- Timeline items are not yet citation-aware.
- Sources are mixed as “books” but not fully modeled as archival evidence classes.
- No explicit structure for disputed claims or editorial notes.

### Recommended schema extensions
- Add citation fields to timeline and major narrative blocks:
  - `sourceIds: string[]`
  - `evidenceLevel: 'primary' | 'secondary' | 'archive' | 'editorial'`
- Introduce `sources` collection (separate from books if needed):
  - richer citation, URL/archive ref, language, verification status.
- Add optional `contentWarnings` for sensitive material.

## 4) UX Observations

### Positive UX patterns in place
- Clear route hierarchy by locale and entity type.
- Consistent card pattern and progressive reveal via timeline.
- Simple theme toggle and language switch in header.

### UX friction points
- Event pages are content-rich but can feel long without local jump navigation.
- “Why this matters today” can be made more actionable with concrete modern links.
- No quick way to filter or narrow timeline by user intent.

### UX recommendations
- Add section jump chips at top of event pages.
- Add “Read in 3 minutes / Deep read” content density toggle.
- Add timeline filters and clear reset state.
- Add glossary hover/tooltip pattern for key terms.

## 5) Information Structure Review

### Current structure (good baseline)
- `/{locale}` -> timeline entry
- `/{locale}/events/[slug]`
- `/{locale}/heroes/[id]`
- `/{locale}/books/[id]`

### Recommended next structure upgrades
- Add:
  - `/{locale}/glossary`
  - `/{locale}/glossary/[term]`
  - `/{locale}/compare`
- Optional curated routes:
  - `/{locale}/paths/beginner`
  - `/{locale}/paths/student`

This keeps IA simple while supporting both exploration and guided learning.

## 6) Design System Observations

### What is working
- Typography and atmosphere support historical storytelling.
- Themed surfaces and color variables are already centralized.

### Design improvements with business value
- Add semantic status colors for source reliability badges.
- Add consistent iconography for entity types (event/hero/book/source).
- Define spacing and content rhythm tokens for long-read pages.
- Introduce print-friendly style for classroom/research usage.

## 7) Business Value Alignment

Most valuable outcomes for this product are:
- Trust: source-backed history reduces misinformation risk.
- Comprehension: glossary + compare + filters improve learning outcomes.
- Retention: learning paths, quizzes, and saved trails increase revisits.
- Institutional utility: print/export and citation quality support educators.

## 8) Practical Roadmap Mapping

Map these recommendations to existing roadmap tracks:
- RM-001 Inline citations
- RM-002 Source quality badges
- RM-003 Glossary and term linking
- RM-004 Timeline filters

Suggested new IDs:
- RM-005 Compare events
- RM-006 Learning paths
- RM-007 Knowledge checks
- RM-008 Print/export classroom pack

## 9) Final Recommendation

Keep the current static-first architecture and continue iterative upgrades through the existing docs process:
- Ship small, high-trust features first (citations, source quality, glossary).
- Avoid heavy infra jumps until content/editorial operations require them.
- Preserve the current normalized content structure; extend it with evidence metadata instead of replacing it.

---

Owner note: This revised report intentionally replaces earlier speculative tooling-heavy recommendations with a repo-aligned, execution-focused assessment.
