"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ResourceCard } from "@/components/ResourceCard";
import { SectionTitle } from "@/components/SectionTitle";
import type { EventResource, Locale, ResourceCategory, SourceQuality } from "@/types/content";

const CATEGORIES: ResourceCategory[] = ["primary-sources", "academic-books", "research-articles-and-papers", "reference-sources", "memoirs-and-eyewitness-accounts", "maps-and-visual-sources", "documentary-and-video", "news-and-contemporary-reports", "cultural-and-literary-resources", "further-reading"];
const QUALITIES: SourceQuality[] = ["primary", "secondary", "archive", "editorial"];
const CAT_LABELS: Record<Locale, Record<ResourceCategory, string>> = {
  en: { "primary-sources":"Primary Sources", "academic-books":"Academic Books", "research-articles-and-papers":"Research Articles and Papers", "reference-sources":"Reference Sources", "memoirs-and-eyewitness-accounts":"Memoirs and Eyewitness Accounts", "maps-and-visual-sources":"Maps and Visual Sources", "documentary-and-video":"Documentary and Video", "news-and-contemporary-reports":"News and Contemporary Reports", "cultural-and-literary-resources":"Cultural and Literary Resources", "further-reading":"Further Reading" },
  bn: { "primary-sources":"প্রাথমিক সূত্র", "academic-books":"অ্যাকাডেমিক বই", "research-articles-and-papers":"গবেষণা প্রবন্ধ ও পেপার", "reference-sources":"রেফারেন্স সূত্র", "memoirs-and-eyewitness-accounts":"স্মৃতিকথা ও প্রত্যক্ষদর্শীর বর্ণনা", "maps-and-visual-sources":"মানচিত্র ও ভিজ্যুয়াল সূত্র", "documentary-and-video":"ডকুমেন্টারি ও ভিডিও", "news-and-contemporary-reports":"সংবাদ ও সমসাময়িক প্রতিবেদন", "cultural-and-literary-resources":"সাংস্কৃতিক ও সাহিত্যিক রিসোর্স", "further-reading":"আরও পড়ুন" },
};
const QUALITY_LABELS: Record<Locale, Record<SourceQuality,string>> = { en:{primary:"Primary",secondary:"Secondary",archive:"Archive",editorial:"Editorial"}, bn:{primary:"প্রাথমিক",secondary:"গৌণ",archive:"আর্কাইভ",editorial:"সম্পাদকীয়"} };
const norm = (s: string) => s.trim().toLocaleLowerCase();

