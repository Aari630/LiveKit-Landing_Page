import Link from "next/link";
import { Hero } from "@/components/hero";
import { FeatureGrid } from "@/components/feature-grid";

export default function Home() {
  return (
    <main>
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight text-zinc-100">/signal</a>
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex min-h-10 items-center justify-center rounded-xl px-4 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="inline-flex min-h-10 items-center justify-center rounded-xl bg-emerald-400 px-4 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-300"
          >
            Sign Up
          </Link>
        </nav>
      </header>
      <div id="top"><Hero /></div>
      <FeatureGrid />
    </main>
  );
}
