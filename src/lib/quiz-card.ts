import { CANONICAL_ORIGIN } from "@/lib/seo";
import type { Locale } from "@/types/content";

/** Client-side share card: name cleaning and canvas drawing. Browser only. */

export const CARD_NAME_MAX = 24;

export const CARD_FORMATS = {
  story: { width: 1080, height: 1920 },
  feed: { width: 1080, height: 1350 },
} as const;

export type CardFormat = keyof typeof CARD_FORMATS;

export type CardOptions = {
  locale: Locale;
  format: CardFormat;
  tierTitle: string;
  topicTitle: string;
  scoreText: string;
  totalText: string;
  /** Cleaned display name; empty or undefined draws the card without a name. */
  name?: string;
};

const PALETTE = {
  bgTop: "#0f1a14",
  bgBottom: "#1f3326",
  gold: "#d8b166",
  goldSoft: "rgba(216, 177, 102, 0.55)",
  ink: "#f1e6cf",
  muted: "#b7a583",
  red: "#b04535",
};

const STRINGS = {
  en: {
    brand: "BENGAL UNFOLDED",
    completed: "completed the Bengal Unfolded quiz",
    anonymous: "My Bengal Unfolded quiz result",
    topic: (topic: string) => `Topic: ${topic}`,
    scoreOf: (total: string) => `of ${total}`,
    cta: "Take the challenge",
    alt: (tier: string, name: string | undefined) => `Quiz result card${name ? ` for ${name}` : ""}: ${tier}`,
  },
  bn: {
    brand: "BENGAL UNFOLDED",
    completed: "বেঙ্গল আনফোল্ডেড কুইজ সম্পন্ন করেছেন",
    anonymous: "আমার বেঙ্গল আনফোল্ডেড কুইজের ফল",
    topic: (topic: string) => `বিষয়: ${topic}`,
    scoreOf: (total: string) => `${total}-এর মধ্যে`,
    cta: "চ্যালেঞ্জ নিন",
    alt: (tier: string, name: string | undefined) => `কুইজের ফল কার্ড${name ? ` — ${name}` : ""}: ${tier}`,
  },
} as const;

export function cardAltText(options: Pick<CardOptions, "locale" | "tierTitle" | "name">): string {
  return STRINGS[options.locale].alt(options.tierTitle, options.name?.trim() || undefined);
}

function graphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text), (part) => part.segment);
  }
  return Array.from(text);
}

