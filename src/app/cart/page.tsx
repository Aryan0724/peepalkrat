"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
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

  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    setIsApplying(true);
    const res = await applyCoupon(couponCode);
    setIsApplying(false);
    setCouponMessage({ text: res.message, isError: !res.success });
    if (res.success) setCouponCode("");
  };

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF8F5] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center space-y-4 bg-white p-10 rounded-sm border border-stone-200 shadow-card">
          <div className="w-16 h-16 rounded-full bg-sandstone flex items-center justify-center mx-auto text-stone-400">
            <ShoppingBag className="w-8 h-8 stroke-1" />
          </div>
          <h1 className="font-serif text-2xl font-light text-charcoal">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-xs text-stone-500 leading-relaxed max-w-sm mx-auto">
            Discover the living traditions of Haryana. Every purchase directly empowers rural women makers.
          </p>
          <div className="pt-2">
            <Link href="/shop">
              <Button variant="editorial" size="lg" className="w-full">
                Explore the Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-stone-200">
          <div>
            <h1 className="font-serif text-3xl font-light text-charcoal">
              Shopping Bag
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              {items.reduce((s, i) => s + i.quantity, 0)} handcrafted pieces
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-wider text-terracotta-700 hover:text-terracotta-900 font-semibold flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Shipping Progress */}
            <div className="bg-sandstone/50 border border-stone-200 p-4 rounded-sm">
              {amountToFreeShipping === 0 ? (
                <div className="flex items-center text-peepal-700 text-xs font-medium">
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span>You have unlocked complimentary express pan-India delivery!</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-stone-700">
                    Add <span className="font-semibold text-terracotta-700">{format(amountToFreeShipping)}</span> more to unlock complimentary pan-India shipping.
                  </p>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-terracotta-600 h-full transition-all duration-300"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Table of Items */}
            <div className="bg-white border border-stone-200 rounded-sm divide-y divide-stone-100 shadow-xs">
              {items.map((item) => (
                <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-24 bg-stone-100 rounded-sm overflow-hidden shrink-0 border border-stone-200">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-serif text-base text-charcoal hover:text-terracotta-700 transition-colors font-medium line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      {item.makerName && (
                        <p className="text-xs text-terracotta-700 italic">
                          Crafted by {item.makerName}
                        </p>
                      )}
                      {item.variantName && (
                        <p className="text-xs text-stone-500 mt-0.5">
                          {item.variantName}
                        </p>
                      )}
                      <p className="text-xs font-semibold text-charcoal mt-1">
                        {format(item.price)} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity and Line Total */}
                  <div className="flex items-center justify-between w-full sm:w-auto space-x-6">
                    <div className="flex items-center border border-stone-300 rounded-sm bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-stone-500 hover:text-charcoal"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-medium text-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-stone-500 hover:text-charcoal"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="font-serif text-base font-semibold text-charcoal min-w-[5rem] text-right">
                      {format(item.price * item.quantity)}
                    </span>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-stone-300 hover:text-red-600 transition-colors p-1"
                      title="Remove piece"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="text-xs text-stone-400 hover:text-stone-700 underline"
              >
                Clear entire shopping bag
              </button>
            </div>
          </div>

          {/* Order Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-stone-200 rounded-sm p-6 shadow-card space-y-5">
              <h2 className="font-serif text-lg font-medium text-charcoal border-b border-stone-100 pb-3">
                Order Summary
              </h2>

              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-sm text-xs flex items-center justify-between text-emerald-800">
                  <div className="flex items-center space-x-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied</span>
                  </div>
                  <button onClick={removeCoupon} className="text-emerald-700 underline text-xs">
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
                        placeholder="Coupon (e.g. WELCOME10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-sm uppercase tracking-wider"
                      />
                    </div>
                    <Button type="submit" variant="secondary" size="sm" disabled={isApplying}>
                      {isApplying ? "..." : "Apply"}
                    </Button>
                  </div>
                  {couponMessage && (
                    <p className={`text-xs ${couponMessage.isError ? "text-red-600" : "text-emerald-600"}`}>
                      {couponMessage.text}
                    </p>
                  )}
                </form>
              )}

              {/* Cost Lines */}
              <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
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
                <div className="border-t border-stone-200 pt-3 flex justify-between text-base font-serif font-semibold text-charcoal">
                  <span>Estimated Total</span>
                  <span className="text-terracotta-700">{format(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link href="/checkout" className="block w-full">
                <Button variant="editorial" className="w-full h-13 text-xs tracking-widest uppercase font-semibold flex items-center justify-center space-x-2">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>

              <div className="pt-2 text-[11px] text-stone-400 space-y-1 text-center">
                <div className="flex items-center justify-center space-x-1 text-stone-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-peepal-700" />
                  <span>100% Encrypted & Authenticated Commerce</span>
                </div>
                <p>Transparent living wage share direct to Haryana artisans.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
