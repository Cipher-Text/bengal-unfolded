#!/usr/bin/env node
/**
 * Publish (or unpublish) quiz questions: sets `status` in both locale files.
 *
 * Usage:
 *   node scripts/publish-quiz.mjs --topic <slug> [--topic <slug> ...] --bengali-reviewed [--dry-run]
 *   node scripts/publish-quiz.mjs --ids lib-001,lib-002 --bengali-reviewed
 *   node scripts/publish-quiz.mjs --all --bengali-reviewed
 *   node scripts/publish-quiz.mjs --topic <slug> --unpublish        (back to draft; no review flag needed)
 *
 * Safeguards:
 *   - Publishing needs --bengali-reviewed: a fluent reader has reviewed the Bengali and its corrections were applied.
 *   - Only questions listed as READY in docs/quiz-review/source-check*.md can be published (override: --force).
 *   - Both locale files must exist, match and pass content:validate afterwards.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const values = (name) => argv.flatMap((a, i) => (a === name ? [argv[i + 1]] : [])).filter(Boolean);

const topics = values("--topic");
const ids = values("--ids").flatMap((v) => v.split(",").map((s) => s.trim()).filter(Boolean));
const all = flag("--all");
const unpublish = flag("--unpublish");
const dryRun = flag("--dry-run");
const force = flag("--force");
const reviewed = flag("--bengali-reviewed");
const target = unpublish ? "draft" : "published";

if (!all && topics.length === 0 && ids.length === 0) {
  console.error("Choose what to change: --topic <slug>, --ids a,b, or --all. See the header of scripts/publish-quiz.mjs.");
  process.exit(2);
}
if (!unpublish && !dryRun && !reviewed) {
  console.error("Refusing to publish without --bengali-reviewed. Publish only after a fluent reader has reviewed the Bengali and the corrections were applied (scripts/apply-quiz-review.mjs).");
  process.exit(2);
}

/**
 * Questions that passed the source check. Each docs/quiz-review/source-check*.md has a table whose header has either a
 * "Status" column (READY, READY (reworded), HOLD) or an "Action" column (KEEP, REWORDED, REPLACED, DROP, HOLD).
 */
async function readyIds() {
  const dir = path.join(root, "docs", "quiz-review");
  const set = new Set();
  for (const name of await fs.readdir(dir)) {
    if (!/^source-check.*\.md$/.test(name)) continue;
    let column = -1;
    let kind = "";
    for (const line of (await fs.readFile(path.join(dir, name), "utf-8")).split("\n")) {
      const cells = line.split("|").map((c) => c.trim());
      if (cells[1] === "ID") {
        column = cells.findIndex((c) => c === "Status" || c === "Action");
        kind = cells[column] ?? "";
        continue;
      }
      if (column < 0 || !/^[a-z]+-\d{3}$/.test(cells[1] ?? "")) continue;
      const value = cells[column] ?? "";
      const ok = kind === "Status" ? /^READY/.test(value) : /^(KEEP|REWORDED|REPLACED)/.test(value);
      if (ok) set.add(cells[1]);
    }
  }
  return set;
}

async function main() {
  const quizDir = path.join(root, "content", "quiz");
  const entries = (await fs.readdir(quizDir, { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => e.name).sort();
  const ready = await readyIds();
  const selected = [];
  const problems = [];

  for (const id of entries) {
    const en = JSON.parse(await fs.readFile(path.join(quizDir, id, "meta.en.json"), "utf-8"));
    const bn = JSON.parse(await fs.readFile(path.join(quizDir, id, "meta.bn.json"), "utf-8"));
    const wanted = all || ids.includes(id) || topics.includes(en.topicSlug);
    if (!wanted) continue;
    if (en.status !== bn.status) problems.push(`${id}: EN and BN status differ (${en.status} / ${bn.status})`);
    if (!unpublish && !force && !ready.has(id)) {
      problems.push(`${id}: not listed as READY in docs/quiz-review/source-check*.md (use --force to override)`);
      continue;
    }
    selected.push({ id, topic: en.topicSlug, from: en.status });
  }
  for (const id of ids) if (!entries.includes(id)) problems.push(`${id}: no such question`);
  for (const t of topics) if (!selected.some((s) => s.topic === t) && !problems.some((p) => p.includes(t))) problems.push(`topic ${t}: no questions found`);

  if (problems.length) {
    console.error(`\nCannot continue:\n${problems.map((p) => `  - ${p}`).join("\n")}`);
    process.exit(1);
  }

  const changing = selected.filter((s) => s.from !== target);
  const byTopic = new Map();
  for (const s of selected) byTopic.set(s.topic, (byTopic.get(s.topic) ?? 0) + 1);
  console.log(`${dryRun ? "DRY RUN: " : ""}${unpublish ? "Unpublishing" : "Publishing"} ${selected.length} question(s); ${changing.length} change status to ${target}.`);
  for (const [topic, count] of byTopic) console.log(`  ${topic}: ${count}`);
  if (!unpublish) {
    for (const [topic, count] of byTopic) {
      if (count < 10) console.warn(`warning: topic ${topic} has only ${count} question(s) selected; a quiz draws 10, so the set will be shorter than 10.`);
      else if (count < 40) console.log(`note: topic ${topic} has ${count} questions (a pool of 40 or more gives better replays).`);
    }
  }
  if (dryRun) return;

  for (const s of changing) {
    for (const locale of ["en", "bn"]) {
      const file = path.join(quizDir, s.id, `meta.${locale}.json`);
      const data = JSON.parse(await fs.readFile(file, "utf-8"));
      data.status = target;
      await fs.writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
    }
  }
  const result = spawnSync("node", ["scripts/validate-content.mjs"], { stdio: "inherit", cwd: root });
  if (result.status !== 0) {
    console.error("content:validate failed after the status change. Revert with: git checkout content/quiz");
    process.exit(1);
  }
  console.log(`\nDone: ${changing.length} question(s) set to ${target}.`);
  if (!unpublish) console.log("Next: pnpm lint, npx tsc --noEmit, pnpm build, pnpm static:verify, pnpm test:e2e, then commit.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
