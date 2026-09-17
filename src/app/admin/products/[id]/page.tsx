import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default async function AdminEditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, categories, collections, makers, allProducts] = await Promise.all([
    prisma.product.findUnique({
      where: { id: params.id },
      include: {
        images: { orderBy: { order: "asc" } },
        variants: true,
        recommendations: {
          include: {
            recommendedProduct: {
              select: {
                id: true,
                name: true,
                sku: true,
                price: true,
                images: { where: { isPrimary: true }, select: { url: true } },
              },
            },
          },
          orderBy: { order: "asc" },
        },
      },
    }),
    prisma.category.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
    prisma.collection.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
    prisma.maker.findMany({
      select: { id: true, name: true, villageDistrict: true },
      orderBy: { name: "asc" },
    }),
    prisma.product.findMany({
      where: { id: { not: params.id } },
      select: {
        id: true,
        name: true,
        sku: true,
        price: true,
        images: { where: { isPrimary: true }, select: { url: true } },
      },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!product) notFound();

  return (
    <ProductForm
      initialProduct={product}
      categories={categories}
      collections={collections}
      makers={makers}
      allProducts={allProducts as any}
    />
  );
}
