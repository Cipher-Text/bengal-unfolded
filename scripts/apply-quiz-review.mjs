#!/usr/bin/env node
/**
 * Apply a reviewer's Bengali corrections from the filled review CSV
 * (docs/quiz-review/bengali-review.csv format) to the repository.
 *
 * Usage:
 *   node scripts/apply-quiz-review.mjs <filled.csv>            dry run: prints what would change
 *   node scripts/apply-quiz-review.mjs <filled.csv> --write    applies, then runs content:validate
 *   add --force to apply a correction even when the file no longer matches the exported "Bengali (current)" text
 *
 * Item IDs: <id>.question, <id>.option.<x>, <id>.explanation  -> content/quiz/<id>/meta.bn.json
 *           site.*                                              -> content/site/quiz.bn.json
 *           ui.*                                                -> Bengali string literal in the quiz source files
 * UI rows whose text contains template code are reported as "manual".
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const args = process.argv.slice(2);
const csvPath = args.find((a) => !a.startsWith("--"));
const write = args.includes("--write");
const force = args.includes("--force");
if (!csvPath) {
  console.error("Usage: node scripts/apply-quiz-review.mjs <filled.csv> [--write] [--force]");
  process.exit(2);
}

const UI_FILES = [
  "src/components/QuizPlayInteractive.tsx",
  "src/components/QuizShareCard.tsx",
  "src/lib/quiz-card.ts",
  "src/app/[locale]/quiz/page.tsx",
  "src/components/QuizResumeCard.tsx",
  "src/components/QuizTestYourself.tsx",
  "src/components/home/QuizHomeBanner.tsx",
  "src/components/SiteHeader.tsx",
];

/** Minimal RFC 4180 parser: quotes, doubled quotes, CRLF, BOM. */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  const src = text.replace(/^﻿/, "");
  for (let i = 0; i < src.length; i += 1) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i += 1;
        } else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i += 1;
      row.push(field);
      field = "";
      if (row.some((cell) => cell !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== "" || row.length) {
    row.push(field);
    if (row.some((cell) => cell !== "")) rows.push(row);
  }
  return rows;
}

const bengali = /[ঀ-৿]/;
const placeholders = (s) => (s.match(/\$\{[^}]+\}/g) ?? []).sort().join("|");

const docs = new Map(); // path -> { data, changed }
async function loadJson(rel) {
  if (!docs.has(rel)) {
    try {
      docs.set(rel, { data: JSON.parse(await fs.readFile(path.join(root, rel), "utf-8")), changed: false });
    } catch {
      docs.set(rel, null);
    }
  }
  return docs.get(rel);
}
const sources = new Map();
async function loadSource(rel) {
  if (!sources.has(rel)) sources.set(rel, { text: await fs.readFile(path.join(root, rel), "utf-8"), changed: false });
  return sources.get(rel);
}

const report = { applied: [], unchanged: [], conflicts: [], manual: [], missing: [], invalid: [], warnings: [] };

function validateCorrection(id, current, correction) {
  if (placeholders(current) !== placeholders(correction)) return `placeholders differ (${placeholders(current) || "none"} vs ${placeholders(correction) || "none"})`;
  const letters = correction.replace(/\$\{[^}]+\}/g, "").replace(/[\s\d.,:;!?/()\-\u2014\u2026]/g, "");
  if (letters && !bengali.test(correction)) return "no Bengali characters";
  return null;
}

