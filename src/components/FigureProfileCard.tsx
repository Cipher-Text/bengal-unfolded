import Link from "next/link";
import { inferFigureEntityType, type FigureEntityType } from "@/lib/figures";
import type { Figure, Locale } from "@/types/content";

const GROUP_LABELS: Record<Locale, Record<Figure["group"], string>> = {
  en: {
    leader: "Leader",
    coordinator: "Coordinator",
    martyr: "Martyr",
    organization: "Organization",
    collective: "Collective",
    intellectual: "Intellectual",
    revolutionary: "Revolutionary",
  },
  bn: {
    leader: "নেতৃত্ব",
    coordinator: "সমন্বয়ক",
    martyr: "শহীদ",
    organization: "সংগঠন",
    collective: "সম্মিলিত কণ্ঠ",
    intellectual: "বুদ্ধিজীবী",
    revolutionary: "বিপ্লবী",
  },
};

const ENTITY_LABELS: Record<Locale, Record<FigureEntityType, string>> = {
  en: { person: "Person", party: "Party", alliance: "Alliance", organization: "Organization" },
  bn: { person: "ব্যক্তি", party: "দল", alliance: "জোট", organization: "সংস্থা" },
};

export function FigureProfileCard({ figure, locale, featured = false, index = 0 }: { figure: Figure; locale: Locale; featured?: boolean; index?: number }) {
  const entityType = inferFigureEntityType(figure);
  const tiltClass = index % 3 === 1 ? "tilt-right" : index % 3 === 2 ? "tilt-left" : "";

  return (
    <article className={`postcard ${tiltClass} relative p-6 ${featured ? "ring-2 ring-[color:var(--wax)]" : ""}`}>
      {featured ? <span className="pin" aria-hidden="true" /> : null}
      <div className="flex items-baseline gap-2">
        <h3 className="text-display text-xl font-semibold leading-tight">{figure.name}</h3>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="stamp">{GROUP_LABELS[locale][figure.group]}</span>
        <span className="text-eyebrow">{ENTITY_LABELS[locale][entityType]}</span>
      </div>
      <p className="text-eyebrow-script mt-3">{figure.role}</p>
      {figure.highlight ? (
        <p className="mt-3 line-clamp-2 text-sm font-medium italic" style={{ fontFamily: "var(--font-display), serif" }}>
          “{figure.highlight}”
        </p>
      ) : null}
      <p className="theme-muted mt-3 line-clamp-3 text-sm leading-relaxed">{figure.contribution}</p>
      <p className="theme-muted mt-2 line-clamp-2 text-xs leading-relaxed">{figure.context}</p>
      {figure.impact ? (
        <p className="mt-3 line-clamp-2 text-sm font-medium" style={{ color: "var(--forest)" }}>
          {figure.impact}
        </p>
      ) : null}
      {figure.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {figure.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="theme-muted rounded-sm border px-1.5 py-0.5 text-[10px] uppercase tracking-[0.15em] theme-hairline" style={{ fontFamily: "var(--font-type), monospace" }}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <Link href={`/${locale}/figures/${figure.id}`} className="btn-vintage mt-5">
        {locale === "bn" ? "বিস্তারিত" : "Details"}
        <span className="arrow">→</span>
      </Link>
    </article>
  );
}
