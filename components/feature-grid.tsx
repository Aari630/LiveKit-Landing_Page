"use client";

import { Check, Code2, Gauge, ShieldCheck, Webhook } from "lucide-react";
import type { ReactNode } from "react";

type FeatureCardProps = {
  children: ReactNode;
  className?: string;
  eyebrow: string;
  icon: ReactNode;
  title: string;
  description: string;
};

function FeatureCard({ children, className = "", eyebrow, icon, title, description }: FeatureCardProps) {
  return (
    <div className={`relative min-h-[24rem] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-8 ${className}`}>
      <div className="relative flex h-full flex-col">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">
            {icon}
            {eyebrow}
          </div>
          <span className="font-mono text-[11px] text-zinc-600">/ checkout.core</span>
        </div>
        <h3 className="max-w-2xl text-2xl font-medium tracking-tight text-zinc-100 sm:text-3xl">{title}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">{description}</p>
        {children}
      </div>
    </div>
  );
}

function DeepLinkGraphic() {
  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_13rem]">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900 font-mono text-xs leading-6 text-zinc-300">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-zinc-500">
          <Code2 size={14} aria-hidden="true" />
          <span>upi-intent.ts</span>
        </div>
        <pre className="overflow-x-auto p-4"><code><span className="text-emerald-300">const</span> intent = <span className="text-sky-300">createUpiLink</span>({"{\n"}<span className="text-zinc-500">  pa:</span> <span className="text-amber-200">merchantVpa</span>,{"\n"}<span className="text-zinc-500">  am:</span> <span className="text-amber-200">cartTotal</span>,{"\n"}<span className="text-zinc-500">  redirect:</span> <span className="text-amber-200">false</span>{"\n"}{"}"});</code></pre>
      </div>
      <div className="flex flex-col justify-between rounded-xl border border-emerald-400/20 bg-zinc-900 p-4">
        <div className="flex items-center gap-2 text-xs text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
          Intent dispatched
        </div>
        <div className="mt-8">
          <p className="font-mono text-3xl font-semibold tracking-tight text-zinc-100">&lt; 120ms</p>
          <p className="mt-1 text-xs text-zinc-500">execution latency</p>
        </div>
      </div>
    </div>
  );
}

function MarginGraphic() {
  return (
    <div className="mt-auto pt-8">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs text-zinc-500">Live margin guardrail</p>
          <p className="mt-1 text-xl font-semibold text-zinc-100">95% <span className="text-zinc-600">-&gt;</span> 90% Authorized</p>
        </div>
        <Gauge className="text-emerald-300" size={22} aria-hidden="true" />
      </div>
      <div className="relative h-2 rounded-full bg-zinc-800">
        <div className="absolute inset-y-0 left-0 w-[90%] rounded-full bg-emerald-400" />
        <div className="absolute -top-1 left-[90%] h-4 w-4 -translate-x-1/2 rounded-full border-2 border-zinc-950 bg-emerald-300 shadow-[0_0_0_3px_rgba(52,211,153,0.25)]" />
      </div>
      <div className="mt-3 flex justify-between font-mono text-[10px] text-zinc-600">
        <span>protected</span>
        <span>discount unlocked</span>
      </div>
    </div>
  );
}

function SettlementGraphic() {
  return (
    <div className="mt-auto pt-8">
      <div className="rounded-xl border border-white/10 bg-zinc-900 p-4 font-mono text-xs">
        <div className="flex items-center gap-3 text-emerald-300">
          <div className="grid h-7 w-7 place-items-center rounded-full bg-emerald-400 text-zinc-950">
            <Check size={15} strokeWidth={3} aria-hidden="true" />
          </div>
          <span>Status: 200 OK</span>
        </div>
        <div className="mt-4 grid gap-2 border-t border-white/10 pt-3 text-zinc-500 sm:grid-cols-2">
          <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-300" aria-hidden="true" /> Funds Captured</span>
          <span className="flex items-center gap-2"><Webhook size={14} className="text-emerald-300" aria-hidden="true" /> Receipt Issued</span>
        </div>
      </div>
    </div>
  );
}

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 pb-24 pt-8 sm:px-10 lg:px-16">
      <div className="mb-10 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">The checkout architecture</p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight text-zinc-100 sm:text-4xl">Revenue infrastructure that keeps the conversation moving.</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FeatureCard
          className="md:col-span-2"
          eyebrow="Deep-linking"
          icon={<Code2 size={15} aria-hidden="true" />}
          title="Zero-Redirect Deep-Linking"
          description="Bypass payment gateway redirects. The agent detects the customer's mobile OS and triggers native UPI app sheets (PhonePe, Google Pay, Paytm, CRED) directly on the screen."
        >
          <DeepLinkGraphic />
        </FeatureCard>

        <FeatureCard
          eyebrow="Margin intelligence"
          icon={<Gauge size={15} aria-hidden="true" />}
          title="Dynamic Margin Optimization"
          description="Real-time cart abandonment mitigation. The agent evaluates hesitation cues to automatically unlock dynamic micro-discounts within merchant-defined margins."
        >
          <MarginGraphic />
        </FeatureCard>

        <FeatureCard
          eyebrow="Settlement events"
          icon={<Webhook size={15} aria-hidden="true" />}
          title="Instant Webhook Settlement"
          description="Zero page reloads. Automated webhook listeners confirm bank-to-bank settlement in real-time, instantly issuing GST-compliant receipts inside the chat."
        >
          <SettlementGraphic />
        </FeatureCard>
      </div>
    </section>
  );
}
