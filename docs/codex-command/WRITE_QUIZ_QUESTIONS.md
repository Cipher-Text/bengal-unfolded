# Codex brief: draft quiz questions

Owner: Claude (lead). Worker: Codex. Codex drafts only; Claude reviews every question and is the only one who sets `status` to `published`.

Read first: `docs/QUIZ_SPEC.md`, `docs/CONTENT_MODEL.md` (section "Quiz schema"), `docs/AI_CONTRACT.md`, `docs/EDITORIAL_GUIDELINES.md`.

## Rollout

1. **Pilot batch:** `liberation-war-1971`, 12 questions, prefix `lib`. Claude reviews quality before anything else is run.
2. After the pilot is approved, run further batches of 10 to 15 for the same topic until it reaches 40 drafts, then repeat for the other pilot topics.

| Topic slug | Prefix | Events | Stub events to skip |
| --- | --- | --- | --- |
| `liberation-war-1971` | `lib` | 22 | none |
| `colonial-conquest-revenue-and-resistance` | `col` | 18 | none |
| `partition-and-identity` | `par` | 11 | `1942-quit-india-and-bengal-war-governance`, `1963-hazratbal-crisis-and-east-pakistan-communal-tensions` |
| `pakistan-period-state-and-national-awakening` | `pak` | 12 | `1963-hazratbal-crisis-and-east-pakistan-communal-tensions` |

Stub status can change; always re-check `"stub"` in each event's `meta.en.json` before using an event.

## Command

Set the variables, then run. (`codex exec -s workspace-write` runs non-interactively and may edit files in the repo; the CLI has no `--full-auto` flag.) The prompt below uses single quotes and no backticks so it is safe inside the shell string.

