"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  SlidersHorizontal,
  X,
  Search,
  RotateCcw,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { ProductCard } from "./product-card";
import { useCurrency } from "@/lib/currency-context";
import { Button } from "@/components/ui/button";

interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

interface CollectionOption {
  id: string;
  name: string;
  slug: string;
}

interface MakerOption {
  id: string;
  name: string;
  slug: string;
}

interface ProductItem {
  id: string;
  sku: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  categoryId: string;
  collectionId?: string | null;
  makerId?: string | null;
  category?: { name: string; slug: string } | null;
  maker?: { name: string; slug: string; villageDistrict: string } | null;
  images: { url: string; altText?: string | null; isPrimary: boolean }[];
  inventory: number;
  lowStockThreshold?: number;
  isFeatured: boolean;
  createdAt: Date | string;
}

interface ShopCatalogClientProps {
  products: ProductItem[];
  categories: CategoryOption[];
  collections: CollectionOption[];
  makers: MakerOption[];
  initialCategory?: string;
  initialCollection?: string;
}

export function ShopCatalogClient({
  products,
  categories,
  collections,
  makers,
  initialCategory,
  initialCollection,
}: ShopCatalogClientProps) {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("q") || "";

  const { format } = useCurrency();

  // Filter States
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "all");
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection || "all");
  const [selectedMaker, setSelectedMaker] = useState<string>("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSelectedCollection("all");
    setSelectedMaker("all");
    setInStockOnly(false);
    setSortBy("featured");
    setMaxPrice(10000);
  };

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (search) count++;
    if (selectedCategory !== "all") count++;
    if (selectedCollection !== "all") count++;
    if (selectedMaker !== "all") count++;
    if (inStockOnly) count++;
    if (maxPrice < 10000) count++;
    return count;
  }, [search, selectedCategory, selectedCollection, selectedMaker, inStockOnly, maxPrice]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search filter
        if (search) {
          const query = search.toLowerCase();
          const matchName = product.name.toLowerCase().includes(query);
          const matchCat = product.category?.name.toLowerCase().includes(query);
          const matchMaker = product.maker?.name.toLowerCase().includes(query);
          if (!matchName && !matchCat && !matchMaker) return false;
        }

        // Category filter
        if (selectedCategory !== "all" && product.category?.slug !== selectedCategory) {
          return false;
        }

        // Collection filter
        if (selectedCollection !== "all") {
          const collection = collections.find((c) => c.slug === selectedCollection);
          if (collection && product.collectionId !== collection.id) {
            return false;
          }
        }

        // Maker filter
        if (selectedMaker !== "all" && product.maker?.slug !== selectedMaker) {
          return false;
        }

        // In-stock only
        if (inStockOnly && product.inventory <= 0) {
          return false;
        }

        // Price range
        if (product.price > maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "newest") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        // Default: featured
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
  }, [
    products,
    search,
    selectedCategory,
    selectedCollection,
    selectedMaker,
    inStockOnly,
    maxPrice,
    sortBy,
    collections,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Bar: Controls, Count, Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-stone-200 gap-4">
        <div>
          <h1 className="font-serif text-3xl font-light text-charcoal">
            The Haryana Artisan Catalog
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Showing <span className="font-semibold text-charcoal">{filteredProducts.length}</span> handcrafted pieces
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center space-x-2 px-3.5 py-2 border border-stone-300 rounded-sm text-xs font-medium text-charcoal hover:bg-stone-50"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-stone-400 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-stone-300 px-3 py-2 rounded-sm text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-terracotta-500 shadow-xs"
            >
              <option value="featured">Featured Pieces</option>
              <option value="newest">Newest Additions</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block space-y-8 pr-6 border-r border-stone-200/80">
          {/* Active Filter Clear */}
          {activeFilterCount > 0 && (
            <div className="flex items-center justify-between bg-stone-100 p-2.5 rounded-sm text-xs">
              <span className="font-medium text-charcoal">{activeFilterCount} active filters</span>
              <button
                onClick={resetFilters}
                className="text-terracotta-700 hover:text-terracotta-900 flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          )}

          {/* Search Input */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2">
              Search Pieces
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
              <input
                type="text"
                placeholder="Search rugs, stoles, bowls..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-terracotta-500"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-2.5 text-stone-400 hover:text-charcoal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Categories Filter */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-3">
              Craft Category
            </label>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-left py-1 px-2 rounded-xs transition-colors flex justify-between ${
                  selectedCategory === "all"
                    ? "font-semibold text-terracotta-700 bg-sandstone/70"
                    : "text-stone-600 hover:text-charcoal"
                }`}
              >
                <span>All Disciplines</span>
                <span className="text-stone-400">{products.length}</span>
              </button>
              {categories.map((cat) => {
                const count = products.filter((p) => p.category?.slug === cat.slug).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left py-1 px-2 rounded-xs transition-colors flex justify-between ${
                      selectedCategory === cat.slug
                        ? "font-semibold text-terracotta-700 bg-sandstone/70"
                        : "text-stone-600 hover:text-charcoal"
                    }`}
                  >
                    <span className="truncate pr-2">{cat.name}</span>
                    <span className="text-stone-400">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Curated Collections */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-3">
              Curated Collections
            </label>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => setSelectedCollection("all")}
                className={`w-full text-left py-1 px-2 rounded-xs transition-colors ${
                  selectedCollection === "all"
                    ? "font-semibold text-terracotta-700 bg-sandstone/70"
                    : "text-stone-600 hover:text-charcoal"
                }`}
              >
                All Collections
              </button>
              {collections.map((col) => (
                <button
                  key={col.id}
                  onClick={() => setSelectedCollection(col.slug)}
                  className={`w-full text-left py-1 px-2 rounded-xs transition-colors truncate block ${
                    selectedCollection === col.slug
                      ? "font-semibold text-terracotta-700 bg-sandstone/70"
                      : "text-stone-600 hover:text-charcoal"
                  }`}
                >
                  {col.name}
                </button>
              ))}
            </div>
          </div>

          {/* Maker Filter */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-3">
              Artisan / Maker
            </label>
            <div className="space-y-1.5 text-xs max-h-48 overflow-y-auto no-scrollbar">
              <button
                onClick={() => setSelectedMaker("all")}
                className={`w-full text-left py-1 px-2 rounded-xs transition-colors ${
                  selectedMaker === "all"
                    ? "font-semibold text-terracotta-700 bg-sandstone/70"
                    : "text-stone-600 hover:text-charcoal"
                }`}
              >
                All Makers
              </button>
              {makers.map((maker) => (
                <button
                  key={maker.id}
                  onClick={() => setSelectedMaker(maker.slug)}
                  className={`w-full text-left py-1 px-2 rounded-xs transition-colors truncate block ${
                    selectedMaker === maker.slug
                      ? "font-semibold text-terracotta-700 bg-sandstone/70"
                      : "text-stone-600 hover:text-charcoal"
                  }`}
                >
                  {maker.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs">
              <span className="font-semibold uppercase tracking-wider text-stone-700">Max Price</span>
              <span className="font-medium text-terracotta-700">{format(maxPrice)}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={10000}
              step={250}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-terracotta-600"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>{format(1000)}</span>
              <span>{format(10000)}</span>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="pt-2 border-t border-stone-200">
            <label className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-terracotta-600 focus:ring-terracotta-500"
              />
              <span>In stock items only</span>
            </label>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-stone-200 rounded-sm p-12 text-center my-8">
              <div className="w-12 h-12 rounded-full bg-sandstone flex items-center justify-center mx-auto mb-3 text-stone-400">
                <Search className="w-6 h-6 stroke-1" />
              </div>
              <h3 className="font-serif text-lg text-charcoal">No pieces matched your selection</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-6">
                Try adjusting your search criteria or resetting filters to see our full artisan collection.
              </p>
              <Button onClick={resetFilters} variant="secondary" size="sm">
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Slide-out Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white shadow-2xl flex flex-col p-6 z-50 animate-slide-up">
            <div className="flex justify-between items-center pb-4 border-b border-stone-200">
              <h3 className="font-serif text-lg font-medium text-charcoal">Filter Catalog</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 space-y-6">
              {/* Category */}
              <div>
                <label className="text-xs font-semibold uppercase text-stone-700 block mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-xs p-2 border border-stone-300 rounded"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Maker */}
              <div>
                <label className="text-xs font-semibold uppercase text-stone-700 block mb-2">Maker</label>
                <select
                  value={selectedMaker}
                  onChange={(e) => setSelectedMaker(e.target.value)}
                  className="w-full text-xs p-2 border border-stone-300 rounded"
                >
                  <option value="all">All Makers</option>
                  {makers.map((m) => (
                    <option key={m.id} value={m.slug}>{m.name}</option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="text-xs font-semibold uppercase text-stone-700 block mb-2">
                  Max Price: {format(maxPrice)}
                </label>
                <input
                  type="range"
                  min={1000}
                  max={10000}
                  step={250}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* In stock */}
              <label className="flex items-center space-x-2 text-xs text-stone-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                <span>In stock items only</span>
              </label>
            </div>

            <div className="pt-4 border-t border-stone-200 flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
              >
                Reset
              </Button>
              <Button
                variant="editorial"
                size="sm"
                className="flex-1"
                onClick={() => setMobileFilterOpen(false)}
              >
                Show Results
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
