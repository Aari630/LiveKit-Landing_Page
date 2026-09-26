import { logout, saveApiKeys } from "@/actions/auth";
import { getMerchantById } from "@/lib/mock-db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const sessionId = cookies().get("merchant-session")?.value;
  const merchant = sessionId ? await getMerchantById(sessionId) : null;

  if (!merchant) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-zinc-100 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 border-b border-zinc-800 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">/signal console</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">{merchant.storeName}</h1>
            <p className="mt-2 text-sm text-zinc-500">Merchant payment configuration</p>
          </div>
          <form action={logout}>
            <button type="submit" className="rounded-xl border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white">Log out</button>
          </form>
        </header>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-500">Store identity</p>
            <dl className="mt-6 space-y-5">
              <div><dt className="text-xs text-zinc-500">Store name</dt><dd className="mt-1 text-lg text-zinc-100">{merchant.storeName}</dd></div>
              <div><dt className="text-xs text-zinc-500">Merchant email</dt><dd className="mt-1 text-sm text-zinc-300">{merchant.email}</dd></div>
              <div><dt className="text-xs text-zinc-500">Merchant ID</dt><dd className="mt-1 font-mono text-sm text-emerald-300">{merchant.id}</dd></div>
            </dl>
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-6">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-emerald-300">Razorpay credentials</p>
            <form action={saveApiKeys} className="mt-6 space-y-4">
              <label className="block text-xs text-zinc-500">API key ID<input name="razorpayKeyId" defaultValue={merchant.razorpayKeyId} required className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-emerald-400" /></label>
              <label className="block text-xs text-zinc-500">API key secret<input name="razorpayKeySecret" type="password" defaultValue={merchant.razorpayKeySecret} required className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-emerald-400" /></label>
              <button type="submit" className="rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300">Save API keys</button>
            </form>
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-500">Embed script</p>
          <p className="mt-2 text-sm text-zinc-400">Drop this on any page to mount checkout for {merchant.storeName}.</p>
          <pre className="mt-5 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs leading-6 text-emerald-300">
            {`<script src="https://yourapp.vercel.app/widget.js" data-store="${merchant.storeName}"></script>`}
          </pre>
        </section>
      </div>
    </main>
  );
}
