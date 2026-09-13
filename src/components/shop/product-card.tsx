"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: {
    id: string;
    sku: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number | null;
    category?: { name: string; slug: string } | null;
    maker?: { name: string; slug: string; villageDistrict: string } | null;
    images: { url: string; altText?: string | null; isPrimary: boolean }[];
    inventory: number;
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

  const isLowStock =
    product.inventory > 0 &&
    product.inventory <= (product.lowStockThreshold || 3);

  const isOutOfStock = product.inventory <= 0;

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
    <div className="group relative flex flex-col bg-white rounded-sm overflow-hidden border border-stone-200/80 hover:border-stone-400/80 transition-all duration-300 hover:shadow-card">
      {/* Product Image Frame */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-stone-100"
      >
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-500 group-hover:scale-105 group-hover:opacity-0 ${
            hoverImage !== primaryImage ? "" : "group-hover:opacity-100"
          }`}
        />
        {hoverImage !== primaryImage && (
          <Image
            src={hoverImage}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-105"
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discountPercent && (
            <Badge variant="terracotta" className="text-[10px] font-bold">
              {discountPercent}% OFF
            </Badge>
          )}
          {isLowStock && (
            <Badge variant="mustard" className="text-[9px]">
              Only {product.inventory} left
            </Badge>
          )}
          {isOutOfStock && (
            <span className="bg-stone-900 text-white text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs transition-all duration-200 hover:scale-110 z-10 shadow-xs ${
            isWishlisted ? "text-terracotta-600" : "text-stone-400 hover:text-charcoal"
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center justify-center space-x-1.5 ${
              isAdded
                ? "bg-peepal-700 text-white"
                : isOutOfStock
                ? "bg-stone-300 text-stone-600 cursor-not-allowed"
                : "bg-charcoal hover:bg-terracotta-700 text-white"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : isOutOfStock ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Card Content & Details */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-2.5">
        <div>
          {/* Maker & Location attribution */}
          {product.maker && (
            <Link
              href={`/makers/${product.maker.slug}`}
              className="text-[11px] text-terracotta-700 hover:text-terracotta-900 font-medium block truncate tracking-wide"
            >
              Crafted by {product.maker.name} • {product.maker.villageDistrict}
            </Link>
          )}

          {/* Product Name */}
          <h3 className="font-serif text-sm font-medium text-charcoal line-clamp-1 mt-1 group-hover:text-terracotta-700 transition-colors">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Category */}
          {product.category && (
            <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
              {product.category.name}
            </p>
          )}
        </div>

        {/* Price Row */}
        <div className="pt-1 flex items-baseline justify-between border-t border-stone-100">
          <div className="flex items-baseline space-x-2">
            <span className="text-sm font-semibold text-charcoal">
              {format(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-stone-400 line-through">
                {format(product.compareAtPrice)}
              </span>
            )}
          </div>

          <span className="text-[10px] text-stone-400 tracking-wider uppercase font-medium">
            Heirloom
          </span>
        </div>
      </div>
    </div>
  );
}