export function ResourceDirectoryInteractive({ resources, locale }: { resources: EventResource[]; locale: Locale }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const bn = locale === "bn";
  const q = params.get("q") ?? "";
  const categoryRaw = params.get("category") ?? "";
  const category = CATEGORIES.includes(categoryRaw as ResourceCategory) ? categoryRaw : "";
  const subcategory = params.get("subcategory") ?? "";
  const qualityRaw = params.get("quality") ?? "";
  const quality = QUALITIES.includes(qualityRaw as SourceQuality) ? qualityRaw : "";
  const parsed = Number(params.get("page") ?? 1);
  const requested = Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
  const categories = [...new Set(resources.map((item) => item.category))];
  const subcategories = [...new Set(resources.map((item) => item.subcategory))].sort((a,b)=>a.localeCompare(b));
  const qualities = [...new Set(resources.flatMap((item)=>item.quality?[item.quality]:[]))].sort();
  const filtered = useMemo(() => resources.filter((item) => (!category || item.category === category) && (!subcategory || norm(item.subcategory) === norm(subcategory)) && (!quality || item.quality === quality) && (!norm(q) || [item.title,item.attribution,item.note,item.category,item.subcategory,item.quality ?? "",item.id].some((v)=>norm(v).includes(norm(q))))).sort((a,b)=>{const cat=CATEGORIES.indexOf(a.category)-CATEGORIES.indexOf(b.category); if(cat) return cat; const qa=a.quality?QUALITIES.indexOf(a.quality):QUALITIES.length;const qb=b.quality?QUALITIES.indexOf(b.quality):QUALITIES.length;if(qa!==qb)return qa-qb;return a.title.localeCompare(b.title);}), [resources,category,subcategory,quality,q]);
  const pageCount=Math.max(1,Math.ceil(filtered.length/20));
  const page=Math.min(requested,pageCount);
  const shown=filtered.slice((page-1)*20,page*20);
  function update(values: Record<string,string|number|undefined>, replace=false) { const next=new URLSearchParams(params.toString()); Object.entries(values).forEach(([key,value])=>value?next.set(key,String(value)):next.delete(key)); const url=`${pathname}${next.size?`?${next}`:""}`; window.history[replace?"replaceState":"pushState"](null,"",url); }
  function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); const data=new FormData(event.currentTarget); update({q:String(data.get("q")??"").trim()||undefined,category:String(data.get("category")??"")||undefined,subcategory:String(data.get("subcategory")??"")||undefined,quality:String(data.get("quality")??"")||undefined,page:undefined}); }
  return <>
    <section className="theme-surface rounded-2xl border p-5 md:p-6"><SectionTitle title={bn?"সার্চ ও ফিল্টার":"Search and Filters"} subtitle={bn?"কিওয়ার্ড, বিভাগ, উপবিভাগ ও মান দিয়ে রিসোর্স বাছাই করুন":"Filter resources by keyword, category, subcategory, and quality"}/><form key={params.toString()} onSubmit={submit} className="mt-4 grid gap-3 md:grid-cols-[1fr_170px_220px_180px_auto]"><input name="q" defaultValue={q} placeholder={bn?"শিরোনাম, নাম বা নোট":"Search title, attribution, or note"} className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm"/><select name="category" defaultValue={category} className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm"><option value="">{bn?"সব বিভাগ":"All categories"}</option>{categories.map(v=><option key={v} value={v}>{CAT_LABELS[locale][v]}</option>)}</select><select name="subcategory" defaultValue={subcategory} className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm"><option value="">{bn?"সব উপবিভাগ":"All subcategories"}</option>{subcategories.map(v=><option key={v}>{v}</option>)}</select><select name="quality" defaultValue={quality} className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm"><option value="">{bn?"সব মান":"All quality levels"}</option>{qualities.map(v=><option key={v} value={v}>{QUALITY_LABELS[locale][v]}</option>)}</select><button className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-amber-500/40 px-4 text-sm font-medium text-accent">{bn?"প্রয়োগ করুন":"Apply"}</button></form></section>
    <div><div className="flex items-center justify-between gap-3"><SectionTitle title={bn?"সব রিসোর্স":"All Resources"} subtitle={`${filtered.length} ${bn?"রিসোর্স":"resources"}`}/>{(q||category||subcategory||quality)&&<button onClick={()=>update({q:undefined,category:undefined,subcategory:undefined,quality:undefined,page:undefined})} className="text-sm font-medium text-amber-400">{bn?"ফিল্টার রিসেট":"Reset filters"}</button>}</div><div className="mt-4 grid gap-4 md:grid-cols-2">{shown.map((item,index)=><ResourceCard key={item.id} resource={item} locale={locale} index={index}/>)}</div>{!shown.length&&<div className="theme-surface mt-4 rounded-xl border p-6 text-sm theme-muted">{bn?"কোনো রিসোর্স পাওয়া যায়নি।":"No resources found."}</div>}<nav aria-label={bn?"রিসোর্সের পাতা":"Resource pages"} className="mt-6 flex items-center justify-between">{page>1?<button onClick={()=>update({page:page-1})} className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm">{bn?"আগে":"Previous"}</button>:<span/>}<p className="theme-muted text-sm">{bn?`${page} / ${pageCount}`:`Page ${page} of ${pageCount}`}</p>{page<pageCount?<button onClick={()=>update({page:page+1})} className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm">{bn?"পরে":"Next"}</button>:<span/>}</nav></div>
  </>;
}
