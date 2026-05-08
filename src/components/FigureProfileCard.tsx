import Link from "next/link";
import type { Figure, Locale } from "@/types/content";

const GROUP_LABELS: Record<Locale, Record<Figure["group"], string>> = {
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

type FigureEntityType = "person" | "party" | "organization";

const ENTITY_LABELS: Record<Locale, Record<FigureEntityType, string>> = {
  en: {
    person: "Person",
    party: "Party",
    organization: "Organization",
  },
  bn: {
    person: "ব্যক্তি",
    party: "দল",
    organization: "সংস্থা",
  },
};

function inferEntityType(figure: Figure): FigureEntityType {
  const name = figure.name.toLowerCase();
  const role = figure.role.toLowerCase();
  const tags = (figure.tags ?? []).join(" ").toLowerCase();
  const text = `${name} ${role} ${tags}`;

  if (
    text.includes("party") ||
    text.includes("alliance") ||
    text.includes("league") ||
    text.includes("দল") ||
    text.includes("জোট")
  ) {
    return "party";
  }

  if (figure.group === "organization" || figure.group === "collective") {
    return "organization";
  }

  return "person";
}

export function FigureProfileCard({ figure, locale, featured = false }: { figure: Figure; locale: Locale; featured?: boolean }) {
  const entityType = inferEntityType(figure);

  return (
    <article className={`rounded-2xl border p-5 ${featured ? "border-amber-500/40 bg-amber-500/10" : "theme-surface theme-border"}`}>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-xl font-semibold">{figure.name}</h3>
        <span className="rounded-full border border-amber-500/40 px-2 py-0.5 text-[10px] tracking-[0.12em] text-accent uppercase">{GROUP_LABELS[locale][figure.group]}</span>
        <span className="rounded-full border border-emerald-500/35 px-2 py-0.5 text-[10px] tracking-[0.12em] text-emerald-300 uppercase">{ENTITY_LABELS[locale][entityType]}</span>
      </div>
      <p className="mt-1 text-sm text-accent">{figure.role}</p>
      {figure.highlight ? <p className="mt-3 line-clamp-2 text-sm font-medium text-[var(--fg)]">{figure.highlight}</p> : null}
      <p className="theme-muted mt-3 line-clamp-3 text-sm">{figure.contribution}</p>
      <p className="theme-muted mt-2 line-clamp-2 text-xs">{figure.context}</p>
      <p className="text-positive mt-3 line-clamp-2 text-sm font-medium">{figure.impact}</p>
      {figure.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {figure.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="theme-muted rounded-full border border-zinc-500/40 px-2 py-0.5 text-[11px]">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <Link href={`/${locale}/figures/${figure.id}`} className="mt-4 inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-3 text-sm font-medium text-accent hover:bg-amber-500/10">
        {locale === "bn" ? "বিস্তারিত" : "Details"}
      </Link>
    </article>
  );
}
