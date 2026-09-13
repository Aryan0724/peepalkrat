import React from "react";
import { prisma } from "@/lib/db";
import { CouponManagerClient } from "@/components/admin/coupon-manager-client";

export const dynamic = "force-dynamic";

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-stone-200">
        <h1 className="font-serif text-2xl text-charcoal font-normal">
          Coupons & Promotional Rules
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Manage percentage or fixed-amount discount codes for storefront campaigns.
        </p>
      </div>

      <CouponManagerClient initialCoupons={coupons as any} />
    </div>
  );
}
