import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getBook, getEventsByBookId } from "@/lib/content";
import { SUPPORTED_BOOK_IDS, SUPPORTED_LOCALES, type BookId, type Locale } from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => SUPPORTED_BOOK_IDS.map((id) => ({ locale, id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_BOOK_IDS.includes(id as BookId)) return {};
  const book = await getBook(locale, id);
  return { title: `${book.title} | Bengal Unfolded`, description: book.note };
}

export default async function BookDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_BOOK_IDS.includes(id as BookId)) notFound();

  const [book, events] = await Promise.all([getBook(locale, id), getEventsByBookId(locale, id)]);

  return (
    <div className="space-y-8">
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
