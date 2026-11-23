import { getQuizQuestions, getQuizTopicSummaries } from "@/lib/content";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

export const dynamic = "force-static";
export const dynamicParams = false;

/** Static JSON for the quiz play client: one file per locale for "all" and for each topic with published questions. */
export async function generateStaticParams() {
  const params: Array<{ locale: string; topic: string }> = [];
  for (const locale of SUPPORTED_LOCALES) {
    params.push({ locale, topic: "all" });
    for (const topic of await getQuizTopicSummaries(locale)) params.push({ locale, topic: topic.slug });
  }
  return params;
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string; topic: string }> }) {
  const { locale, topic } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return new Response("Not found", { status: 404 });
  return Response.json(await getQuizQuestions(locale, topic));
}
