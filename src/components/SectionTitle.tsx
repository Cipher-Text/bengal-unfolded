import type { ReactNode } from "react";

export function SectionTitle({ title, subtitle, eyebrow }: { title: string; subtitle?: ReactNode; eyebrow?: string }) {
  return (
    <div className="text-center md:text-left">
      {eyebrow ? (
        <p className="text-eyebrow flex items-center justify-center gap-3 md:justify-start">
          <span className="ornament">❦</span>
          {eyebrow}
          <span className="ornament">❦</span>
        </p>
      ) : null}
      <h2 className="text-display mt-3 text-3xl font-semibold leading-tight md:text-5xl">
        {title}
      </h2>
      <div className="mt-4 flex items-center gap-3 justify-center md:justify-start">
        <span className="h-px w-12 bg-[color:var(--sepia)] opacity-60" />
        <span className="ornament text-lg">✦</span>
        <span className="h-px w-12 bg-[color:var(--sepia)] opacity-60" />
      </div>
      {subtitle ? (
        <p className="theme-muted text-balance mt-5 max-w-2xl text-base leading-relaxed md:mx-0 mx-auto md:text-lg" style={{ fontStyle: "italic", fontFamily: "var(--font-display), serif" }}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
