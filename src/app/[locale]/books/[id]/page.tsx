import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { ShareActions } from "@/components/ShareActions";
import { getBook, getEventsByBookId } from "@/lib/content";
import { buildDynamicOgImagePath, buildPageMetadata, localeLanguageTag } from "@/lib/seo";
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
    ogImagePath: buildDynamicOgImagePath({
      locale: locale as Locale,
      type: "book",
      title: book.title,
      subtitle: book.author ?? undefined,
    }),
  });
}

export default async function BookDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_BOOK_IDS.includes(id as BookId)) notFound();

  const [book, events] = await Promise.all([getBook(locale, id), getEventsByBookId(locale, id)]);
  const bookAuthors = book.authors.length > 0 ? book.authors : book.author ? [book.author] : [];
  const authorsLabel = bookAuthors.join(", ");
  const labels = locale === "bn"
    ? {
        category: "ক্যাটাগরি",
        referencedInEvents: "যে ঘটনাগুলোতে উল্লেখ আছে",
        share: "শেয়ার",
        copyLink: "লিংক কপি",
        copied: "কপি হয়েছে",
        copyFailed: "কপি ব্যর্থ",
      }
    : {
        category: "Category",
        referencedInEvents: "Referenced In Events",
        share: "Share",
        copyLink: "Copy link",
        copied: "Copied",
        copyFailed: "Copy failed",
      };
  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: bookAuthors.map((name) => ({ "@type": "Person", name })),
    description: book.note,
    url: `https://bengalunfolded.com/${locale}/books/${id}`,
    inLanguage: localeLanguageTag(locale as Locale),
  };

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }} />
      <HeroSection
        title={book.title}
        tagline={authorsLabel}
        intro={book.note}
        rightSlot={
          <ShareActions
            title={book.title}
            path={`/${locale}/books/${id}`}
            labels={{ share: labels.share, copyLink: labels.copyLink, copied: labels.copied, copyFailed: labels.copyFailed }}
          />
        }
      />

      <AnimatedContainer>
        <SectionTitle title={labels.category} subtitle={book.type} />
      </AnimatedContainer>

      <AnimatedContainer delay={0.05}>
        <SectionTitle title={labels.referencedInEvents} />
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
