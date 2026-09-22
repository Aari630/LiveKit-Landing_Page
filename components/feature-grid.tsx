"use client";

import { m, useMotionTemplate, useMotionValue } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

const featureVariants = {
  hidden: { opacity: 0, y: 24, rotate: 1.5 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const agentResponse = `{
  "agent": "nova",
  "transport": "webrtc",
  "room": "support-lobby",
  "status": "connected"
}`;

type FeatureCardProps = {
  children: ReactNode;
  className?: string;
  label: string;
  title: string;
  description: string;
  index: number;
};

function FeatureCard({ children, className = "", label, title, description, index }: FeatureCardProps) {
  const spotlightX = useMotionValue("50%");
  const spotlightY = useMotionValue("50%");
  const spotlight = useMotionTemplate`radial-gradient(22rem circle at ${spotlightX} ${spotlightY}, rgba(251, 146, 60, 0.14), transparent 68%)`;

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    spotlightX.set(`${event.clientX - bounds.left}px`);
    spotlightY.set(`${event.clientY - bounds.top}px`);
  }

  function resetSpotlight() {
    spotlightX.set("50%");
    spotlightY.set("50%");
  }

  return (
    <m.div
      variants={featureVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetSpotlight}
      className={`group relative isolate min-h-[22rem] will-change-transform overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-8 ${className}`}
    >
      <m.div style={{ backgroundImage: spotlight }} className="pointer-events-none absolute inset-0 -z-10 will-change-opacity opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col">
        <div className="mb-10 flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-orange-300/80">{label}</span>
          <span className="font-mono text-[11px] text-zinc-600">0{index + 1}</span>
        </div>
        <h3 className="max-w-md text-2xl font-medium tracking-tight text-zinc-100 sm:text-3xl">{title}</h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-zinc-300">{description}</p>
        {children}
      </div>
    </m.div>
  );
}

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 pb-24 pt-8 sm:px-10 lg:px-16">
      <div className="mb-10 max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Built for the edge</p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight text-zinc-100 sm:text-4xl">Everything you need to move from signal to shipped.</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FeatureCard
          index={0}
          label="AI agents"
          title="Give every interaction a pulse."
          description="Connect voice, context, and realtime infrastructure in a few lines of typed code."
          className="md:col-span-2"
        >
          <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-zinc-950/90 font-mono text-xs leading-6 text-zinc-300 shadow-[inset_0_1px_12px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-red-400/80" />
              <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
              <span className="h-2 w-2 rounded-full bg-green-400/80" />
              <span className="ml-2">agent.connect.ts</span>
            </div>
            <pre className="overflow-x-auto p-4"><code><span className="text-orange-300">const</span> connection = <span className="text-sky-300">await</span> signal.agents.connect({"\n"}{agentResponse}{"\n"});</code></pre>
          </div>
        </FeatureCard>

        <FeatureCard
          index={1}
          label="Realtime"
          title="Latency you can feel less of."
          description="Keep every event close to the people and systems that need it, wherever they run."
        >
          <div className="mt-auto flex items-end gap-1 pt-10" aria-label="Realtime latency visualization">
            {[32, 48, 24, 66, 42, 78, 54, 36, 62, 45, 72, 52].map((height, index) => (
              <span key={index} className="h-16 flex-1 rounded-sm bg-sky-300/70" style={{ transform: `scaleY(${height / 100})`, transformOrigin: "bottom" }} />
            ))}
          </div>
        </FeatureCard>

        <FeatureCard
          index={2}
          label="Observability"
          title="Know what is happening."
          description="Clear traces and useful defaults make production feel like a place you can explore."
        >
          <div className="mt-auto grid grid-cols-3 gap-2 pt-10 font-mono text-[10px] text-zinc-300">
            <div className="rounded-lg border border-white/10 bg-zinc-950/50 p-3"><span className="block text-zinc-100">99.98%</span> uptime</div>
            <div className="rounded-lg border border-white/10 bg-zinc-950/50 p-3"><span className="block text-zinc-100">42ms</span> p95</div>
            <div className="rounded-lg border border-white/10 bg-zinc-950/50 p-3"><span className="block text-zinc-100">0.4%</span> errors</div>
          </div>
        </FeatureCard>
      </div>
    </section>
  );
}