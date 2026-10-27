import Link from "next/link";

export default function RootPage() {
  return (
    <main lang="bn" className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
      <meta httpEquiv="refresh" content="0;url=/bn/" />
      <h1>বেঙ্গল আনফোল্ডেড</h1>
      <p>আপনাকে বাংলা সংস্করণে পাঠানো হচ্ছে।</p>
      <Link href="/bn/">চালিয়ে যান</Link>
    </main>
  );
}
