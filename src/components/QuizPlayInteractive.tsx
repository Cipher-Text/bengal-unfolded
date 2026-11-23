"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { QuizQuestionPayload } from "@/lib/content";
import {
  QUIZ_SET_SIZE,
  type QuizAnswers,
  drawQuestions,
  isFullyCorrect,
  orderOptions,
  readStored,
  rememberRecent,
  scoreSession,
  tierForScore,
  writeStored,
} from "@/lib/quiz";
import { useUrlSearchParams } from "@/lib/use-url-search-params";
import type { Locale, QuizSiteContent } from "@/types/content";

type TopicOption = { slug: string; title: string };
type Phase = "loading" | "error" | "empty" | "playing" | "result";

const L = {
  en: {
    allTopics: "Mixed topics",
    progress: (n: number, total: number) => `${n} of ${total}`,
    exit: "Exit",
    exitConfirm: "Leave the quiz? Your progress is saved so you can resume.",
    selectAll: "Select all that apply",
    check: "Check answer",
    skip: "Skip",
    next: "Next question",
    finish: "See my result",
    readStory: "Read the story behind this",
    correctTag: "Correct",
    yourWrongTag: "Your answer",
    missedTag: "Missed",
    loading: "Loading questions…",
    error: "The questions could not be loaded.",
    retry: "Try again",
    empty: "There are no questions for this topic yet.",
    backToQuiz: "Back to quiz",
    streak: "Three in a row. Keep going.",
    resultOf: (n: string, total: string) => `${n} of ${total}`,
    unanswered: (n: string) => `${n} skipped`,
    readNext: "Stories to read next",
    playAgain: "Play again",
    anotherTopic: "Try another topic",
    scoreLabel: "Your score",
  },
  bn: {
    allTopics: "মিশ্র বিষয়",
    progress: (n: number, total: number) => `${n.toLocaleString("bn-BD")}/${total.toLocaleString("bn-BD")}`,
    exit: "বেরিয়ে যান",
    exitConfirm: "কুইজ ছেড়ে যাবেন? আপনার অগ্রগতি সংরক্ষিত থাকবে, পরে ফিরে আসতে পারবেন।",
    selectAll: "যেগুলো প্রযোজ্য সবগুলো বেছে নিন",
    check: "উত্তর যাচাই করুন",
    skip: "এড়িয়ে যান",
    next: "পরের প্রশ্ন",
    finish: "ফলাফল দেখুন",
    readStory: "এর পেছনের কাহিনি পড়ুন",
    correctTag: "সঠিক",
    yourWrongTag: "আপনার উত্তর",
    missedTag: "বাদ পড়েছে",
    loading: "প্রশ্ন লোড হচ্ছে…",
    error: "প্রশ্নগুলো লোড করা যায়নি।",
    retry: "আবার চেষ্টা করুন",
    empty: "এই বিষয়ে এখনো কোনো প্রশ্ন নেই।",
    backToQuiz: "কুইজে ফিরে যান",
    streak: "টানা তিনটি। চালিয়ে যান।",
    resultOf: (n: string, total: string) => `${total}-এর মধ্যে ${n}`,
    unanswered: (n: string) => `${n}টি এড়িয়ে গেছেন`,
    readNext: "এরপর যে কাহিনিগুলো পড়তে পারেন",
    playAgain: "আবার খেলুন",
    anotherTopic: "অন্য বিষয় বেছে নিন",
    scoreLabel: "আপনার স্কোর",
  },
} as const;

const noopSubscribe = () => () => {};

function CountUp({ to, locale }: { to: number; locale: Locale }) {
  const reduced = useSyncExternalStore(
    noopSubscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 700);
      setValue(to * (1 - (1 - t) ** 3));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, reduced]);
  const shown = reduced ? to : value;
  return <>{(Math.round(shown * 10) / 10).toLocaleString(locale === "bn" ? "bn-BD" : "en-US", { maximumFractionDigits: 1 })}</>;
}

