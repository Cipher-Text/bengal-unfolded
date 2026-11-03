import { statSync } from "node:fs";
import path from "node:path";

// Most figure images are small text-only "image not available" cards (~12KB); a real portrait is far larger.
const MIN_PORTRAIT_BYTES = 40_000;

/** True when `image` (a /public path) is a real portrait and not a placeholder card. Server-side only. */
export function hasRealPortrait(image?: string): boolean {
  if (!image?.startsWith("/")) return false;
  try {
    return statSync(path.join(process.cwd(), "public", image)).size >= MIN_PORTRAIT_BYTES;
  } catch {
    return false;
  }
}
