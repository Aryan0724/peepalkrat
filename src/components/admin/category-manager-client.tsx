"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, ExternalLink, FolderTree, Sparkles, Check, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  badge?: string | null;
  isFeatured?: boolean;
  order?: number;
  _count: { products: number };
}

export function CategoryManagerClient({
  initialCategories,
}: {
  initialCategories: CategoryItem[];
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [badge, setBadge] = useState("");
  const [isFeatured, setIsFeatured] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, image, badge, isFeatured }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCategories([...categories, { ...data.category, _count: { products: 0 } }]);
        setName("");
        setDescription("");
        setImage("");
        setBadge("");
        setIsFeatured(true);
        setShowForm(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFeatured = async (cat: CategoryItem) => {
    setUpdatingId(cat.id);
    const newFeatured = !cat.isFeatured;

    try {
      const res = await fetch("/api/admin/categories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: cat.id, isFeatured: newFeatured }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCategories((prev) =>
          prev.map((c) => (c.id === cat.id ? { ...c, isFeatured: newFeatured } : c))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateBadge = async (cat: CategoryItem, newBadge: string) => {
    setUpdatingId(cat.id);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: cat.id, badge: newBadge }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCategories((prev) =>
          prev.map((c) => (c.id === cat.id ? { ...c, badge: newBadge } : c))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-stone-500">
            Featured categories appear in the <strong>Pinklay-style circular navigation strip</strong> on the Homepage and Shop catalog.
          </span>
        </div>

        <Button
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? "outline" : "editorial"}
          size="sm"
          className="text-xs self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          <span>{showForm ? "Close Form" : "Create New Category"}</span>
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4 text-xs">
          <h3 className="font-serif text-base font-medium text-charcoal">New Category Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-stone-600 mb-1 font-semibold">Category Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Festive Ornaments"
                className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
              />
            </div>
            <div>
              <label className="block text-stone-600 mb-1 font-semibold">Circle Cover Image URL</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
              />
            </div>
            <div>
              <label className="block text-stone-600 mb-1 font-semibold">Bubble Badge (Optional)</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Festive, New, Holiday"
                className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-stone-600 mb-1 font-semibold">Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Craft overview, materials, and living cultural heritage..."
                className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
              />
            </div>
            <div className="sm:col-span-2 flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="isFeaturedNew"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded-xs text-terracotta-600 focus:ring-terracotta-500 w-4 h-4"
              />
              <label htmlFor="isFeaturedNew" className="text-stone-700 font-medium cursor-pointer">
                Feature in Top Circular Story Navigation Strip
              </label>
            </div>
          </div>
          <Button type="submit" variant="editorial" size="sm" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Save Discipline"}
          </Button>
        </form>
      )}

      <div className="bg-white border border-stone-200 rounded-sm shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-sandstone/40 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Discipline / Category</th>
              <th className="py-3 px-4">Circular Story Nav</th>
              <th className="py-3 px-4">Badge Pill</th>
              <th className="py-3 px-4">Catalog Items</th>
              <th className="py-3 px-4 text-right">Storefront</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-sandstone/20 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-stone-100 border border-stone-200 shrink-0 p-0.5">
                      {c.image ? (
                        <Image src={c.image} alt={c.name} fill className="object-cover rounded-full" sizes="40px" />
                      ) : (
                        <FolderTree className="w-4 h-4 m-2 text-stone-400" />
                      )}
                    </div>
                    <div>
                      <span className="font-medium text-charcoal block">{c.name}</span>
                      <span className="font-mono text-[10px] text-stone-400">/{c.slug}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <button
                    onClick={() => toggleFeatured(c)}
                    disabled={updatingId === c.id}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors flex items-center space-x-1 ${
                      c.isFeatured
                        ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                        : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${c.isFeatured ? "bg-emerald-600" : "bg-stone-400"}`} />
                    <span>{c.isFeatured ? "Active on Strip" : "Hidden from Strip"}</span>
                  </button>
                </td>
                <td className="py-3.5 px-4">
                  <input
                    type="text"
                    defaultValue={c.badge || ""}
                    placeholder="e.g. Festive"
                    onBlur={(e) => {
                      if (e.target.value !== (c.badge || "")) {
                        handleUpdateBadge(c, e.target.value);
                      }
                    }}
                    className="w-28 p-1 text-[11px] border border-stone-200 rounded-xs bg-transparent focus:bg-white focus:border-terracotta-500"
                  />
                </td>
                <td className="py-3.5 px-4 font-medium text-charcoal">{c._count?.products || 0} products</td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/categories/${c.slug}`}
                    target="_blank"
                    className="text-terracotta-700 hover:text-terracotta-900 inline-flex items-center space-x-1 font-medium"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
