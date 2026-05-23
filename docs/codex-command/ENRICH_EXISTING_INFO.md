Got it. You want **small, direct Codex commands/prompts** for one specific enrichment task at a time — not a big workflow.

Use this pattern:

```bash
codex "YOUR TASK PROMPT"
```

Below are ready-to-use commands.

---

## 1. Enrich one specific event

Replace `EVENT_SLUG` with your event folder name, for example `sylhet-conquest-1303`.

```bash
codex "You are working in the Bengal Unfolded repo.

Task: Enrich the specific event content for EVENT_SLUG.

Target files:
- content/events/EVENT_SLUG/meta.en.json
- content/events/EVENT_SLUG/meta.bn.json
- content/events/EVENT_SLUG/timeline.en.json
- content/events/EVENT_SLUG/timeline.bn.json
- content/events/EVENT_SLUG/resource-ids.json
- content/resources/**/meta.en.json
- content/resources/**/meta.bn.json

Instructions:
1. First inspect docs/CONTENT_MODEL.md, docs/AI_CONTRACT.md, docs/SOURCE_QUALITY.md, src/types/content.ts, and scripts/validate-content.mjs.
2. Inspect the existing event files for EVENT_SLUG.
3. Search the web for reliable sources about this event.
4. Prefer primary, archive, academic, encyclopedia, book, university, official, or recognized historical sources.
5. Do not use weak blogs or unsourced social media.
6. Extract only source-backed claims.
7. Enrich summary, whyItMatters, longTermLegacy, culturalImpact, identityMemoryNotes, historicalDebate if relevant.
8. Also enrich optional event fields when supported by sources: seoTitle, seoDescription, quickAnswer, causes, consequences, misconceptions, faq, and mapPoints.
9. Enrich timeline items with sourceIds, evidenceLevel, themes, and accurate dates.
10. Add missing resources under content/resources only when needed.
11. Update resource-ids.json with valid source IDs.
12. Keep English and Bangla content meaningfully equivalent, not word-for-word mechanical translation.
13. Use neutral historical language. For disputed or legendary/traditional claims, clearly mark uncertainty.
14. Ensure new optional fields pass shape rules in scripts/validate-content.mjs (faq shape, mapPoints shape/placeId, enum checks).
15. Do not invent facts, people, dates, quotations, or sources.
16. Run pnpm content:validate.
17. Fix all validation errors.
18. At the end, provide a concise report:
   - sources added
   - claims enriched
   - uncertainty/dispute notes
   - files changed
   - validation result

Do not change unrelated events or UI."
```

---

## 2. Enrich one event timeline only

Use this when the event page is okay but timeline is weak.

```bash
codex "You are working in the Bengal Unfolded repo.

Task: Enrich only the timeline for event EVENT_SLUG.

Target files:
- content/events/EVENT_SLUG/timeline.en.json
- content/events/EVENT_SLUG/timeline.bn.json
- content/events/EVENT_SLUG/resource-ids.json
- content/resources/**/meta.en.json
- content/resources/**/meta.bn.json

Instructions:
1. Inspect docs/CONTENT_MODEL.md, docs/AI_CONTRACT.md, docs/SOURCE_QUALITY.md, src/types/content.ts, and scripts/validate-content.mjs.
2. Inspect existing timeline files for EVENT_SLUG.
3. Search the web for reliable sources about the chronological sequence of this event.
4. Build or improve timeline items using only source-backed claims.
5. Each timeline item must include:
   - year
   - title
   - detail
   - sourceIds
   - evidenceLevel
   - themes
6. Add missing source resources only if needed.
7. Update resource-ids.json.
8. Keep EN and BN timeline items aligned.
9. For approximate dates, use careful wording such as 'around', 'traditionally dated', or 'commonly associated with'.
10. Do not change meta files unless validation requires it.
11. Run pnpm content:validate and fix errors.
12. Report changed files, sources added, and validation result.

Do not change unrelated content."
```

---

## 3. Enrich one personality / figure

Replace `FIGURE_ID`.

```bash
codex "You are working in the Bengal Unfolded repo.

Task: Enrich the specific historical figure profile for FIGURE_ID.

Target files:
- content/figures/FIGURE_ID/meta.en.json
- content/figures/FIGURE_ID/meta.bn.json
- content/figures/index.en.json
- content/figures/index.bn.json
- related content/events/**/figure-ids.json only if strong relationship is confirmed
- content/resources/**/meta.en.json
- content/resources/**/meta.bn.json only if new sources are needed

Instructions:
1. Inspect docs/CONTENT_MODEL.md, docs/AI_CONTRACT.md, docs/SOURCE_QUALITY.md, src/types/content.ts, and scripts/validate-content.mjs.
2. Inspect existing figure metadata for FIGURE_ID.
3. Search the web for reliable sources about this person.
4. Prefer academic, encyclopedia, archive, official, book, or recognized historical sources.
5. Enrich role, contribution, context, impact, highlight, and tags.
6. Also enrich optional figure fields when supported: seoTitle, seoDescription, shortAnswer, birthYear, deathYear, activePeriod, alternateNames, searchAliases, faq, primaryEventIds, relatedPlaceIds.
7. Keep historical claims concise and source-backed.
8. Do not overstate legends, disputed roles, or nationalist/political claims.
9. If the person is linked to events, verify existing related events and add figure ID to event figure-ids.json only when clearly supported.
10. Keep EN and BN content aligned.
11. Ensure optional fields follow validator shape rules (faq + alias arrays + ID arrays).
12. Update figure index files if needed.
13. Run pnpm content:validate and fix errors.
14. Report:
   - sources consulted
   - claims improved
   - events linked
   - files changed
   - validation result

Do not change unrelated figures."
```

---

## 4. Add / enrich one resource

