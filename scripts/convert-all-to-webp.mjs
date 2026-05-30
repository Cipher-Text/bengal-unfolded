#!/usr/bin/env node
/**
 * Convert All Images to WebP
 *
 * Converts ALL JPG/PNG images in public/figures/ to WebP format,
 * regardless of size, for consistent format and better compression.
 *
 * Usage: node scripts/convert-all-to-webp.mjs
 */

import { readdir, stat, access } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const FIGURES_DIR = "./public/figures";
const QUALITY = 85;

async function getImageFiles(dir) {
  const entries = await readdir(dir);
  const imageFiles = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stats = await stat(fullPath);

    if (stats.isFile()) {
      const ext = extname(entry).toLowerCase();
      if ([".jpg", ".jpeg", ".png"].includes(ext)) {
        imageFiles.push({ path: fullPath, size: stats.size, name: entry });
      }
    }
  }

  return imageFiles;
}

async function convertToWebP(imagePath, imageName, originalSize) {
  const ext = extname(imageName);
  const nameWithoutExt = basename(imageName, ext);
  const webpPath = join(FIGURES_DIR, `${nameWithoutExt}.webp`);

  try {
    // Check if WebP already exists
    try {
      await access(webpPath);
      console.log(`⊘ ${imageName}: WebP already exists, skipping`);
      return { skipped: true, original: originalSize, optimized: originalSize, savings: 0 };
    } catch {
      // WebP doesn't exist, proceed with conversion
    }

    // Convert to WebP
    await sharp(imagePath)
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(webpPath);

    // Get new file size
    const newStats = await stat(webpPath);
    const savings = ((originalSize - newStats.size) / originalSize * 100).toFixed(1);
    const originalKB = (originalSize / 1024).toFixed(0);
    const newKB = (newStats.size / 1024).toFixed(0);

    console.log(`✓ ${imageName}: ${originalKB}KB → ${newKB}KB (${savings}% smaller)`);

    return { skipped: false, original: originalSize, optimized: newStats.size, savings: originalSize - newStats.size };
  } catch (error) {
    console.error(`✗ Failed to convert ${imageName}:`, error.message);
    return { skipped: false, original: originalSize, optimized: originalSize, savings: 0 };
  }
}

async function main() {
  console.log("🖼️  Converting all JPG/PNG images to WebP...\n");

  const imageFiles = await getImageFiles(FIGURES_DIR);
  const jpgPngFiles = imageFiles.filter(f => {
    const ext = extname(f.name).toLowerCase();
    return [".jpg", ".jpeg", ".png"].includes(ext);
  });

  console.log(`Found ${jpgPngFiles.length} JPG/PNG images to convert\n`);

  if (jpgPngFiles.length === 0) {
    console.log("✓ No JPG/PNG images found (already converted or none exist)");
    return;
  }

  const results = [];
  let skipped = 0;

  for (const { path, size, name } of jpgPngFiles) {
    const result = await convertToWebP(path, name, size);
    results.push(result);
    if (result.skipped) skipped++;
  }

  const convertedResults = results.filter(r => !r.skipped);
  const totalOriginal = convertedResults.reduce((sum, r) => sum + r.original, 0);
  const totalOptimized = convertedResults.reduce((sum, r) => sum + r.optimized, 0);
  const totalSavings = convertedResults.reduce((sum, r) => sum + r.savings, 0);
  const percentSaved = totalOriginal > 0 ? ((totalSavings / totalOriginal) * 100).toFixed(1) : 0;

  console.log(`\n📊 Summary:`);
  console.log(`   Images processed: ${jpgPngFiles.length}`);
  console.log(`   Converted: ${convertedResults.length}`);
  console.log(`   Skipped (already exist): ${skipped}`);
  if (convertedResults.length > 0) {
    console.log(`   Original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Optimized size: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Total savings: ${(totalSavings / 1024 / 1024).toFixed(2)} MB (${percentSaved}%)`);
  }

  console.log(`\n✓ Created ${convertedResults.length} WebP images`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Run: node scripts/update-image-refs-to-webp.mjs`);
  console.log(`   2. Test the site to verify images display correctly`);
  console.log(`   3. After verification, delete original JPG/PNG files`);
}

main().catch(console.error);
