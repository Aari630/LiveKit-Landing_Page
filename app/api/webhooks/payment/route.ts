import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

async function updateOrderStatus(orderId: string, status: "PAID") {
  // Replace this mock with the real database update.
  console.log(`Order ${orderId} updated to ${status}`);
}

function signaturesMatch(expectedSignature: string, receivedSignature: string) {
  const expected = Buffer.from(expectedSignature, "utf8");
  const received = Buffer.from(receivedSignature, "utf8");

  return expected.length === received.length && timingSafeEqual(expected, received);
}

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.WEBHOOK_SECRET ?? "mock-webhook-secret";

    if (!signature) {
      return NextResponse.json({ error: "Missing webhook signature" }, { status: 401 });
    }

    const rawBody = await req.text();
    const expectedSignature = createHmac("sha256", webhookSecret)
      .update(rawBody, "utf8")
      .digest("hex");

    if (!signaturesMatch(expectedSignature, signature)) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    const payload: unknown = JSON.parse(rawBody);

    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
    }

    const { order_id: orderId, payment_status: paymentStatus } = payload as {
      order_id?: unknown;
      payment_status?: unknown;
    };

    if (typeof orderId !== "string" || !orderId || typeof paymentStatus !== "string") {
      return NextResponse.json({ error: "Missing order_id or payment_status" }, { status: 400 });
    }

    if (paymentStatus.toUpperCase() !== "SUCCESS") {
      return NextResponse.json({ error: "Payment was not successful" }, { status: 400 });
    }

    await updateOrderStatus(orderId, "PAID");

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Payment webhook failed", error);
    return NextResponse.json({ error: "Invalid webhook request" }, { status: 400 });
  }
}
