# Changelog

## 2026-11-24

### Completed

- Quiz content model and validation (model and validation only; no UI, no questions yet). See `docs/QUIZ_SPEC.md` and `docs/QUIZ_SCHEMA_DRAFT.md`.
  - Model: added `QuizQuestion`, `QuizOption`, `QuizTier`, `QuizSiteContent` and the `QuizQuestionType`, `QuizDifficulty`, `QuizStatus` types in `src/types/content.ts`; added `QUIZ_QUESTION_TYPES`, `QUIZ_DIFFICULTIES`, `QUIZ_STATUSES` to `src/constants/enums.ts` and their mirrors to `scripts/content-enums.mjs`.
  - Validation: `scripts/validate-content.mjs` validates `content/quiz/<id>/meta.<locale>.json` (enums, topic, event and resource references, no stub event for published questions, per-type option rules, EN/BN parity) and `content/site/quiz.<locale>.json` (tier ordering, feedback arrays, locale parity). Absence of `content/quiz/` and of the site copy files passes. Added non-failing warnings (small pool, missing difficulty, long explanation). Verified with temporary fixtures (valid, wrong correct-count, EN/BN mismatch, stub event), then removed.
  - UI: none.
  - Backfill: none. There are no quiz questions and no `quiz.<locale>.json` yet.
  - Docs: `docs/CONTENT_MODEL.md` (quiz schema and file contracts), `docs/AI_CONTRACT.md` (quiz contract rule).
  - Risk and known gaps: no loader or runtime in `src/lib/content.ts`; no Codex brief yet; Bengali tier names and disclaimer need native review; `docs/ROADMAP.md` RM-009 still says a static quiz without score storage is deferred to B3, which conflicts with the decision to ship a frontend-only quiz first, so the roadmap needs a Claude decision.

- Roadmap sync for the quiz (docs only; no model, validation or UI changes). `docs/ROADMAP.md` RM-009 now describes the frontend-only quiz that was built instead of deferring it, and stays unchecked until the pilot topic has at least 40 reviewed, published questions and the Bengali has been reviewed by a fluent reader. RB-LEARN-005 now builds on the RM-009 schema, scoring and tiers instead of replacing it. Accounts, score history and sync stay in B3 (RB-LEARN-005, RB-LEARN-006).

- Quiz browser tests (tests only; no model, validation or UI changes).
  - Added `tests/browser/quiz.spec.ts` (7 tests, run on desktop and mobile Chromium). The quiz data request (`/{locale}/quiz-data/*`) is mocked, so the tests do not depend on which questions are published. Covered: landing page (heading, canonical, indexable); play page `noindex`; full flow in English (Check disabled until a choice, locked answers, correct and missed tags, explanations and story links, skip, result score 1.5 of 3, skipped count, disclaimer, stories to read next, Play again); share card (name cleaning, hide toggle, story and feed canvas sizes, PNG download filename, name kept in `localStorage`); resume only with `?resume=1`; empty state and load-error recovery; Bengali labels and numerals.
  - Result: `pnpm test:e2e` passes in full (62 tests including the existing suite).
  - Known gaps: the tests do not read the real published questions or check the home, topic and event entry points, which stay hidden while questions are `draft`; the share card's visual output and Bengali shaping are checked manually, not by pixel tests; no real-device run.

- Quiz entry point on the home page.
  - UI: `QuizHomeBanner` (`src/components/home/QuizHomeBanner.tsx`) between the timeline preview and "People in the record", using the quiz hook line from `content/site/quiz.<locale>.json`, the published question count and a "Play the quiz" link to `/[locale]/quiz`. Shown only when the site copy exists and at least one question is published, so while all questions are `draft` the home page is unchanged.
  - Model, validation, loader: none new (uses `getQuizSiteContent` and `getQuizTopicSummaries`).
  - Tested locally with the 12 pilot drafts temporarily published (EN and BN banner present, placement and link checked); reverted afterwards.
  - Known gaps: the hook line says "Ten questions" even if a pool had fewer than ten; no Playwright test yet.

- Quiz entry point on topic pages.
  - UI: topic detail pages (`/[locale]/topics/[slug]`) show the existing `QuizTestYourself` card, linking to `/[locale]/quiz/play?topic=<slug>`, just before "More Topics". Shown only when that topic has published questions (`getQuizTopicSummaries`), so there are no dead links; while all questions are `draft`, no topic page shows it.
  - Model, validation, loader: none new.
  - Tested locally with the 12 pilot drafts temporarily published: card present on `liberation-war-1971` in EN and BN, absent on topics without questions; reverted afterwards.
  - Known gaps: the home page has no quiz entry point; no Playwright test yet.

- Quiz entry point on event pages ("Test yourself").
  - UI: `QuizTestYourself` card at the end of an event chapter, just before the previous/next navigation, linking to `/[locale]/quiz/play?topic=<slug>` for the first of the event's topics that has published questions. It is shown only when the chapter is not a stub and such a topic exists, so there are no dead links; while all questions are `draft`, no event page shows it.
  - Loader and model: none new (uses `getTopicsByEventSlug` and `getQuizTopicSummaries`). Validation: none.
  - Tested locally with the 12 pilot drafts temporarily published: card present on Liberation War events in EN and BN, absent on a chapter whose topic has no questions and on a stub chapter; reverted afterwards.
  - Known gaps: topic pages and the home page still have no quiz entry point; the quiz starts a topic-wide set, not questions about the single chapter; no Playwright test yet.

