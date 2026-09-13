"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Trash2, Plus, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
}

interface Collection {
  id: string;
  name: string;
}

interface Maker {
  id: string;
  name: string;
  villageDistrict: string;
}

interface ProductFormProps {
  initialProduct?: any;
  categories: Category[];
  collections: Collection[];
  makers: Maker[];
}

export function ProductForm({
  initialProduct,
  categories,
  collections,
  makers,
}: ProductFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialProduct?.id);

  const [formData, setFormData] = useState({
    name: initialProduct?.name || "",
    sku: initialProduct?.sku || "",
    price: initialProduct?.price || "",
    compareAtPrice: initialProduct?.compareAtPrice || "",
    categoryId: initialProduct?.categoryId || categories[0]?.id || "",
    collectionId: initialProduct?.collectionId || "",
    makerId: initialProduct?.makerId || "",
    inventory: initialProduct?.inventory !== undefined ? initialProduct.inventory : 10,
    material: initialProduct?.material || "",
    dimensions: initialProduct?.dimensions || "",
    weight: initialProduct?.weight || "",
    careInstructions: initialProduct?.careInstructions || "",
    productionLocation: initialProduct?.productionLocation || "",
    storySnippet: initialProduct?.storySnippet || "",
    impactNotes: initialProduct?.impactNotes || "",
    description: initialProduct?.description || "",
    shortDescription: initialProduct?.shortDescription || "",
    isFeatured: Boolean(initialProduct?.isFeatured),
    isPublished: initialProduct?.isPublished !== undefined ? initialProduct.isPublished : true,
  });

  const [images, setImages] = useState<string[]>(
    initialProduct?.images?.map((i: any) => i.url) || [
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80",
    ]
  );
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const url = isEditing
        ? `/api/admin/products/${initialProduct.id}`
        : "/api/admin/products";

      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          images,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed saving product.");
      }

      setStatusMessage({ text: "Product saved successfully!", isError: false });
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setStatusMessage({ text: err.message, isError: true });
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/products/${initialProduct.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed deleting product");
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      alert(err.message);
      setIsDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Top Controls */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/products"
            className="p-1.5 rounded-sm hover:bg-stone-200 text-stone-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-serif text-2xl text-charcoal font-normal">
            {isEditing ? `Edit Product: ${initialProduct.name}` : "Create New Artisan Product"}
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          {isEditing && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-600 border-red-200 hover:bg-red-50 text-xs"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              <span>Delete Piece</span>
            </Button>
          )}

          <Button
            type="submit"
            variant="editorial"
            size="sm"
            disabled={isSaving}
            className="text-xs"
          >
            <Save className="w-3.5 h-3.5 mr-1.5" />
            <span>{isSaving ? "Saving..." : "Save Product"}</span>
          </Button>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-sm text-xs ${
            statusMessage.isError
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-emerald-50 text-emerald-800 border border-emerald-200"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Core Info & Storytelling */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information */}
          <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
            <h2 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-2">
              General Information
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sohna Geometric Handloom Dhurrie"
                  className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">SKU *</label>
                  <input
                    type="text"
                    name="sku"
                    required
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="e.g. PG-TX-001"
                    className="w-full p-2.5 border border-stone-300 rounded-sm bg-white uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Inventory Quantity *</label>
                  <input
                    type="number"
                    name="inventory"
                    required
                    min={0}
                    value={formData.inventory}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Short Editorial Summary</label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Reversible flat-weave cotton and wool floor dhurrie crafted on Panipat pit-looms."
                  className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Full Detailed Narrative</label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed material composition, history of the technique, and provenance in Haryana..."
                  className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                />
              </div>
            </div>
          </div>

          {/* Story & Impact Section (Core Differentiator) */}
          <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
            <h2 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-2">
              Story Behind The Piece & Impact
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  The Story Behind This Piece (Technique, Warp Setup, Lore)
                </label>
                <textarea
                  name="storySnippet"
                  rows={3}
                  value={formData.storySnippet}
                  onChange={handleChange}
                  placeholder="e.g. Sunita spent 28 hours setting up the vertical warp threads. The geometric interlocking motif is an homage to..."
                  className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Certified Impact Statement
                </label>
                <textarea
                  name="impactNotes"
                  rows={2}
                  value={formData.impactNotes}
                  onChange={handleChange}
                  placeholder="e.g. Directly funds 6 days of living wage for two female apprentice weavers in Panipat."
                  className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Specific Production Location in Haryana
                  </label>
                  <input
                    type="text"
                    name="productionLocation"
                    value={formData.productionLocation}
                    onChange={handleChange}
                    placeholder="e.g. Sondhapur Village, Panipat, Haryana"
                    className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Material Composition
                  </label>
                  <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    placeholder="e.g. 70% Recycled Desi Cotton, 30% Native Wool"
                    className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Dimensions</label>
                  <input
                    type="text"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleChange}
                    placeholder="e.g. 4 ft x 6 ft (120 cm x 180 cm)"
                    className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Care Guide</label>
                  <input
                    type="text"
                    name="careInstructions"
                    value={formData.careInstructions}
                    onChange={handleChange}
                    placeholder="e.g. Spot clean or gentle dry clean"
                    className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Photography */}
          <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
            <h2 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-2">
              Photography & Media
            </h2>

            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="url"
                  placeholder="Add image URL (Unsplash or uploaded asset)"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="flex-1 p-2 text-xs border border-stone-300 rounded-sm"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleAddImage}
                  className="text-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  <span>Add Image</span>
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-3 pt-2">
                {images.map((url, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xs overflow-hidden border border-stone-200 group bg-stone-100">
                    <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-1 left-1 bg-charcoal/80 text-white text-[9px] px-1.5 py-0.5 rounded-xs">
                        Primary
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Pricing & Categorization */}
        <div className="space-y-6">
          {/* Pricing Box */}
          <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
            <h2 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-2">
              Pricing & Value (INR)
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Retail Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  required
                  min={1}
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 4850"
                  className="w-full p-2.5 border border-stone-300 rounded-sm font-semibold text-charcoal"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Compare-at Price (₹)</label>
                <input
                  type="number"
                  name="compareAtPrice"
                  value={formData.compareAtPrice}
                  onChange={handleChange}
                  placeholder="e.g. 5900"
                  className="w-full p-2.5 border border-stone-300 rounded-sm text-stone-500"
                />
                <span className="text-[10px] text-stone-400">Shows strike-through price if set.</span>
              </div>
            </div>
          </div>

          {/* Categorization & Maker Assignment */}
          <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
            <h2 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-2">
              Organization & Maker Link
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Craft Category *</label>
                <select
                  name="categoryId"
                  required
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Curated Collection</label>
                <select
                  name="collectionId"
                  value={formData.collectionId}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                >
                  <option value="">None (Standard Catalog)</option>
                  {collections.map((col) => (
                    <option key={col.id} value={col.id}>{col.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Assigned Artisan / Maker *
                </label>
                <select
                  name="makerId"
                  value={formData.makerId}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-stone-300 rounded-sm bg-white font-medium text-terracotta-800"
                >
                  <option value="">No specific artisan assigned</option>
                  {makers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.villageDistrict})
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-stone-400">
                  Links this piece to the maker's story on the storefront.
                </span>
              </div>
            </div>
          </div>

          {/* Visibility Flags */}
          <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-3 text-xs">
            <h2 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-2">
              Visibility
            </h2>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="rounded text-terracotta-600 focus:ring-terracotta-500"
              />
              <span className="text-stone-700 font-medium">Feature on Homepage</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="rounded text-terracotta-600 focus:ring-terracotta-500"
              />
              <span className="text-stone-700 font-medium">Publish Live to Storefront</span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
