#!/usr/bin/env node
/**
 * Update Image References Script
 *
 * Updates all figure metadata JSON files to reference .webp images
 * instead of .jpg/.png where WebP versions exist.
 *
 * Usage: pnpm update:image-refs
 */

import { readdir, readFile, writeFile, access } from "node:fs/promises";
import { join } from "node:path";

const CONTENT_DIR = "./content/figures";
const PUBLIC_DIR = "./public/figures";

async function webpExists(imagePath) {
  const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  try {
    await access(join("./public", webpPath));
    return true;
  } catch {
    return false;
  }
}

async function updateMetadataFile(filePath) {
  try {
    const content = await readFile(filePath, "utf-8");
    const data = JSON.parse(content);

    if (!data.image) return null;

    const hasWebp = await webpExists(data.image);
    if (!hasWebp) return null;

    const oldImage = data.image;
    const newImage = data.image.replace(/\.(jpg|jpeg|png)$/i, ".webp");

    if (oldImage === newImage) return null;

    data.image = newImage;

    await writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");

    return { file: filePath, oldImage, newImage };
  } catch (error) {
    console.error(`✗ Failed to update ${filePath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log("🔄 Updating image references to WebP...\n");

  const figureDirs = await readdir(CONTENT_DIR);
  const updates = [];

  for (const dir of figureDirs) {
    const metaFiles = ["meta.en.json", "meta.bn.json"];

    for (const metaFile of metaFiles) {
      const filePath = join(CONTENT_DIR, dir, metaFile);

      try {
        await access(filePath);
        const result = await updateMetadataFile(filePath);
        if (result) {
          updates.push(result);
          console.log(`✓ ${dir}/${metaFile}: ${result.oldImage} → ${result.newImage}`);
        }
      } catch {
        // File doesn't exist, skip
      }
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Updated ${updates.length} metadata files`);
  console.log(`\n✓ All image references updated to WebP`);
}

main().catch(console.error);
