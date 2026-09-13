import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, ExternalLink, Package, AlertCircle } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/currency";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      maker: true,
      images: { where: { isPrimary: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-4">
        <div>
          <h1 className="font-serif text-2xl text-charcoal font-normal">
            Product Catalog Management
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Total {products.length} registered artisan goods in the PeepalKrat store.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xs shadow-xs transition-colors flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-stone-200 rounded-sm shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-sandstone/40 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Item</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Artisan Maker</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
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
                        <div>
                          <span className="font-medium text-charcoal line-clamp-1 max-w-xs">{p.name}</span>
                          <span className="text-[10px] text-stone-400">/{p.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-stone-600">{p.sku}</td>
                    <td className="py-3 px-4 text-stone-600">{p.category?.name || "—"}</td>
                    <td className="py-3 px-4">
                      {p.maker ? (
                        <span className="text-terracotta-700 font-medium">{p.maker.name}</span>
                      ) : (
                        <span className="text-stone-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-serif font-medium text-charcoal">
                      {formatPrice(p.price, "INR")}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          p.inventory === 0
                            ? "bg-red-100 text-red-700"
                            : isLow
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-50 text-emerald-800"
                        }`}
                      >
                        {p.inventory} units {isLow && "(Low)"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {p.isFeatured ? (
                        <span className="text-terracotta-600 font-semibold text-[10px] uppercase">Yes</span>
                      ) : (
                        <span className="text-stone-400 text-[10px]">No</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-3 text-stone-500">
                        <Link
                          href={`/products/${p.slug}`}
                          target="_blank"
                          title="View on storefront"
                          className="hover:text-charcoal"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/admin/products/${p.id}`}
                          title="Edit product"
                          className="text-terracotta-700 hover:text-terracotta-900 font-semibold"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
