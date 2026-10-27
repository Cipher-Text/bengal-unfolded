#!/usr/bin/env node
import { createHash } from "node:crypto";
import { gzipSync } from "node:zlib";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "out");
const baselinePath = path.resolve(process.argv[3] ?? "scripts/build-size-baseline.json");
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.isFile()) {
      const info = await stat(file);
      files.push({ path: path.relative(root, file), size: info.size });
    }
  }
}
await walk(root);
const sum = (predicate = () => true) => files.reduce((total, file) => total + (predicate(file) ? file.size : 0), 0);
const human = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
const social = (file) => /^og\/.*\.(?:png|jpe?g|webp)$/i.test(file.path);
const image = (file) => /\.(?:png|jpe?g|webp|avif|gif|svg)$/i.test(file.path);
const html = (file) => file.path.endsWith(".html");
const routePayload = (file) => file.path.endsWith(".txt");
const reports = [
  ["figures/en", "en/figures/index.html", "en/figures/"],
  ["figures/bn", "bn/figures/index.html", "bn/figures/"],
  ["resources/en", "en/resources/index.html", "en/resources/"],
  ["resources/bn", "bn/resources/index.html", "bn/resources/"],
  ["creators/en", "en/creators/index.html", "en/creators/"],
  ["creators/bn", "bn/creators/index.html", "bn/creators/"],
  ["timeline/en", "en/timeline/index.html", "en/timeline/"],
  ["timeline/bn", "bn/timeline/index.html", "bn/timeline/"],
  ["compare/en", "en/compare/index.html", "en/compare/"],
  ["compare/bn", "bn/compare/index.html", "bn/compare/"],
  ["event/en", "en/events/1971-liberation-war/index.html", "en/events/1971-liberation-war/"],
  ["event/bn", "bn/events/1971-liberation-war/index.html", "bn/events/1971-liberation-war/"],
];
const representativePages = [];
for (const [name, htmlPath, prefix] of reports) {
  const pageHtml = files.find((file) => file.path === htmlPath);
  const isPagePayload = (file) => routePayload(file) && file.path.startsWith(prefix) && !file.path.slice(prefix.length).includes(path.sep);
  representativePages.push({
    name,
    htmlBytes: pageHtml?.size ?? 0,
    htmlGzipBytes: pageHtml ? gzipSync(await readFile(path.join(root, htmlPath))).byteLength : 0,
    routePayloadBytes: sum(isPagePayload),
    routePayloadFileCount: files.filter(isPagePayload).length,
  });
}
const directoryBytes = new Map();
for (const file of files) {
  const top = file.path.split(path.sep)[0] || ".";
  directoryBytes.set(top, (directoryBytes.get(top) ?? 0) + file.size);
}
const hashGroups = new Map();
for (const file of files) {
  if (file.size < 256 || (!html(file) && !routePayload(file))) continue;
  const digest = createHash("sha256").update(await readFile(path.join(root, file.path))).digest("hex");
  const group = hashGroups.get(digest) ?? { bytes: file.size, files: [] };
  group.files.push(file.path);
  hashGroups.set(digest, group);
}
const allDuplicateGroups = [...hashGroups.values()].filter((group) => group.files.length > 1).sort((a, b) => b.bytes * b.files.length - a.bytes * a.files.length);
const duplicateGroups = allDuplicateGroups.slice(0, 20);
const baseline = JSON.parse(await readFile(baselinePath, "utf8"));
const metrics = {
  totalBytes: sum(),
  fileCount: files.length,
  htmlFileCount: files.filter(html).length,
  htmlBytes: sum(html),
  nextRoutePayloadFileCount: files.filter(routePayload).length,
  nextRoutePayloadBytes: sum(routePayload),
  javascriptBytes: sum((f) => f.path.endsWith(".js")),
  cssBytes: sum((f) => f.path.endsWith(".css")),
  imageBytes: sum(image),
  socialImageBytes: sum(social),
};
const deltas = Object.fromEntries(Object.entries(metrics).map(([key, value]) => [key, {
  baseline: baseline[key] ?? null,
  current: value,
  change: baseline[key] === undefined ? null : value - baseline[key],
  changePercent: baseline[key] ? Number((((value - baseline[key]) / baseline[key]) * 100).toFixed(2)) : null,
}]));
console.log(JSON.stringify({
  output: root,
  baseline: baseline.label,
  metrics,
  deltas,
  directoryBytes: Object.fromEntries([...directoryBytes].sort((a, b) => b[1] - a[1]).slice(0, 20)),
  representativePages,
  exactDuplicateFiles: {
    groupCount: allDuplicateGroups.length,
    filesInGroups: allDuplicateGroups.reduce((total, group) => total + group.files.length, 0),
    duplicateFileCopies: allDuplicateGroups.reduce((total, group) => total + group.files.length - 1, 0),
    duplicateBytes: allDuplicateGroups.reduce((total, group) => total + group.bytes * (group.files.length - 1), 0),
    topGroups: duplicateGroups.map((group) => ({ bytes: group.bytes, fileCount: group.files.length, sampleFiles: group.files.slice(0, 8) })),
  },
  topFiles: [...files].sort((a, b) => b.size - a.size).slice(0, 25).map(({ path: file, size }) => ({ file, bytes: size, size: human(size) })),
}, null, 2));
