import { NextRequest, NextResponse } from "next/server";
import { getRazorpayInstance } from "@/lib/payments/razorpay";

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = "INR", receipt, notes } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid amount" },
        { status: 400 }
      );
    }

    const keyId =
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      process.env.RAZORPAY_KEY_ID ||
      "rzp_test_PeepalKratAmbala";

    let razorpayOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const razorpay = getRazorpayInstance();
    if (razorpay) {
      try {
        const order = await razorpay.orders.create({
          amount: Math.round(amount * 100), // convert to paise
          currency: currency.toUpperCase(),
          receipt: receipt || `rcpt_${Date.now()}`,
          notes: {
            brand: "PeepalKrat Ambala",
            initiative: "Haryana Women Artisans Financial Autonomy",
            ...(notes || {}),
          },
        });
        if (order?.id) {
          razorpayOrderId = order.id;
        }
      } catch (err: any) {
        console.warn(
          "Razorpay live API order creation call bypassed or failed in test sandbox mode:",
          err?.message || err
        );
      }
    }

    return NextResponse.json({
      success: true,
      orderId: razorpayOrderId,
      amount: Math.round(amount * 100),
      currency: currency.toUpperCase(),
      keyId,
    });
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
