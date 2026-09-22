import { Hero } from "@/components/hero";
import { FeatureGrid } from "@/components/feature-grid";

export default function Home() {
  return (
    <main>
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight text-zinc-100">/signal</a>
        <span className="font-mono text-xs text-zinc-600">v0.4.1 / edge-ready</span>
      </header>
      <div id="top"><Hero /></div>
      <FeatureGrid />
    </main>
  );
}
