#!/usr/bin/env node
import { readdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(process.argv[2] ?? "out/og");
let before = 0;
let after = 0;
let count = 0;
let visited = 0;
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { await walk(file); continue; }
    if (!entry.isFile() || path.extname(file).toLowerCase() !== ".png") continue;
    const input = await readFile(file);
    const metadata = await sharp(input).metadata();
    if (metadata.width !== 1200 || metadata.height !== 630) throw new Error(`Unexpected social image dimensions: ${file}`);
    const output = await sharp(input).png({ compressionLevel: 9, adaptiveFiltering: true, palette: false }).toBuffer();
    before += input.length;
    if (output.length < input.length) {
      const temp = `${file}.tmp`;
      await writeFile(temp, output);
      await rename(temp, file);
      after += output.length;
    } else after += input.length;
    count++;
    visited++;
    if (visited % 200 === 0) console.log(`Checked ${visited} social PNGs…`);
  }
}
await walk(root);
console.log(`Lossless social PNG optimization: ${count} files, ${(before / 1048576).toFixed(2)} MiB → ${(after / 1048576).toFixed(2)} MiB (${((before - after) / 1048576).toFixed(2)} MiB saved)`);
