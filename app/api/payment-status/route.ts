import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import { getMerchantById } from "@/lib/mock-db";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const qrId = req.nextUrl.searchParams.get("qrId");
  const merchantId = req.nextUrl.searchParams.get("merchantId");

  if (!qrId || !merchantId) {
    return NextResponse.json({ error: "Missing payment identifiers" }, { status: 400 });
  }

  try {
    const merchant = await getMerchantById(merchantId);
    if (!merchant?.razorpayKeyId || !merchant.razorpayKeySecret) {
      return NextResponse.json({ error: "Merchant payment configuration is unavailable" }, { status: 404 });
    }

    const razorpay = new Razorpay({ key_id: merchant.razorpayKeyId, key_secret: merchant.razorpayKeySecret });
    const qrCode = await razorpay.qrCode.fetch(qrId);
    const paid =
      qrCode.payments_amount_received > 0 ||
      (qrCode.status === "closed" && qrCode.close_reason === "paid");

    return NextResponse.json({ paid });
  } catch (error) {
    console.error("Razorpay QR status fetch failed", error);
    return NextResponse.json(
      { error: "Unable to fetch payment status" },
      { status: 500 },
    );
  }
}