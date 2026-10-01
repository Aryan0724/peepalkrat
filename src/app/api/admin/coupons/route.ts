import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, coupons });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, description, discountType, discountValue, minOrderValue, maxDiscount } = body;

    if (!code || !discountValue) {
      return NextResponse.json(
        { success: false, message: "Code and discount value are required" },
        { status: 400 }
      );
    }

    const coupon = await prisma.coupon.create({
      data: {
        code: code.trim().toUpperCase(),
        description: description || null,
        discountType: discountType || "PERCENTAGE",
        discountValue: Number(discountValue),
        minOrderValue: minOrderValue ? Number(minOrderValue) : 0,
        maxDiscount: maxDiscount ? Number(maxDiscount) : null,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, coupon });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, isActive } = await req.json();
    const updated = await prisma.coupon.update({
      where: { id },
      data: { isActive },
    });
    return NextResponse.json({ success: true, coupon: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