- Quiz name field and share card (UI only; no model or validation changes).
  - UI: the result screen now has "Add your name to your card" (`QuizShareCard`): optional name (up to 24 characters, letters, Bengali vowel signs, digits, space and . - apostrophes only; emoji and symbols are stripped), "Hide my name" toggle, story (1080x1920) and feed (1080x1350) sizes, live canvas preview, Download image, and Share (shown only where the browser can share files). The name stays in `localStorage` (`bu.quiz.v1`) and is prefilled next time; nothing is uploaded. The card shows the name, tier title, topic, a small score stamp, the site address and "Take the challenge", in the dark green, gold and red palette.
  - Code: `src/lib/quiz-card.ts` (name cleaning, font loading with `document.fonts.load`, canvas drawing with equal-gap layout, name and title shrink-to-fit).
  - Tested: English and Bengali (including conjunct letters such as উদ্দিন and গল্পের) in the in-app Chromium browser, both sizes, PNG export (about 350 KB). Not yet tested on real Android Chrome or iOS Safari, which the spec requires before release.
  - Known gaps: Share needs a secure context and file-sharing support, so desktop browsers usually show Download only; the card text is not localized beyond EN and BN strings in `quiz-card.ts`; "Test yourself" entry points are still missing.

- Quiz loader and pages (first UI for the quiz model above; the share card and name field came in the next entry above).
  - Model: none; uses the existing quiz types.
  - Validation: none new. `content/site/quiz.en.json` and `content/site/quiz.bn.json` were added and pass the existing site-copy checks.
  - UI: new routes `/[locale]/quiz` (landing, indexable), `/[locale]/quiz/play` (client session, `noindex,follow`) and `/[locale]/quiz-data/[topic]` (static JSON, like `compare-data`). Components `QuizPlayInteractive` and `QuizResumeCard`; "Quiz" added to the header and mobile nav; landing added to the sitemap and to `static:verify`. Flow: select, Check answer, reveal with explanation and story link, Next; skip allowed; no timer, no going back; progress saved in `localStorage` (`bu.quiz.v1`) with a resume link; result screen with tier, count-up score, disclaimer and stories to read next. Pure logic (balanced random draw that avoids recent questions, scoring with partial credit, tier lookup, storage) lives in `src/lib/quiz.ts`.
  - Loader: `getPublishedQuizQuestions`, `getQuizQuestions`, `getQuizTopicSummaries`, `getQuizSiteContent` in `src/lib/content.ts`; only `published` questions are served.
  - Backfill: all 12 pilot questions are still `draft`, so the landing page shows "The first questions are being prepared" and `/quiz-data/all` is empty. The flow was tested locally by temporarily publishing the 12 drafts (EN and BN), then reverting.
  - Risk and known gaps: no Playwright test yet; no share card, name field or "Test yourself" entry points on event, topic and home pages; Bengali UI strings and site copy need a fluent reader; roadmap item RM-009 still needs a Claude decision.

## 2026-11-21

### Completed

