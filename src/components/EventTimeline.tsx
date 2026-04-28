"use client";
import { motion } from "framer-motion";
import type { TimelineItem } from "@/types/content";
export function EventTimeline({ items }: { items: TimelineItem[] }) {
  return <div className="relative pl-6"><div className="theme-border absolute top-0 left-2.5 h-full w-px border-l" /><div className="space-y-6">{items.map((item, index) => <motion.article key={`${item.year}-${item.title}`} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.08 }} className="theme-surface relative rounded-xl border p-4"><span className="absolute top-5 -left-[1.07rem] h-3 w-3 rounded-full bg-amber-400" /><p className="theme-muted text-xs tracking-[0.2em] uppercase">{item.year}</p><h3 className="mt-1 text-lg font-semibold">{item.title}</h3><p className="theme-muted mt-1 text-sm">{item.detail}</p></motion.article>)}</div></div>;
}
