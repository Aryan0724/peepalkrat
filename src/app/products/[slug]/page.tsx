import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { prisma } from "@/lib/db";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductDetailsClient } from "@/components/product/product-details-client";
import { ProductCard } from "@/components/shop/product-card";

import { ProductBundleBox } from "@/components/product/product-bundle-box";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { maker: true, images: true },
  });

  if (!product) return { title: "Product Not Found | PeepalKrat" };

  return {
    title: `${product.name} | PeepalKrat Haryana Heritage`,
    description:
      product.shortDescription ||
      `Handcrafted by ${product.maker?.name || "artisans in Haryana"}. Direct social commerce for women makers.`,
    openGraph: {
      title: `${product.name} | PeepalKrat`,
      description: product.shortDescription || undefined,
      images: product.images?.[0] ? [{ url: (product.images as any)[0].url }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      collection: true,
      maker: true,
      images: { orderBy: { order: "asc" } },
      variants: { orderBy: { price: "asc" } },
      reviews: {
        where: { isApproved: true },
        orderBy: { createdAt: "desc" },
      },
      recommendations: {
        include: {
          recommendedProduct: {
            include: {
              category: true,
              maker: true,
              images: { orderBy: { order: "asc" } },
            },
          },
        },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!product || !product.isPublished) {
    notFound();
  }

  // Format curated recommendations for bundle box
  const bundleRecommendations = (product.recommendations || [])
    .filter((r) => r.recommendedProduct && r.recommendedProduct.isPublished)
    .map((r) => ({
      id: r.recommendedProduct.id,
      name: r.recommendedProduct.name,
      slug: r.recommendedProduct.slug,
      price: r.recommendedProduct.price,
      compareAtPrice: r.recommendedProduct.compareAtPrice,
      imageUrl:
        r.recommendedProduct.images[0]?.url ||
        "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80",
      makerName: r.recommendedProduct.maker?.name,
      note: r.note,
    }));

  // Curated companion products to show in showcase
  const curatedProducts = (product.recommendations || [])
    .filter((r) => r.recommendedProduct && r.recommendedProduct.isPublished)
    .map((r) => r.recommendedProduct);

  // Fallback related products if no recommendations or fewer than 4
  const fallbackRelated = await prisma.product.findMany({
    where: {
      id: { notIn: [product.id, ...curatedProducts.map((p) => p.id)] },
      isPublished: true,
      OR: [
        { categoryId: product.categoryId },
        { makerId: product.makerId || undefined },
      ],
    },
    include: {
      category: true,
      maker: true,
      images: { orderBy: { order: "asc" } },
    },
    take: Math.max(0, 4 - curatedProducts.length),
  });

  const displayRelatedProducts = [...curatedProducts, ...fallbackRelated].slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-b border-stone-200/70 text-xs text-stone-500">
        <nav className="flex items-center space-x-2">
          <Link href="/" className="hover:text-charcoal transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <Link href="/shop" className="hover:text-charcoal transition-colors">
            Catalog
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <Link
            href={`/categories/${product.category.slug}`}
            className="hover:text-charcoal transition-colors"
          >
            {product.category.name}
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-charcoal font-medium truncate max-w-xs">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Gallery (7 cols) */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Details & Purchasing (5 cols) */}
          <div className="lg:col-span-5">
            <ProductDetailsClient product={product as any} />
          </div>
        </div>

        {/* Frequently Bought Together Bundle Box (Admin Curated Recommendations) */}
        {bundleRecommendations.length > 0 && (
          <ProductBundleBox
            currentProduct={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              compareAtPrice: product.compareAtPrice,
              imageUrl:
                product.images[0]?.url ||
                "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80",
              makerName: product.maker?.name,
            }}
            recommendations={bundleRecommendations}
          />
        )}
      </div>

      {/* Recommended & Related Products Section */}
      {displayRelatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 border-t border-stone-200">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-terracotta-700 font-semibold block mb-1">
                {curatedProducts.length > 0
                  ? "Curated Pairings & Recommendations"
                  : "You May Also Cherish"}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                {curatedProducts.length > 0
                  ? "Handcrafted Companion Pieces"
                  : "Related Handcrafted Pieces"}
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-wider font-semibold text-charcoal hover:text-terracotta-700 transition-colors"
            >
              Browse All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayRelatedProducts.map((p) => (
              <ProductCard key={p.id} product={p as any} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