- Stub chapter pass (content and resources only; no model, validation or UI changes). Placeholder chapters with `stub: true` went from 24 to 8. Chapters were drafted by Codex under written briefs and reviewed by Claude, which checked key dates and claims against the source texts before commit.
  - Method: each chapter is rewritten from a claim table (claim, source, location, paraphrase); only table claims enter the text. Sources were read from open scans or PDFs (for example Bagal's *History of the Indian Association*, Adam's reports, the Pakistan Historical Society *History of the Freedom Movement*, Sarkar's *History of Bengal* vol. II, Raverty's *Tabakat-i-Nasiri*, Hill's *Bengal in 1756-57*). Contested or single-source claims are attributed and rated below "high"; timelines keep only dated, verifiable entries (no padding).
  - Stub flag cleared (16): `1973-first-parliamentary-election-bangladesh`, `1974-special-powers-act`, `1996-ganges-water-sharing-treaty`, `1971-december-16-instrument-of-surrender`, `1971-december-14-intellectual-killings`, `1988-eighth-amendment-state-religion`, `1947-radcliffe-award-border-demarcation-implementation`, `1861-indian-councils-act-and-limited-representation-in-bengal`, `1909-minto-morley-reforms-and-separate-electorates-in-bengal`, `1727-1739-suja-ud-din-muhammad-khan-administrative-phase`, `1876-indian-association-calcutta-political-mobilization`, `1916-lucknow-pact-bengal-implications`, `0000-0450-gangaridai-and-early-delta-polities`, `1230s-1280s-bengal-under-delhi-governorates-fragmentation`, `1756-black-hole-calcutta-incident-and-imperial-propaganda-debate`, `1967-naxalbari-uprising-and-bengal-left-radicalization`.
  - Still `stub: true` (8), rewritten with sourced text where the sources allowed, but not complete because the sources cannot support what the title promises: `1885-indian-national-congress-foundation-and-bengal-response` (no source on Bengal's response to the 1885 founding), `1835-macaulay-education-policy-impact-in-bengal` (sources document the decision and pre-policy schools, not later effects), `1781-rangpur-dhing-uprising` (key sources paywalled), `1942-quit-india-and-bengal-war-governance` (abstract-level source only), `1963-hazratbal-crisis-and-east-pakistan-communal-tensions` (rests on one India-side inquiry), `1658-1707-aurangzeb-era-revenue-military-pressure-in-bengal` (revenue burden not sourced), `2012-ramu-communal-violence` and `2016-holey-artisan-attack` (not yet reworked; sensitive, need primary or NGO sources).
  - Resources: 26 added (580 to 606), attached to their events, each with verified bibliographic details and a stated viewpoint or limitation (books, journal articles, a thesis, Banglapedia entries, a Princeton chapter sample, the 1758 Holwell narrative). Sarkar vol. II (existing resource) is now linked to the Delhi governorates and Aurangzeb-era events.
  - Corrections: the 1965 report on East Pakistan minorities is by the Committee of Enquiry of the Indian Commission of Jurists (not the International Commission of Jurists, which only hosts the scan); resource `icj-recurrent-exodus-east-pakistan-1965` now says so and notes its India-side evidence base. The Rangpur Dhing uprising is dated 1783, so the displayed `year` is 1783; the slug stays `1781-rangpur-dhing-uprising` for URL stability (the period check still reads the slug year).
  - Tests: the stub-chapter e2e test in `tests/browser/core.spec.ts` now uses `1835-macaulay-education-policy-impact-in-bengal`, which stays a stub, instead of the intellectual-killings chapter that was completed.
  - Docs: added `docs/content-gap-audit.md` (coverage gaps and a ranked backlog) and an "Agent Roles" section in `AGENTS.md` (Claude leads; Codex is a worker only).
  - Known gaps: the Bengali text of all completed chapters and new resources has not been reviewed by a fluent reader; several timelines are short because existing sources do not support more; the Sarkar vol. II resource is categorized as a reference source rather than a book; the slug/year mismatch for Rangpur Dhing remains.

## 2026-11-18

### Completed

- Docs sync (docs only; no model, validation or UI changes). `CLAUDE.md` now lists `/join`, `/compare-data/[slug]` and the `/og` image route, the `content:validate`, `static:verify` and `test:e2e` commands, and no longer says there is no test suite. `README.md` links the static hosting, container deployment, redirects, figure-image and SEO log docs.

## 2026-11-04

### Completed

- UX/editorial integrity pass on event chapters.
  - Model: added optional `EventMeta.stub` (`src/types/content.ts`); set `stub: true` in EN and BN for the 24 events that still carry templated summary/why-it-matters/timeline text.
  - Validation: `scripts/validate-content.mjs` checks `stub` is boolean and equal across locales.
  - UI: stub chapters show an "in progress" notice and hide inline citations, evidence badges, claim citations and the placeholder timeline; `EventCard` shows a stub label. Removed the invented newspaper framing (fixed "Dhaka" dateline, "Correspondent" byline, "Photo · Bengal Archives" caption, Vol./No./Page masthead, "Est. 1947" stamp). Event pages no longer show the home-page hero collage. `EventTimeline` is now a vertical, keyboard-friendly timeline instead of a page-flip book.
  - Risk/known gaps: stubs still need real research; unused flipbook CSS and the `react-pageflip` dependency may remain until cleaned up.

- Landing page redesign (UI only; no model or content changes).
  - Hero no longer uses the stock four-photo collage or the "Est. 1947" stamp; the featured chapter links directly from the hero panel.
  - New era strip links to all nine periods with chapter counts; stats are one line.
  - Sections cut from 11 to 8: removed the duplicate featured story, the single-relationship "connected history" block and the topic block (topics are now chips under "Choose how to explore"); people and places share one section.
  - Timeline sample spans the Pala era to 2024 instead of 1757 to 1990; people cards use their portraits; places use specific sites and hide template descriptions.
  - Accessibility: section headings linked via `aria-labelledby`; eyebrow and nav text enlarged with less letter-spacing; header tagline localized.

- Topics pages redesign (UI only; no model or content changes).
  - Index: stock collage removed; "Start here" card for the overview hub; the other 16 hubs are grouped by period (Early Bengal, Mughal and colonial, Partition and Pakistan, Liberation and Bangladesh, Culture and memory) with tagline and chapter/people counts. Group membership is a constant in `topics/page.tsx`; unlisted hubs fall under "More topics".
  - Detail: learning path moved above the event list with localized step labels; event cards show their summary (or an "In progress" label for stubs) instead of filler text; figures capped at 12 with a "Showing N of M" note; "More topics" now lists the 4 hubs sharing the most chapters instead of all 16.

- Motion and transitions pass (UI only).
  - Entry fades shortened (slide-up 800ms to 450ms with 12px travel, hero fade 900ms to 300ms) and stagger capped at 120ms, so the hero heading is no longer hidden for ~1s and `#anchor` jumps no longer land mid-fade. Added smooth scrolling under `prefers-reduced-motion: no-preference`.
  - Header no longer changes height while scrolling (it caused a ~7px content jump at the 24px threshold); only the shadow toggles.
  - Mobile menu now animates (the `hidden` attribute was cancelling its transition); menu links match the header's text size.
  - `section-tab` transitions specific properties instead of `all`. Removed unused CSS: flipbook/page-turn keyframes and classes, `reveal*`, ink-drop, paper-sway, pulse-dot.

- Timeline page redesign (UI only; no model or content changes).
  - Replaced the search form plus 28 pages of 6 cards with one continuous vertical timeline of all chapters, grouped into nine era sections with a sticky, scroll-spied era bar. Landmark chapters are large cards with a ringed marker, major chapters medium cards, others compact rows. Search is live and shareable via `?q=`; a Show filter switches between all chapters, key turning points and landmarks. Removed the year dropdown (139 options), the theme filter (only 19 of 168 events had themes) and the importance dropdown (no medium/reference events exist).
  - New `src/lib/eras.ts`: `resolveEraId` groups an event by its date and keeps the stored `periodId` only when it agrees with that date. Many stored period ids are wrong (for example 700-750, the Sena rise and 1658 Aurangzeb chapters carry later period ids), so the timeline and landing-page era counts no longer trust them blindly. The underlying `periodId` data is not corrected and period pages still list events by stored id.
  - Stub chapters show an "In progress" label instead of their template summary on the timeline.
  - `HeroSection` no longer renders its default, unlocalized "The Bengal Chronicle" side panel; it appears only when a page supplies content for it.

- Docs and validation sync.
  - Validation: `scripts/validate-content.mjs` now fails when an event's `periodId` does not cover its date (guards the period backfill above); documented in `AI_CONTRACT.md` and `CONTENT_MODEL.md`.
  - Docs: `CLAUDE.md` (client components, static-export query-state pattern, `src/lib` helpers, stub rule), `CONTENT_MODEL.md` (route inventory, period rule), `STATIC_HOSTING_READINESS.md` (query params and `useUrlSearchParams`), `PERFORMANCE.md` (`react-pageflip` removed) and `ROADMAP.md` (RM-006C wording) updated to match the redesigned pages.
  - Tests: `tests/browser/core.spec.ts` rewritten for the new UI (live search and chip filters, "Show more", era-grouped timeline and era bar, compare swap, paths filters, resource reliability filter, stub chapters, places grouping). All 48 tests pass on desktop and mobile Chromium against a fresh static build. Search inputs now read their value straight from the URL so back/forward keeps the box and the results in sync.

- Mobile tap-target and text-size pass (UI only).
  - Footer links, the language switcher and FAQ links now meet a 44px tap height; event citation numbers `[1]` have a 24px target and 12px text.
  - Glossary tooltips are a bottom sheet on screens up to 640px wide (they were cut off near the right edge); `fadeSlideUp` now ends at `transform: none` so it no longer creates a containing block for them.
  - Text below 12px raised to 12px for badges, tags, stamps, tabs, tooltip titles and cause/effect labels (event pages: 74 small items to 0).
  - Fixed FAQ cards on event pages showing a raw URL (for example `/en/events/1940-lahore-resolution`) as link text; they now read "Read the chapter" or "Read the profile".

- Resources pages redesign (UI only; no model or content changes).
  - Index: 29 pages of postcards and a form with three dropdowns and an Apply button became a live search, a Reliability filter (primary, secondary, archive, editorial) with a one-line meaning for each, a localized Type filter, and compact cards with "Show more". Cards show whether an online link exists. Labels moved to `src/lib/resource-labels.ts`. Hero retitled "Source library"; the category "Primary sources" is shown as "Documents and records" so it is not confused with the Primary reliability rating.
  - Detail: now shows type, reliability (with its meaning) and evidence strength, the stored "why it matters" text (568 of 580 records have it; it was never rendered), a clear "open original" action or a note that no link is recorded, a link to the creator's other sources, and the chapters that use it (8 shown, rest folded).
  - Known gaps: category and reliability disagree for many records (126 are in the "primary-sources" category but only 55 are rated primary; for example the 1971 Proclamation text is rated secondary because it links to a Wikipedia copy); 215 of 580 records have no link; the reference-works category (244) is mostly encyclopedias.

- Compare page redesign (UI only; no model or content changes).
  - Two stacked 1,100px panels with misaligned rows (a badge on one side shifted every row below it) became one row-aligned comparison: sticky two-colour header, then "What happened", "Why it matters", causes, consequences, era, movement, place, importance and evidence as rows, with empty rows hidden. On mobile each row stacks the two chapters with a colour-coded year tag.
  - Controls: selection applies on change (no Apply button), a Swap button, and six suggested pairings (for example 1905 and 1947 partitions, 1770 and 1943 famines). Pair chips carry the year because two chapters are both titled "Mass Uprising".
  - "What they share" moved above the detail: years apart plus shared people, sources and linked chapters.
  - Stub chapters show an "in progress" notice instead of placeholder summaries and evidence counts. Collage removed; `Suspense` wrapper dropped so the default comparison is in the static HTML.
  - Known gaps: causes/consequences are empty for most chapters, so those rows usually do not appear; the comparison cannot be exported or shared as an image.

- Places pages redesign (UI only; no model or content changes).
  - Index: collage and the "Place-based historical map" tagline removed (there is no map; only 2 of 60 places have coordinates). The flat list of 60 cards is grouped by type (cities and ports, battlefields and frontiers, heritage sites, regions, other) with a jump bar, a chapter count and a year span from event slug dates, and the template description is no longer shown as card text. Shared helpers live in `src/lib/places.ts`.
  - Detail: hero shows the description only when it is real content; at-a-glance strip (type, today's location, chapter span); chapters shown as 10 cards plus a fold-out for the rest (Bengal Region has 125, and previously rendered a 125-pill year bar); and previously unrendered data is now shown when present: name history, administrative history, related eras/topics/people, FAQ, and `geo` in the Place JSON-LD.
  - Known gaps: 57 of 60 places still have the template description; generic polities ("Bengal Region", "Bangladesh", "East Bengal") are modelled as places; no map view because coordinates are missing.

- Figures pages redesign (UI only; no model or content changes).
  - Index: replaced 28 pages of long postcard cards and a form with Apply button by a live search, localized Type and Role chips with counts, and compact cards (portrait or monogram, period, role, one-line contribution) with "Show more". The role filter previously listed raw English enum values. Filters sync to the URL and keep the `noindex` robots behaviour.
  - Portraits: only real portraits are shown (`src/lib/portraits.ts`, shared with the landing page); about 290 of 391 image fields are small "image not available" cards and now fall back to a monogram. Image provenance is still not recorded in the data.
  - Detail: collage removed; placeholder portrait hidden; "Appears in events" shows 8 and folds the rest into a disclosure (Mujibur Rahman page about 12,400px to 8,300px on mobile).
  - Timeline page now reads `?q=` after mount via `useUrlSearchParams` (static export), so the prerendered HTML contains the full timeline.
  - Known gaps: 366 of 552 profiles are grouped as "leader", so the Role filter separates little; only 64 have birth/death years (others show the active period); the Bengali page description and some role strings are still English-sourced.

- Learning paths pages redesign (UI only; no model or content changes).
  - Index: collage and the public note about "future account system" removed; paths are numbered in chronological order and each card shows where the path starts. The mode filter now offers only "Beginner-friendly" and "Exam prep"; "Student" and "Researcher" matched 15 and 17 of 17 paths, so they filtered nothing. The "Difficulty" label was removed because the heuristic marked every path "advanced".
  - Detail: stepper with numbered markers, a "Start with step 1" button, localized labels, and period context moved to the first step (stored order is otherwise kept).
  - Known gaps: paths are generated from the 17 topic hubs, so `/paths` and `/topics` list the same content; each path has 6 template steps (2 chapters, 1 person, 1 period, 2 sources) with generic reasons such as "Review a central figure". A real path needs authored steps.

- Content backfill: corrected `periodId` (and `periodLabel`, EN and BN) on 43 events whose stored period disagreed with their date, e.g. the 700-750 Matsyanyaya, Sena rise and Gangaridai chapters (were Colonial/Contemporary), 1658-1756 Mughal-era chapters, 1996-2011 chapters (were Post-Liberation), and the 1991 return to parliamentary democracy (was Pakistan Period). Boundary cases follow the existing convention that a period includes both end years: the Radcliffe Award implementation (1947) is in Partition and Late Colonial Politics, and the 1971 Operation Searchlight, 14 December and 16 December chapters are in the Pakistan Period with the Liberation War chapter. The generic label "Historical Transitions" was replaced by the actual period title.
  - Validation: `pnpm content:validate` passes. No schema change.
  - Known gaps: `movementId`/`movementLabel` have the same generic-fallback problem (for example "State, society, and political change" on unrelated events) and are not corrected here.

## 2026-10-13

### Completed

- Began the people-only birth/death metadata pass with A. A. K. Niazi, Muhammad Ali Jinnah, Sam Manekshaw, Tikka Khan, and Yahya Khan.
  - Content backfill: added bilingual birth and death years; Jinnah's disputed birth year is explicitly marked with `?` rather than presented as certain.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes; the people-only queue is now 437 of 489 profiles missing at least one year.
  - Risk/known gaps: living people, collective entities, and uncertain historical dates remain excluded from forced completion and require separate editorial review.

- Continued the living-person birth-year pass with Dr. Muhammad Yunus, Mirza Fakhrul Islam Alamgir, Adilur Rahman Khan, Syeda Rizwana Hasan, and Nahid Islam.
  - Content backfill: added verified birth years in both locales and intentionally left death years absent for living profiles.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes; 430 of 489 individual profiles still lack a birth year and 436 lack a death year.

- Completed the final five-profile D-tier figure-content batch: Justice Shahabuddin Ahmed, Tikka Khan, Abul Hashim, Mahatma Gandhi, and Nurul Amin.
  - Content backfill: replaced generic EN/BN contribution, context, and impact text with specific coverage of the 1990 caretaker transition, the 1971 Eastern Command context, the Bengal Muslim League and United Bengal debate, Gandhi's Noakhali peace intervention, and the early East Bengal language and representation crisis.
  - Sensitive-history handling: described Tikka Khan's documented command position and association with Operation Searchlight without converting disputed downstream allegations into settled fact; kept the language-movement claims about Nurul Amin time-bounded and attributed.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports C=406, B=92, A=54, with zero generic-language flags and zero incomplete SEO profiles.
  - Risk/known gaps: image coverage remains unchanged at 156 profiles without image assets; source-record enrichment and image review remain follow-up work for profiles with sensitive or incomplete histories.

- Completed the next 20-profile figure-content batch: Zahir Raihan, Zohra Tajuddin, Abdul Matin, Abdur Rashid Tarkabagish, Abul Kasem, Ataur Rahman Khan, M. A. G. Osmani, Manik Mia, Sarat Chandra Bose, Tofail Ahmed, Imam Ahmad Sirhindi, Ashraf Ali Thanwi, Farrukh Ahmad, Jibanananda Das, Karamat Ali Jaunpuri, Muhammad Iqbal, Munshi Mohammad Meherullah, Professor Abdur Razzaq, Maulana Qasim Nanautavi, and Rashid Ahmad Gangohi.
  - Content backfill: expanded bilingual contribution, context, and impact fields across Liberation War, language movement, constitutional, literary, cinematic, political, and Islamic intellectual histories.
  - Sensitive-history handling: preserved cautious wording for wartime disappearance, political transitions, partition alternatives, and religious-intellectual influence across Bengal and South Asia.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports D=5, C=401, B=92, A=54, with zero generic-language flags and zero incomplete SEO profiles.
  - Risk/known gaps: image coverage remains unchanged at 156 profiles without image assets; source-record enrichment remains a follow-up for profiles with sensitive or incomplete histories.

- Completed the next 20-profile D-tier figure-content batch: Jawaharlal Nehru, Kazi Motahar Hossain, Khwaja Shahabuddin, Major M. A. Jalil, Major Zafar Imam, Matia Chowdhury, Maulana Akram Khan, Meghnad Saha, Mir Shawkat Ali, Mohammad Toaha, Mostafa Kamal, Moudud Ahmed, Muhammad Shahidullah, Muzaffar Ahmad, Nihar Ranjan Ray, R. C. Majumdar, S. A. Rahman, Selina Hossain, Somnath Lahiri, and Sufia Kamal.
  - Content backfill: expanded bilingual contribution, context, and impact fields with specific language-movement, Liberation War, Partition, scientific, literary, agrarian, constitutional, and civic-history detail.
  - Sensitive-history handling: preserved careful wording for wartime command, partition boundaries, political transitions, and historiographical interpretation.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports D=15, C=391, B=92, A=54, with zero generic-language flags and zero incomplete SEO profiles.
  - Risk/known gaps: image coverage remains unchanged at 156 profiles without image assets; source-record enrichment remains a follow-up for profiles with sensitive or incomplete histories.

- Completed the next 20-profile D-tier figure-content batch: Shamsul Alam, Suranjit Sengupta, Tahmid Abdullah, Vallabhbhai Patel, Wasim Akram, Yamin, Zahid Hossain, Abdul Jalil, Abdul Malek Ukil, Abdur Razzaq, Dr Alim Chowdhury, Binod Bihari Chowdhury, C. R. Dutta, Cyril Radcliffe, Dhirendranath Datta, Ghyasuddin Ahmed, Humayun Azad, Humayun Kabir, Ila Mitra, and Jasimuddin.
  - Content backfill: expanded bilingual contribution, context, and impact fields with specific language-movement, Liberation War, Partition, anti-colonial, democratic, literary, agrarian, and cultural-history detail.
  - Sensitive-history handling: kept July 2024 casualty profiles time-bounded and cautious; retained historically precise wording for targeted killings, partition boundaries, and wartime political roles.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports D=35, C=371, B=92, A=54, with zero generic-language flags and zero incomplete SEO profiles.
  - Risk/known gaps: image coverage remains unchanged at 156 profiles without image assets; source-record enrichment remains a follow-up for profiles with sensitive or incomplete histories.

- Completed the next 10-profile D-tier figure-content batch: Kiran Shankar Roy, Mir Madan, Mujahidul Islam Selim, Nazmul Huq, Nur Hossain, Prafulla Chandra Ghosh, Riya Gope, Satya Ranjan Bakshi, Shaheed Rudro, and Shahnaz Rahmatullah.
  - Content backfill: expanded bilingual contribution, context, and impact fields with specific United Bengal, Plassey, Liberation War, democratic-movement, protest-memory, post-partition, and cultural-history detail.
  - Sensitive-history handling: kept July 2024 casualty profiles explicitly cautious where public biographical detail is incomplete; retained source-aligned wording for Nur Hossain, Nazmul Huq, and contested 1947 histories.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports D=55, C=351, B=92, A=54, with zero generic-language flags and zero incomplete SEO profiles.
  - Risk/known gaps: image coverage remains unchanged at 156 profiles without image assets; source-record enrichment remains a follow-up for profiles with sensitive or incomplete histories.

- Began the D-tier figure-content enrichment pass with Mofazzal Haider Chaudhury.
  - Content backfill: replaced generic contribution, context, and impact text in EN/BN with source-backed academic, literary, and 1971 historical detail; added birth/death years, a sourced FAQ, and a martyred-intellectuals tag.
  - Sources: added Banglapedia and University College London reference records in both locales and linked them from the figure FAQ.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports D=92, C=316, B=90, A=54.
  - Risk/known gaps: image coverage remains unchanged at 156 profiles without an image asset; the remaining D-tier profiles require separate source-backed enrichment.

- Continued the D-tier figure-content enrichment pass with Kazi Arif Ahmed.
  - Content backfill: replaced generic EN/BN contribution, context, and impact text with sourced coverage of student organizing, the 1969 movement, Liberation War links, Jatiya Samajtantrik Dal leadership, and his 1999 killing; added a contextual FAQ and political-history tags.
  - Sources: added Daily Star and Prothom Alo retrospective records in both locales and linked them from the figure FAQ.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports D=91, C=316, B=91, A=54.
  - Risk/known gaps: the sources are editorial retrospectives, so political interpretation remains attributed and the profile does not add unsupported claims about the 1990 movement.

- Continued the D-tier figure-content enrichment pass with K. M. Obaidur Rahman.
  - Content backfill: replaced generic EN/BN contribution, context, and impact text with sourced coverage of student politics, the 1969 uprising, the 1971 non-cooperation movement and Liberation War, parliamentary service, and later party leadership; added biographical years, a sourced FAQ, and tags.
  - Sources: added Bangladesh Sangbad Sangstha and New Age records in both locales and linked them from the figure FAQ.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports D=90, C=316, B=92, A=54.
  - Risk/known gaps: the sources are editorial reports; the profile avoids expanding into the 1975 jail-killing allegations without a dedicated judicial source review.

- Completed the next 10-profile D-tier figure-content batch: Muhammad Kamaruzzaman, Rokeya Kabir, Selina Parvin, Shah Azizur Rahman, Shahidullah Kaiser, Shamsur Rahman, Sheikh Fazlul Haque Moni, Syed Shamsul Haq, Abdul Jabbar, and Abdul Mannan.
  - Content backfill: replaced generic or shallow EN/BN contribution, context, and impact text with profile-specific political, literary, cultural, and Liberation War context; expanded active periods where supported by existing event links and reference research.
  - Sensitive-history handling: kept Kamaruzzaman's tribunal history distinct from defence challenges; preserved attributed wording around Shah Azizur Rahman's wartime position, the 1975 killing, and the martyred-intellectual profiles.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports D=80, C=326, B=92, A=54, with zero generic-language flags and zero incomplete SEO profiles.
  - Risk/known gaps: this batch improved profile depth but did not add image assets or new resource records; dedicated source-record backfills remain appropriate for the most sensitive profiles before further expansion.

- Completed the following 10-profile D-tier figure-content batch: Abdus Samad Azad, Abu Saleh Mohammad Akram, Amir Hossain Amu, Badiul Alam, Bidhan Chandra Roy, Bijan Kumar Mukherjea, Faisal Ahmed Shanto, Farhan Faiyaaz, Fazle Rabbi, and Hamidur Rahman.
  - Content backfill: expanded bilingual contribution, context, and impact fields with political, Partition, Liberation War, urban-resistance, martyred-intellectual, and 2024 protest-memory context.
  - Sensitive-history handling: retained uncertainty around 2024 casualty circumstances and used restrained wording for wartime targeted-killing and protest-memory claims.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports D=65, C=341, B=92, A=54, with zero generic-language flags and zero incomplete SEO profiles.
  - Risk/known gaps: image coverage remains unchanged at 156 profiles without image assets; source-record enrichment remains a follow-up for profiles with sensitive or disputed histories.

## 2026-09-18

### Completed

- Completed the remaining figure-content SEO metadata pass for Humayun, Ivy Rahman, Altaf Mahmud, Brigadier General Gulzar Uddin Ahmed, Kazi Nazrul Islam, Michael Madhusudan Dutt, Daud Khan Karrani, and Raja Rammohun Roy.
  - Content backfill: added localized SEO titles/descriptions, short answers, and documented event/place links or aliases where direct repository relationships existed; sensitive political and violence-related profiles retain time-bounded, legally precise wording.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the audit now reports zero profiles with incomplete SEO metadata and zero generic-language flags. The remaining queue is content-depth expansion and image review.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: 158 profiles remain without image assets, tracked separately from SEO completion.

- Continued the figure-content SEO audit through the next 10 profiles: Ahmad Sofa, Siddique ul-Islam (Bangla Bhai), Charu Majumdar, Khan Jahan Ali, Mufti Abdul Hannan, National Citizen Party, Shafiqur Rahman, Shambhu Nath Pal, Syed Abdullah Mohammad Taher, and Zainul Abedin.
  - Content backfill: added localized SEO titles/descriptions and short answers for all ten; preserved legal-status and political uncertainty wording for sensitive profiles and retained existing documented event/place links.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority profile with incomplete SEO metadata is now Humayun.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: image review remains separate from SEO completion; contemporary political profiles retain the repository’s existing time-bounded framing.

- Continued the figure-content SEO audit through the next 10 profiles: Shah Waliullah Dehlawi, Sheikh Abdur Rahim, Shibli Nomani, Syed Ahmad Khan, Syed Ameer Ali, Jagat Seth, Mir Jafar, Siraj ud-Daulah, Surendranath Banerjea, and Dhaka University Students.
  - Content backfill: added localized SEO titles/descriptions and short answers for all ten; expanded bilingual contribution, context, impact, and highlight fields for the event-linked historical profiles and added documented event/place links and aliases.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Ahmad Sofa.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: image-less intellectual profiles remain conservatively linked or unlinked where the event record does not document a direct relationship; image review remains separate from SEO completion.

- Continued the figure-content SEO audit through the next 10 profiles: Jibanananda Das, Karamat Ali Jaunpuri, Muhammad Iqbal, Munshi Mohammad Meherullah, Professor Abdur Razzaq, Maulana Qasim Nanautavi, Rashid Ahmad Gangohi, Robert Clive, Shah Abdul Aziz Dehlawi, and Shah Ismail Dehlawi.
  - Content backfill: added localized SEO titles/descriptions and short answers for all ten; expanded Robert Clive’s bilingual contribution, context, impact, and highlight fields and added documented event/place links. Existing image-less intellectual and religious profiles were not assigned speculative event links or image assets.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Shah Waliullah Dehlawi.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: broad intellectual and religious biographies remain conservatively framed around their existing Bengal-linked context; image review remains separate from SEO completion.

- Continued the figure-content SEO audit with Jahangir:
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields; added localized SEO titles/descriptions, short answers, birth/death years, active period, aliases, event/place links, and search tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Jibanananda Das.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes.
  - Risk/known gaps: the profile stays focused on Bengal’s Mughal consolidation and Dhaka/Jahangirnagar; no new image asset was introduced.

- Continued the figure-content SEO audit with Ishwar Chandra Vidyasagar:
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields; added localized SEO titles/descriptions, short answers, birth/death years, active period, aliases, event/place links, and search tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Jahangir.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes.
  - Risk/known gaps: reform and education claims are kept within the existing documented event context; no new image asset was introduced.

- Continued the figure-content SEO audit through the next 10 profiles: Isa Khan, Murshid Quli Khan, Nawab Abdul Latif, Shamsuddin Ilyas Shah, Abul Fazal, Imam Ahmad Sirhindi, Alivardi Khan, Ashraf Ali Thanwi, Ayub Khan, and Farrukh Ahmad.
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields where needed; added localized SEO titles/descriptions, short answers, temporal metadata, aliases, event/place links, and tags. Sultanate, Mughal, reform, literary, and East Pakistan political histories are framed with specific chronology and contextual wording.

# 2026-10-16

- Enriched Ashraf Ali Thanwi's English and Bengali profiles with scholarly context on Deobandi print culture, Bihishti Zewar, and his qualified political engagement with the Muslim League.
  - Sources: added bilingual Cambridge research article and book-chapter records; profile FAQs link directly to the supporting studies.
  - Relationships: retained his broad South Asian/Bengal context while clarifying he was based in North India; added no direct Bengal event link.
  - Model/validation/UI: no schema or UI changes; existing figure FAQ source validation is used.
  - Risk/known gaps: the profile avoids treating his advice to the Muslim League as unqualified endorsement or claiming a direct Bengal event role.

- Enriched Imam Ahmad Sirhindi's English and Bengali profiles with his Naqshbandi teaching, Maktubat, Mughal-era context, and carefully bounded Bengal connection through the order's networks.
  - Sources: added a bilingual Encyclopaedia Iranica reference record and linked the profile FAQs to it.
  - Relationships: retained Bengal as a regional connection through Naqshbandi networks; added no direct event link because the event catalog does not establish a direct role.
  - Model/validation/UI: no schema or UI changes; existing figure FAQ source validation is used.
  - Risk/known gaps: scholarly interpretations of Sirhindi's influence differ; the profile avoids presenting influence on Jahangir or Mughal policy as settled.

- Enriched Abul Fazal's English and Bengali figure profiles with biographical chronology, education and teaching career, Muslim Sahitya Samaj involvement, selected works, public positions, and literary recognition.
  - Sources: added the bilingual Banglapedia biography record and linked profile FAQs to it.
  - Relationships: added Chittagong as a relevant place; no event link was added because the current event records do not document a direct role.
  - Model/validation/UI: no schema or UI changes; the existing figure FAQ source validation is used.
  - Risk/known gaps: the profile follows Banglapedia's dates and summary; further literary analysis would need additional specialist sources.

- Revised the existing Haji Shariatullah figure profile in English and Bengali with a fuller, source-linked account of the Faraizi movement's formative phase, birth/death years, place context, and bilingual FAQs.
  - Content relationships: restricted `primaryEventIds` to the documented 1818 Faraizi movement chapter and linked the profile to Faridpur; removed unrelated Titu Mir and Rangpur uprising associations.
  - Documentation: clarified in `EDITORIAL_GUIDELINES.md` that movement figures should only receive primary event links when a direct role is documented.
  - Model/validation/UI: no schema, validator, or UI changes; existing figure fields and FAQ source validation are used.
  - Backfill: EN/BN figure metadata revised together; existing event figure and source relationships already covered this profile.
  - Risk/known gaps: details follow the existing Banglapedia reference record; its broader claims about agrarian politics are framed as context rather than unqualified conclusions.
## 2026-10-27 — Static hosting preparation

- Model/validation: no schema changes. Repaired stale internal cross-reference URLs in event FAQ source labels (retired 2018 composite slugs and a nonexistent topic slug); no historical narrative claims changed. Content validation and the figure audit remain part of CI.
- UI/runtime: enabled static export and trailing-slash output, made Next Image use source assets directly, replaced the root server redirect with a static Bengali handoff, and replaced the request-driven OG endpoint with deterministic build-time generated image routes for events and figures.
- Tooling/docs: added least-privilege GitHub Actions validation/build/artifact workflow, static artifact verifier, and static hosting/redirect documentation.
- Backfill: updated affected event quote source labels in EN/BN; all current supported route IDs are enumerated at build time.
- Known gaps: query-driven server pages now emit static default views, but their former search/filter/comparison/pagination behavior and query-specific `noindex` metadata need client-side replacement. The verified export is about 1.0 GB. Next Google Fonts currently need build-time network access.
