# Quiz Feature: Screen-by-Screen Spec (Draft v0.1)

Status: product/UX draft. No schema, validation or code changes are implied yet.
Before any build, the question schema must be added to `src/types/content.ts`, `scripts/validate-content.mjs`, `CONTENT_MODEL.md`, `AI_CONTRACT.md` and `CHANGELOG.md` (see `AGENTS.md`).

## 1. Principles

- Fun, intellectual, inspiring. A mind game that rewards curiosity, not an exam.
- The result is a light-hearted reflection. It is **not** a measure of expertise, and the disclaimer is always visible on the result screen.
- Frontend only: static JSON question bank plus `localStorage`. No accounts, no uploads, no backend.
- Every question links back to a real Bengal Unfolded story. The quiz feeds the core product.
- Scope follows site content: topics come from existing `topics/`, `periods/` and `movements/`. No questions for `stub: true` chapters.
- Fully bilingual (`en` / `bn`). Light and dark themes. Mobile first.

## 2. Information architecture

| Route | Purpose | Indexing |
| --- | --- | --- |
| `/[locale]/quiz` | Landing: hook, start, topic cards | indexable |
| `/[locale]/quiz/play` | Question flow (client component) | `noindex,follow` |
| `/[locale]/quiz/result` | Result, name, share card (client component) | `noindex,follow` |

Implemented differently (v0.3): the result screen is a state of `/[locale]/quiz/play`, not a separate route, and questions come from `/[locale]/quiz-data/[topic]`. The name field and share card (section 4.5) are not built yet.

- Topic is passed as `?topic=<slug>` and read after mount with `useUrlSearchParams()` (static export has no request query at build time).
- "Quiz" / "কুইজ" is a top-level item in the header and in `MobileNav`.
- Entry points elsewhere: home banner; "Test yourself" card at the end of event and topic pages (launches that topic); end of a learning path.

## 3. Quiz session rules

- **Set size:** 10 questions (open decision: optional "Quick 5").
- **Pool:** at least 3 to 4 times the set size per topic (40 or more for a 10-question set). "Surprise me" draws across all topics.
- **Random draw:** balanced by difficulty and type, not pure random.
  - Question 1 to 2 easy (confidence lift), middle mixed, last 1 to 2 harder.
  - Avoid the question IDs seen in the last attempt(s), tracked in `localStorage`.
  - If the pool is smaller than the set, use the whole pool.
- **Question types (v1):** single choice; "which came first?" (two-item chronology); multi-select (occasional). Full drag-to-reorder is deferred.
- **No timer.** Reading and thinking are the point.
- **No going back.** Progress only moves forward.
- **Skip:** allowed as a quiet text link; counted as unanswered, shown in the result.
- **Answers lock after checking.**

## 4. Screens

### 4.1 Landing (`/quiz`)

Layout, top to bottom:
1. Hook line: a provocative question or one-line promise (not "Take our quiz"). Placeholder: "How well do you know the story of Bengal?"
2. Primary button: **Start 10 random questions** ("Surprise me").
3. Meta line: "About 3 minutes. No signup."
4. Topic cards (themed sets): title, one-line teaser, question count. Tapping a card starts that topic.
5. Returning visitor with a saved unfinished session: a "Resume" card above the topic cards.

States: loading (skeleton cards), empty topic (hidden), no-JS (message with link to stories).

### 4.2 Question screen (`/quiz/play`)

Fixed layout:
1. Top bar: thin progress bar, counter "4 of 10", quiet "Exit" link (confirm dialog; progress is kept for Resume).
2. Topic tag (small) and optional context block (collapsible, for source excerpts or scene setting).
3. Question text, large.
4. Answer cards (3 to 4), full-width, large tap targets, stacked on mobile.
5. Bottom area: primary **Check answer** (disabled until an option is selected), plus quiet **Skip**.

Interaction:
- Tapping an option only **selects** it (highlight, radio or checkbox semantics). It can be changed until checked.
- Multi-select shows the instruction "Select all that apply" above the options.
- Option order is shuffled per attempt (except chronology and "all of the above" style items).

### 4.3 Feedback state (same screen, after Check answer)

- Selected card: green + check icon if correct; red + cross icon if wrong. Never colour alone.
- On wrong: the correct card is revealed in green. Other cards fade back.
- Multi-select: show which chosen options were right and wrong, and which were missed. Partial credit is allowed; wrong picks never subtract below zero.
- **Explanation panel** slides up under the options:
  - 1 to 2 sentences. First line carries the surprising fact or the "why".
  - Link: "Read the story behind this" (opens in a new tab, quiz state preserved).
- Feedback line (rotating, short):
  - Correct: "Spot on" / "Sharp eye" / "You know your history".
  - Wrong: "Close, here's the twist" / "Here's the story".
  - Never "Wrong!".
- Streak cue: after 3 correct in a row, a small inline line (for example a flame icon), not confetti.
- Primary button becomes **Next question** (**See my result** on the last question). No auto-advance.
- Transition to the next question: horizontal slide about 250 ms. Disabled under `prefers-reduced-motion`.

### 4.4 Result screen (`/quiz/result`)

