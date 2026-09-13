import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code")?.trim().toUpperCase();
  const subtotal = Number(searchParams.get("subtotal") || 0);

  if (!code) {
    return NextResponse.json({ success: false, message: "Code is required" }, { status: 400 });
  }

  const coupon = await prisma.coupon.findUnique({
    where: { code },
  });

  if (!coupon || !coupon.isActive) {
    return NextResponse.json({ success: false, message: "Invalid or expired coupon code." }, { status: 404 });
  }

  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return NextResponse.json({ success: false, message: "This coupon has expired." }, { status: 400 });
  }

  if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
    return NextResponse.json({ success: false, message: "Coupon usage limit reached." }, { status: 400 });
  }

  if (subtotal < coupon.minOrderValue) {
    return NextResponse.json(
      {
        success: false,
        message: `This coupon requires a minimum order value of ₹${coupon.minOrderValue}.`,
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    coupon: {
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrderValue: coupon.minOrderValue,
      maxDiscount: coupon.maxDiscount,
    },
  });
}
