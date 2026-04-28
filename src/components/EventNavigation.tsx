import Link from "next/link";
import type { EventMeta, Locale } from "@/types/content";
export function EventNavigation({ locale, previous, next }: { locale: Locale; previous?: EventMeta; next?: EventMeta }) {
  return <nav className="theme-surface-soft grid gap-3 rounded-2xl border p-4 md:grid-cols-2">{previous ? <Link className="theme-surface rounded-xl border p-3 hover:border-amber-400/40" href={`/${locale}/events/${previous.slug}`}>← {previous.year} · {previous.title}</Link> : <div className="theme-surface rounded-xl border p-3 theme-muted">Start of timeline</div>}{next ? <Link className="theme-surface rounded-xl border p-3 text-right hover:border-amber-400/40" href={`/${locale}/events/${next.slug}`}>{next.year} · {next.title} →</Link> : <div className="theme-surface rounded-xl border p-3 text-right theme-muted">Latest chapter</div>}</nav>;
}