/** Plain text only: letters, combining marks (Bengali vowel signs), digits, space, . - and apostrophes. Emoji and symbols are dropped. */
export function cleanName(input: string): string {
  const stripped = input.replace(/[^\p{L}\p{M}\p{N} .'’-]/gu, "").replace(/\s+/g, " ");
  return graphemes(stripped).slice(0, CARD_NAME_MAX).join("");
}

export function nameLength(input: string): number {
  return graphemes(input).length;
}

type Families = { display: string; type: string; body: string };

function resolveFamilies(): Families {
  const read = (className: string, base?: HTMLElement) => {
    const el = document.createElement("span");
    el.className = className;
    el.textContent = "x";
    el.style.position = "absolute";
    el.style.visibility = "hidden";
    (base ?? document.body).appendChild(el);
    const family = getComputedStyle(el).fontFamily;
    el.remove();
    return family;
  };
  return {
    display: read("text-display"),
    type: read("text-type"),
    body: getComputedStyle(document.body).fontFamily,
  };
}

async function ensureFonts(specs: string[], text: string): Promise<void> {
  try {
    await Promise.all(specs.map((spec) => document.fonts.load(spec, text)));
    await document.fonts.ready;
  } catch {
    // Fall back to whatever is available; the card still draws.
  }
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth || !line) line = candidate;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function setSpacing(ctx: CanvasRenderingContext2D, px: number): void {
  if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${px}px`;
}

type Block = { height: number; draw: (y: number) => void };

/**
 * Draws the share card onto `canvas` at full resolution. Returns false when `isCancelled` became true
 * while fonts were loading (a newer draw superseded this one).
 */
export async function drawShareCard(canvas: HTMLCanvasElement, options: CardOptions, isCancelled: () => boolean = () => false): Promise<boolean> {
  const { width: W, height: H } = CARD_FORMATS[options.format];
  const t = STRINGS[options.locale];
  const bn = options.locale === "bn";
  const families = resolveFamilies();
  // Bengali glyphs come from the body family (Hind Siliguri); Latin display text uses Playfair Display.
  const display = bn ? families.body : families.display;
  const name = options.name?.trim() ? options.name.trim() : "";
  const allText = [t.completed, t.anonymous, name, options.tierTitle, t.topic(options.topicTitle), t.scoreOf(options.totalText), t.cta, t.brand, options.scoreText].join(" ");
  await ensureFonts([`600 64px ${display}`, `400 34px ${display}`, `400 34px ${families.type}`, `400 34px ${families.body}`], allText);
  if (isCancelled()) return false;

  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  // Background and frame.
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, PALETTE.bgTop);
  bg.addColorStop(1, PALETTE.bgBottom);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = PALETTE.goldSoft;
  ctx.lineWidth = 3;
  ctx.strokeRect(40, 40, W - 80, H - 80);
  ctx.lineWidth = 1;
  ctx.strokeRect(56, 56, W - 112, H - 112);

  const cx = W / 2;
  const maxWidth = 860;
  const blocks: Block[] = [];

  // Brand.
  blocks.push({
    height: 40,
    draw: (y) => {
      ctx.fillStyle = PALETTE.gold;
      ctx.font = `400 32px ${families.type}`;
      setSpacing(ctx, 8);
      ctx.fillText(t.brand, cx + 4, y + 32);
      setSpacing(ctx, 0);
    },
  });

  // Ornament: hairlines, a diamond and a short red rule.
  blocks.push({
    height: 36,
    draw: (y) => {
      const mid = y + 18;
      ctx.strokeStyle = PALETTE.goldSoft;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 280, mid);
      ctx.lineTo(cx - 28, mid);
      ctx.moveTo(cx + 28, mid);
      ctx.lineTo(cx + 280, mid);
      ctx.stroke();
      ctx.fillStyle = PALETTE.gold;
      ctx.beginPath();
      ctx.moveTo(cx, mid - 12);
      ctx.lineTo(cx + 12, mid);
      ctx.lineTo(cx, mid + 12);
      ctx.lineTo(cx - 12, mid);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = PALETTE.red;
      ctx.fillRect(cx - 40, mid + 24, 80, 4);
    },
  });

  // Name (or an anonymous headline).
  if (name) {
    let size = 92;
    ctx.font = `600 ${size}px ${display}`;
    while (size > 40 && ctx.measureText(name).width > maxWidth) {
      size -= 4;
      ctx.font = `600 ${size}px ${display}`;
    }
    const fitted = size;
    blocks.push({
      height: fitted + 20 + 50,
      draw: (y) => {
        ctx.fillStyle = PALETTE.ink;
        ctx.font = `600 ${fitted}px ${display}`;
        ctx.fillText(name, cx, y + fitted);
        ctx.fillStyle = PALETTE.muted;
        ctx.font = `400 34px ${families.body}`;
        ctx.fillText(t.completed, cx, y + fitted + 20 + 34);
      },
    });
  } else {
    blocks.push({
      height: 56,
      draw: (y) => {
        ctx.fillStyle = PALETTE.muted;
        ctx.font = `400 40px ${display}`;
        ctx.fillText(t.anonymous, cx, y + 44);
      },
    });
  }

  // Tier title.
  let tierSize = 128;
  let tierLines: string[] = [];
  for (; tierSize >= 64; tierSize -= 8) {
    ctx.font = `600 ${tierSize}px ${display}`;
    tierLines = wrapLines(ctx, options.tierTitle, maxWidth);
    if (tierLines.length <= 2 && tierLines.every((line) => ctx.measureText(line).width <= maxWidth)) break;
  }
  const tierLine = Math.round(tierSize * 1.2);
  blocks.push({
    height: tierLines.length * tierLine,
    draw: (y) => {
      ctx.fillStyle = PALETTE.gold;
      ctx.font = `600 ${tierSize}px ${display}`;
      tierLines.forEach((line, i) => ctx.fillText(line, cx, y + tierSize + i * tierLine));
    },
  });

  // Topic.
  ctx.font = `400 38px ${families.body}`;
  const topicLines = wrapLines(ctx, t.topic(options.topicTitle), maxWidth).slice(0, 2);
  blocks.push({
    height: topicLines.length * 52,
    draw: (y) => {
      ctx.fillStyle = PALETTE.ink;
      ctx.font = `400 38px ${families.body}`;
      topicLines.forEach((line, i) => ctx.fillText(line, cx, y + 38 + i * 52));
    },
  });

  // Score stamp (small, secondary): the score on top, "of N" beneath.
  blocks.push({
    height: 210,
    draw: (y) => {
      const r = 100;
      const my = y + r + 5;
      ctx.strokeStyle = PALETTE.gold;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, my, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, my, r - 11, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = PALETTE.ink;
      ctx.font = `600 64px ${display}`;
      ctx.fillText(options.scoreText, cx, my + 8);
      ctx.fillStyle = PALETTE.muted;
      let labelSize = 28;
      ctx.font = `400 ${labelSize}px ${families.body}`;
      const label = t.scoreOf(options.totalText);
      while (labelSize > 18 && ctx.measureText(label).width > 2 * (r - 24)) {
        labelSize -= 2;
        ctx.font = `400 ${labelSize}px ${families.body}`;
      }
      ctx.fillText(label, cx, my + 52);
    },
  });

  // Call to action and address.
  const host = CANONICAL_ORIGIN.replace(/^https?:\/\//, "");
  blocks.push({
    height: 130,
    draw: (y) => {
      ctx.fillStyle = PALETTE.gold;
      ctx.font = `600 56px ${display}`;
      ctx.fillText(t.cta, cx, y + 54);
      ctx.fillStyle = PALETTE.muted;
      ctx.font = `400 34px ${families.type}`;
      ctx.fillText(`${host}/${options.locale}/quiz`, cx, y + 110);
    },
  });

  // Lay blocks out top to bottom with equal gaps inside the frame.
  const pad = 130;
  const used = blocks.reduce((sum, block) => sum + block.height, 0);
  const gap = Math.max(36, Math.min(140, (H - 2 * pad - used) / (blocks.length - 1)));
  const total = used + gap * (blocks.length - 1);
  let y = Math.max(pad, (H - total) / 2);
  for (const block of blocks) {
    block.draw(y);
    y += block.height + gap;
  }
  return true;
}
