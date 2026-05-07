import Link from "next/link";
import type { Quote } from "@/types/content";

function extractPath(source: string): string | null {
  const match = source.match(/(\/(?:bn|en)\/[^\s]+)/);
  return match ? match[1] : null;
}

export function QuoteBlock({ quote }: { quote: Quote }) {
  const isFaq = quote.source.startsWith("FAQ");
  const relatedPath = extractPath(quote.source);
  const sourcePrefix = relatedPath ? quote.source.replace(relatedPath, "").trim() : quote.source;
  const faqMatch = quote.text.match(/^(.+?\?)\s*(.+)$/u);
  const faqQuestion = faqMatch ? faqMatch[1] : quote.text;
  const faqAnswer = faqMatch ? faqMatch[2] : "";

  if (isFaq) {
    return (
      <article className="theme-surface-soft rounded-xl border p-4">
        <p className="text-lg leading-relaxed font-semibold">{faqQuestion}</p>
        {faqAnswer ? <p className="mt-2 text-lg leading-relaxed">{faqAnswer}</p> : null}
        <footer className="mt-3 flex flex-wrap items-center gap-2 text-sm text-amber-400">
          <span className="inline-flex rounded-full border border-amber-500/40 px-2 py-0.5 font-medium">FAQ</span>
          <span>{sourcePrefix.replace(/^FAQ\s*[·-]?\s*/u, "").trim()}</span>
          {relatedPath ? (
            <Link href={relatedPath} className="underline underline-offset-2 hover:text-amber-300">
              {relatedPath}
            </Link>
          ) : null}
        </footer>
      </article>
    );
  }

  return (
    <blockquote className="theme-surface-soft rounded-xl border p-4">
      <p className="text-lg">“{quote.text}”</p>
      <footer className="mt-2 text-sm text-amber-400">— {quote.source}</footer>
    </blockquote>
  );
}
