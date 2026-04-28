import type { Resource } from "@/types/content";
export function ResourceCard({ resource }: { resource: Resource }) {
  return <article className="theme-surface rounded-xl border p-4"><h3 className="text-base font-semibold">{resource.title}</h3><p className="theme-muted mt-1 text-sm">{resource.author}</p><p className="mt-1 text-xs tracking-[0.2em] text-amber-400 uppercase">{resource.type}</p><p className="theme-muted mt-2 text-sm">{resource.note}</p></article>;
}