```bash
TOPIC=liberation-war-1971
PREFIX=lib
COUNT=12

codex exec -s workspace-write "You are working in the Bengal Unfolded repo. You are a worker: follow the brief exactly and do not make design decisions.

Task: draft $COUNT quiz questions for topic $TOPIC, as DRAFT files only.

Read first: docs/QUIZ_SPEC.md, docs/CONTENT_MODEL.md (Quiz schema section), docs/AI_CONTRACT.md, docs/EDITORIAL_GUIDELINES.md, src/types/content.ts (QuizQuestion), scripts/validate-content.mjs (quiz checks), and content/topics/$TOPIC/meta.en.json.

Files you may create: content/quiz/$PREFIX-NNN/meta.en.json and content/quiz/$PREFIX-NNN/meta.bn.json. Use the next free number (check content/quiz first; start at 001 if the folder does not exist). Pad to 3 digits.

You must NOT: change src/types/content.ts, scripts/*, docs/*, or any existing content; add events, figures, resources or topics; create content/site/quiz.*.json; set status to published; commit or push.

Rules for every question:
1. Set status to draft. Set topicSlug to $TOPIC. The question id and the folder name must match.
2. Choose eventSlug from the eventSlugs in the topic file. Skip any event whose meta.en.json has stub true. Use no more than 3 questions per event in this batch (unless the batch note says otherwise) and cover at least 6 different events.
3. Base each question ONLY on what the chosen event's existing meta, timeline and quotes files already state, and on the resources listed in that event's resource-ids.json. Do not use outside knowledge and do not invent facts, dates, names or quotations. If the existing text does not clearly support a question, skip it.
4. resourceIds must list at least one existing resource from that event's resource-ids.json that supports the claim. Do not add new resources.
5. Types: about 70 percent single_choice (3 or 4 options, 1 correct), about 15 percent which_first (exactly 2 options, 1 correct = the earlier event, only for events whose order is undisputed and clearly dated), about 15 percent multi_select (4 or 5 options, 2 or more correct but not all; say Select all that apply in the question). Follow the option rules in docs/CONTENT_MODEL.md.
6. Difficulty mix: about 40 percent easy, 40 percent medium, 20 percent hard. Easy means answerable by a reader of the chapter summary; hard means it needs a detail from the timeline or a resource.
7. Option ids are lowercase letters (a, b, c, d, e), identical and in the same order in EN and BN. Set shuffleOptions to false only when option order carries meaning.
8. Write good questions: one unambiguous correct answer; plausible distractors drawn from the same period and domain; no trick questions; no negative phrasing (no NOT or EXCEPT); no all of the above or none of the above; no options that overlap; do not leak the answer in the question wording; no questions that depend on a disputed number, a contested interpretation, or casualty counts.
9. Explanation: 1 to 2 sentences, at most 320 characters. The first sentence gives the surprising fact or the reason, not just Correct. It must be consistent with the cited resource and the chapter.
10. Context field: optional; use only a short excerpt or scene-setting line that already appears in the chapter text. Present in both locales or neither.
11. Sensitive history: this topic includes violence. Keep the wording neutral and non-graphic, do not rank suffering, do not use loaded labels, and follow docs/EDITORIAL_GUIDELINES.md. If a topic is contested, ask about what is documented and attribute it, or skip it.
12. Bengali: write natural Bengali, not word-for-word translation, with the same meaning, the same options and the same correct answer as English. Use the Bengali spellings already used in the event's meta.bn.json for names and terms. Mark any phrase you are unsure of in your report; a fluent reader will review all Bengali before publishing.
13. Write questions about the history itself. Never write According to the chapter, The chapter says, or in the timeline in a question, option or explanation; a reader of the quiz has not seen the chapter.
14. Distractors must be plausible to someone who knows part of the story: use real people, places, documents and dates from the same war, movement or period (for example another date or event from the same topic timeline), each clearly wrong because the sources date or describe it differently. Do not use absurd options, anachronisms or options from an unrelated domain. Do not use mass killings or atrocities as a distractor for an unrelated event.
15. Do not claim something is absent from a list unless the source says the list is complete. If a source says including, treat the list as open and do not build a question on what is not in it.
16. which_first questions must not set shuffleOptions to false and the correct option must not always be a; vary the position of the correct answer across the batch.
17. Calibrate difficulty honestly: easy = a well-known fact or a one-step recognition; medium = needs the link between two events, documents or dates; hard = multi_select or a distinction between close alternatives. Do not label a plain recall question hard.
18. Include at least 3 questions that ask why or what followed (cause and effect, consequence, purpose), not only who, when or where, using only causes and consequences that the chapter text states.
19. Bengali sentences end with the danda (।), not an ASCII full stop. Use Bengali numerals and the spellings used in the chapter meta.bn.json.
20. Language per file: every text field in meta.en.json (question, option text, context, explanation) must be English, and every text field in meta.bn.json must be Bengali. Never put Bengali in an English file or English in a Bengali file, including the explanation. After writing, check this for every file you created and fix any mismatch.
21. Never overwrite or edit an existing quiz folder. Create each new folder only if it does not exist yet; if a folder already exists, stop, report it, and use the next free number instead. Each question gets its own folder, and its eventSlug and resourceIds must match the event the question is actually about.
22. Do not give the answer away in the question: the correct option must not repeat the distinctive name or phrase that the question already states (for example a question about the battle of X must not have the answer X region).
23. Options must not overlap or restate each other (do not list a thing and a broader phrase that includes it as separate answers), and in multi_select every wrong option must be clearly wrong from the source, not merely missing from a list.
24. Do not write two questions that test the same fact, in this batch or against the existing questions listed in the batch note.
25. Ask documented facts, not framings. Do not write questions about what a chapter describes as, shows, symbolizes, bridges or marks. Ask who, what, when, where, which law or treaty, or what happened next. A judgement may appear only when the chapter attributes it to a named group or historian, and then the question must say whose judgement it is.
26. Use an exact date, number or tally only when the chapter states it and it is widely agreed. If the chapter or its resources note that accounts differ, ask about the month or year instead, or skip the point.
27. Do not use directional, military or geographic labels (front, axis, route, sector, northern, southwest) unless the chapter itself uses that label for that place.
28. Prefer facts that a reader can confirm on Banglapedia or Wikipedia. In your report, name for each question the Banglapedia or Wikipedia page where the claim should be confirmable. You cannot browse, so say expected, not confirmed. A later check will open the pages.
29. In multi_select, keep each option a single clear claim and make every wrong option contradict a stated fact.
30. English and Bengali shared fields (status, type, topicSlug, difficulty, eventSlug, resourceIds, shuffleOptions, correctOptionIds) must be identical in both files.

Validation: run pnpm content:validate and fix every error. Warnings about pool size (fewer than 40) and missing difficulty levels are expected for a small batch; do not try to silence them.

Final report (concise, no extra commentary):
- A table with one row per question: id, type, difficulty, eventSlug, the claim being tested, the supporting resource id, and the exact place in the source (chapter field, timeline entry date, or resource section/page) that supports it.
- The correct answer and the reason each distractor is wrong.
- Questions you considered but skipped, and why.
- Bengali phrases you are unsure about.
- Files created.
- The pnpm content:validate result.
"
```

## What Claude checks before publishing

- Every claim traces to the cited event text and resource, by reading the source, not the report.
- One unambiguous answer; distractors are fair; no leak in the wording.
- Neutrality and sensitive-history handling.
- A fluent reader has reviewed the Bengali text.
- Then Claude sets `status` to `published`, and runs `pnpm content:validate`, `pnpm lint` and `npx tsc --noEmit`.
