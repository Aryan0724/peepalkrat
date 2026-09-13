import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { OrderDetailClient } from "@/components/admin/order-detail-client";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      items: {
        include: { product: true },
      },
      customer: true,
    },
  });

  if (!order) notFound();

  return <OrderDetailClient order={order} />;
}
