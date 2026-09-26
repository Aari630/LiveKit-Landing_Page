import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type Merchant = {
  id: string;
  email: string;
  password: string;
  storeName: string;
  razorpayKeyId: string;
  razorpayKeySecret: string;
};

let client: SupabaseClient | null = null;

function supabase() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }

  client = createClient(url, anonKey);
  return client;
}

export async function getMerchantByEmail(email: string) {
  const { data } = await supabase()
    .from("merchants")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  return (data as Merchant | null) ?? null;
}

export async function getMerchantByStoreName(storeName: string) {
  const { data } = await supabase()
    .from("merchants")
    .select("*")
    .eq("storeName", storeName)
    .maybeSingle();

  return (data as Merchant | null) ?? null;
}

export async function getMerchantById(id: string) {
  const { data } = await supabase()
    .from("merchants")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  return (data as Merchant | null) ?? null;
}

export async function createMerchant(merchantData: Omit<Merchant, "id">) {
  const { data, error } = await supabase()
    .from("merchants")
    .insert([merchantData])
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to create merchant");
  }

  return data as Merchant;
}

export async function updateMerchantKeys(id: string, razorpayKeyId: string, razorpayKeySecret: string) {
  const { data } = await supabase()
    .from("merchants")
    .update({ razorpayKeyId, razorpayKeySecret })
    .eq("id", id)
    .select("*")
    .maybeSingle();

  return (data as Merchant | null) ?? null;
}

export const MOCK_DB = {
  getMerchantByEmail,
  getMerchantByStoreName,
  getMerchantById,
  createMerchant,
  updateMerchantKeys,
};
