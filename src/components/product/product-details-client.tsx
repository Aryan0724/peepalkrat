"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  MapPin,
  Check,
  Star,
  MessageSquare,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductVariant {
  id: string;
  sku?: string | null;
  name: string;
  size?: string | null;
  color?: string | null;
  price?: number | null;
  compareAtPrice?: number | null;
  inventory: number;
}

interface ProductDetailsClientProps {
  product: {
    id: string;
    sku: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number | null;
    inventory: number;
    lowStockThreshold: number;
    material?: string | null;
    dimensions?: string | null;
    weight?: string | null;
    careInstructions?: string | null;
    shippingInfo?: string | null;
    productionLocation?: string | null;
    storySnippet?: string | null;
    impactNotes?: string | null;
    category?: { name: string; slug: string } | null;
    maker?: {
      id: string;
      name: string;
      slug: string;
      title: string;
      photo: string;
      villageDistrict: string;
      craftSkill: string;
      quote?: string | null;
      biography?: string | null;
    } | null;
    images: { url: string; isPrimary: boolean }[];
    variants: ProductVariant[];
    reviews?: {
      id: string;
      customerName: string;
      rating: number;
      title?: string | null;
      comment: string;
      createdAt: Date | string;
    }[];
  };
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { format } = useCurrency();

  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    product.variants.length > 0 ? product.variants[0].id : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Review Form State
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId);
  const activePrice = selectedVariant?.price || product.price;
  const activeComparePrice = selectedVariant?.compareAtPrice || product.compareAtPrice;
  const activeInventory = selectedVariant?.inventory ?? product.inventory;

  const primaryImage =
    product.images.find((i) => i.isPrimary)?.url ||
    product.images[0]?.url ||
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80";

  const discountPercent =
    activeComparePrice && activeComparePrice > activePrice
      ? Math.round(((activeComparePrice - activePrice) / activeComparePrice) * 100)
      : null;

  const isOutOfStock = activeInventory <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem({
      productId: product.id,
      variantId: selectedVariantId,
      name: product.name,
      slug: product.slug,
      price: activePrice,
      compareAtPrice: activeComparePrice || undefined,
      quantity,
      imageUrl: primaryImage,
      makerName: product.maker?.name,
      variantName: selectedVariant?.name,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName && reviewComment) {
      setReviewSubmitted(true);
      setReviewName("");
      setReviewComment("");
    }
  };

  return (
    <div className="space-y-8">
      {/* Category & Maker Eyebrow */}
      <div className="space-y-2">
        {product.maker && (
          <div className="inline-flex items-center space-x-1.5 text-xs font-medium text-terracotta-700 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <Link
              href={`/makers/${product.maker.slug}`}
              className="hover:underline hover:text-terracotta-800"
            >
              Crafted by {product.maker.name}
            </Link>
            <span className="text-stone-300">•</span>
            <span className="text-stone-500">{product.productionLocation || product.maker.villageDistrict}</span>
          </div>
        )}

        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-light leading-tight">
          {product.name}
        </h1>

        <div className="flex items-center space-x-4 text-xs text-stone-500 pt-1">
          <span>SKU: {selectedVariant?.sku || product.sku}</span>
          <span>•</span>
          <span className="text-peepal-700 font-medium">100% Traceable Craft</span>
        </div>
      </div>

      {/* Pricing Row */}
      <div className="flex items-baseline space-x-3 pb-6 border-b border-stone-200">
        <span className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
          {format(activePrice)}
        </span>
        {activeComparePrice && activeComparePrice > activePrice && (
          <span className="text-base text-stone-400 line-through">
            {format(activeComparePrice)}
          </span>
        )}
        {discountPercent && (
          <Badge variant="terracotta" className="text-xs">
            Save {discountPercent}%
          </Badge>
        )}
      </div>

      {/* Short Description */}
      {product.storySnippet && (
        <p className="text-sm text-stone-600 leading-relaxed italic border-l-2 border-terracotta-500 pl-4">
          “{product.storySnippet}”
        </p>
      )}

      {/* Variants Selection (if any) */}
      {product.variants.length > 0 && (
        <div className="space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
            Selection / Edition
          </label>
          <div className="flex flex-wrap gap-2.5">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariantId(v.id)}
                className={`px-3.5 py-2 text-xs rounded-sm border transition-all ${
                  selectedVariantId === v.id
                    ? "border-charcoal bg-charcoal text-white shadow-xs"
                    : "border-stone-300 bg-white text-stone-700 hover:border-stone-400"
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & Actions */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center space-x-4">
          {/* Quantity selector */}
          <div className="flex items-center border border-stone-300 rounded-sm bg-white">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 text-stone-600 hover:text-charcoal transition-colors text-sm"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-3 text-xs font-medium text-charcoal">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 text-stone-600 hover:text-charcoal transition-colors text-sm"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            size="lg"
            className="flex-1 bg-charcoal hover:bg-terracotta-700 text-white tracking-wider uppercase text-xs font-semibold h-12"
          >
            {isAdded ? (
              <span className="flex items-center space-x-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Added to Bag</span>
              </span>
            ) : isOutOfStock ? (
              <span>Out of Stock</span>
            ) : (
              <span className="flex items-center space-x-1.5">
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </span>
            )}
          </Button>

          {/* Wishlist */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-3 border rounded-sm transition-colors ${
              isWishlisted
                ? "border-terracotta-500 text-terracotta-600 bg-terracotta-50"
                : "border-stone-300 text-stone-400 hover:text-charcoal hover:border-stone-400"
            }`}
            aria-label="Wishlist piece"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Buy Now Direct Button */}
        <Button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          variant="editorial"
          size="lg"
          className="w-full h-12"
        >
          Buy Now with 1-Click Checkout
        </Button>
      </div>

      {/* Trust & Provenance Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-6 border-y border-stone-200 text-xs text-stone-600">
        <div className="flex items-center space-x-2.5">
          <Truck className="w-4 h-4 text-terracotta-600 shrink-0" />
          <span>Plastic-Free Pan-India Delivery (3-5 Days)</span>
        </div>
        <div className="flex items-center space-x-2.5">
          <ShieldCheck className="w-4 h-4 text-peepal-700 shrink-0" />
          <span>Signed Artisan Certificate Included</span>
        </div>
        <div className="flex items-center space-x-2.5">
          <RotateCcw className="w-4 h-4 text-stone-600 shrink-0" />
          <span>7-Day Return Guarantee</span>
        </div>
      </div>

      {/* Meet the Maker Card (Section 10 Key Differentiator) */}
      {product.maker && (
        <div className="bg-sandstone/60 p-6 rounded-sm border border-stone-200 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-xs">
              <img
                src={product.maker.photo}
                alt={product.maker.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-terracotta-700 font-semibold block">
                Meet the Maker
              </span>
              <h3 className="font-serif text-lg font-medium text-charcoal">
                {product.maker.name}
              </h3>
              <p className="text-xs text-stone-500 flex items-center mt-0.5">
                <MapPin className="w-3 h-3 mr-1 text-terracotta-600" />
                <span>{product.maker.villageDistrict}</span>
              </p>
            </div>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            {product.maker.biography || product.maker.craftSkill}
          </p>

          <div className="pt-2 border-t border-stone-200/80 flex justify-between items-center text-xs">
            <span className="text-stone-500 font-medium">{product.maker.craftSkill}</span>
            <Link
              href={`/makers/${product.maker.slug}`}
              className="text-terracotta-700 font-semibold hover:underline"
            >
              View Maker Profile →
            </Link>
          </div>
        </div>
      )}

      {/* Deep Story & Impact Accordion / Tabs */}
      <div className="space-y-6 pt-2">
        <div>
          <h3 className="font-serif text-lg font-medium text-charcoal mb-2">
            The Story Behind This Piece
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed whitespace-pre-line">
            {product.material && <strong className="text-charcoal block mb-1">Materials: {product.material}</strong>}
            {product.dimensions && <strong className="text-charcoal block mb-2">Dimensions: {product.dimensions}</strong>}
            {product.careInstructions && (
              <span className="block text-stone-500 mb-2">Care: {product.careInstructions}</span>
            )}
          </p>
        </div>

        {product.impactNotes && (
          <div className="bg-terracotta-50/70 p-5 rounded-sm border border-terracotta-100 text-xs text-stone-700 space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-terracotta-700 font-bold block">
              Your Purchase Impact
            </span>
            <p className="leading-relaxed">{product.impactNotes}</p>
          </div>
        )}
      </div>

      {/* Customer Reviews Section */}
      <div className="pt-8 border-t border-stone-200 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-terracotta-600" />
            <h3 className="font-serif text-lg font-medium text-charcoal">Patron Reviews</h3>
          </div>
          <span className="text-xs text-stone-500">
            {product.reviews?.length || 0} verified reviews
          </span>
        </div>

        {/* Existing Reviews List */}
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((r) => (
              <div key={r.id} className="p-4 bg-white border border-stone-200 rounded-sm text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1 text-amber-500">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-stone-400 text-[11px] font-medium">Verified Patron</span>
                </div>
                {r.title && <h4 className="font-semibold text-charcoal">{r.title}</h4>}
                <p className="text-stone-600 leading-relaxed">{r.comment}</p>
                <div className="text-[11px] text-stone-400 pt-1">
                  — {r.customerName}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-stone-500 italic">No reviews yet. Be the first patron to share your thoughts.</p>
        )}

        {/* Write a Review */}
        <div className="bg-sandstone/30 p-5 rounded-sm border border-stone-200 text-xs">
          <h4 className="font-semibold text-charcoal mb-3">Share Your Experience</h4>
          {reviewSubmitted ? (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-sm">
              Thank you for supporting our artisans! Your review has been submitted for verification.
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <div>
                <label className="block text-stone-600 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-sm bg-white"
                  placeholder="e.g. Meera S."
                />
              </div>
              <div>
                <label className="block text-stone-600 mb-1">Rating</label>
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="p-1.5 border border-stone-300 rounded-sm bg-white"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                  <option value={3}>⭐⭐⭐ (3/5)</option>
                </select>
              </div>
              <div>
                <label className="block text-stone-600 mb-1">Your Thoughts</label>
                <textarea
                  required
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-sm bg-white"
                  placeholder="Describe the texture, craftsmanship, and how it feels in your space..."
                />
              </div>
              <Button type="submit" variant="secondary" size="sm">
                Submit Patron Note
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
