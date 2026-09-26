"use client";

export function Hero() {
  return (
    <>
      <section className="relative isolate overflow-hidden px-6 pb-24 pt-20 sm:px-10 sm:pb-28 lg:px-16 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_48%,rgba(16,185,129,0.1),transparent_28%),radial-gradient(circle_at_12%_20%,rgba(14,165,233,0.08),transparent_30%)]" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(28rem,1.1fr)] lg:gap-16">
          <div className="max-w-2xl">
            <div className="mb-7">
              <span className="inline-flex items-center rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300 sm:text-[11px]">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                India&apos;s 1st Conversational Checkout Layer <span className="mx-2 text-emerald-500">•</span> Sub-second UPI Intents
              </span>
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight text-zinc-100 sm:text-6xl lg:text-7xl">
              Kill the 5-step checkout. <span className="text-emerald-300">Sell directly inside the chat.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              Turn cart abandoners into instant revenue. Our autonomous agent handles customer hesitations, negotiates localized micro-discounts, and fires zero-redirect UPI payment links directly in WhatsApp and Web.
            </p>

            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="/signup"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-400 px-6 text-sm font-semibold text-zinc-950 shadow-[0_0_32px_rgba(52,211,153,0.18)] transition-colors hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-zinc-950"
              >
                Get Started
                <span aria-hidden="true" className="ml-3 text-lg">-&gt;</span>
              </a>

              <a
                href="#features"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-zinc-700 px-6 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                View Demo
              </a>
            </div>
          </div>

          <div className="relative w-full max-w-xl">
            <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400 font-semibold text-zinc-950">C</div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">Checkout agent</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-zinc-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Active in WhatsApp + Web
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] text-emerald-300">LIVE</span>
              </div>

              <div className="space-y-5 p-5 sm:p-7">
                <div className="flex justify-end">
                  <div className="max-w-[88%] rounded-2xl rounded-br-md bg-zinc-800 px-4 py-3 text-sm leading-6 text-zinc-200">
                    Can I get this in Size 9? Hesitating on the price though.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-emerald-400 text-xs font-bold text-zinc-950">AI</div>
                  <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm leading-6 text-zinc-300">
                    Reserved size 9 for you! Here&apos;s an instant 5% off if you complete via UPI right now.
                  </div>
                </div>

                <div className="ml-10 rounded-2xl border border-emerald-400/25 bg-zinc-950 p-4 shadow-[0_12px_36px_rgba(0,0,0,0.28)] sm:p-5">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Instant checkout</p>
                      <p className="mt-1.5 text-sm font-medium text-zinc-200">Your product · Selected variant</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-zinc-500">Total</p>
                      <p className="text-2xl font-semibold tracking-tight text-white">Dynamic total</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-zinc-950"
                  >
                    Pay via UPI <span className="font-normal">(GPay / PhonePe / Paytm)</span>
                  </button>
                  <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    UPI Deep Link Ready
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
