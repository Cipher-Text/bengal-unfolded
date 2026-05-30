#!/usr/bin/env node
/**
 * Update Image References to WebP
 *
 * Updates all figure metadata JSON files to reference .webp images
 * instead of .jpg/.jpeg/.png after optimization.
 *
 * Usage: node scripts/update-image-refs-to-webp.mjs
 */

import { readdir, readFile, writeFile, access } from "node:fs/promises";
import { join } from "node:path";

const FIGURES_DIR = "./content/figures";
const PUBLIC_FIGURES_DIR = "./public/figures";

async function updateMetadataFile(filePath, figureId) {
  try {
    const content = await readFile(filePath, "utf8");
    const data = JSON.parse(content);

    // Check if image field exists
    if (!data.image) {
      return { updated: false, reason: "no-image-field" };
    }

    const currentImage = data.image;
    const currentExt = currentImage.match(/\.(jpg|jpeg|png)$/i);

    if (!currentExt) {
      return { updated: false, reason: "already-webp-or-other" };
    }

    // Generate new WebP path
    const newImage = currentImage.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    const webpFilePath = join(PUBLIC_FIGURES_DIR, `${figureId}.webp`);

    // Check if WebP file exists
    try {
      await access(webpFilePath);
    } catch {
      return { updated: false, reason: "webp-not-found" };
    }

    // Update the image reference
    data.image = newImage;

    // Write back with pretty formatting
    await writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");

    return { updated: true, from: currentImage, to: newImage };
  } catch (error) {
    return { updated: false, reason: "error", error: error.message };
  }
}

async function main() {
  console.log("🔄 Updating figure metadata to reference WebP images...\n");

  const figureIds = await readdir(FIGURES_DIR);
  const stats = {
    total: 0,
    updated: 0,
    skipped: {
      "no-image-field": 0,
      "already-webp-or-other": 0,
      "webp-not-found": 0,
      error: 0,
    },
  };

  for (const figureId of figureIds) {
    const figureDir = join(FIGURES_DIR, figureId);

    try {
      // Check if it's a directory
      const stat = await readFile(join(figureDir, "meta.en.json")).catch(
        () => null,
      );
      if (!stat) continue;

      // Update both EN and BN metadata
      for (const locale of ["en", "bn"]) {
        const metaPath = join(figureDir, `meta.${locale}.json`);
        stats.total++;

        const result = await updateMetadataFile(metaPath, figureId);

        if (result.updated) {
          stats.updated++;
          console.log(`✓ ${figureId} (${locale}): ${result.from} → ${result.to}`);
        } else {
          stats.skipped[result.reason] =
            (stats.skipped[result.reason] || 0) + 1;
          if (result.reason === "error") {
            console.log(`✗ ${figureId} (${locale}): ${result.error}`);
          }
        }
      }
    } catch {
      // Not a figure directory, skip
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Total metadata files: ${stats.total}`);
  console.log(`   Updated to .webp: ${stats.updated}`);
  console.log(`   Skipped:`);
  console.log(`     - No image field: ${stats.skipped["no-image-field"]}`);
  console.log(
    `     - Already WebP/other: ${stats.skipped["already-webp-or-other"]}`,
  );
  console.log(`     - WebP not found: ${stats.skipped["webp-not-found"]}`);
  if (stats.skipped.error > 0) {
    console.log(`     - Errors: ${stats.skipped.error}`);
  }

  console.log(`\n✓ Metadata update complete!`);

  if (stats.skipped["webp-not-found"] > 0) {
    console.log(
      `\n⚠️  Warning: ${stats.skipped["webp-not-found"]} files reference WebP images that don't exist.`,
    );
    console.log(`   Run pnpm optimize:images to create missing WebP files.`);
  }
}

main().catch(console.error);
