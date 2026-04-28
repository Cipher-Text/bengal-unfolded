import type { Quote } from "@/types/content";
export function QuoteBlock({ quote }: { quote: Quote }) {
  return <blockquote className="theme-surface-soft rounded-xl border p-4"><p className="text-lg">“{quote.text}”</p><footer className="mt-2 text-sm text-amber-400">— {quote.source}</footer></blockquote>;
}