Order, top to bottom:
1. **Tier title** with a one-line congratulating message. Tier names are placeholders (open decision): "Curious Reader", "Story Keeper", "Bengal Historian".
2. Score count-up (animated) and unanswered/skipped count.
3. **Disclaimer** (always visible, readable size): "This quiz is for fun and inspiration. It's a light-hearted reflection, not a measure of expertise."
4. A relevant quote from site content for inspiration (optional, if a matching quote exists).
5. **Stories to read next**: links from the questions missed or skipped (max 3 to 4).
6. **Name field and share card** (section 4.5).
7. Actions: **Play again** (primary), **Share**, **Try another topic**.

### 4.5 Name field and share card

- Section headline: "Add your name to your card".
- Name input: optional, max about 24 characters with a counter, trimmed plain text, Bengali or English regardless of site locale. "Hide name" toggle.
- Helper line: "Your name stays on your device."
- Name is stored in `localStorage` and prefilled next time. It is easy to edit or clear.
- Live card preview updates as the person types.
- Card content: tier title, name (if provided) with "completed the Bengal Unfolded quiz", topic, domain, "Take the challenge" invitation. The raw score may be shown small, because random draws are not comparable between people.
- Sizes: 1080x1920 (story) and optionally 1080x1350 (feed).
- Actions: **Share** (native share sheet where supported) with **Download image** as fallback.
- Rendering: SVG route or client canvas. Verify Bengali shaping and font loading on real devices before choosing.
- Name overflow: shrink text before truncating. Strip unsupported characters or emoji so the card has no empty boxes.
- Theme: dark green, restrained sepia, antique gold, small red accents.

### 4.6 System states

| State | Behaviour |
| --- | --- |
| Leaves mid-quiz | Session saved to `localStorage`; "Resume" on landing; stale sessions expire after 7 days |
| Question bank fails to load | Friendly error with Retry and link to stories |
| Pool smaller than set | Use the whole pool; no error |
| Same device, several people | Name prefilled but one tap to edit or clear |
| Share not supported | Show Download image only |
| JavaScript disabled | Static message on landing linking to stories |

## 5. Content and data requirements (for later schema work)

Each question needs:
- `id`, `type`, `topic`, `difficulty`
- `en` and `bn` variants of text, options and explanation
- `correct` option ID(s)
- `explanation` (teaching tone, first line a surprising fact or reason)
- `sourceReferences`: real resource IDs, not free text
- `relatedArticle`: event/topic slug that must resolve
- Optional `context` excerpt

Editorial rules (see `EDITORIAL_GUIDELINES.md`): neutral tone, sensitive-history care, every claim sourced. A wrong question harms trust more than a missing one.

## 6. Accessibility

- Full keyboard operation, visible focus states, logical focus order; focus moves to the explanation after Check answer.
- Correct/wrong shown by icon + text, not colour alone.
- Announce feedback to screen readers (`aria-live="polite"`).
- Radio/checkbox semantics for options; large tap targets (44 px or more).
- Honour `prefers-reduced-motion`; no auto-advancing or timed elements.
- Contrast meets WCAG AA in both themes. Long Bengali lines wrap without clipping.

## 7. Motion

- Option select: subtle highlight.
- Feedback reveal: short colour transition and panel slide-up.
- Question change: about 250 ms horizontal slide.
- Result: score count-up and tier reveal.
- Plain CSS animations (consistent with the rest of the site); no new animation dependency unless drag-to-reorder later requires it.

## 8. Success metrics

- Quiz start rate from home, topic and article pages
- Completion rate (target 70% or higher) and per-question drop-off
- Replay rate
- Click-through from explanation/result to stories (the key metric)
- Share and download actions per completion

## 9. Decisions (settled, v0.2)

1. **Set size:** 10 questions only in v1. No "Quick 5" (revisit if completion on mobile is below target).
2. **Skip:** allowed, as a quiet text link; counted as unanswered.
3. **Tiers (by correct answers out of 10).** Names avoid "expert" or "historian" language. Bengali wording needs native-speaker review before release.

   | Score | English | Bengali |
   | --- | --- | --- |
   | 0 to 3 | Curious Reader | কৌতূহলী পাঠক |
   | 4 to 6 | Story Seeker | গল্পের সন্ধানী |
   | 7 to 8 | Story Keeper | কাহিনির রক্ষক |
   | 9 to 10 | Bengal Explorer | বাংলার অভিযাত্রী |

   Disclaimer (en): "This quiz is just for fun and inspiration. It's a light-hearted reflection, not a measure of expertise."
   Disclaimer (bn): "এই কুইজ শুধু মজা ও অনুপ্রেরণার জন্য। এটি জ্ঞানের পরিমাপ নয়, একটি হালকা প্রতিফলন মাত্র।"
4. **Pilot topics** (existing topic hubs with many events): `liberation-war-1971` (22 events), `colonial-conquest-revenue-and-resistance` (18), `partition-and-identity` (11), `pakistan-period-state-and-national-awakening` (12; includes the language movement era). "Surprise me" draws across these four. Before drafting questions, confirm every source chapter has `stub` unset; skip stub chapters. Later topics are added once their pools reach 40 questions.
5. **Share card renderer:** client-side canvas. Reason: the site is a static export, so a prebuilt `/og` route cannot receive the typed name; the card must be drawn in the browser for the live preview. Gate: load the Bengali font with `document.fonts.load()` before drawing, and pass a real-device test (Android Chrome, iOS Safari) for conjunct letters before release. If shaping fails, fall back to rendering the card as an inline SVG and rasterising it.
6. **Raw score on the card:** yes, small and secondary ("7 of 10"). The tier title is the headline, because random draws are not comparable between people.
