import { randomUUID } from "node:crypto";
import fs from "fs";
import path from "path";

export type Merchant = {
  id: string;
  email: string;
  password: string;
  storeName: string;
  razorpayKeyId: string;
  razorpayKeySecret: string;
};

type Database = { merchants: Merchant[] };

const dbPath = path.join(process.cwd(), "data", "mock-db.json");

function readDB(): Database {
  if (!fs.existsSync(path.dirname(dbPath))) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  }

  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ merchants: [] }, null, 2));
  }

  const contents = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(contents) as Database;
}

export async function getMerchantByEmail(email: string) {
  const data = readDB();
  return data.merchants.find((merchant) => merchant.email === email) ?? null;
}

export async function getMerchantByStoreName(storeName: string) {
  const data = readDB();
  return data.merchants.find((merchant) => merchant.storeName === storeName) ?? null;
}

export async function getMerchantById(id: string) {
  const data = readDB();
  return data.merchants.find((merchant) => merchant.id === id) ?? null;
}

export async function createMerchant(merchantData: Omit<Merchant, "id">) {
  const data = readDB();
  const merchant = { id: randomUUID(), ...merchantData };
  data.merchants.push(merchant);
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  return merchant;
}

export async function updateMerchantKeys(id: string, razorpayKeyId: string, razorpayKeySecret: string) {
  const data = readDB();
  const merchant = data.merchants.find((candidate) => candidate.id === id);
  if (!merchant) return null;

  merchant.razorpayKeyId = razorpayKeyId;
  merchant.razorpayKeySecret = razorpayKeySecret;
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  return merchant;
}

export const MOCK_DB = {
  getMerchantByEmail,
  getMerchantByStoreName,
  getMerchantById,
  createMerchant,
  updateMerchantKeys,
};
