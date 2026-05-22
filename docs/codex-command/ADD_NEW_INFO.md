Use this Codex command to **search for missing important events, figures, and resources** in Bengal Unfolded, compare with existing content, and produce a gap report.

```bash id="jwf5uk"
codex "You are working in the Bengal Unfolded repo.

Task:
Find missing or undercovered important historical events, figures, and resources for Bengal Unfolded.

Goal:
Audit the current content coverage and identify high-value missing content that should be added later. Do not add new content yet. Produce a clear gap report only.

Steps:
1. Inspect the existing repository content:
   - content/events/
   - content/figures/
   - content/resources/
   - content/periods/
   - content/topics/
   - content/places/
   - docs/CONTENT_MODEL.md
   - docs/AI_CONTRACT.md
   - docs/SOURCE_QUALITY.md
   - docs/ROADMAP.md

2. Build an inventory of existing:
   - event slugs
   - figure IDs
   - resource IDs
   - periods
   - topics
   - places

3. Search the web for authoritative coverage lists and references related to Bengal/Bangladesh history.
   Focus on:
   - ancient Bengal
   - Bengal Sultanate
   - Mughal Bengal
   - colonial Bengal
   - anti-colonial movements
   - Muslim political history of Bengal
   - language movement
   - 1947 Partition
   - 1971 Liberation War
   - post-1971 Bangladesh politics
   - cultural/literary/intellectual history
   - major social movements

4. Prefer reliable sources:
   - Banglapedia
   - Asiatic Society of Bangladesh
   - National Archives of Bangladesh
   - Britannica
   - Library of Congress
   - British Library
   - university pages
   - academic books and papers
   - official archives
   - recognized historical references

5. Compare web-researched important items with existing repo content.

6. Produce a Markdown report at:
   docs/content-gap-audit.md

Report format:
# Bengal Unfolded Content Gap Audit

## Existing Coverage Summary
- Total events:
- Total figures:
- Total resources:
- Strongly covered periods:
- Weakly covered periods:

## Missing High-Priority Events
For each item:
- Suggested slug
- Title EN
- Title BN
- Period
- Why important
- Suggested related figures
- Suggested source types
- Priority: high / medium / low

## Missing High-Priority Figures
For each item:
- Suggested figure ID
- Name EN
- Name BN
- Role
- Period
- Related events
- Why important
- Suggested source types
- Priority

## Missing High-Priority Resources
For each item:
- Suggested resource ID
- Title
- Author/institution if known
- Type: book / article / archive / document / encyclopedia / paper / video
- Quality guess: primary / secondary / archive / editorial
- Related events/figures
- Why useful
- Priority

## Undercovered Existing Events
List existing events that need:
- more resources
- better timeline
- more figures
- stronger citations
- historical debate section
- long-term legacy section

## Undercovered Existing Figures
List existing figures that need:
- better contribution
- stronger context
- event links
- image
- source-backed profile enrichment

## Recommended Next 20 Additions
Rank the top 20 additions across events, figures, and resources.

Rules:
- Do not modify content/events, content/figures, or content/resources.
- Do not create new event/figure/resource JSON files.
- Do not add speculative items without a reliable source basis.
- Do not rely on Wikipedia alone.
- If an item is disputed or legendary, mark it as 'needs careful sourcing'.
- Keep the report practical for future implementation.
- Include source links or source names where possible.
- After writing the report, run no content validation unless content files were changed.
- Final response should summarize the top gaps and the report path."
```

For a **more aggressive version** that also creates implementation-ready task lists:

```bash id="umkjzv"
codex "You are working in the Bengal Unfolded repo.

Task:
Audit missing events, figures, and resources, then create an implementation-ready backlog.

Do not add content JSON yet. Only create/update docs/content-gap-audit.md.

Instructions:
1. Inspect existing content/events, content/figures, content/resources, content/topics, content/periods, and docs.
2. Search the web for reliable Bengal/Bangladesh history references.
3. Compare existing coverage with important historical coverage across periods.
4. Identify missing events, missing figures, missing resources, and weak existing pages.
5. Prioritize additions based on:
   - historical importance
   - SEO potential
   - relation value
   - source availability
   - learning value
   - Bengal/Bangladesh identity relevance

Create docs/content-gap-audit.md with these sections:
1. Coverage summary
2. Missing event backlog
3. Missing figure backlog
4. Missing resource backlog
5. Existing event enrichment backlog
6. Existing figure enrichment backlog
7. Top 20 next content tasks
8. Suggested batch plan:
   - Batch 1: quick SEO/resource wins
   - Batch 2: high-value event pages
   - Batch 3: figure enrichment
   - Batch 4: source/resource cleanup
9. Risks:
   - disputed history
   - weak sources
   - politically sensitive claims
   - legendary/traditional narratives

For each backlog item include:
- id/slug suggestion
- EN title/name
- BN title/name
- period
- related entities
- why important
- suggested source types
- priority
- implementation difficulty: easy / medium / hard

Rules:
- Do not change production content.
- Do not invent facts.
- Do not use Wikipedia as the only source.
- Prefer Banglapedia, academic, archive, institutional, official, and recognized historical sources.
- Clearly mark disputed or source-sensitive topics.
- Final response should include a concise summary and the path docs/content-gap-audit.md."
```

For a **quick terminal-style audit without creating files**:

```bash id="4gccnd"
codex "Inspect Bengal Unfolded repo and search web for missing important events, figures, and resources. Compare against existing content/events, content/figures, and content/resources. Do not modify files. Return a concise gap report with:
1. top 15 missing events
2. top 15 missing figures
3. top 15 missing resources/books/sources
4. top 10 existing pages needing enrichment
5. recommended next 10 content tasks.
Use reliable sources only and mark disputed items carefully."
```
