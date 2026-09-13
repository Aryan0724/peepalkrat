"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Check, AlertTriangle } from "lucide-react";
import { formatPrice } from "@/lib/currency";

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  inventory: number;
  lowStockThreshold: number;
  category: { name: string } | null;
  maker: { name: string } | null;
  images: { url: string }[];
}

export function InventoryTableClient({ initialProducts }: { initialProducts: InventoryItem[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStockAdjust = async (productId: string, newInventory: number) => {
    if (newInventory < 0) return;
    setUpdatingId(productId);

    try {
      const res = await fetch("/api/admin/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, inventory: newInventory }),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === productId ? { ...p, inventory: newInventory } : p))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="bg-white border border-stone-200 rounded-sm shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-sandstone/40 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3.5 px-4">Item</th>
              <th className="py-3.5 px-4">SKU</th>
              <th className="py-3.5 px-4">Discipline</th>
              <th className="py-3.5 px-4">Artisan</th>
              <th className="py-3.5 px-4">Retail Price</th>
              <th className="py-3.5 px-4">Stock Status</th>
              <th className="py-3.5 px-4 text-right">Quick Stock Adjustment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {products.map((p) => {
              const img = p.images[0]?.url || "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=150&q=80";
              const isLow = p.inventory <= p.lowStockThreshold;

              return (
                <tr key={p.id} className="hover:bg-sandstone/20 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-12 rounded-xs overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <Image src={img} alt={p.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <span className="font-medium text-charcoal line-clamp-1 max-w-xs">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-stone-600">{p.sku}</td>
                  <td className="py-3 px-4 text-stone-600">{p.category?.name || "—"}</td>
                  <td className="py-3 px-4 text-terracotta-700">{p.maker?.name || "—"}</td>
                  <td className="py-3 px-4 font-serif font-medium text-charcoal">{formatPrice(p.price, "INR")}</td>
                  <td className="py-3 px-4">
                    {p.inventory === 0 ? (
                      <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                        Sold Out (0)
                      </span>
                    ) : isLow ? (
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold text-[10px] flex items-center space-x-1 w-fit">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        <span>Low Stock ({p.inventory})</span>
                      </span>
                    ) : (
                      <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                        In Stock ({p.inventory})
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center border border-stone-300 rounded-sm bg-white">
                      <button
                        onClick={() => handleStockAdjust(p.id, p.inventory - 1)}
                        disabled={p.inventory <= 0 || updatingId === p.id}
                        className="px-2.5 py-1 text-stone-500 hover:text-charcoal hover:bg-stone-50 disabled:opacity-30"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 font-semibold text-charcoal min-w-[2rem] text-center">
                        {p.inventory}
                      </span>
                      <button
                        onClick={() => handleStockAdjust(p.id, p.inventory + 1)}
                        disabled={updatingId === p.id}
                        className="px-2.5 py-1 text-stone-500 hover:text-charcoal hover:bg-stone-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
