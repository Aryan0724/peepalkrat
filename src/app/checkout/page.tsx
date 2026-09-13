"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  Truck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Building2,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, shippingFee, total, clearCart, appliedCoupon } = useCart();
  const { format, currency } = useCurrency();

  // Form State
  const [formData, setFormData] = useState({
    name: "Vikram Singhania",
    email: "vikram.s@example.com",
    phone: "+91 98112 34567",
    line1: "Flat 802, Magnolia Towers, Golf Course Road",
    line2: "Sector 54",
    city: "Gurugram",
    state: "Haryana",
    postalCode: "122002",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState<"SIMULATED" | "RAZORPAY" | "STRIPE" | "COD">("SIMULATED");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF8F5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-sm border border-stone-200 text-center space-y-4 shadow-card">
          <h2 className="font-serif text-2xl text-charcoal">No Items in Checkout</h2>
          <p className="text-xs text-stone-500">Your shopping bag is currently empty.</p>
          <Link href="/shop">
            <Button variant="editorial">Return to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
          shippingAddress: {
            line1: formData.line1,
            line2: formData.line2,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country,
          },
          paymentMethod,
          couponCode: appliedCoupon?.code,
          currency,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to process order.");
      }

      // Clear cart on successful order creation
      clearCart();

      // Navigate to order confirmation page
      router.push(`/order-success/${data.orderNumber}`);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred during checkout.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Checkout Minimal Header */}
      <div className="bg-white border-b border-stone-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-block">
            <span className="font-serif text-2xl font-semibold tracking-wider text-charcoal">
              PEEPALKRAT
            </span>
          </Link>
          <div className="flex items-center space-x-2 text-xs text-stone-500">
            <Lock className="w-3.5 h-3.5 text-peepal-700" />
            <span>256-Bit Encrypted Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-6">
          <Link
            href="/cart"
            className="inline-flex items-center text-xs text-stone-500 hover:text-charcoal transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Return to Shopping Bag</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Checkout Form (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmitOrder} className="space-y-8">
              {/* Step 1: Patron Contact */}
              <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <h2 className="font-serif text-lg font-medium text-charcoal">
                    1. Contact Information
                  </h2>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                    Step 1 of 3
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-stone-300 rounded-sm bg-white focus:outline-none focus:border-terracotta-500"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-stone-300 rounded-sm bg-white focus:outline-none focus:border-terracotta-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 mb-1 font-medium">Phone Number (for Courier & Tracking updates)</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-stone-300 rounded-sm bg-white focus:outline-none focus:border-terracotta-500"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Destination */}
              <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <h2 className="font-serif text-lg font-medium text-charcoal">
                    2. Delivery Address
                  </h2>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                    Step 2 of 3
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 mb-1 font-medium">Country / Region</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-stone-300 rounded-sm bg-white focus:outline-none focus:border-terracotta-500"
                    >
                      <option value="India">India (Complimentary on orders &gt; ₹2000)</option>
                      <option value="United States">United States (DHL Express International)</option>
                      <option value="United Kingdom">United Kingdom (DHL Express International)</option>
                      <option value="Germany">Germany / EU (DHL Express International)</option>
                      <option value="Australia">Australia (DHL Express International)</option>
                      <option value="Singapore">Singapore (DHL Express International)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 mb-1 font-medium">Street Address / Apartment / Suite</label>
                    <input
                      type="text"
                      name="line1"
                      required
                      value={formData.line1}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-stone-300 rounded-sm bg-white focus:outline-none focus:border-terracotta-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 mb-1 font-medium">Sector / Colony / Landmark (Optional)</label>
                    <input
                      type="text"
                      name="line2"
                      value={formData.line2}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-stone-300 rounded-sm bg-white focus:outline-none focus:border-terracotta-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-stone-300 rounded-sm bg-white focus:outline-none focus:border-terracotta-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">State / Province</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-stone-300 rounded-sm bg-white focus:outline-none focus:border-terracotta-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">PIN / Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-stone-300 rounded-sm bg-white focus:outline-none focus:border-terracotta-500"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <h2 className="font-serif text-lg font-medium text-charcoal">
                    3. Payment Method
                  </h2>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                    Step 3 of 3
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Simulated Gateway */}
                  <label
                    className={`flex items-start p-4 border rounded-sm cursor-pointer transition-all ${
                      paymentMethod === "SIMULATED"
                        ? "border-terracotta-600 bg-sandstone/30 ring-1 ring-terracotta-600"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="SIMULATED"
                      checked={paymentMethod === "SIMULATED"}
                      onChange={() => setPaymentMethod("SIMULATED")}
                      className="mt-1 text-terracotta-600 focus:ring-terracotta-500"
                    />
                    <div className="ml-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold text-charcoal">
                          PeepalKrat Instant Test Gateway (Zero Friction Verification)
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-medium">
                          Active Demo
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Simulates instant successful bank debit and generates live tracked order receipt without requiring actual credit card charges.
                      </p>
                    </div>
                  </label>

                  {/* Razorpay / UPI */}
                  <label
                    className={`flex items-start p-4 border rounded-sm cursor-pointer transition-all ${
                      paymentMethod === "RAZORPAY"
                        ? "border-terracotta-600 bg-sandstone/30 ring-1 ring-terracotta-600"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="RAZORPAY"
                      checked={paymentMethod === "RAZORPAY"}
                      onChange={() => setPaymentMethod("RAZORPAY")}
                      className="mt-1 text-terracotta-600 focus:ring-terracotta-500"
                    />
                    <div className="ml-3">
                      <span className="text-xs font-semibold text-charcoal">
                        Razorpay • UPI (GPay, PhonePe, Paytm) / NetBanking / Indian Cards
                      </span>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Seamless Indian checkout with zero convenience fees.
                      </p>
                    </div>
                  </label>

                  {/* International Stripe */}
                  <label
                    className={`flex items-start p-4 border rounded-sm cursor-pointer transition-all ${
                      paymentMethod === "STRIPE"
                        ? "border-terracotta-600 bg-sandstone/30 ring-1 ring-terracotta-600"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="STRIPE"
                      checked={paymentMethod === "STRIPE"}
                      onChange={() => setPaymentMethod("STRIPE")}
                      className="mt-1 text-terracotta-600 focus:ring-terracotta-500"
                    />
                    <div className="ml-3">
                      <span className="text-xs font-semibold text-charcoal">
                        Stripe Global • International Visa, MasterCard, Amex (USD / EUR / GBP)
                      </span>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Automatic currency conversion with 3D Secure fraud shielding.
                      </p>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`flex items-start p-4 border rounded-sm cursor-pointer transition-all ${
                      paymentMethod === "COD"
                        ? "border-terracotta-600 bg-sandstone/30 ring-1 ring-terracotta-600"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                      className="mt-1 text-terracotta-600 focus:ring-terracotta-500"
                    />
                    <div className="ml-3">
                      <span className="text-xs font-semibold text-charcoal">
                        Cash on Delivery (Available in India)
                      </span>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Pay cash upon parcel delivery at your doorstep.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="editorial"
                size="lg"
                disabled={isSubmitting}
                className="w-full h-14 text-sm font-semibold tracking-widest uppercase shadow-md flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Securing Your Order...</span>
                ) : (
                  <>
                    <span>Place Order & Authorize {format(total)}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-stone-200 rounded-sm p-6 shadow-card space-y-6 sticky top-24">
              <h3 className="font-serif text-lg font-medium text-charcoal border-b border-stone-100 pb-3">
                Order Review ({items.reduce((s, i) => s + i.quantity, 0)} Items)
              </h3>

              {/* Items List */}
              <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto pr-2 no-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center space-x-3 text-xs">
                    <div className="relative w-14 h-16 bg-stone-100 rounded-xs overflow-hidden shrink-0 border border-stone-200">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-charcoal truncate">{item.name}</h4>
                      {item.makerName && (
                        <p className="text-[11px] text-terracotta-700">By {item.makerName}</p>
                      )}
                      <p className="text-stone-400 text-[11px]">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-charcoal">
                      {format(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing Totals */}
              <div className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-charcoal">{format(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-{format(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-medium text-charcoal">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    ) : (
                      format(shippingFee)
                    )}
                  </span>
                </div>
                <div className="border-t border-stone-200 pt-3 flex justify-between text-lg font-serif font-semibold text-charcoal">
                  <span>Total Amount</span>
                  <span className="text-terracotta-700">{format(total)}</span>
                </div>
              </div>

              {/* Impact Callout */}
              <div className="bg-sandstone/50 p-4 rounded-sm border border-stone-200 text-xs text-stone-700 space-y-1">
                <div className="flex items-center space-x-1.5 text-peepal-700 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Artisan Living Wage Guaranteed</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Your purchase transfers capital directly to the women artisans of Haryana, upholding fair compensation and clean working studios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
