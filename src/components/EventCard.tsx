import Link from "next/link";
import type { EventMeta, Locale } from "@/types/content";
export function EventCard({ event, locale }: { event: EventMeta; locale: Locale }) {
  const importanceLabel = locale === "bn"
    ? { landmark: "ল্যান্ডমার্ক", major: "প্রধান", high: "উচ্চ", medium: "মধ্যম", reference: "রেফারেন্স" }[event.importance]
    : { landmark: "Landmark", major: "Major", high: "High", medium: "Medium", reference: "Reference" }[event.importance];

  return <article className="theme-surface rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:border-amber-400/40">
    <div className="flex flex-wrap items-center gap-2">
      <p className="theme-muted text-xs tracking-[0.2em] uppercase">{event.year}</p>
      <span className="inline-flex items-center rounded-full border border-amber-500/35 px-2 py-0.5 text-[10px] font-medium text-accent">{importanceLabel}</span>
    </div>
    <h3 className="mt-2 text-xl font-semibold">{event.title}</h3>
    {event.periodLabel ? <p className="mt-2 text-xs text-accent">{event.periodLabel}</p> : null}
    <p className="theme-muted mt-2 text-sm">{event.summary}</p>
    <div className="mt-4 flex items-center justify-between"><span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: event.themeColor }} /><Link href={`/${locale}/events/${event.slug}`} className="text-sm font-medium text-amber-400 hover:text-amber-300">{event.ctaLabel} →</Link></div>
  </article>;
}
