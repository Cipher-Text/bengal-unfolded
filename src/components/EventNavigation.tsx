import Link from "next/link";
import type { EventMeta, Locale } from "@/types/content";

export function EventNavigation({ locale, previous, next }: { locale: Locale; previous?: EventMeta; next?: EventMeta }) {
  const labels = locale === "bn"
    ? {
      heading: "আগে / পরে",
      before: "এর আগে",
      after: "এর পরে",
      start: "টাইমলাইনের শুরু",
      latest: "সর্বশেষ অধ্যায়",
    }
    : {
      heading: "Before / After",
      before: "Before this",
      after: "After this",
      start: "Start of timeline",
      latest: "Latest chapter",
    };

  return (
    <nav aria-label={labels.heading} className="paper paper-stained relative p-5">
      <p className="text-eyebrow flex items-center gap-2">
        <span className="ornament">❦</span>
        {labels.heading}
        <span className="ornament">❦</span>
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {previous ? (
          <Link href={`/${locale}/events/${previous.slug}`} className="postcard tilt-left group p-4">
            <p className="text-eyebrow">{labels.before}</p>
            <p className="text-display mt-2 text-base font-medium md:text-lg">
              <span className="inline-block transition-transform group-hover:-translate-x-0.5">←</span> {previous.year} · {previous.title}
            </p>
          </Link>
        ) : (
          <div className="paper paper-stained p-4 opacity-70">
            <p className="text-eyebrow">{labels.before}</p>
            <p className="theme-muted mt-2 italic">{labels.start}</p>
          </div>
        )}
        {next ? (
          <Link href={`/${locale}/events/${next.slug}`} className="postcard tilt-right group p-4 text-right">
            <p className="text-eyebrow">{labels.after}</p>
            <p className="text-display mt-2 text-base font-medium md:text-lg">
              {next.year} · {next.title} <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </p>
          </Link>
        ) : (
          <div className="paper paper-stained p-4 text-right opacity-70">
            <p className="text-eyebrow">{labels.after}</p>
            <p className="theme-muted mt-2 italic">{labels.latest}</p>
          </div>
        )}
      </div>
    </nav>
  );
}
