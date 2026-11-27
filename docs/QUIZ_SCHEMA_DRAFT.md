# Quiz Schema Rationale

Status: **implemented** (types, validator, loader, pages, site copy, share card, tests and release scripts; see `docs/QUIZ_SPEC.md` and `docs/quiz-review/RELEASE.md`). The canonical definition is `docs/CONTENT_MODEL.md` (Quiz schema); this file keeps the design rationale.
Companion to `docs/QUIZ_SPEC.md`. Follows the change protocol in `docs/AI_CONTRACT.md`.

## 1. Design choices

- **One folder per question**, like glossary terms: `content/quiz/<question-id>/meta.en.json` and `meta.bn.json`. Reasons: clean diffs, easy parallel drafting by Codex, per-question EN/BN parity checks, same filesystem-discovery pattern as `glossary/` and `topics/` (no `SUPPORTED_*` constant).
- **Shared fields are repeated in both locale files** (existing convention, as with `id`). The validator enforces they are identical across locales.
- **Only `status: "published"` questions are served.** Draft status is the editorial gate: a question is published only after source check and Bengali review.
- **Every question has a story to link to** (`eventSlug`) and at least one supporting resource (`resourceIds`). This is what makes the quiz feed the articles.
- **Question types (v1):** `single_choice`, `multi_select`, `which_first`. Drag-to-reorder chronology is deferred.

## 2. Question file contract

Path: `content/quiz/<id>/meta.<locale>.json`

```json
{
  "id": "lib-001",
  "status": "published",
  "type": "single_choice",
  "topicSlug": "liberation-war-1971",
  "difficulty": "easy",
  "eventSlug": "<existing-event-slug>",
  "resourceIds": ["<existing-resource-id>"],
  "shuffleOptions": true,
  "question": "…",
  "context": "…",
  "options": [
    { "id": "a", "text": "…" },
    { "id": "b", "text": "…" },
    { "id": "c", "text": "…" }
  ],
  "correctOptionIds": ["b"],
  "explanation": "…"
}
```

### Fields

| Field | Locale-specific | Required | Rule |
| --- | --- | --- | --- |
| `id` | no | yes | Kebab-case, unique, equals folder name |
| `status` | no | yes | `draft` or `published` |
| `type` | no | yes | `single_choice`, `multi_select` or `which_first` |
| `topicSlug` | no | yes | Must be an existing folder in `content/topics/` |
| `difficulty` | no | yes | `easy`, `medium` or `hard` |
| `eventSlug` | no | yes | Must be in `SUPPORTED_EVENT_SLUGS`; event must not be `stub: true` |
| `resourceIds` | no | yes | Non-empty, no duplicates, each must exist in `content/resources/` |
| `shuffleOptions` | no | no (default `true`) | Set `false` where option order carries meaning |
| `question` | yes | yes | Non-empty string |
| `context` | yes | no | Optional source excerpt or scene-setting text; if present in one locale it must be present in both |
| `options` | yes (`text`) | yes | See type rules; option `id`s are identical and in the same order across locales |
| `correctOptionIds` | no | yes | See type rules; every ID must exist in `options` |
| `explanation` | yes | yes | Non-empty; teaching tone, first line carries the surprising fact or the "why" |

### Type rules

| Type | Options | `correctOptionIds` |
| --- | --- | --- |
| `single_choice` | 3 or 4 | exactly 1 |
| `multi_select` | 4 or 5 | 2 or more, and fewer than the option count |
| `which_first` | exactly 2 | exactly 1 (the earlier event) |

## 3. Proposed TypeScript (`src/types/content.ts`)

```ts
export const QUIZ_QUESTION_TYPES = ["single_choice", "multi_select", "which_first"] as const;
export const QUIZ_DIFFICULTIES = ["easy", "medium", "hard"] as const;
export const QUIZ_STATUSES = ["draft", "published"] as const;

export type QuizQuestionType = (typeof QUIZ_QUESTION_TYPES)[number];
export type QuizDifficulty = (typeof QUIZ_DIFFICULTIES)[number];
export type QuizStatus = (typeof QUIZ_STATUSES)[number];

export type QuizOption = { id: string; text: string };

export type QuizQuestion = {
  id: string;
  status: QuizStatus;
  type: QuizQuestionType;
  topicSlug: string;
  difficulty: QuizDifficulty;
  eventSlug: EventSlug;
  resourceIds: string[];
  shuffleOptions?: boolean;
  question: string;
  context?: string;
  options: QuizOption[];
  correctOptionIds: string[];
  explanation: string;
};
```

Follow the existing enum-constant plus type-guard factory pattern from the Phase 1 refactor.

## 4. Site copy: `content/site/quiz.<locale>.json`

Holds text that is not a question: tier names and messages, disclaimer, rotating feedback lines, share-card strings.

