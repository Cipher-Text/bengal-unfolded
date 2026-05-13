import Link from "next/link";
import type { EventMeta, Locale } from "@/types/content";

const TILT_BY_INDEX = ["", "tilt-right", "tilt-left"];

export function EventCard({ event, locale, index = 0 }: { event: EventMeta; locale: Locale; index?: number }) {
  const importanceLabel = locale === "bn"
    ? { landmark: "ল্যান্ডমার্ক", major: "প্রধান", high: "উচ্চ", medium: "মধ্যম", reference: "রেফারেন্স" }[event.importance]
    : { landmark: "Landmark", major: "Major", high: "High", medium: "Medium", reference: "Reference" }[event.importance];

  const tilt = TILT_BY_INDEX[index % TILT_BY_INDEX.length];
  const tapeClass = index % 2 === 0 ? "tape tape-tl" : "tape tape-tr";

  return (
    <article className={`postcard ${tilt} group relative p-6 md:p-7`}>
      <span aria-hidden="true" className={tapeClass} />
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <p className="text-eyebrow">{event.year}</p>
          <p className="text-eyebrow-script mt-0.5">{importanceLabel}</p>
        </div>
        <span
          aria-hidden="true"
          className="inline-flex h-3 w-3 rounded-full"
          style={{ backgroundColor: event.themeColor, boxShadow: "inset 0 1px 1px rgba(255,255,255,0.4), 0 0 0 4px rgba(107,74,31,0.12)" }}
        />
      </div>
      <h3 className="text-display mt-4 text-2xl font-semibold leading-tight md:text-3xl">
        {event.title}
      </h3>
      {event.periodLabel ? (
        <p className="text-eyebrow mt-1 opacity-90">{event.periodLabel}</p>
      ) : null}
      <div className="ornament-divider mt-4 text-sm">✦</div>
      <p className="theme-muted text-balance mt-4 text-[0.95rem] leading-relaxed">
        {event.summary}
      </p>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-eyebrow opacity-75">
          {locale === "bn" ? "অধ্যায়" : "Chapter"}
        </span>
        <Link href={`/${locale}/events/${event.slug}`} className="btn-ink">
          {event.ctaLabel}
          <span className="arrow">→</span>
        </Link>
      </div>
    </article>
  );
}
