"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: {
    id: string;
    sku?: string;
    name: string;
    slug: string;
    price: number;
    currency?: string;
    compareAtPrice?: number | null;
    category?: { name: string; slug?: string } | null;
    maker?: { name: string; slug?: string; villageDistrict?: string } | null;
    images: { url: string; altText?: string | null; isPrimary?: boolean }[];
    inventory?: number;
    lowStockThreshold?: number;
    shortDescription?: string | null;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { format } = useCurrency();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const primaryImage =
    product.images.find((i) => i.isPrimary)?.url ||
    product.images[0]?.url ||
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80";

  const hoverImage =
    product.images.length > 1
      ? product.images[1]?.url
      : primaryImage;

  const inventory = product.inventory || 10; // Default if undefined
  const isLowStock = inventory > 0 && inventory <= (product.lowStockThreshold || 3);
  const isOutOfStock = inventory <= 0;

  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      compareAtPrice: product.compareAtPrice || undefined,
      quantity: 1,
      imageUrl: primaryImage,
      makerName: product.maker?.name,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group relative flex flex-col bg-transparent">
      {/* Product Image Frame */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-[#9D9167] mb-4"
      >
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {discountPercent && (
            <Badge className="bg-[#743014] hover:bg-[#743014] text-white text-[10px] font-sans font-medium rounded-none border-none uppercase px-2 py-0.5">
              -{discountPercent}%
            </Badge>
          )}
          {isOutOfStock ? (
            <Badge className="bg-[#442D1C]/80 hover:bg-[#442D1C]/80 text-white text-[10px] font-sans font-medium rounded-none border-none uppercase px-2 py-0.5 backdrop-blur-sm">
              Sold Out
            </Badge>
          ) : isLowStock ? (
            <Badge className="bg-[#743014]/90 hover:bg-[#743014]/90 text-white text-[10px] font-sans font-medium rounded-none border-none uppercase px-2 py-0.5 backdrop-blur-sm">
              Only {inventory} Left
            </Badge>
          ) : null}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/60 hover:bg-white backdrop-blur-md transition-colors z-10"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? "fill-[#743014] text-[#743014]" : "text-[#442D1C]"
            }`}
          />
        </button>

        {/* Quick Add Overlay */}
        {!isOutOfStock && (
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
            <button
              onClick={handleQuickAdd}
              disabled={isAdded}
              className={`w-full py-2.5 px-4 text-xs font-sans font-medium uppercase tracking-wider transition-colors flex items-center justify-center ${
                isAdded
                  ? "bg-[#442D1C] text-white"
                  : "bg-white/95 hover:bg-white text-[#442D1C] shadow-sm backdrop-blur-md"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-2" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 mr-2" /> Quick Add
                </>
              )}
            </button>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="flex flex-col flex-1 px-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            {product.maker && (
              <p className="text-[10px] text-[#888] font-sans uppercase tracking-widest mb-1">
                {product.maker.name}
              </p>
            )}
            <Link href={`/products/${product.slug}`} className="group-hover:text-[#743014] transition-colors">
              <h3 className="font-sans text-[13px] text-[#442D1C] leading-snug line-clamp-2">
                {product.name}
              </h3>
            </Link>
          </div>
          
          <div className="text-right flex-shrink-0">
            <div className="font-display text-[15px] text-[#442D1C]">
              {format(product.price)}
            </div>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <div className="font-sans text-[11px] text-[#888] line-through">
                {format(product.compareAtPrice)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
