import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/shop/product-card";

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });
  if (!category) return { title: "Category Not Found | PeepalKrat" };
  return {
    title: `${category.name} | PeepalKrat Haryana Heritage`,
    description: category.description || `Handcrafted ${category.name} made by women artisans in Haryana.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      products: {
        where: { isPublished: true },
        include: {
          category: true,
          maker: true,
          images: { orderBy: { order: "asc" } },
        },
      },
    },
  });

  if (!category) notFound();

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Category Banner */}
      <div className="relative bg-charcoal text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
        {category.image && (
          <div className="absolute inset-0 z-0 opacity-25">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <Link
            href="/shop"
            className="inline-flex items-center text-xs uppercase tracking-widest text-stone-300 hover:text-white mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Back to All Products</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
              {category.description}
            </p>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="flex justify-between items-center pb-6 mb-8 border-b border-stone-200">
          <p className="text-xs text-stone-500 uppercase tracking-wider">
            Showing {category.products.length} authenticated pieces
          </p>
          <Link href="/shop" className="text-xs font-semibold text-terracotta-700 hover:underline">
            View All Categories
          </Link>
        </div>

        {category.products.length === 0 ? (
          <div className="text-center py-16 bg-white border border-stone-200 rounded-sm">
            <p className="text-stone-500 text-sm">New artisan pieces are currently on the loom for this category.</p>
            <Link href="/shop" className="inline-block mt-4 text-xs font-semibold text-terracotta-700 underline">
              Browse Other Craft Disciplines
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.products.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
