import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { ShareActions } from "@/components/ShareActions";
import { getBook, getEventsByBookIdChronological } from "@/lib/content";
import { buildDynamicOgImagePath, buildPageMetadata, localeLanguageTag, normalizeMetaDescription } from "@/lib/seo";
import { SUPPORTED_BOOK_IDS, SUPPORTED_LOCALES, type BookId, type Locale } from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => SUPPORTED_BOOK_IDS.map((id) => ({ locale, id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_BOOK_IDS.includes(id as BookId)) return {};
  const book = await getBook(locale, id);
  const description = normalizeMetaDescription(
    book.note,
    locale === "bn"
      ? "বইটির সারাংশ, লেখক তথ্য, এবং কোন কোন ঐতিহাসিক ঘটনায় এটি উল্লেখিত হয়েছে তা দেখুন।"
      : "Read the book summary, author context, and the historical events where this source is referenced.",
  );
  return buildPageMetadata({
    locale: locale as Locale,
    title: `${book.title} | Bengal Unfolded`,
    description,
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

  const [book, events] = await Promise.all([getBook(locale, id), getEventsByBookIdChronological(locale, id)]);
  const bookAuthors = book.authors.length > 0 ? book.authors : book.author ? [book.author] : [];
  const authorsLabel = bookAuthors.join(", ");
  const labels = locale === "bn"
    ? {
        category: "ক্যাটাগরি",
        referencedInEvents: "যে ঘটনাগুলোতে উল্লেখ আছে",
        timelineView: "ঘটনাপঞ্জি ভিউ",
        share: "শেয়ার",
        copyLink: "লিংক কপি",
        downloadCard: "কার্ড ডাউনলোড",
        copied: "কপি হয়েছে",
        copyFailed: "কপি ব্যর্থ",
      }
    : {
        category: "Category",
        referencedInEvents: "Referenced In Events",
        timelineView: "Timeline View",
        share: "Share",
        copyLink: "Copy link",
        downloadCard: "Download card",
        copied: "Copied",
        copyFailed: "Copy failed",
      };
  const shareImagePath = buildDynamicOgImagePath({
    locale: locale as Locale,
    type: "book",
    title: book.title,
    subtitle: book.author ?? undefined,
  });
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
            labels={{ share: labels.share, copyLink: labels.copyLink, downloadCard: labels.downloadCard, copied: labels.copied, copyFailed: labels.copyFailed }}
            downloadImagePath={shareImagePath}
            downloadFileName={`bengal-unfolded-book-${id}-${locale}.png`}
          />
        }
      />

      <AnimatedContainer>
        <SectionTitle title={labels.category} subtitle={book.type} />
      </AnimatedContainer>

      <AnimatedContainer delay={0.05}>
        <SectionTitle title={labels.referencedInEvents} subtitle={labels.timelineView} />
        <div className="mt-4 space-y-3">
          {events.map((event, index) => (
            <div key={event.slug} className="relative pl-8">
              <span className="absolute top-5 left-2 h-2.5 w-2.5 rounded-full bg-amber-400" />
              {index < events.length - 1 ? <span className="absolute top-8 left-[0.84rem] h-[calc(100%+0.6rem)] w-px bg-amber-500/35" /> : null}
              <Link href={`/${locale}/events/${event.slug}`} className="theme-surface block rounded-xl border p-4 hover:border-amber-400/40">
                <p className="theme-muted text-xs tracking-[0.2em] uppercase">{event.year}</p>
                <h3 className="mt-1 text-lg font-semibold">{event.title}</h3>
                <p className="theme-muted mt-1 text-sm">{event.summary}</p>
              </Link>
            </div>
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
}
