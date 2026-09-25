"use client";

import { login } from "@/actions/auth";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(new FormData(event.currentTarget));
      if ("error" in result) {
        setError(result.error ?? "Invalid credentials");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-6 py-12 text-zinc-100">
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <section className="relative w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 shadow-2xl shadow-black/30 backdrop-blur sm:p-10">
        <div className="mb-8">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">/signal console</p>
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back.</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-500">Sign in to manage your merchant checkout workspace.</p>
        </div>

        {error && <p role="alert" className="mb-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-sm text-zinc-300">
            Email
            <input name="email" type="email" autoComplete="email" required className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-400" />
          </label>
          <label className="block text-sm text-zinc-300">
            Password
            <input name="password" type="password" autoComplete="current-password" required className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-400" />
          </label>
          <button type="submit" disabled={isLoading} className="w-full rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300 disabled:cursor-wait disabled:opacity-60">
            {isLoading ? "Signing in..." : "Sign in to dashboard"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Don&apos;t have an account? <a href="/signup" className="text-emerald-300 transition hover:text-emerald-200">Sign up</a>
        </p>
      </section>
    </main>
  );
}
