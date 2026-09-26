import { createClient } from "@supabase/supabase-js";

export type Merchant = {
  id: string;
  email: string;
  password: string;
  storeName: string;
  razorpayKeyId: string;
  razorpayKeySecret: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function getMerchantByEmail(email: string) {
  const { data } = await supabase
    .from("merchants")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  return (data as Merchant | null) ?? null;
}

export async function getMerchantByStoreName(storeName: string) {
  const { data } = await supabase
    .from("merchants")
    .select("*")
    .eq("storeName", storeName)
    .maybeSingle();

  return (data as Merchant | null) ?? null;
}

export async function getMerchantById(id: string) {
  const { data } = await supabase
    .from("merchants")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  return (data as Merchant | null) ?? null;
}

export async function createMerchant(merchantData: Omit<Merchant, "id">) {
  const { data, error } = await supabase
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
  const { data } = await supabase
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
