import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

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

function readDatabase(): Database {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ merchants: [] }, null, 2), "utf8");
  }

  const contents = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(contents) as Database;
}

export async function getMerchantByEmail(email: string) {
  const database = readDatabase();
  return database.merchants.find((merchant) => merchant.email === email) ?? null;
}

export async function getMerchantByStoreName(storeName: string) {
  const database = readDatabase();
  return database.merchants.find((merchant) => merchant.storeName === storeName) ?? null;
}

export async function getMerchantById(id: string) {
  const database = readDatabase();
  return database.merchants.find((merchant) => merchant.id === id) ?? null;
}

export async function createMerchant(data: Omit<Merchant, "id">) {
  const database = readDatabase();
  const merchant = { id: randomUUID(), ...data };
  database.merchants.push(merchant);
  fs.writeFileSync(dbPath, JSON.stringify(database, null, 2), "utf8");
  return merchant;
}

export async function updateMerchantKeys(id: string, razorpayKeyId: string, razorpayKeySecret: string) {
  const database = readDatabase();
  const merchant = database.merchants.find((candidate) => candidate.id === id);
  if (!merchant) return null;

  merchant.razorpayKeyId = razorpayKeyId;
  merchant.razorpayKeySecret = razorpayKeySecret;
  fs.writeFileSync(dbPath, JSON.stringify(database, null, 2), "utf8");
  return merchant;
}

export const MOCK_DB = {
  getMerchantByEmail,
  getMerchantByStoreName,
  getMerchantById,
  createMerchant,
  updateMerchantKeys,
};