```json
{
  "disclaimer": "…",
  "tiers": [
    { "min": 0, "id": "curious-reader", "title": "…", "message": "…" },
    { "min": 4, "id": "story-seeker", "title": "…", "message": "…" },
    { "min": 7, "id": "story-keeper", "title": "…", "message": "…" },
    { "min": 9, "id": "bengal-explorer", "title": "…", "message": "…" }
  ],
  "feedback": { "correct": ["…"], "wrong": ["…"], "skipped": ["…"] }
}
```

Rules: `tiers` sorted by ascending `min`, first `min` is 0, tier `id`s identical across locales, `feedback` arrays non-empty. (Confirm the existing naming of files under `content/site/` before creating this.)

## 5. Validation rules to add (`scripts/validate-content.mjs`)

Hard errors:
1. Both `meta.en.json` and `meta.bn.json` exist for every question folder.
2. `id` equals the folder name; question IDs are unique.
3. `status`, `type`, `difficulty` are allowed enum values.
4. `topicSlug` exists in `content/topics/`; `eventSlug` is supported and the event is not a stub; every `resourceIds` entry exists, with no duplicates.
5. Option count and `correctOptionIds` count match the type rules; option IDs are unique within a question; every correct ID exists in `options`.
6. Cross-locale parity: identical `status`, `type`, `topicSlug`, `difficulty`, `eventSlug`, `resourceIds`, `shuffleOptions`, `correctOptionIds`, and identical option IDs in the same order.
7. `question` and `explanation` are non-empty strings in both locales; `context` present in both or neither.
8. `content/site/quiz.<locale>.json` shape rules from section 4.

Warnings (not errors):
- A topic has fewer than 40 published questions (pool too small for good random draws).
- A topic has no `easy` or no `hard` published question (the difficulty-balanced draw degrades).
- An `explanation` over about 320 characters.

## 6. Runtime (planned, after the schema lands)

- **Loader:** `getQuizQuestions(locale, topicSlug?)` in `src/lib/content.ts`, wrapped in `cache()`, returns published questions only.
- **Delivery to the client:** the site is a static export, so mirror the `compare-data` pattern: a static JSON route per locale and topic (for example `/[locale]/quiz-data/[topic]`), fetched by the play client. This avoids shipping the whole bank on every page. Correct answers are present in the payload; this is a fun quiz, not a tamper-resistant assessment.
- **Draw algorithm (client):** exclude IDs in `recentIds`; pick by difficulty plan (1 to 2 easy first, mixed middle, 1 to 2 harder last); shuffle options when `shuffleOptions` is not `false`; fall back to the whole pool when it is smaller than 10.

### Scoring

- `single_choice` / `which_first`: 1 if correct, else 0.
- `multi_select`: `max(0, (correctSelected - wrongSelected) / correctCount)`, a fraction between 0 and 1, never negative.
- Skipped: 0.
- Total is the sum of credits, rounded to the nearest integer, then mapped to the tier with the largest `min` not above it.

### `localStorage` shape (key `bu.quiz.v1`)

```json
{
  "v": 1,
  "name": "optional display name",
  "recentIds": ["lib-001"],
  "session": {
    "startedAt": 1730000000000,
    "topic": "liberation-war-1971",
    "queue": ["lib-001"],
    "index": 3,
    "answers": { "lib-001": ["b"], "lib-002": null }
  }
}
```

- `recentIds` capped at 60 entries (oldest dropped).
- A saved `session` older than 7 days is discarded.
- A version mismatch discards everything except `name`.
- All reads and writes are wrapped in `try/catch`, and the quiz must work with storage unavailable.

## 7. Follow-up work required before this is "done" (per `AI_CONTRACT.md`)

1. Add the types and constants to `src/types/content.ts`.
2. Add the checks in section 5 to `scripts/validate-content.mjs`.
3. Document the model in `docs/CONTENT_MODEL.md` and add a contract rule to `docs/AI_CONTRACT.md`.
4. Add a `docs/CHANGELOG.md` entry (model, validation, UI, backfill, risk).
5. Add at least a few pilot questions so validation has real data, then run `pnpm content:validate`, `pnpm lint` and `npx tsc --noEmit`.
6. Write the Codex brief in `docs/codex-command/` for drafting question batches (draft status only, sourced from existing chapters and resources).
7. Update `docs/ROADMAP.md` if the quiz is a tracked item.

## 8. Open questions

1. Is `content/quiz/` the right top-level name, or should it match the route (`quiz`)? (Proposed: yes.)
2. Should `which_first` also store the two event years as structured data so the UI can reveal them after answering, or is it enough to put them in the explanation? (Proposed: explanation only for v1.)
3. Should questions optionally link to a `figureId` or `placeId` for richer "read next" links? (Proposed: not in v1.)
