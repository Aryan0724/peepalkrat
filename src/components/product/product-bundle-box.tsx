"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, ShoppingBag, Check, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { Button } from "@/components/ui/button";

interface BaseProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  imageUrl: string;
  makerName?: string;
}

interface RecommendedPiece {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  imageUrl: string;
  makerName?: string;
  note?: string | null;
}

interface ProductBundleBoxProps {
  currentProduct: BaseProduct;
  recommendations: RecommendedPiece[];
}

export function ProductBundleBox({ currentProduct, recommendations }: ProductBundleBoxProps) {
  const { addItem, openCart } = useCart();
  const { format } = useCurrency();

  // Selected item IDs (default: current product + first 1-2 recommendations)
  const initialSelected = [currentProduct.id, ...recommendations.slice(0, 2).map((r) => r.id)];
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelected);
  const [isAdded, setIsAdded] = useState(false);

  if (!recommendations || recommendations.length === 0) return null;

  // Combine items for calculations
  const allBundleItems = [
    { ...currentProduct, note: "This Item" },
    ...recommendations.map((r) => ({
      ...r,
      note: r.note || "Curated Companion",
    })),
  ];

  const toggleSelect = (id: string) => {
    // Current product cannot be deselected
    if (id === currentProduct.id) return;
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Calculate total price of selected items
  const totalPrice = allBundleItems
    .filter((item) => selectedIds.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  const selectedCount = selectedIds.length;

  const handleAddBundleToCart = () => {
    const itemsToAdd = allBundleItems.filter((item) => selectedIds.includes(item.id));
    itemsToAdd.forEach((item) => {
      addItem({
        productId: item.id,
        name: item.name,
        slug: item.slug,
        price: item.price,
        compareAtPrice: item.compareAtPrice || undefined,
        quantity: 1,
        imageUrl: item.imageUrl,
        makerName: item.makerName,
      });
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    openCart();
  };

  return (
    <section className="bg-white border border-stone-200 rounded-sm p-6 sm:p-8 shadow-xs my-10 space-y-6">
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-4 gap-2">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-mustard-600" />
          <h3 className="font-serif text-xl text-charcoal font-medium">
            Frequently Bought Together
          </h3>
        </div>
        <span className="text-[11px] uppercase tracking-wider text-terracotta-700 font-semibold bg-sandstone/60 px-2.5 py-1 rounded-xs self-start sm:self-auto">
          Artisan Curated Pairing
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left (8 cols): Interactive Visual Bundle Items */}
        <div className="lg:col-span-8 flex flex-wrap items-center gap-4 sm:gap-6">
          {allBundleItems.map((item, index) => {
            const isCurrent = item.id === currentProduct.id;
            const isChecked = selectedIds.includes(item.id);

            return (
              <React.Fragment key={item.id}>
                {index > 0 && (
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-stone-100 text-stone-500 font-bold text-xs shrink-0">
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`flex flex-col space-y-2 max-w-[135px] cursor-pointer transition-opacity ${
                    isChecked ? "opacity-100" : "opacity-40"
                  }`}
                  onClick={() => toggleSelect(item.id)}
                >
                  <div className="relative aspect-square w-28 sm:w-32 rounded-xs overflow-hidden border border-stone-200 bg-stone-100 group">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="130px"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-charcoal/80 text-white text-[9px] px-1.5 py-0.5 rounded-xs line-clamp-1 max-w-[90%]">
                      {item.note}
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex items-start space-x-1.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={isCurrent}
                        onChange={() => toggleSelect(item.id)}
                        className="mt-0.5 rounded-xs text-terracotta-600 focus:ring-terracotta-500"
                      />
                      <span className="font-medium text-charcoal line-clamp-2 leading-snug">
                        {item.name}
                      </span>
                    </div>
                    <div className="font-serif font-medium text-terracotta-700 pl-4">
                      {format(item.price)}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Right (4 cols): Combined Price & Add Both Button */}
        <div className="lg:col-span-4 bg-sandstone/30 p-5 rounded-xs border border-stone-200/80 space-y-3">
          <div className="space-y-1">
            <span className="text-[11px] text-stone-500 uppercase tracking-wider block">
              Combined Value ({selectedCount} items)
            </span>
            <div className="font-serif text-2xl sm:text-3xl text-charcoal font-medium">
              {format(totalPrice)}
            </div>
            <p className="text-[11px] text-stone-500">
              Directly supporting Haryana women artisans with living wages.
            </p>
          </div>

          <Button
            type="button"
            onClick={handleAddBundleToCart}
            disabled={selectedCount === 0}
            className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-semibold py-3 h-auto rounded-xs shadow-xs transition-colors flex items-center justify-center space-x-2"
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {selectedCount === allBundleItems.length
                    ? "Add Both to Cart"
                    : `Add Selected (${selectedCount}) to Cart`}
                </span>
              </>
            )}
          </Button>

          <p className="text-[10px] text-center text-stone-400">
            Ships together in sustainable Haryana honeycomb paper packaging.
          </p>
        </div>
      </div>
    </section>
  );
}
