import Link from "next/link";
import type { EventMeta, Locale } from "@/types/content";
export function EventNavigation({ locale, previous, next }: { locale: Locale; previous?: EventMeta; next?: EventMeta }) {
  const labels = locale === "bn"
    ? {
      heading: "আগে / পরে",
      before: "এর আগে",
      after: "এর পরে",
      start: "টাইমলাইনের শুরু",
      latest: "সর্বশেষ অধ্যায়",
    }
    : {
      heading: "Before / After",
      before: "Before this",
      after: "After this",
      start: "Start of timeline",
      latest: "Latest chapter",
    };

  return (
    <nav aria-label={labels.heading} className="theme-surface-soft rounded-2xl border p-4">
      <p className="theme-muted text-xs tracking-[0.18em] uppercase">{labels.heading}</p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {previous ? (
          <Link className="theme-surface rounded-xl border p-3 hover:border-amber-400/40" href={`/${locale}/events/${previous.slug}`}>
            <p className="theme-muted text-xs tracking-[0.18em] uppercase">{labels.before}</p>
            <p className="mt-1">← {previous.year} · {previous.title}</p>
          </Link>
        ) : (
          <div className="theme-surface rounded-xl border p-3">
            <p className="theme-muted text-xs tracking-[0.18em] uppercase">{labels.before}</p>
            <p className="theme-muted mt-1">{labels.start}</p>
          </div>
        )}
        {next ? (
          <Link className="theme-surface rounded-xl border p-3 text-right hover:border-amber-400/40" href={`/${locale}/events/${next.slug}`}>
            <p className="theme-muted text-xs tracking-[0.18em] uppercase">{labels.after}</p>
            <p className="mt-1">{next.year} · {next.title} →</p>
          </Link>
        ) : (
          <div className="theme-surface rounded-xl border p-3 text-right">
            <p className="theme-muted text-xs tracking-[0.18em] uppercase">{labels.after}</p>
            <p className="theme-muted mt-1">{labels.latest}</p>
          </div>
        )}
      </div>
    </nav>
  );
}
