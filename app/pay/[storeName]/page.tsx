import { getMerchantByStoreName } from "@/lib/mock-db";
import { notFound } from "next/navigation";
import { StorefrontChat } from "@/components/storefront-chat";

export const dynamic = "force-dynamic";

type Props = { params: { storeName: string } };

export default async function StorefrontPage({ params }: Props) {
  const storeName = decodeURIComponent(params.storeName);
  const merchant = await getMerchantByStoreName(storeName);

  if (!merchant) notFound();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 px-6 py-5 sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">{merchant.storeName}</p>
        <h1 className="mt-2 text-2xl font-semibold">Checkout</h1>
      </header>
      <StorefrontChat storeName={merchant.storeName} />
    </main>
  );
}
