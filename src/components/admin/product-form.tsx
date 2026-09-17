"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  X,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/currency";

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

interface CatalogProductOption {
  id: string;
  name: string;
  sku: string;
  price: number;
  images?: { url: string }[];
}

interface RecommendationItem {
  recommendedProductId: string;
  note: string;
  productInfo?: CatalogProductOption;
}

interface ProductFormProps {
  initialProduct?: any;
  categories: Category[];
  collections: Collection[];
  makers: Maker[];
  allProducts?: CatalogProductOption[];
}

export function ProductForm({
  initialProduct,
  categories,
  collections,
  makers,
  allProducts = [],
}: ProductFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialProduct?.id);

  const [formData, setFormData] = useState({
    name: initialProduct?.name || "",
    sku: initialProduct?.sku || "",
    price: initialProduct?.price !== undefined ? String(initialProduct.price) : "",
    compareAtPrice: initialProduct?.compareAtPrice ? String(initialProduct.compareAtPrice) : "",
    costPrice: initialProduct?.costPrice ? String(initialProduct.costPrice) : "",
    categoryId: initialProduct?.categoryId || categories[0]?.id || "",
    collectionId: initialProduct?.collectionId || "",
    makerId: initialProduct?.makerId || "",
    inventory: initialProduct?.inventory !== undefined ? initialProduct.inventory : 10,
    lowStockThreshold: initialProduct?.lowStockThreshold !== undefined ? initialProduct.lowStockThreshold : 3,
    material: initialProduct?.material || "",
    dimensions: initialProduct?.dimensions || "",
    weight: initialProduct?.weight || "",
    careInstructions: initialProduct?.careInstructions || "",
    shippingInfo: initialProduct?.shippingInfo || "",
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

  // Recommendations state
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(() => {
    if (initialProduct?.recommendations && Array.isArray(initialProduct.recommendations)) {
      return initialProduct.recommendations.map((r: any) => ({
        recommendedProductId: r.recommendedProductId,
        note: r.note || "Frequently Bought Together",
        productInfo: r.recommendedProduct || allProducts.find((p) => p.id === r.recommendedProductId),
      }));
    }
    return [];
  });

  const [selectedRecProductId, setSelectedRecProductId] = useState("");
  const [selectedRecNote, setSelectedRecNote] = useState("Frequently Bought Together");
  const [customRecNote, setCustomRecNote] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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

  // Add a recommended companion product
  const handleAddRecommendation = () => {
    if (!selectedRecProductId) return;

    // Check if already in list
    if (recommendations.some((r) => r.recommendedProductId === selectedRecProductId)) {
      alert("This companion piece is already in recommendations.");
      return;
    }

    const prodInfo = allProducts.find((p) => p.id === selectedRecProductId);
    const finalNote = selectedRecNote === "CUSTOM" ? customRecNote.trim() : selectedRecNote;

    setRecommendations([
      ...recommendations,
      {
        recommendedProductId: selectedRecProductId,
        note: finalNote || "Frequently Bought Together",
        productInfo: prodInfo,
      },
    ]);

    setSelectedRecProductId("");
    setCustomRecNote("");
  };

  const handleRemoveRecommendation = (recProductId: string) => {
    setRecommendations(recommendations.filter((r) => r.recommendedProductId !== recProductId));
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
          recommendations: recommendations.map((r) => ({
            recommendedProductId: r.recommendedProductId,
            note: r.note,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed saving product.");
      }

      setStatusMessage({ text: "Product and recommendations saved successfully!", isError: false });
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setStatusMessage({ text: err.message, isError: true });
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/products/${initialProduct.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed deleting product");
      }
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      alert(err.message);
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // Filter available products for recommendation picker (exclude self and already picked)
  const availableForRec = allProducts.filter(
    (p) =>
      p.id !== initialProduct?.id &&
      !recommendations.some((r) => r.recommendedProductId === p.id)
  );

  return (
    <>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-stone-300 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-red-100 text-red-700 rounded-full shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-charcoal font-medium">Delete Product?</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Permanently delete &ldquo;{formData.name}&rdquo; from the PeepalKrat catalog? This action will remove its images and recommendations. Historical orders will remain intact.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-stone-100">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-100 rounded-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="px-4 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xs shadow-xs transition-colors flex items-center space-x-1.5"
              >
                {isDeleting ? <span>Deleting...</span> : <span>Confirm Delete</span>}
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-4">
          <div className="flex items-center space-x-3">
            <Link
              href="/admin/products"
              className="p-1.5 rounded-sm hover:bg-stone-200 text-stone-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-serif text-2xl text-charcoal font-normal">
                {isEditing ? `Edit: ${initialProduct.name}` : "Create New Artisan Product"}
              </h1>
              <span className="text-[11px] text-stone-400">
                Manage product details, pricing, inventory, specs, and curated recommendations.
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 self-end sm:self-auto">
            {isEditing && (
              <>
                <Link
                  href={`/products/${initialProduct.slug}`}
                  target="_blank"
                  className="px-3 py-2 text-xs text-stone-600 hover:text-charcoal hover:bg-stone-100 rounded-xs border border-stone-200 transition-colors flex items-center space-x-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="px-3 py-2 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xs border border-red-200 transition-colors flex items-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </>
            )}

            <Button
              type="submit"
              disabled={isSaving}
              className="bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-semibold px-5 py-2 rounded-xs shadow-xs transition-colors flex items-center space-x-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? "Saving..." : "Save Product"}</span>
            </Button>
          </div>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div
            className={`p-4 rounded-sm text-xs flex items-center justify-between ${
              statusMessage.isError
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-emerald-50 text-emerald-800 border border-emerald-200"
            }`}
          >
            <span>{statusMessage.text}</span>
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="text-stone-400 hover:text-stone-600 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Grid of Form Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 cols): Core Info, Specs, and Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Information */}
            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
              <h2 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-2">
                General Product Information
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
                    <label className="block text-stone-700 font-semibold mb-1">Stock Quantity *</label>
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

            {/* CURATED RECOMMENDATIONS & CROSS-SELLS (Key Requirement) */}
            <div className="bg-white p-6 rounded-sm border border-mustard-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-mustard-600" />
                  <h2 className="font-serif text-base font-medium text-charcoal">
                    Curated Recommendations & Cross-Sells
                  </h2>
                </div>
                <span className="text-[10px] text-stone-400">
                  {recommendations.length} companions attached
                </span>
              </div>

              <p className="text-xs text-stone-500">
                When a patron views or buys this product, recommend companion pieces (e.g. &ldquo;If buying Phulkari Shawl, also recommend Brass Brooch&rdquo;). This powers the storefront&rsquo;s 1-click &ldquo;Frequently Bought Together&rdquo; bundle.
              </p>

              {/* Add New Recommendation Picker */}
              <div className="bg-stone-50 p-4 rounded-xs border border-stone-200 space-y-3">
                <span className="text-xs font-semibold text-charcoal block">Add Companion Product</span>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                  {/* Select Product */}
                  <div className="sm:col-span-6">
                    <label className="block text-stone-600 font-medium mb-1">Select Piece</label>
                    <select
                      value={selectedRecProductId}
                      onChange={(e) => setSelectedRecProductId(e.target.value)}
                      className="w-full p-2 border border-stone-300 rounded-xs bg-white text-xs"
                    >
                      <option value="">-- Choose from Catalog ({availableForRec.length} available) --</option>
                      {availableForRec.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.sku}) — {formatPrice(p.price, "INR")}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Recommendation Note */}
                  <div className="sm:col-span-4">
                    <label className="block text-stone-600 font-medium mb-1">Recommendation Badge</label>
                    <select
                      value={selectedRecNote}
                      onChange={(e) => setSelectedRecNote(e.target.value)}
                      className="w-full p-2 border border-stone-300 rounded-xs bg-white text-xs"
                    >
                      <option value="Frequently Bought Together">Frequently Bought Together</option>
                      <option value="Pairs Well With">Pairs Well With</option>
                      <option value="Complete the Set">Complete the Set</option>
                      <option value="Artisan Companion Piece">Artisan Companion Piece</option>
                      <option value="CUSTOM">Custom Note...</option>
                    </select>
                  </div>

                  {/* Add Button */}
                  <div className="sm:col-span-2 flex items-end">
                    <Button
                      type="button"
                      disabled={!selectedRecProductId}
                      onClick={handleAddRecommendation}
                      className="w-full bg-charcoal hover:bg-stone-800 text-white text-xs py-2 h-auto"
                    >
                      + Add
                    </Button>
                  </div>
                </div>

                {selectedRecNote === "CUSTOM" && (
                  <div>
                    <label className="block text-stone-600 font-medium mb-1 text-xs">Custom Badge Text</label>
                    <input
                      type="text"
                      value={customRecNote}
                      onChange={(e) => setCustomRecNote(e.target.value)}
                      placeholder="e.g. Perfect Festive Pairing"
                      className="w-full p-2 border border-stone-300 rounded-xs bg-white text-xs"
                    />
                  </div>
                )}
              </div>

              {/* Current Recommendations List */}
              <div className="space-y-2 pt-2">
                {recommendations.length === 0 ? (
                  <div className="text-center py-6 border border-dashed border-stone-200 rounded-xs text-stone-400 text-xs">
                    No curated recommendations added yet. Select a product above to link companions.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {recommendations.map((rec, idx) => {
                      const companion =
                        rec.productInfo || allProducts.find((p) => p.id === rec.recommendedProductId);
                      const img =
                        companion?.images?.[0]?.url ||
                        "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=150&q=80";

                      return (
                        <div
                          key={rec.recommendedProductId}
                          className="flex items-center justify-between p-3 bg-white border border-stone-200 rounded-xs shadow-2xs hover:border-terracotta-300 transition-colors text-xs"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="font-mono text-stone-400 text-[10px] w-4">#{idx + 1}</span>
                            <img
                              src={img}
                              alt={companion?.name || "Companion"}
                              className="w-10 h-10 object-cover rounded-xs border border-stone-200 shrink-0"
                            />
                            <div>
                              <span className="font-medium text-charcoal block line-clamp-1">
                                {companion?.name || "Catalog Product"}
                              </span>
                              <div className="flex items-center space-x-2 text-[10px] text-stone-500">
                                <span className="font-serif font-medium text-terracotta-700">
                                  {companion ? formatPrice(companion.price, "INR") : "—"}
                                </span>
                                <span>•</span>
                                <span className="bg-mustard-50 text-mustard-900 border border-mustard-200 px-1.5 py-0.2 rounded-xs">
                                  {rec.note}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveRecommendation(rec.recommendedProductId)}
                            className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xs transition-colors"
                            title="Remove recommendation"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Story & Provenance Section */}
            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
              <h2 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-2">
                Artisan Story & Certified Impact
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Story Behind This Piece</label>
                  <textarea
                    name="storySnippet"
                    rows={3}
                    value={formData.storySnippet}
                    onChange={handleChange}
                    placeholder="e.g. Woven by Sarita Devi using traditional pit-loom shuttles passed down across four generations..."
                    className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Certified Impact Statement</label>
                  <textarea
                    name="impactNotes"
                    rows={2}
                    value={formData.impactNotes}
                    onChange={handleChange}
                    placeholder="e.g. Provides 18 hours of living wage work for rural women artisans in Jhajjar district."
                    className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Physical Specifications */}
            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
              <h2 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-2">
                Craft Specifications & Provenance
              </h2>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Material Composition</label>
                  <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    placeholder="70% Desi Cotton / 30% Native Wool"
                    className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Dimensions</label>
                  <input
                    type="text"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleChange}
                    placeholder="4 x 6 ft (120 x 180 cm)"
                    className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Weight</label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="1.85 kg"
                    className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Village Location in Haryana</label>
                  <input
                    type="text"
                    name="productionLocation"
                    value={formData.productionLocation}
                    onChange={handleChange}
                    placeholder="Bohar Village, Rohtak, Haryana"
                    className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                  />
                </div>
              </div>

              <div className="text-xs pt-2">
                <label className="block text-stone-700 font-semibold mb-1">Care & Maintenance Instructions</label>
                <input
                  type="text"
                  name="careInstructions"
                  value={formData.careInstructions}
                  onChange={handleChange}
                  placeholder="Dry clean recommended for first two cleans. Hand brush gently."
                  className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                />
              </div>
            </div>

            {/* Product Photography */}
            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
              <h2 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-2">
                Product Photography
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Paste image URL (https://...)"
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
                    <div
                      key={idx}
                      className="relative aspect-square rounded-xs overflow-hidden border border-stone-200 group bg-stone-100"
                    >
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

          {/* Right Column (1 col): Pricing & Organization */}
          <div className="space-y-6">
            {/* PRICING BOX (Price Can Be Changed Directly) */}
            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
              <h2 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-2">
                Pricing & Economics (INR)
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    required
                    min={1}
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 4850"
                    className="w-full p-2.5 border border-stone-300 rounded-sm font-semibold text-charcoal text-sm"
                  />
                  <span className="text-[10px] text-stone-400">The actual price charged to customer.</span>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Compare-at Price / MRP (₹)</label>
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

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Artisan Cost Price (₹)</label>
                  <input
                    type="number"
                    name="costPrice"
                    value={formData.costPrice}
                    onChange={handleChange}
                    placeholder="e.g. 3200"
                    className="w-full p-2.5 border border-stone-300 rounded-sm text-stone-500"
                  />
                  <span className="text-[10px] text-stone-400">Direct artisan wage + materials for transparency.</span>
                </div>
              </div>
            </div>

            {/* Inventory Alerts */}
            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
              <h2 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-2">
                Inventory & Stock Alerts
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Available Units</label>
                  <input
                    type="number"
                    name="inventory"
                    min={0}
                    value={formData.inventory}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-stone-300 rounded-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Low Stock Warning Threshold</label>
                  <input
                    type="number"
                    name="lowStockThreshold"
                    min={1}
                    value={formData.lowStockThreshold}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-stone-300 rounded-sm"
                  />
                  <span className="text-[10px] text-stone-400">Triggers alert on operations dashboard.</span>
                </div>
              </div>
            </div>

            {/* Organization & Maker Link */}
            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
              <h2 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-2">
                Organization & Maker Link
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Artisan Maker *</label>
                  <select
                    name="makerId"
                    value={formData.makerId}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                  >
                    <option value="">-- Select Haryana Artisan --</option>
                    {makers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.villageDistrict})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Category *</label>
                  <select
                    name="categoryId"
                    required
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
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
                    {collections.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Visibility & Badges */}
            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
              <h2 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-2">
                Storefront Visibility
              </h2>

              <div className="space-y-3 text-xs">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="rounded-xs text-terracotta-600 focus:ring-terracotta-500 w-4 h-4"
                  />
                  <span className="font-medium text-charcoal">Published (Visible to Customers)</span>
                </label>

                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="rounded-xs text-terracotta-600 focus:ring-terracotta-500 w-4 h-4"
                  />
                  <span className="font-medium text-charcoal">Featured on Homepage Hero</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
