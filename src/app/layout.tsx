import type { Metadata } from "next";
import { Playfair_Display, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const bengali = Noto_Serif_Bengali({ subsets: ["bengali"], variable: "--font-bengali" });
export const metadata: Metadata = { title: "Bengal Unfolded", description: "Bilingual historical storytelling journey through major Bengal and Bangladesh turning points." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" data-theme="dark" className={`${playfair.variable} ${bengali.variable} h-full`}><body className="min-h-full">{children}</body></html>; }
