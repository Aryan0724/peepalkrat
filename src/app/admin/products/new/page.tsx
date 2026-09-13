import React from "react";
import { prisma } from "@/lib/db";
import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default async function AdminNewProductPage() {
  const [categories, collections, makers] = await Promise.all([
    prisma.category.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
    prisma.collection.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
    prisma.maker.findMany({
      select: { id: true, name: true, villageDistrict: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <ProductForm
      categories={categories}
      collections={collections}
      makers={makers}
    />
  );
}
