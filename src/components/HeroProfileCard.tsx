import Link from "next/link";
import type { Hero, Locale } from "@/types/content";

const GROUP_LABELS: Record<Locale, Record<Hero["group"], string>> = {
  en: {
    leader: "Leader",
    coordinator: "Coordinator",
    martyr: "Martyr",
    organization: "Organization",
    collective: "Collective",
  },
  bn: {
    leader: "নেতৃত্ব",
    coordinator: "সমন্বয়ক",
    martyr: "শহীদ",
    organization: "সংগঠন",
    collective: "সম্মিলিত কণ্ঠ",
  },
};

export function HeroProfileCard({ hero, locale, featured = false }: { hero: Hero; locale: Locale; featured?: boolean }) {
  return (
    <article className={`rounded-2xl border p-5 ${featured ? "border-amber-500/40 bg-amber-500/10" : "theme-surface theme-border"}`}>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-xl font-semibold">{hero.name}</h3>
        <span className="rounded-full border border-amber-500/40 px-2 py-0.5 text-[10px] tracking-[0.12em] text-accent uppercase">{GROUP_LABELS[locale][hero.group]}</span>
      </div>
      <p className="mt-1 text-sm text-accent">{hero.role}</p>
      {hero.highlight ? <p className="mt-3 line-clamp-2 text-sm font-medium text-[var(--fg)]">{hero.highlight}</p> : null}
      <p className="theme-muted mt-3 line-clamp-3 text-sm">{hero.contribution}</p>
      <p className="theme-muted mt-2 line-clamp-2 text-xs">{hero.context}</p>
      <p className="text-positive mt-3 line-clamp-2 text-sm font-medium">{hero.impact}</p>
      {hero.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {hero.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="theme-muted rounded-full border border-zinc-500/40 px-2 py-0.5 text-[11px]">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <Link href={`/${locale}/heroes/${hero.id}`} className="mt-4 inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-3 text-sm font-medium text-accent hover:bg-amber-500/10">
        {locale === "bn" ? "বিস্তারিত" : "Details"}
      </Link>
    </article>
  );
}
