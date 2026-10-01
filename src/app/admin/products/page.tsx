import React from "react";
import { prisma } from "@/lib/db";
import { ProductListClient } from "@/components/admin/product-list-client";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: {
        category: true,
        maker: true,
        images: { where: { isPrimary: true } },
        recommendations: { select: { id: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return <ProductListClient initialProducts={products as any} categories={categories} />;
}
