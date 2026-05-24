import type { ReactNode } from "react";

function PhotoPlaceholder({
  caption,
  rotation,
  className,
  src,
  alt,
}: {
  caption: string;
  rotation: string;
  className?: string;
  src: string;
  alt: string;
}) {
  return (
    <figure
      className={`photo-frame relative shadow-xl ${className ?? ""}`}
      style={{ transform: rotation }}
      aria-label={caption}
    >
      <img src={src} alt={alt} loading="lazy" className="aspect-[4/3] h-auto w-full object-cover" />
      <figcaption className="absolute inset-x-0 bottom-1 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-amber-50/85">
        {caption}
      </figcaption>
    </figure>
  );
}

export function HeroSection({
  title,
  tagline,
  intro,
  rightSlot,
  eyebrow,
}: {
  title: string;
  tagline: string;
  intro?: ReactNode;
  rightSlot?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <section className="relative animate-fade-in">
      {/* Photographic banner — collage of historical photo placeholders */}
      <div className="relative">
        <div className="paper paper-stained torn-bottom relative overflow-hidden p-4 sm:p-6 md:p-10" style={{ paddingBottom: "3.5rem" }}>
          <div className="compass-watermark -top-12 -right-16 hidden md:block" />
          <div className="relative grid grid-cols-2 items-end gap-2 sm:gap-3 md:grid-cols-12 md:gap-5">
            <PhotoPlaceholder
              caption="1757 · Plassey"
              rotation="rotate(-3deg)"
              className="md:col-span-3 -translate-y-1"
              src="/hero-events/1757-plassey.svg"
              alt="Battle of Plassey, 1757"
            />
            <PhotoPlaceholder
              caption="1952 · Language"
              rotation="rotate(2deg)"
              className="md:col-span-4 translate-y-1"
              src="/hero-events/1952-language-movement.svg"
              alt="Language Movement, 1952"
            />
            <PhotoPlaceholder
              caption="1971 · Liberation"
              rotation="rotate(-2deg)"
              className="md:col-span-3 -translate-y-2"
              src="/hero-events/1971-liberation-war.svg"
              alt="Liberation War, 1971"
            />
            <PhotoPlaceholder
              caption="1905 · Partition"
              rotation="rotate(3deg)"
              className="md:col-span-2 translate-y-2"
              src="/hero-events/1905-partition-swadeshi.svg"
              alt="Partition of Bengal and Swadeshi movement, 1905"
            />
          </div>
        </div>
      </div>

      {/* Editorial title block on parchment */}
      <div className="paper paper-stained relative px-4 pt-8 pb-10 sm:px-6 md:px-14 md:pt-14 md:pb-16">
        <div className="compass-watermark -bottom-20 -left-16 hidden md:block" />
        <div className="relative grid gap-8 md:grid-cols-[1.4fr_0.9fr] md:gap-10 md:items-start">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="ornament">❦</span>
              <p className="text-eyebrow">{eyebrow ?? "Discover Bengal · Unfolded"}</p>
              <span className="ornament">❦</span>
            </div>
            <h1 className="text-display mt-5 text-3xl font-semibold leading-[1] sm:text-4xl md:text-7xl">
              {title}
            </h1>
            <div className="ornament-divider mt-4 max-w-xl text-base md:text-lg">✦</div>
            <p className="text-balance mt-4 max-w-2xl text-lg italic leading-snug sm:text-xl md:text-3xl" style={{ fontFamily: "var(--font-display), serif" }}>
              {tagline}
            </p>
            {intro ? (
              <p className="theme-muted text-balance mt-5 max-w-2xl text-base leading-relaxed md:text-lg">
                {intro}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="stamp">Est. 1947 · Bengal</span>
              <span className="ornament text-2xl">✺</span>
              <span className="text-eyebrow">A Bilingual Archive</span>
            </div>
          </div>
          <aside className="relative border-t pt-6 md:border-t-0 md:pl-6 md:pt-0 md:border-l border-[color:var(--sepia)]/30">
            <div className="text-eyebrow-script">The Bengal Report</div>
            <div className="rule-double mt-2" />
            <p className="text-eyebrow mt-3">Today · Featured</p>
            <div className="mt-2 text-base leading-relaxed">
              {rightSlot ?? "From Plassey to the present — a curated, citation-backed retelling of the events that shaped Bengal and Bangladesh."}
            </div>
            <div className="mt-5">
              <span className="wax-seal">B</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
