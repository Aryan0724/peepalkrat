import React, { Suspense } from "react";
import { prisma } from "@/lib/db";
import { ShopCatalogClient } from "@/components/shop/shop-catalog-client";

export const metadata = {
  title: "Shop All Artisan Crafts | PeepalKrat",
  description:
    "Explore authentic handloom textiles, Phulkari embroidery, wild Moonj grass basketry, and burnished terracotta pottery made by women in Haryana.",
};

export const revalidate = 60;

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: { category?: string; collection?: string; q?: string };
}) {
  let products: any[] = [];
  let categories: any[] = [];
  let collections: any[] = [];
  let makers: any[] = [];

  try {
    const [prods, cats, cols, maks] = await Promise.all([
      prisma.product.findMany({
        where: { isPublished: true },
        include: {
          category: true,
          maker: true,
          images: { orderBy: { order: "asc" } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.category.findMany({
        select: { id: true, name: true, slug: true, image: true, badge: true, isFeatured: true, order: true },
        orderBy: [{ isFeatured: "desc" }, { order: "asc" }, { name: "asc" }],
      }),
      prisma.collection.findMany({
        select: { id: true, name: true, slug: true },
        orderBy: { name: "asc" },
      }),
      prisma.maker.findMany({
        select: { id: true, name: true, slug: true },
        orderBy: { name: "asc" },
      }),
    ]);

    products = prods;
    categories = cats;
    collections = cols;
    makers = maks;
  } catch (error) {
    console.warn("Using fallback shop state:", error);
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Suspense fallback={<div className="py-20 text-center text-sm text-stone-500">Loading catalog...</div>}>
        <ShopCatalogClient
          products={products as any}
          categories={categories}
          collections={collections}
          makers={makers}
          initialCategory={searchParams?.category}
          initialCollection={searchParams?.collection}
        />
      </Suspense>
    </div>
  );
}
