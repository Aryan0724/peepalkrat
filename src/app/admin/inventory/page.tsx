import React from "react";
import { prisma } from "@/lib/db";
import { InventoryTableClient } from "@/components/admin/inventory-table-client";

export const dynamic = "force-dynamic";

export default async function AdminInventoryPage() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      sku: true,
      price: true,
      inventory: true,
      lowStockThreshold: true,
      category: { select: { name: true } },
      maker: { select: { name: true } },
      images: { select: { url: true }, take: 1 },
    },
    orderBy: { inventory: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-stone-200">
        <h1 className="font-serif text-2xl text-charcoal font-normal">
          Live Inventory & Workshop Stock
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Adjust stock levels in real-time as pieces arrive from Haryana village workshops.
        </p>
      </div>

      <InventoryTableClient initialProducts={products as any} />
    </div>
  );
}