export function QuizPlayInteractive({
  locale,
  site,
  topics,
}: {
  locale: Locale;
  site: QuizSiteContent;
  topics: TopicOption[];
}) {
  const t = L[locale];
  const query = useUrlSearchParams();
  const requestedTopic = query.get("topic") ?? "all";
  const topic = requestedTopic !== "all" && topics.some((option) => option.slug === requestedTopic) ? requestedTopic : "all";
  const wantsResume = query.get("resume") === "1";
  const topicTitle = topic === "all" ? t.allTopics : (topics.find((option) => option.slug === topic)?.title ?? t.allTopics);

  // The query string is only known after mount (static export); wait for it before loading anything.
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [phase, setPhase] = useState<Phase>("loading");
  const [pool, setPool] = useState<QuizQuestionPayload[]>([]);
  const [queue, setQueue] = useState<QuizQuestionPayload[]>([]);
  const [orders, setOrders] = useState<Record<string, string[]>>({});
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [reload, setReload] = useState(0);
  const startedAtRef = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const explanationRef = useRef<HTMLDivElement>(null);

  const persistSession = useCallback(
    (nextQueue: QuizQuestionPayload[], nextIndex: number, nextAnswers: QuizAnswers) => {
      const stored = readStored();
      writeStored({
        ...stored,
        session: { startedAt: startedAtRef.current, topic, queue: nextQueue.map((q) => q.id), index: nextIndex, answers: nextAnswers },
      });
    },
    [topic],
  );

  const startNew = useCallback(
    (source: QuizQuestionPayload[]) => {
      const stored = readStored();
      const drawn = drawQuestions(source, stored.recentIds, QUIZ_SET_SIZE);
      startedAtRef.current = Date.now();
      setQueue(drawn);
      setOrders(Object.fromEntries(drawn.map((q) => [q.id, orderOptions(q.options, q.shuffleOptions).map((o) => o.id)])));
      setIndex(0);
      setAnswers({});
      setSelected([]);
      setChecked(false);
      setPhase("playing");
      writeStored({
        ...stored,
        recentIds: rememberRecent(stored.recentIds, drawn.map((q) => q.id)),
        session: { startedAt: startedAtRef.current, topic, queue: drawn.map((q) => q.id), index: 0, answers: {} },
      });
    },
    [topic],
  );

  useEffect(() => {
    if (!ready) return;
    let active = true;
    fetch(`/${locale}/quiz-data/${topic}`)
      .then((response) => {
        if (!response.ok) throw new Error("Quiz data unavailable");
        return response.json() as Promise<QuizQuestionPayload[]>;
      })
      .then((questions) => {
        if (!active) return;
        setPool(questions);
        if (questions.length === 0) {
          setPhase("empty");
          return;
        }
        const { session } = readStored();
        const byId = new Map(questions.map((q) => [q.id, q]));
        const restorable =
          wantsResume &&
          session &&
          session.topic === topic &&
          session.index < session.queue.length &&
          session.queue.every((id) => byId.has(id));
        if (restorable && session) {
          const restored = session.queue.map((id) => byId.get(id) as QuizQuestionPayload);
          startedAtRef.current = session.startedAt;
          setQueue(restored);
          setOrders(Object.fromEntries(restored.map((q) => [q.id, orderOptions(q.options, q.shuffleOptions).map((o) => o.id)])));
          setIndex(session.index);
          setAnswers(session.answers);
          const current = restored[session.index];
          const answered = session.answers[current.id];
          setSelected(answered ?? []);
          setChecked(answered !== undefined);
          setPhase("playing");
        } else {
          startNew(questions);
        }
      })
      .catch(() => {
        if (active) setPhase("error");
      });
    return () => {
      active = false;
    };
  }, [ready, locale, topic, wantsResume, reload, startNew]);

  const question = queue[index];
  const optionsInOrder = useMemo(() => {
    if (!question) return [];
    const order = orders[question.id] ?? question.options.map((o) => o.id);
    return order.map((id) => question.options.find((o) => o.id === id)).filter((o): o is NonNullable<typeof o> => Boolean(o));
  }, [question, orders]);

  useEffect(() => {
    if (phase !== "playing") return;
    (checked ? explanationRef.current : headingRef.current)?.focus({ preventScroll: false });
  }, [phase, checked, index]);

  const isMulti = question?.type === "multi_select";

  const toggle = (optionId: string) => {
    if (checked) return;
    setSelected((current) =>
      isMulti ? (current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId]) : [optionId],
    );
  };

  const commit = (value: string[] | null) => {
    if (!question) return;
    const nextAnswers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);
    setChecked(true);
    persistSession(queue, index, nextAnswers);
  };

  const next = () => {
    const nextIndex = index + 1;
    if (nextIndex >= queue.length) {
      const stored = readStored();
      writeStored({ ...stored, session: undefined });
      setPhase("result");
      return;
    }
    setIndex(nextIndex);
    setSelected([]);
    setChecked(false);
    persistSession(queue, nextIndex, answers);
  };

  const streak = useMemo(() => {
    let run = 0;
    for (let i = index; i >= 0; i -= 1) {
      const q = queue[i];
      if (!q || answers[q.id] === undefined || !isFullyCorrect(q, answers[q.id])) break;
      run += 1;
    }
    return run;
  }, [queue, answers, index]);

  if (phase === "loading") {
    return (
      <p role="status" className="theme-muted py-16 text-center">
        {t.loading}
      </p>
    );
  }
  if (phase === "error") {
    return (
      <div className="py-16 text-center">
        <p>{t.error}</p>
        <button type="button" className="btn-vintage mt-4" onClick={() => {
            setPhase("loading");
            setReload((n) => n + 1);
          }}>
          {t.retry}
        </button>
      </div>
    );
  }
  if (phase === "empty") {
    return (
      <div className="py-16 text-center">
        <p>{t.empty}</p>
        <Link href={`/${locale}/quiz`} className="btn-vintage mt-4">
          {t.backToQuiz}
        </Link>
      </div>
    );
  }

  const fmt = (n: number) => n.toLocaleString(locale === "bn" ? "bn-BD" : "en-US");

  if (phase === "result") {
    const score = scoreSession(queue, answers);
    const tier = tierForScore(site.tiers, score, queue.length);
    const skipped = queue.filter((q) => answers[q.id] === null || answers[q.id] === undefined).length;
    const stories: Array<{ slug: string; title: string }> = [];
    for (const q of queue) {
      if (isFullyCorrect(q, answers[q.id]) || stories.some((s) => s.slug === q.eventSlug)) continue;
      stories.push({ slug: q.eventSlug, title: q.eventTitle });
    }
    return (
      <div className="quiz-slide mx-auto max-w-2xl space-y-8 text-center">
        <div>
          <p className="text-eyebrow">{topicTitle}</p>
          <h1 className="text-display mt-3 text-4xl font-semibold md:text-5xl" tabIndex={-1} ref={headingRef}>
            {tier.title}
          </h1>
          <p className="theme-muted mt-4 text-lg">{tier.message}</p>
        </div>
        <div className="theme-surface-elev border p-6" style={{ borderColor: "var(--gold)" }}>
          <p className="text-eyebrow">{t.scoreLabel}</p>
          <p className="text-display mt-2 text-5xl font-semibold" aria-live="polite">
            <CountUp to={score} locale={locale} />
            <span className="theme-muted text-2xl"> / {fmt(queue.length)}</span>
          </p>
          {skipped > 0 ? <p className="theme-muted mt-2 text-sm">{t.unanswered(fmt(skipped))}</p> : null}
        </div>
        <p className="theme-muted text-sm">{site.disclaimer}</p>
        {stories.length > 0 ? (
          <section className="text-left">
            <h2 className="text-eyebrow">{t.readNext}</h2>
            <ul className="mt-3 grid gap-2">
              {stories.slice(0, 4).map((story) => (
                <li key={story.slug}>
                  <Link
                    href={`/${locale}/events/${story.slug}`}
                    className="theme-surface link-ink block border px-4 py-3"
                    style={{ borderColor: "var(--border)" }}
                  >
                    {story.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <div className="flex flex-wrap justify-center gap-3">
          <button type="button" className="btn-ink" onClick={() => startNew(pool)}>
            {t.playAgain}
          </button>
          <Link href={`/${locale}/quiz`} className="btn-vintage">
            {t.anotherTopic}
          </Link>
        </div>
      </div>
    );
  }

  if (!question) return null;

  const answeredValue = answers[question.id];
  const wasSkipped = checked && answeredValue === null;
  const correctSet = new Set(question.correctOptionIds);
  const correctNow = checked && isFullyCorrect(question, answeredValue);
  const feedbackPool = wasSkipped ? site.feedback.skipped : correctNow ? site.feedback.correct : site.feedback.wrong;
  const feedbackLine = feedbackPool[index % feedbackPool.length];
  const isLast = index === queue.length - 1;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="text-eyebrow">{topicTitle}</span>
        <Link
          href={`/${locale}/quiz`}
          className="link-ink"
          onClick={(event) => {
            if (!window.confirm(t.exitConfirm)) event.preventDefault();
          }}
        >
          {t.exit}
        </Link>
      </div>
      <div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={queue.length}
          aria-valuenow={index + (checked ? 1 : 0)}
          aria-label={t.progress(index + 1, queue.length)}
          className="h-1.5 w-full overflow-hidden rounded-full"
          style={{ background: "var(--hairline)" }}
        >
          <div
            className="h-full transition-[width] duration-300"
            style={{ width: `${((index + (checked ? 1 : 0)) / queue.length) * 100}%`, background: "var(--gold)" }}
          />
        </div>
        <p className="theme-muted mt-2 text-sm">{t.progress(index + 1, queue.length)}</p>
      </div>

      <div key={question.id} className="quiz-slide space-y-5">
        {question.context ? (
          <details className="theme-surface-soft border px-4 py-3 text-sm" style={{ borderColor: "var(--border)" }} open>
            <summary className="cursor-pointer font-medium">{locale === "bn" ? "প্রেক্ষাপট" : "Context"}</summary>
            <p className="mt-2 leading-relaxed">{question.context}</p>
          </details>
        ) : null}
        <fieldset className="space-y-4" disabled={checked}>
          <legend className="w-full">
            <h1 className="text-display text-2xl font-semibold leading-snug md:text-3xl" tabIndex={-1} ref={headingRef}>
              {question.question}
            </h1>
            {isMulti ? <span className="theme-muted mt-2 block text-sm">{t.selectAll}</span> : null}
          </legend>
          <div className="grid gap-3">
            {optionsInOrder.map((option) => {
              const chosen = selected.includes(option.id);
              const isCorrect = correctSet.has(option.id);
              let state: "idle" | "selected" | "correct" | "wrong" | "missed" | "dim" = chosen ? "selected" : "idle";
              if (checked) {
                if (isCorrect && chosen) state = "correct";
                else if (!isCorrect && chosen) state = "wrong";
                else if (isCorrect) state = "missed";
                else state = "dim";
              }
              const styles = {
                idle: { borderColor: "var(--border-strong)", background: "var(--surface-soft)" },
                selected: { borderColor: "var(--gold)", background: "var(--paper-aged)" },
                correct: { borderColor: "var(--forest)", background: "color-mix(in srgb, var(--forest) 16%, var(--paper))" },
                wrong: { borderColor: "var(--wax)", background: "color-mix(in srgb, var(--wax) 14%, var(--paper))" },
                missed: { borderColor: "var(--forest)", background: "var(--paper)", borderStyle: "dashed" },
                dim: { borderColor: "var(--hairline)", background: "var(--surface-soft)", opacity: 0.6 },
              }[state];
              const tag =
                state === "correct" || (state === "missed" && !isMulti)
                  ? { icon: "✓", text: t.correctTag }
                  : state === "wrong"
                    ? { icon: "✗", text: t.yourWrongTag }
                    : state === "missed"
                      ? { icon: "○", text: t.missedTag }
                      : null;
              return (
                <label
                  key={option.id}
                  className="flex min-h-[56px] cursor-pointer items-center gap-3 border px-4 py-3 transition-colors duration-200 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--gold)]"
                  style={styles}
                >
                  <input
                    type={isMulti ? "checkbox" : "radio"}
                    name={question.id}
                    value={option.id}
                    checked={chosen}
                    onChange={() => toggle(option.id)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 shrink-0 items-center justify-center border text-xs"
                    style={{ borderColor: "var(--sepia)", borderRadius: isMulti ? "2px" : "9999px", background: chosen ? "var(--gold)" : "transparent", color: "var(--paper)" }}
                  >
                    {chosen ? "✓" : ""}
                  </span>
                  <span className="flex-1 leading-snug">{option.text}</span>
                  {tag ? (
                    <span className="text-eyebrow shrink-0 !text-xs" style={{ color: state === "wrong" ? "var(--wax)" : "var(--forest)" }}>
                      <span aria-hidden="true">{tag.icon} </span>
                      {tag.text}
                    </span>
                  ) : null}
                </label>
              );
            })}
          </div>
        </fieldset>

        {checked ? (
          <div
            ref={explanationRef}
            tabIndex={-1}
            aria-live="polite"
            className="quiz-slide theme-surface-elev space-y-3 border p-5 outline-none"
            style={{ borderColor: correctNow ? "var(--forest)" : "var(--border-strong)" }}
          >
            <p className="font-display text-lg font-semibold">{feedbackLine}</p>
            {streak >= 3 && correctNow ? <p className="text-eyebrow">✦ {t.streak}</p> : null}
            <p className="leading-relaxed">{question.explanation}</p>
            <a
              href={`/${locale}/events/${question.eventSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink inline-block text-sm underline"
            >
              {t.readStory}: {question.eventTitle}
            </a>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-4">
          {checked ? (
            <button type="button" className="btn-ink" onClick={next}>
              {isLast ? t.finish : t.next} <span className="arrow">→</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                className="btn-ink disabled:cursor-not-allowed disabled:opacity-50"
                disabled={selected.length === 0}
                onClick={() => commit(selected)}
              >
                {t.check}
              </button>
              <button type="button" className="link-ink text-sm underline" onClick={() => commit(null)}>
                {t.skip}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
