import Link from "next/link";
import type { Locale } from "@/types/content";

/** Home page entry to the quiz. Render it only when at least one question is published. */
export function QuizHomeBanner({
  locale,
  questionCount,
}: {
  locale: Locale;
  questionCount: number;
}) {
  const bn = locale === "bn";
  const count = questionCount.toLocaleString(bn ? "bn-BD" : "en-US");
  return (
    <section
      aria-labelledby="home-quiz"
      className="theme-surface-elev border p-6 md:p-8"
      style={{ borderColor: "var(--gold)" }}
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 id="home-quiz" className="text-eyebrow">
            {bn ? "নিজেকে যাচাই করুন" : "Test yourself"}
          </h2>
          <p className="text-display mt-2 text-xl font-semibold leading-snug md:text-2xl">
            {bn
              ? `${count}টি প্রশ্নের ভান্ডার থেকে এলোমেলো দশটি, সাইন আপ ছাড়াই মাত্র তিন মিনিটে সম্পূর্ণ করুন।`
              : `A pool of ${count} questions, ten drawn at random, about 3 minutes. No signup.`}
          </p>
        </div>
        <Link
          href={`/${locale}/quiz`}
          className="btn-ink shrink-0 self-start md:self-auto"
        >
          {bn ? "কুইজ খেলুন" : "Play the quiz"} <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
