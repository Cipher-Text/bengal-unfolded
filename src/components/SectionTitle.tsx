import type { ReactNode } from "react";

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: ReactNode }) {
  return <div className="space-y-2"><h2 className="text-2xl font-semibold tracking-tight text-accent md:text-3xl">{title}</h2>{subtitle ? <p className="theme-muted text-sm md:text-base">{subtitle}</p> : null}</div>;
}