async function main() {
  const rows = parseCsv(await fs.readFile(csvPath, "utf-8"));
  const header = rows[0];
  const col = (prefix) => header.findIndex((h) => h.startsWith(prefix));
  const iId = col("Item ID");
  const iCur = col("Bengali (current)");
  const iFix = col("Reviewer correction");
  const iNote = col("Reviewer note");
  if ([iId, iCur, iFix].some((i) => i < 0)) {
    console.error("This does not look like the review CSV (missing Item ID / Bengali (current) / Reviewer correction columns).");
    process.exit(2);
  }

  for (const row of rows.slice(1)) {
    const id = (row[iId] ?? "").trim();
    const current = (row[iCur] ?? "").trim();
    const fix = (row[iFix] ?? "").trim();
    if (!id || !fix) continue;
    if (fix === current) {
      report.unchanged.push(id);
      continue;
    }
    const problem = validateCorrection(id, current, fix);
    if (problem) {
      report.invalid.push(`${id}: ${problem}`);
      continue;
    }
    if (/[^।]\.$/.test(fix) && bengali.test(fix)) report.warnings.push(`${id}: ends with an ASCII full stop; Bengali sentences use the danda (।)`);

    let m;
    if ((m = id.match(/^([a-z]+-\d{3})\.(question|explanation|option\.([a-e]))$/))) {
      const rel = `content/quiz/${m[1]}/meta.bn.json`;
      const doc = await loadJson(rel);
      if (!doc) {
        report.missing.push(`${id}: ${rel} not found`);
        continue;
      }
      let target;
      let key;
      if (m[3]) {
        target = doc.data.options.find((o) => o.id === m[3]);
        key = "text";
      } else {
        target = doc.data;
        key = m[2];
      }
      if (!target) {
        report.missing.push(`${id}: option not found`);
        continue;
      }
      if (target[key] !== current && !force) {
        report.conflicts.push(`${id}: file text differs from the exported text (changed since export); use --force to overwrite`);
        continue;
      }
      target[key] = fix;
      doc.changed = true;
      report.applied.push(`${id}: ${current} -> ${fix}`);
    } else if (id.startsWith("site.")) {
      const rel = "content/site/quiz.bn.json";
      const doc = await loadJson(rel);
      const data = doc.data;
      let holder;
      let key;
      let t;
      if ((t = id.match(/^site\.(disclaimer)$/))) {
        holder = data;
        key = t[1];
      } else if ((t = id.match(/^site\.tier\.([a-z-]+)\.(title|message)$/))) {
        holder = data.tiers.find((tier) => tier.id === t[1]);
        key = t[2];
      } else if ((t = id.match(/^site\.feedback\.(correct|wrong|skipped)\.(\d+)$/))) {
        holder = data.feedback[t[1]];
        key = Number(t[2]) - 1;
      }
      if (!holder || holder[key] === undefined) {
        report.missing.push(`${id}: not found in ${rel}`);
        continue;
      }
      if (holder[key] !== current && !force) {
        report.conflicts.push(`${id}: file text differs from the exported text; use --force to overwrite`);
        continue;
      }
      holder[key] = fix;
      doc.changed = true;
      report.applied.push(`${id}: ${current} -> ${fix}`);
    } else if (id.startsWith("ui.")) {
      if (current.includes("${") || current.includes("`")) {
        report.manual.push(`${id}: contains template code, edit by hand: "${current}" -> "${fix}"`);
        continue;
      }
      const hits = [];
      for (const rel of UI_FILES) {
        const src = await loadSource(rel);
        let from = 0;
        while ((from = src.text.indexOf(current, from)) !== -1) {
          hits.push({ rel, at: from });
          from += current.length;
        }
      }
      if (hits.length !== 1) {
        report.manual.push(`${id}: ${hits.length === 0 ? "text not found" : `found ${hits.length} times`} in the quiz source files, edit by hand: "${current}" -> "${fix}"`);
        continue;
      }
      const src = await loadSource(hits[0].rel);
      const safeFix = fix.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      src.text = src.text.slice(0, hits[0].at) + safeFix + src.text.slice(hits[0].at + current.length);
      src.changed = true;
      report.applied.push(`${id} (${hits[0].rel}): ${current} -> ${fix}`);
    } else {
      report.missing.push(`${id}: unknown item id format`);
    }
    if (iNote >= 0 && row[iNote]?.trim()) report.warnings.push(`${id}: reviewer note: ${row[iNote].trim()}`);
  }

  if (write) {
    for (const [rel, doc] of docs) if (doc?.changed) await fs.writeFile(path.join(root, rel), `${JSON.stringify(doc.data, null, 2)}\n`);
    for (const [rel, src] of sources) if (src.changed) await fs.writeFile(path.join(root, rel), src.text);
  }

  const section = (title, list) => {
    if (list.length) console.log(`\n${title} (${list.length}):\n${list.map((x) => `  - ${x}`).join("\n")}`);
  };
  console.log(write ? "Applied the review corrections." : "DRY RUN: nothing was written. Re-run with --write to apply.");
  section(write ? "Applied" : "Would apply", report.applied);
  section("Needs manual edit", report.manual);
  section("Conflicts (skipped)", report.conflicts);
  section("Invalid corrections (skipped)", report.invalid);
  section("Not found (skipped)", report.missing);
  section("Warnings", report.warnings);
  console.log(`\nSummary: ${report.applied.length} ${write ? "applied" : "to apply"}, ${report.unchanged.length} unchanged, ${report.manual.length} manual, ${report.conflicts.length} conflicts, ${report.invalid.length} invalid, ${report.missing.length} not found.`);

  if (write) {
    const result = spawnSync("node", ["scripts/validate-content.mjs"], { stdio: "inherit", cwd: root });
    if (result.status !== 0) {
      console.error("content:validate failed after applying; review the changes with git diff.");
      process.exit(1);
    }
    console.log("Next: pnpm lint, npx tsc --noEmit, then review git diff before committing.");
  }
  if (report.invalid.length || report.conflicts.length || report.missing.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
