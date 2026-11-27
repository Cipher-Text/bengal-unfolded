# Quiz release runbook

Steps to take the quiz from draft to live once the Bengali review is back. Every question is `status: draft` until step 4. (As of 2026-11-27 the Liberation War, Colonial Bengal, Pakistan period and Language Movement questions have gone through these steps and are published; new topics start from draft again.) Until then the quiz pages are empty and the home banner, topic cards and event cards stay hidden (only the "Quiz" menu link shows).

## Before: what must be true

- A fluent reader has returned `bengali-review.csv` with corrections (blank means fine).
- `docs/quiz-review/source-check*.md` lists the questions as ready (it does: 68 of 68 as of 2026-11-24, and 18 of 18 language questions as of 2026-11-27 in `source-check-language.md`).
- You decided which topics to launch. Liberation War (40), Colonial Bengal (14) and the Pakistan period (14) are available.

## Steps

1. **Dry run the corrections.** Save the filled CSV anywhere and run:

   ```bash
   pnpm quiz:apply-review path/to/filled.csv
   ```

   Read the report. Fix the CSV or use `--force` where the exported text has changed since export. Rows listed under "Needs manual edit" contain template code; edit those strings by hand in the file named in the report.
2. **Apply the corrections.**

   ```bash
   pnpm quiz:apply-review path/to/filled.csv --write
   ```

   It writes the Bengali files, the quiz site copy and plain screen strings, then runs `content:validate`. Review `git diff`.
3. **Check the code.**

   ```bash
   pnpm lint
   npx tsc --noEmit
   ```
4. **Publish.** One topic or all of them:

   ```bash
   pnpm quiz:publish --topic liberation-war-1971 --bengali-reviewed --dry-run
   pnpm quiz:publish --topic liberation-war-1971 --bengali-reviewed
   pnpm quiz:publish --all --bengali-reviewed
   ```

   It refuses without `--bengali-reviewed`, refuses questions the source-check tables do not list as ready (override with `--force`), and runs `content:validate`. To take a topic back to draft: `pnpm quiz:publish --topic <slug> --unpublish`.
5. **Verify the build.**

   ```bash
   pnpm build
   pnpm static:verify
   pnpm test:e2e
   ```

   Then open the site and play one quiz in English and Bengali: home banner, a topic page, an event page, the quiz, the result and the share card.
6. **Update the roadmap and changelog.** Tick RM-009 in `docs/ROADMAP.md` once the quiz is live and add a `docs/CHANGELOG.md` entry (what was published, review status, known gaps).
7. **Commit and deploy.** Commit the content, then push and deploy by your normal process (for example the container flow in `docs/CONTAINER_DEPLOYMENT.md`). Nothing is pushed by the scripts.

## Optional before launch

- Test the share card on one Android phone and one iPhone (Bengali conjunct letters, share and download).
- Add a second source for the single-source points listed in `source-check.md` (UNESCO year, Daruin dates, the tribunal's law, the surrender-ground link).

## Rollback

`pnpm quiz:publish --all --unpublish` returns every question to draft; the entry points disappear on the next build. The review corrections stay applied.
