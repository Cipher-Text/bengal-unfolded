"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  CARD_FORMATS,
  CARD_NAME_MAX,
  type CardFormat,
  cardAltText,
  cleanName,
  drawShareCard,
  nameLength,
} from "@/lib/quiz-card";
import { CANONICAL_ORIGIN } from "@/lib/seo";
import { readStored, writeStored } from "@/lib/quiz";
import type { Locale } from "@/types/content";

const L = {
  en: {
    heading: "Add your name to your card",
    label: "Your name (optional)",
    placeholder: "e.g. Rahim",
    helper: "Your name stays on your device.",
    hide: "Hide my name",
    format: "Card size",
    story: "Story (9:16)",
    feed: "Feed (4:5)",
    share: "Share",
    download: "Download image",
    saved: "Image saved.",
    shared: "Shared.",
    failed: "The image could not be created.",
    shareText: (tier: string) => `I'm a ${tier} on the Bengal Unfolded quiz. Take the challenge!`,
    count: (n: number, max: number) => `${n}/${max}`,
  },
  bn: {
    heading: "কার্ডে আপনার নাম যোগ করুন",
    label: "আপনার নাম (ঐচ্ছিক)",
    placeholder: "যেমন: রহিম",
    helper: "আপনার নাম শুধু আপনার ডিভাইসেই থাকে।",
    hide: "আমার নাম লুকান",
    format: "কার্ডের আকার",
    story: "স্টোরি (৯:১৬)",
    feed: "ফিড (৪:৫)",
    share: "শেয়ার করুন",
    download: "ছবি ডাউনলোড করুন",
    saved: "ছবি সংরক্ষিত হয়েছে।",
    shared: "শেয়ার করা হয়েছে।",
    failed: "ছবিটি তৈরি করা যায়নি।",
    shareText: (tier: string) => `বেঙ্গল আনফোল্ডেড কুইজে আমি একজন ${tier}। আপনিও চ্যালেঞ্জ নিন!`,
    count: (n: number, max: number) => `${n.toLocaleString("bn-BD")}/${max.toLocaleString("bn-BD")}`,
  },
} as const;

const noopSubscribe = () => () => {};

/** Name field, live preview and share/download for the quiz result card. */
export function QuizShareCard({
  locale,
  tierTitle,
  topicTitle,
  scoreText,
  totalText,
}: {
  locale: Locale;
  tierTitle: string;
  topicTitle: string;
  scoreText: string;
  totalText: string;
}) {
  const t = L[locale];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState(() => cleanName(readStored().name ?? ""));
  const [hidden, setHidden] = useState(false);
  const [format, setFormat] = useState<CardFormat>("story");
  const [status, setStatus] = useState("");
  const canShareFiles = useSyncExternalStore(
    noopSubscribe,
    () => {
      try {
        return typeof navigator.canShare === "function" && navigator.canShare({ files: [new File([""], "card.png", { type: "image/png" })] });
      } catch {
        return false;
      }
    },
    () => false,
  );

  const shownName = hidden ? "" : name;
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    drawShareCard(canvas, { locale, format, tierTitle, topicTitle, scoreText, totalText, name: shownName }, () => cancelled).catch(() => {
      if (!cancelled) setStatus(t.failed);
    });
    return () => {
      cancelled = true;
    };
  }, [locale, format, tierTitle, topicTitle, scoreText, totalText, shownName, t.failed]);

  const onName = (value: string) => {
    const cleaned = cleanName(value);
    setName(cleaned);
    setStatus("");
    const stored = readStored();
    writeStored({ ...stored, name: cleaned || undefined });
  };

  const toBlob = () =>
    new Promise<Blob | null>((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) resolve(null);
      else canvas.toBlob(resolve, "image/png");
    });

  const download = async () => {
    const blob = await toBlob();
    if (!blob) {
      setStatus(t.failed);
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bengal-unfolded-quiz-${format}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(t.saved);
  };

  const share = async () => {
    const blob = await toBlob();
    if (!blob) {
      setStatus(t.failed);
      return;
    }
    const file = new File([blob], `bengal-unfolded-quiz-${format}.png`, { type: "image/png" });
    try {
      await navigator.share({ files: [file], text: t.shareText(tierTitle), url: `${CANONICAL_ORIGIN}/${locale}/quiz` });
      setStatus(t.shared);
    } catch (error) {
      // Dismissing the share sheet is not an error.
      if (!(error instanceof DOMException && error.name === "AbortError")) setStatus(t.failed);
    }
  };

  const size = CARD_FORMATS[format];
  return (
    <section className="space-y-4 text-left" aria-labelledby="quiz-card-heading">
      <h2 id="quiz-card-heading" className="text-eyebrow">
        {t.heading}
      </h2>
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] md:items-start">
        <div className="space-y-4">
          <div>
            <label htmlFor="quiz-name" className="block text-sm font-medium">
              {t.label}
            </label>
            <div className="mt-1 flex items-center gap-3">
              <input
                id="quiz-name"
                type="text"
                value={name}
                onChange={(event) => onName(event.target.value)}
                placeholder={t.placeholder}
                autoComplete="off"
                spellCheck={false}
                className="theme-control min-h-[44px] w-full border px-3"
                aria-describedby="quiz-name-help"
              />
              <span className="theme-muted shrink-0 text-sm" aria-hidden="true">
                {t.count(nameLength(name), CARD_NAME_MAX)}
              </span>
            </div>
            <p id="quiz-name-help" className="theme-muted mt-1 text-xs">
              {t.helper}
            </p>
          </div>
          <label className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" checked={hidden} onChange={(event) => setHidden(event.target.checked)} />
            {t.hide}
          </label>
          <fieldset>
            <legend className="text-sm font-medium">{t.format}</legend>
            <div className="mt-1 flex flex-wrap gap-4">
              {(["story", "feed"] as const).map((option) => (
                <label key={option} className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm">
                  <input type="radio" name="quiz-card-format" checked={format === option} onChange={() => setFormat(option)} />
                  {t[option]}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="flex flex-wrap gap-3">
            {canShareFiles ? (
              <button type="button" className="btn-ink" onClick={share}>
                {t.share}
              </button>
            ) : null}
            <button type="button" className={canShareFiles ? "btn-vintage" : "btn-ink"} onClick={download}>
              {t.download}
            </button>
          </div>
          <p role="status" className="theme-muted min-h-[1.25rem] text-sm">
            {status}
          </p>
        </div>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={cardAltText({ locale, tierTitle, name: shownName })}
          width={size.width}
          height={size.height}
          className="mx-auto h-auto w-full max-w-[16rem] border md:max-w-none"
          style={{ borderColor: "var(--border-strong)", aspectRatio: `${size.width} / ${size.height}` }}
        />
      </div>
    </section>
  );
}
