import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/shop/product-card";

interface CollectionPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const collection = await prisma.collection.findUnique({
    where: { slug: params.slug },
  });
  if (!collection) return { title: "Collection Not Found | PeepalKrat" };
  return {
    title: `${collection.name} | PeepalKrat Curated Series`,
    description: collection.description || `Curated collection of handcrafted pieces from Haryana.`,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const collection = await prisma.collection.findUnique({
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

  if (!collection) notFound();

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Collection Hero Header */}
      <div className="relative bg-charcoal text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
        {(collection.bannerImage || collection.image) && (
          <div className="absolute inset-0 z-0 opacity-30">
            <Image
              src={collection.bannerImage || collection.image || ""}
              alt={collection.name}
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
            <span>Back to All Collections</span>
          </Link>
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta-300 font-semibold block">
            Curated Series
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="text-sm sm:text-base text-stone-200 max-w-2xl mx-auto font-light leading-relaxed">
              {collection.description}
            </p>
          )}
        </div>
      </div>

      {/* Collection Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="flex justify-between items-center pb-6 mb-8 border-b border-stone-200">
          <p className="text-xs text-stone-500 uppercase tracking-wider">
            Curated selection of {collection.products.length} pieces
          </p>
          <Link href="/shop" className="text-xs font-semibold text-terracotta-700 hover:underline">
            View All Series
          </Link>
        </div>

        {collection.products.length === 0 ? (
          <div className="text-center py-16 bg-white border border-stone-200 rounded-sm">
            <p className="text-stone-500 text-sm">Pieces for this series are being curated.</p>
            <Link href="/shop" className="inline-block mt-4 text-xs font-semibold text-terracotta-700 underline">
              Browse All Available Items
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collection.products.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
