"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import { formatPrice } from "@/lib/currency";

interface Category {
  id: string;
  name: string;
}

interface Maker {
  id: string;
  name: string;
}

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  compareAtPrice: number | null;
  inventory: number;
  lowStockThreshold: number;
  isFeatured: boolean;
  isPublished: boolean;
  category: Category | null;
  maker: Maker | null;
  images: { url: string; isPrimary: boolean }[];
  recommendations?: { id: string }[];
}

interface ProductListClientProps {
  initialProducts: ProductItem[];
  categories: Category[];
}

export function ProductListClient({ initialProducts, categories }: ProductListClientProps) {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [stockFilter, setStockFilter] = useState("ALL");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; isError: boolean } | null>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.maker?.name && p.maker.name.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory =
        selectedCategory === "ALL" || p.category?.id === selectedCategory;

      // Stock filter
      let matchesStock = true;
      if (stockFilter === "LOW") {
        matchesStock = p.inventory <= p.lowStockThreshold && p.inventory > 0;
      } else if (stockFilter === "OUT") {
        matchesStock = p.inventory === 0;
      } else if (stockFilter === "IN") {
        matchesStock = p.inventory > p.lowStockThreshold;
      }

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchQuery, selectedCategory, stockFilter]);

  // Stock summary counts
  const lowStockCount = useMemo(
    () => products.filter((p) => p.inventory <= p.lowStockThreshold && p.inventory > 0).length,
    [products]
  );
  const outOfStockCount = useMemo(
    () => products.filter((p) => p.inventory === 0).length,
    [products]
  );

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setNotification(null);

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete product.");
      }

      // Optimistic removal from state
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setConfirmDeleteId(null);
      setNotification({ message: "Product deleted successfully from catalog.", isError: false });
    } catch (err: any) {
      setNotification({ message: err.message, isError: true });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Notification Toast */}
      {notification && (
        <div
          className={`p-3 rounded-xs text-xs flex items-center justify-between ${
            notification.isError
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-emerald-50 text-emerald-800 border border-emerald-200"
          }`}
        >
          <span>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="text-stone-400 hover:text-stone-600 text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-sm border border-stone-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by product name, SKU, or artisan maker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-stone-200 rounded-xs focus:outline-none focus:border-terracotta-500 bg-stone-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 text-xs border border-stone-200 rounded-xs focus:outline-none focus:border-terracotta-500 bg-white"
            >
              <option value="ALL">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Filter */}
          <div className="sm:col-span-3">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full py-2 px-3 text-xs border border-stone-200 rounded-xs focus:outline-none focus:border-terracotta-500 bg-white"
            >
              <option value="ALL">All Inventory Statuses</option>
              <option value="IN">In Stock</option>
              <option value="LOW">Low Stock ({lowStockCount})</option>
              <option value="OUT">Out of Stock ({outOfStockCount})</option>
            </select>
          </div>
        </div>

        {/* Quick Summary Pill Row */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-stone-100 text-[11px] text-stone-500">
          <span>Showing {filteredProducts.length} of {products.length} products</span>
          {lowStockCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              {lowStockCount} items low stock
            </span>
          )}
          {outOfStockCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
              {outOfStockCount} out of stock
            </span>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Delete */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-stone-300 shadow-xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-red-100 text-red-700 rounded-full shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-charcoal font-medium">Delete Product Permanently?</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Are you sure you want to remove this piece from the catalog? This will delete its variants, images, and recommendations. Historical orders will safely preserve their item snapshots.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-stone-100">
              <button
                type="button"
                disabled={deletingId !== null}
                onClick={() => setConfirmDeleteId(null)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-100 rounded-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deletingId !== null}
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-4 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xs shadow-xs transition-colors flex items-center space-x-1.5"
              >
                {deletingId === confirmDeleteId ? (
                  <span>Deleting...</span>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white border border-stone-200 rounded-sm shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-sandstone/40 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Item & Slug</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Artisan Maker</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Recommendations</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-stone-400">
                    No products matched your search or filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const img =
                    p.images?.[0]?.url ||
                    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=150&q=80";
                  const isLow = p.inventory <= p.lowStockThreshold;
                  const recCount = p.recommendations?.length || 0;

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
                      <td className="py-3 px-4">
                        <div className="font-serif font-medium text-charcoal">
                          {formatPrice(p.price, "INR")}
                        </div>
                        {p.compareAtPrice && (
                          <span className="text-[10px] text-stone-400 line-through block">
                            {formatPrice(p.compareAtPrice, "INR")}
                          </span>
                        )}
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
                        {recCount > 0 ? (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-mustard-100 text-mustard-900">
                            <Sparkles className="w-3 h-3 text-mustard-600" />
                            <span>{recCount} companions</span>
                          </span>
                        ) : (
                          <span className="text-stone-400 text-[10px]">None set</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2 text-stone-500">
                          <Link
                            href={`/products/${p.slug}`}
                            target="_blank"
                            title="View on live storefront"
                            className="p-1 hover:text-charcoal hover:bg-stone-100 rounded-xs transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          <Link
                            href={`/admin/products/${p.id}`}
                            title="Edit price, specs, & recommendations"
                            className="p-1 text-terracotta-700 hover:text-terracotta-900 hover:bg-terracotta-50 rounded-xs font-semibold flex items-center space-x-1"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(p.id)}
                            title="Delete product"
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xs transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
