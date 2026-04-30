import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getBook, getEventsByBookId } from "@/lib/content";
import { buildPageMetadata, localeLanguageTag } from "@/lib/seo";
import { SUPPORTED_BOOK_IDS, SUPPORTED_LOCALES, type BookId, type Locale } from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => SUPPORTED_BOOK_IDS.map((id) => ({ locale, id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_BOOK_IDS.includes(id as BookId)) return {};
  const book = await getBook(locale, id);
  return buildPageMetadata({
    locale: locale as Locale,
    title: `${book.title} | Bengal Unfolded`,
    description: book.note,
    canonicalPath: `/${locale}/books/${id}`,
    languagePathWithoutLocale: `/books/${id}`,
    type: "book",
  });
}

export default async function BookDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_BOOK_IDS.includes(id as BookId)) notFound();

  const [book, events] = await Promise.all([getBook(locale, id), getEventsByBookId(locale, id)]);
  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: { "@type": "Person", name: book.author },
    description: book.note,
    url: `https://bengalunfolded.com/${locale}/books/${id}`,
    inLanguage: localeLanguageTag(locale as Locale),
  };

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }} />
      <HeroSection title={book.title} tagline={book.author} intro={book.note} />

      <AnimatedContainer>
        <SectionTitle title="Category" subtitle={book.type} />
      </AnimatedContainer>

      <AnimatedContainer delay={0.05}>
        <SectionTitle title="Referenced In Events" />
        <div className="mt-4 grid gap-3">
          {events.map((event) => (
            <Link key={event.slug} href={`/${locale}/events/${event.slug}`} className="theme-surface rounded-xl border p-4 hover:border-amber-400/40">
              <p className="theme-muted text-xs tracking-[0.2em] uppercase">{event.year}</p>
              <h3 className="mt-1 text-lg font-semibold">{event.title}</h3>
              <p className="theme-muted mt-1 text-sm">{event.summary}</p>
            </Link>
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
}
