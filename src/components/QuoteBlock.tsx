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
      <article className="paper paper-stained relative p-6">
        <p className="text-eyebrow">FAQ</p>
        <p className="text-display mt-2 text-lg font-semibold leading-snug md:text-xl">{faqQuestion}</p>
        {faqAnswer ? <p className="theme-muted mt-3 text-base leading-relaxed">{faqAnswer}</p> : null}
        <footer className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="ornament">❦</span>
          <span className="text-eyebrow">{sourcePrefix.replace(/^FAQ\s*[·-]?\s*/u, "").trim()}</span>
          {relatedPath ? (
            <Link href={relatedPath} className="link-ink text-sm">
              {relatedPath}
            </Link>
          ) : null}
        </footer>
      </article>
    );
  }

  return (
    <blockquote className="paper paper-stained relative px-7 py-8">
      <span aria-hidden="true" className="text-display absolute -top-2 left-3 select-none text-7xl leading-none" style={{ color: "var(--rust)", opacity: 0.35, fontStyle: "italic" }}>
        “
      </span>
      <p className="text-balance text-lg leading-relaxed md:text-xl" style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic" }}>
        {quote.text}
      </p>
      <footer className="mt-4 flex items-center gap-2 text-sm">
        <span className="h-px w-8 bg-[color:var(--sepia)] opacity-70" />
        <span className="text-eyebrow-script text-base">{quote.source}</span>
      </footer>
    </blockquote>
  );
}
