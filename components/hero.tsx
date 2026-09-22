"use client";

import { m, useMotionValue, useSpring, type MotionStyle } from "framer-motion";
import { type MouseEvent, useRef } from "react";

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", mass: 0.5, damping: 25, stiffness: 60 },
  },
};

const heroContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const streamLines = [
  "M18 128 C130 38 205 220 316 128 S500 38 612 128",
  "M18 158 C130 68 205 250 316 158 S500 68 612 158",
  "M18 188 C130 98 205 280 316 188 S500 98 612 188",
];

function MagneticButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 });

  function handlePointerMove(event: MouseEvent<HTMLAnchorElement>) {
    const bounds = buttonRef.current?.getBoundingClientRect();
    if (!bounds) return;
    x.set((event.clientX - (bounds.left + bounds.width / 2)) * 0.18);
    y.set((event.clientY - (bounds.top + bounds.height / 2)) * 0.18);
    event.currentTarget.style.setProperty("--x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - bounds.top}px`);
  }

  function resetPointer() {
    x.set(0);
    y.set(0);
    buttonRef.current?.style.setProperty("--x", "50%");
    buttonRef.current?.style.setProperty("--y", "50%");
  }

  return (
    <m.a
      ref={buttonRef}
      href="#features"
      className="group relative inline-flex min-h-12 items-center gap-3 overflow-hidden rounded-full border border-orange-300/40 bg-orange-400 px-6 text-sm font-semibold text-zinc-950 shadow-[0_0_34px_rgba(251,146,60,0.2)]"
      style={{
        x: springX,
        y: springY,
        "--x": "50%",
        "--y": "50%",
      } as MotionStyle & Record<"--x" | "--y", string>}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
      whileTap={{ scale: 0.97 }}
    >
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.7),transparent_28%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative">Start building</span>
      <span className="relative text-lg transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
    </m.a>
  );
}

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-6 pb-20 pt-24 sm:px-10 lg:px-16">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_28%,rgba(249,115,22,0.12),transparent_36%),radial-gradient(circle_at_15%_75%,rgba(14,165,233,0.07),transparent_26%)]" />
        <m.div
          className="mx-auto flex w-full max-w-5xl flex-col items-center text-center"
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
        >
        <m.div variants={heroVariants} className="mb-7 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-orange-300/80">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-300 shadow-[0_0_12px_rgba(253,186,116,0.9)]" />
          The developer platform for the next wave
        </m.div>
        <m.h1 variants={heroVariants} className="max-w-4xl text-balance text-5xl font-semibold tracking-tight text-zinc-100 sm:text-7xl lg:text-8xl">
          Ship the future, <span className="text-orange-300">in motion.</span>
        </m.h1>
        <m.p variants={heroVariants} className="mt-7 max-w-2xl text-pretty text-base leading-7 text-zinc-400 sm:text-lg">
          A focused toolkit for teams who turn ambitious ideas into fast, resilient products. Less ceremony. More signal.
        </m.p>
        <m.div variants={heroVariants} className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <MagneticButton />
          <a href="#features" className="px-5 py-3 text-sm text-zinc-400 transition-colors hover:text-zinc-100">Explore the stack <span aria-hidden="true">v</span></a>
        </m.div>

        <m.div
          variants={heroVariants}
          className="relative mt-20 h-52 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(251,146,60,0.13),transparent_38%)]" />
          <svg viewBox="0 0 630 300" className="h-full w-full" aria-label="Abstract network data stream" role="img">
            <defs>
              <linearGradient id="stream" x1="0" x2="1">
                <stop stopColor="#38bdf8" stopOpacity="0" />
                <stop offset="0.48" stopColor="#fdba74" />
                <stop offset="1" stopColor="#f97316" stopOpacity="0" />
              </linearGradient>
            </defs>
            {streamLines.map((line, index) => <path key={line} d={line} fill="none" stroke="url(#stream)" strokeOpacity={0.55 - index * 0.12} strokeWidth="1" />)}
            <circle cx="316" cy="128" r="4" fill="#fed7aa" className="animate-pulse" />
            <circle cx="316" cy="158" r="2" fill="#7dd3fc" />
          </svg>
          <div className="absolute bottom-4 left-5 font-mono text-[10px] tracking-[0.2em] text-zinc-500">STREAM / 001 / LIVE</div>
        </m.div>
      </m.div>
    </section>
  );
}