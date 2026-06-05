import Link from "next/link";
import type { EventMeta, Locale } from "@/types/content";

type CauseEffectChainLabels = {
  title: string;
  subtitle: string;
  causes: string;
  event: string;
  effects: string;
  linkedChapters: string;
  noCauses: string;
  noEffects: string;
};

export function CauseEffectChain({
  locale,
  event,
  causeEvents,
  effectEvents,
  labels,
}: {
  locale: Locale;
  event: EventMeta;
  causeEvents: EventMeta[];
  effectEvents: EventMeta[];
  labels: CauseEffectChainLabels;
}) {
  const visibleCauses = event.causes?.slice(0, 3) ?? [];
  const visibleEffects = event.consequences?.slice(0, 3) ?? [];
  const visibleCauseEvents = causeEvents.slice(0, 2);
  const visibleEffectEvents = effectEvents.slice(0, 2);

  return (
    <section id="cause-effect-chain" className="scroll-mt-24">
      <div className="paper paper-stained relative p-4 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-eyebrow flex items-center gap-2">
              <span className="ornament">✦</span>
              {labels.title}
            </p>
            <h2 className="text-display mt-2 text-2xl font-semibold leading-tight md:text-4xl">
              {labels.subtitle}
            </h2>
          </div>
          <p className="text-type max-w-xs text-xs uppercase tracking-[0.18em] theme-muted">
            {labels.causes} / {labels.event} / {labels.effects}
          </p>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,1fr)_42px_minmax(0,1.12fr)_42px_minmax(0,1fr)] lg:items-stretch">
          <ChainPanel
            label={labels.causes}
            items={visibleCauses}
            emptyLabel={labels.noCauses}
            linkedLabel={labels.linkedChapters}
            linkedEvents={visibleCauseEvents}
            locale={locale}
            align="start"
          />

          <ChainArrow label={locale === "bn" ? "কারণ থেকে ঘটনা" : "Causes to event"} />

          <div className="relative overflow-hidden rounded-xl border border-amber-500/35 bg-amber-500/10 p-4 shadow-inner">
            <div className="absolute inset-x-6 top-0 h-px bg-amber-300/60" />
            <p className="text-eyebrow">{labels.event}</p>
            <p className="text-display mt-3 text-xl font-semibold leading-tight">
              {event.year} - {event.title}
            </p>
            {event.subtitle ? (
              <p className="theme-muted mt-3 text-sm leading-relaxed">{event.subtitle}</p>
            ) : null}
          </div>

          <ChainArrow label={locale === "bn" ? "ঘটনা থেকে পরিণতি" : "Event to effects"} />

          <ChainPanel
            label={labels.effects}
            items={visibleEffects}
            emptyLabel={labels.noEffects}
            linkedLabel={labels.linkedChapters}
            linkedEvents={visibleEffectEvents}
            locale={locale}
            align="end"
          />
        </div>
      </div>
    </section>
  );
}

function ChainPanel({
  label,
  items,
  emptyLabel,
  linkedLabel,
  linkedEvents,
  locale,
  align,
}: {
  label: string;
  items: string[];
  emptyLabel: string;
  linkedLabel: string;
  linkedEvents: EventMeta[];
  locale: Locale;
  align: "start" | "end";
}) {
  return (
    <div className={`rounded-xl border border-amber-500/25 bg-[color:var(--surface-soft)] p-4 ${align === "end" ? "lg:text-right" : ""}`}>
      <p className="text-eyebrow">{label}</p>
      {items.length ? (
        <ol className="mt-3 space-y-2">
          {items.map((item, index) => (
            <li key={`${label}-${item}`} className="flex gap-2 text-sm leading-relaxed theme-muted">
              <span className="text-type shrink-0 text-[11px] text-accent">{index + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="theme-muted mt-3 text-sm leading-relaxed">{emptyLabel}</p>
      )}

      {linkedEvents.length ? (
        <div className="mt-4 border-t border-amber-500/20 pt-3">
          <p className="text-type text-[11px] uppercase tracking-[0.16em] text-accent">{linkedLabel}</p>
          <div className="mt-2 space-y-2">
            {linkedEvents.map((relatedEvent) => (
              <Link
                key={relatedEvent.slug}
                href={`/${locale}/events/${relatedEvent.slug}`}
                className="block rounded-lg border border-amber-500/25 px-3 py-2 text-sm hover:bg-amber-500/10"
              >
                <span className="theme-muted text-xs">{relatedEvent.year}</span>
                <span className="block font-medium">{relatedEvent.title}</span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ChainArrow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center" aria-label={label}>
      <div className="hidden h-full min-h-28 w-full items-center justify-center lg:flex">
        <div className="h-px w-full bg-amber-500/40" />
        <div className="-ml-2 h-3 w-3 rotate-45 border-r border-t border-amber-500/60" />
      </div>
      <div className="flex h-8 w-full items-center justify-center lg:hidden">
        <div className="h-full w-px bg-amber-500/40" />
        <div className="-ml-[5px] mt-5 h-2.5 w-2.5 rotate-[135deg] border-r border-t border-amber-500/60" />
      </div>
    </div>
  );
}
