"use client";

import React, { useState } from "react";
import { Plus, Tag, Check, X } from "lucide-react";
import { formatPrice } from "@/lib/currency";
import { Button } from "@/components/ui/button";

interface CouponItem {
  id: string;
  code: string;
  description?: string | null;
  discountType: string;
  discountValue: number;
  minOrderValue: number;
  usageCount: number;
  isActive: boolean;
}

export function CouponManagerClient({ initialCoupons }: { initialCoupons: CouponItem[] }) {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState("PERCENTAGE");
  const [discountValue, setDiscountValue] = useState("");
  const [minOrderValue, setMinOrderValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !discountValue) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          description,
          discountType,
          discountValue,
          minOrderValue,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCoupons([data.coupon, ...coupons]);
        setCode("");
        setDescription("");
        setDiscountValue("");
        setMinOrderValue("");
        setShowForm(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggle = async (coupon: CouponItem) => {
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: coupon.id, isActive: !coupon.isActive }),
      });
      if (res.ok) {
        setCoupons(
          coupons.map((c) => (c.id === coupon.id ? { ...c, isActive: !c.isActive } : c))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? "outline" : "editorial"}
          size="sm"
          className="text-xs"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          <span>{showForm ? "Close Form" : "Create Promotional Coupon"}</span>
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4 text-xs">
          <h3 className="font-serif text-base font-medium text-charcoal">New Promotional Code</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-stone-600 mb-1 font-semibold">Code *</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. FESTIVE20"
                className="w-full p-2.5 border border-stone-300 rounded-sm bg-white uppercase font-mono"
              />
            </div>
            <div>
              <label className="block text-stone-600 mb-1 font-semibold">Discount Type</label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
              >
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="FIXED">Fixed Amount (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-600 mb-1 font-semibold">Discount Value *</label>
              <input
                type="number"
                required
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder={discountType === "PERCENTAGE" ? "e.g. 15 (for 15%)" : "e.g. 500 (for ₹500)"}
                className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
              />
            </div>
            <div>
              <label className="block text-stone-600 mb-1 font-semibold">Minimum Order Value (₹)</label>
              <input
                type="number"
                value={minOrderValue}
                onChange={(e) => setMinOrderValue(e.target.value)}
                placeholder="e.g. 2500"
                className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-stone-600 mb-1 font-semibold">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. 15% off on all festive orders above ₹2,500"
                className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
              />
            </div>
          </div>
          <Button type="submit" variant="editorial" size="sm" disabled={isSubmitting}>
            {isSubmitting ? "Generating..." : "Save Coupon"}
          </Button>
        </form>
      )}

      <div className="bg-white border border-stone-200 rounded-sm shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-sandstone/40 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Coupon Code</th>
              <th className="py-3 px-4">Discount</th>
              <th className="py-3 px-4">Min Order</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Redemptions</th>
              <th className="py-3 px-4 text-right">Status / Toggle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-sandstone/20 transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-charcoal">{c.code}</td>
                <td className="py-3.5 px-4 font-semibold text-terracotta-700">
                  {c.discountType === "PERCENTAGE" ? `${c.discountValue}%` : `₹${c.discountValue}`}
                </td>
                <td className="py-3.5 px-4 text-stone-600">{formatPrice(c.minOrderValue, "INR")}</td>
                <td className="py-3.5 px-4 text-stone-600">{c.description || "—"}</td>
                <td className="py-3.5 px-4 font-medium text-charcoal">{c.usageCount} times</td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => handleToggle(c)}
                    className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                      c.isActive ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {c.isActive ? "Active (Enabled)" : "Disabled"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
