#!/usr/bin/env node
/**
 * Image Optimization Script
 *
 * Optimizes all images in public/figures/ by:
 * 1. Converting to WebP format (30-50% smaller)
 * 2. Resizing large images to max 1200px width
 * 3. Compressing with quality 85
 *
 * Usage: pnpm optimize:images
 */

import { readdir, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const FIGURES_DIR = "./public/figures";
const MAX_WIDTH = 1200;
const QUALITY = 85;
const SIZE_THRESHOLD = 100 * 1024; // 100KB - only optimize files larger than this

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

async function optimizeImage(imagePath, imageName, originalSize) {
  const ext = extname(imageName);
  const nameWithoutExt = basename(imageName, ext);
  const webpPath = join(FIGURES_DIR, `${nameWithoutExt}.webp`);

  try {
    // Get image metadata
    const metadata = await sharp(imagePath).metadata();

    // Create sharp pipeline
    let pipeline = sharp(imagePath);

    // Resize if too large
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: "inside",
      });
    }

    // Convert to WebP
    await pipeline
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(webpPath);

    // Get new file size
    const newStats = await stat(webpPath);
    const savings = ((originalSize - newStats.size) / originalSize * 100).toFixed(1);
    const originalMB = (originalSize / 1024 / 1024).toFixed(2);
    const newKB = (newStats.size / 1024).toFixed(0);

    console.log(`✓ ${imageName}: ${originalMB}MB → ${newKB}KB (${savings}% smaller)`);

    return { original: originalSize, optimized: newStats.size, savings: originalSize - newStats.size };
  } catch (error) {
    console.error(`✗ Failed to optimize ${imageName}:`, error.message);
    return { original: originalSize, optimized: originalSize, savings: 0 };
  }
}

async function main() {
  console.log("🖼️  Optimizing figure images...\n");

  const imageFiles = await getImageFiles(FIGURES_DIR);
  const largeImages = imageFiles.filter(f => f.size > SIZE_THRESHOLD);

  console.log(`Found ${imageFiles.length} images (${largeImages.length} over ${SIZE_THRESHOLD / 1024}KB)\n`);

  if (largeImages.length === 0) {
    console.log("✓ All images are already optimized!");
    return;
  }

  const results = [];

  for (const { path, size, name } of largeImages) {
    const result = await optimizeImage(path, name, size);
    results.push(result);
  }

  const totalOriginal = results.reduce((sum, r) => sum + r.original, 0);
  const totalOptimized = results.reduce((sum, r) => sum + r.optimized, 0);
  const totalSavings = results.reduce((sum, r) => sum + r.savings, 0);
  const percentSaved = ((totalSavings / totalOriginal) * 100).toFixed(1);

  console.log(`\n📊 Summary:`);
  console.log(`   Original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Optimized size: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Total savings: ${(totalSavings / 1024 / 1024).toFixed(2)} MB (${percentSaved}%)`);
  console.log(`\n✓ Created ${results.length} WebP images`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Update figure metadata JSON files to use .webp extensions`);
  console.log(`   2. Test the site to ensure images display correctly`);
  console.log(`   3. After verification, delete the original large .jpg/.png files`);
}

main().catch(console.error);
