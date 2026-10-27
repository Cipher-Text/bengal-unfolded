#!/usr/bin/env node
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "out");
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.isFile()) files.push({ path: path.relative(root, file), size: (await stat(file)).size });
  }
}
await walk(root);
const sum = (predicate = () => true) => files.reduce((total, file) => total + (predicate(file) ? file.size : 0), 0);
const human = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
const social = (file) => /^og\/.*\.(?:png|jpe?g|webp)$/i.test(file.path);
const image = (file) => /\.(?:png|jpe?g|webp|avif|gif|svg)$/i.test(file.path);
const report = {
  output: root,
  totalBytes: sum(),
  fileCount: files.length,
  htmlBytes: sum((f) => f.path.endsWith(".html")),
  nextRoutePayloadBytes: sum((f) => f.path.endsWith(".txt")),
  javascriptBytes: sum((f) => f.path.endsWith(".js")),
  cssBytes: sum((f) => f.path.endsWith(".css")),
  imageBytes: sum(image),
  socialImageBytes: sum(social),
  topFiles: [...files].sort((a, b) => b.size - a.size).slice(0, 20).map(({ path: file, size }) => ({ file, bytes: size, size: human(size) })),
};
console.log(JSON.stringify(report, null, 2));
