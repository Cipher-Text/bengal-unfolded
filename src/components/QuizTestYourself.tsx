import Link from "next/link";
import type { Locale } from "@/types/content";

/** End-of-chapter prompt that launches the quiz for a topic. Render it only when the topic has published questions. */
export function QuizTestYourself({
  locale,
  topic,
}: {
  locale: Locale;
  topic: { slug: string; title: string; count: number };
}) {
  const bn = locale === "bn";
  const fmt = (n: number) => n.toLocaleString(bn ? "bn-BD" : "en-US");
  const count = fmt(topic.count);
  const setSize = fmt(Math.min(10, topic.count));
  return (
    <section aria-labelledby="test-yourself-heading" className="theme-surface-elev border p-5 md:p-6" style={{ borderColor: "var(--gold)" }}>
      <p className="text-eyebrow">{bn ? "নিজেকে যাচাই করুন" : "Test yourself"}</p>
      <h2 id="test-yourself-heading" className="text-display mt-2 text-2xl font-semibold leading-snug md:text-3xl">
        {bn ? `${topic.title} নিয়ে কয়েকটি প্রশ্নের জন্য প্রস্তুত?` : `Ready for a few questions on ${topic.title}?`}
      </h2>
      <p className="theme-muted mt-2 text-sm md:text-base">
        {bn
          ? `${count}টি প্রশ্নের মধ্য থেকে ${setSize}টি এলোমেলো প্রশ্ন, প্রায় ৩ মিনিট। প্রতিটি উত্তরের সঙ্গে একটি কাহিনির লিংক থাকে।`
          : `${setSize} random questions from a pool of ${count}, about 3 minutes. Every answer links back to a story.`}
      </p>
      <Link href={`/${locale}/quiz/play?topic=${encodeURIComponent(topic.slug)}`} className="btn-ink mt-4">
        {bn ? "কুইজ শুরু করুন" : "Start the quiz"} <span className="arrow">→</span>
      </Link>
    </section>
  );
}
