"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    discount,
    shippingFee,
    freeShippingThreshold,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const { format } = useCurrency();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  if (!isOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");
    if (!couponInput) return;

    setIsApplying(true);
    const res = await applyCoupon(couponInput);
    setIsApplying(false);

    if (res.success) {
      setCouponSuccess(res.message);
      setCouponInput("");
    } else {
      setCouponError(res.message);
    }
  };

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-up">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-sandstone/40">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-5 h-5 text-terracotta-600" />
              <h2 className="text-lg font-serif font-medium tracking-tight text-charcoal">Your Cart</h2>
              <span className="text-xs bg-stone-200 text-charcoal px-2 py-0.5 rounded-full font-medium">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-stone-400 hover:text-charcoal transition-colors rounded-sm hover:bg-stone-100"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping threshold notice */}
          <div className="px-6 py-3 bg-terracotta-50/70 border-b border-terracotta-100/70 text-xs">
            {amountToFreeShipping === 0 ? (
              <div className="flex items-center text-peepal-700 font-medium">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-peepal-700 shrink-0" />
                <span>You qualify for complimentary pan-India express shipping!</span>
              </div>
            ) : (
              <div>
                <p className="text-stone-700 mb-1.5">
                  Add <span className="font-semibold text-terracotta-700">{format(amountToFreeShipping)}</span> more to unlock complimentary shipping.
                </p>
                <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-terracotta-600 h-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-stone-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4 text-stone-400">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="font-serif text-lg font-medium text-stone-800">Your bag is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mt-1 mb-6">
                  Discover heirloom crafts, handloom weaves, and earthen pottery made with dignity by Haryana artisans.
                </p>
                <Button onClick={closeCart} variant="editorial">
                  <Link href="/shop">Explore the Collection</Link>
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex space-x-4">
                  <div className="relative w-20 h-24 bg-stone-100 shrink-0 rounded-sm overflow-hidden border border-stone-200">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="font-medium text-sm text-charcoal hover:text-terracotta-600 line-clamp-1 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-stone-300 hover:text-red-600 p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {item.makerName && (
                        <p className="text-xs text-terracotta-700 italic mt-0.5">
                          By {item.makerName}
                        </p>
                      )}
                      {item.variantName && (
                        <p className="text-xs text-stone-500 mt-0.5">
                          {item.variantName}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-200 rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-stone-500 hover:text-charcoal hover:bg-stone-50 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-medium text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-stone-500 hover:text-charcoal hover:bg-stone-50 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="text-sm font-medium text-charcoal">
                        {format(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="border-t border-stone-200 p-6 bg-sandstone/20 space-y-4">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-sm text-xs text-emerald-800">
                  <div className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      Coupon <strong className="font-semibold">{appliedCoupon.code}</strong> applied
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-700 underline hover:text-emerald-900 ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-3.5 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. WELCOME10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-terracotta-500 uppercase tracking-wider"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="secondary"
                      size="sm"
                      disabled={isApplying}
                      className="px-4 text-xs"
                    >
                      {isApplying ? "..." : "Apply"}
                    </Button>
                  </div>
                  {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
                  {couponSuccess && <p className="text-[11px] text-emerald-600">{couponSuccess}</p>}
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-charcoal">{format(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span>-{format(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-charcoal">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    ) : (
                      format(shippingFee)
                    )}
                  </span>
                </div>
                <div className="border-t border-stone-200 pt-2 flex justify-between text-sm font-semibold text-charcoal">
                  <span>Estimated Total</span>
                  <span className="text-base font-serif text-terracotta-700">{format(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <Link href="/checkout" onClick={closeCart} className="block w-full">
                  <Button variant="editorial" className="w-full h-12 flex items-center justify-center space-x-2">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <div className="text-center">
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="text-xs text-stone-500 hover:text-charcoal underline underline-offset-4"
                  >
                    View detailed shopping bag
                  </Link>
                </div>
              </div>

              <p className="text-[10px] text-center text-stone-400">
                100% Secure Checkout • Plastic-Free Packaging • Direct Artisan Benefit
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