Replace `RESOURCE_ID` and topic.

```bash
codex "You are working in the Bengal Unfolded repo.

Task: Add or enrich one historical resource for RESOURCE_ID about TOPIC_OR_BOOK_NAME.

Target files:
- content/resources/RESOURCE_ID/meta.en.json
- content/resources/RESOURCE_ID/meta.bn.json
- related content/events/*/resource-ids.json only if the resource directly supports that event

Instructions:
1. Inspect docs/CONTENT_MODEL.md, docs/AI_CONTRACT.md, docs/SOURCE_QUALITY.md, src/types/content.ts, and scripts/validate-content.mjs.
2. Search the web for reliable bibliographic/source information about TOPIC_OR_BOOK_NAME.
3. Collect title, author, publisher, year, type, quality, url if available, summary, and relevance.
4. Classify quality using docs/SOURCE_QUALITY.md:
   - primary
   - secondary
   - archive
   - editorial
5. Do not add pirated book links or illegal downloads.
6. If no official/readable URL exists, use metadata only or a trusted archive/catalog page.
7. Create or update EN and BN resource metadata.
8. Add optional resource fields when supported: sourceQuality, evidenceLevel, relatedEventIds, relatedFigureIds, relatedTopicIds, whyItMatters.
9. Link the resource to related event resource-ids.json only when it directly supports the event.
10. Ensure enum and ID shapes pass validator checks.
11. Run pnpm content:validate and fix errors.
12. Report:
   - resource metadata added/updated
   - quality classification reason
   - related events linked
   - validation result

Do not change unrelated resources."
```

---

## 5. Find missing sources for one event

This is good before enrichment.

```bash
codex "You are working in the Bengal Unfolded repo.

Task: Audit and improve source coverage for event EVENT_SLUG.

Instructions:
1. Inspect content/events/EVENT_SLUG/*.
2. Inspect linked resources from content/events/EVENT_SLUG/resource-ids.json.
3. Search the web for reliable additional sources.
4. Identify whether current source coverage is weak, duplicated, too editorial, or missing primary/archive/academic support.
5. Add only high-value missing resources to content/resources.
6. Update resource-ids.json.
7. Do not rewrite event narrative unless needed for source alignment.
8. Run pnpm content:validate.
9. Report:
   - existing source quality
   - new sources added
   - rejected sources and why
   - remaining gaps
   - validation result."
```

---

## 6. Full enrich command with variables

This is the most reusable version.

```bash
EVENT_SLUG="sylhet-conquest-1303"

codex "You are working in the Bengal Unfolded repo.

Enrich the event with slug: $EVENT_SLUG.

Scope:
- event metadata
- event timeline
- linked resources
- related figures only if verified

Rules:
- Read docs/CONTENT_MODEL.md, docs/AI_CONTRACT.md, docs/SOURCE_QUALITY.md first.
- Search the web for reliable sources.
- Use only source-backed claims.
- Prefer primary/archive/academic/recognized reference sources.
- Add sources as resources if needed.
- Update resource-ids.json.
- Maintain EN/BN parity.
- Use neutral wording.
- Mark contested, legendary, disputed, or approximate claims carefully.
- Run pnpm content:validate and fix errors.
- Do not change unrelated files.

Final report must include:
1. Files changed
2. Sources added
3. Claims improved
4. Uncertainty notes
5. Validation result"
```

---

## 7. Personality enrich command with variable

```bash
FIGURE_ID="shah-jalal"

codex "You are working in the Bengal Unfolded repo.

Enrich the figure with ID: $FIGURE_ID.

Rules:
- Read docs/CONTENT_MODEL.md, docs/AI_CONTRACT.md, docs/SOURCE_QUALITY.md first.
- Inspect existing figure metadata and related events.
- Search the web for reliable sources.
- Improve role, contribution, context, impact, highlight, and tags.
- Keep EN/BN parity.
- Avoid unsourced glorification or politically loaded claims.
- Add or update event links only if strongly supported.
- Run pnpm content:validate and fix errors.
- Do not change unrelated figures.

Final report:
1. Files changed
2. Sources used
3. Claims improved
4. Related events updated
5. Validation result"
```

---

## 8. Batch enrich multiple figures carefully

Use only for 3–5 figures at a time.

```bash
codex "You are working in the Bengal Unfolded repo.

Task: Enrich these figure profiles only:
- FIGURE_ID_1
- FIGURE_ID_2
- FIGURE_ID_3

Rules:
1. Read docs/CONTENT_MODEL.md, docs/AI_CONTRACT.md, docs/SOURCE_QUALITY.md first.
2. For each figure, inspect existing EN/BN metadata.
3. Search web sources separately for each figure.
4. Improve only source-backed fields.
5. Keep EN/BN parity.
6. Do not add weak or unsourced claims.
7. Update figure indexes if needed.
8. Run pnpm content:validate.
9. Report per figure:
   - sources found
   - fields improved
   - uncertainty
   - files changed

Do not touch unrelated figures or events."
```

---

## 9. Best small daily command

For your actual daily use, I recommend this one:

```bash
codex "Enrich Bengal Unfolded content for EVENT_OR_FIGURE_ID: <PUT_ID_HERE>.

First detect whether this ID is an event slug, figure ID, or resource ID by inspecting content/events, content/figures, and content/resources.

Then:
- inspect existing content
- read docs/CONTENT_MODEL.md, docs/AI_CONTRACT.md, docs/SOURCE_QUALITY.md
- search web for reliable sources
- enrich only that item and directly related resource links
- maintain EN/BN parity
- avoid unsourced claims
- classify sources correctly
- run pnpm content:validate
- fix errors
- provide final report with sources, changes, uncertainty notes, and validation result.

Do not change unrelated files."
```

This is probably the most practical prompt for you.
