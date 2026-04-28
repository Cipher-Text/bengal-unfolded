import Link from "next/link";
import type { EventMeta, Locale } from "@/types/content";
export function EventCard({ event, locale }: { event: EventMeta; locale: Locale }) {
  return <article className="theme-surface rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:border-amber-400/40"><p className="theme-muted text-xs tracking-[0.2em] uppercase">{event.year}</p><h3 className="mt-2 text-xl font-semibold">{event.title}</h3><p className="theme-muted mt-2 text-sm">{event.summary}</p><div className="mt-4 flex items-center justify-between"><span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: event.themeColor }} /><Link href={`/${locale}/events/${event.slug}`} className="text-sm font-medium text-amber-400 hover:text-amber-300">{event.ctaLabel} →</Link></div></article>;
}
