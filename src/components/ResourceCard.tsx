import Link from "next/link";
import type { Book, Locale } from "@/types/content";

export function ResourceCard({ resource, locale }: { resource: Book; locale: Locale }) {
  return (
    <article className="theme-surface rounded-xl border p-4">
      <h3 className="text-base font-semibold">{resource.title}</h3>
      <p className="theme-muted mt-1 text-sm">{resource.author}</p>
      <p className="mt-1 text-xs tracking-[0.2em] text-amber-400 uppercase">{resource.type}</p>
      <p className="theme-muted mt-2 text-sm">{resource.note}</p>
      <Link href={`/${locale}/books/${resource.id}`} className="mt-4 inline-flex rounded-lg border border-amber-500/40 px-3 py-1 text-sm font-medium text-amber-400 hover:bg-amber-500/10">
        Details
      </Link>
    </article>
  );
}
