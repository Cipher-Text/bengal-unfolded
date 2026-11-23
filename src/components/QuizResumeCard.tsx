"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { readStored } from "@/lib/quiz";
import type { Locale } from "@/types/content";

const subscribe = (notify: () => void) => {
  window.addEventListener("storage", notify);
  return () => window.removeEventListener("storage", notify);
};

/** "topic|done|total" for an unfinished session, or "" when there is none (a string keeps the snapshot stable). */
function snapshot(): string {
  const { session } = readStored();
  return session && session.queue.length > 0 && session.index < session.queue.length
    ? `${session.topic}|${session.index}|${session.queue.length}`
    : "";
}

/** Shows a link back into an unfinished quiz; renders nothing when there is none or storage is unavailable. */
export function QuizResumeCard({ locale }: { locale: Locale }) {
  const value = useSyncExternalStore(subscribe, snapshot, () => "");
  if (!value) return null;
  const [topic, doneRaw, totalRaw] = value.split("|");
  const bn = locale === "bn";
  const fmt = (n: string) => Number(n).toLocaleString(bn ? "bn-BD" : "en-US");
  return (
    <Link
      href={`/${locale}/quiz/play?topic=${encodeURIComponent(topic)}&resume=1`}
      className="theme-surface-elev block border p-4 transition-transform duration-200 hover:-translate-y-0.5"
      style={{ borderColor: "var(--gold)" }}
    >
      <span className="text-eyebrow">{bn ? "অসমাপ্ত কুইজ" : "Unfinished quiz"}</span>
      <span className="mt-1 block font-display text-lg">
        {bn ? `কুইজে ফিরে যান (${fmt(doneRaw)}/${fmt(totalRaw)})` : `Resume your quiz (${fmt(doneRaw)} of ${fmt(totalRaw)})`}
      </span>
    </Link>
  );
}
