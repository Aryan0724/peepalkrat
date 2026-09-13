"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, ExternalLink, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, image }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCategories([...categories, { ...data.category, _count: { products: 0 } }]);
        setName("");
        setDescription("");
        setImage("");
        setShowForm(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
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
          <span>{showForm ? "Close Form" : "Create New Discipline"}</span>
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4 text-xs">
          <h3 className="font-serif text-base font-medium text-charcoal">New Category Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-600 mb-1 font-semibold">Category Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Copper & Bell Metal"
                className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
              />
            </div>
            <div>
              <label className="block text-stone-600 mb-1 font-semibold">Cover Image URL</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-stone-600 mb-1 font-semibold">Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Craft overview and heritage materials..."
                className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
              />
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
              <th className="py-3 px-4">Discipline</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Items Count</th>
              <th className="py-3 px-4 text-right">Storefront</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-sandstone/20 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                      {c.image ? (
                        <Image src={c.image} alt={c.name} fill className="object-cover" sizes="32px" />
                      ) : (
                        <FolderTree className="w-4 h-4 m-2 text-stone-400" />
                      )}
                    </div>
                    <span className="font-medium text-charcoal">{c.name}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-stone-500">/{c.slug}</td>
                <td className="py-3.5 px-4 text-stone-600 max-w-sm truncate">{c.description || "—"}</td>
                <td className="py-3.5 px-4 font-medium text-charcoal">{c._count.products} products</td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/categories/${c.slug}`}
                    target="_blank"
                    className="text-terracotta-700 hover:text-terracotta-900 inline-flex items-center space-x-1"
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
