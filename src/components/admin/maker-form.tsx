"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MakerFormProps {
  initialMaker?: any;
}

export function MakerForm({ initialMaker }: MakerFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialMaker?.id);

  let parsedImpact: any = {};
  try {
    if (initialMaker?.verifiedImpactData) {
      parsedImpact = typeof initialMaker.verifiedImpactData === "string"
        ? JSON.parse(initialMaker.verifiedImpactData)
        : initialMaker.verifiedImpactData;
    }
  } catch {}

  const [formData, setFormData] = useState({
    name: initialMaker?.name || "",
    title: initialMaker?.title || "",
    villageDistrict: initialMaker?.villageDistrict || "Panipat, Haryana",
    craftSkill: initialMaker?.craftSkill || "",
    photo: initialMaker?.photo || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    biography: initialMaker?.biography || "",
    quote: initialMaker?.quote || "",
    isFeatured: Boolean(initialMaker?.isFeatured),
    yearsPracticing: parsedImpact.yearsPracticing || "",
    womenTrained: parsedImpact.womenTrained || "",
    incomeIncreasePct: parsedImpact.averageIncomeIncreasePct || "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    const verifiedImpactData = {
      yearsPracticing: formData.yearsPracticing ? Number(formData.yearsPracticing) : undefined,
      womenTrained: formData.womenTrained ? Number(formData.womenTrained) : undefined,
      averageIncomeIncreasePct: formData.incomeIncreasePct ? Number(formData.incomeIncreasePct) : undefined,
    };

    try {
      const url = isEditing
        ? `/api/admin/makers/${initialMaker.id}`
        : "/api/admin/makers";

      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          verifiedImpactData,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed saving maker profile.");
      }

      router.push("/admin/makers");
      router.refresh();
    } catch (err: any) {
      setStatusMessage({ text: err.message, isError: true });
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this maker profile?")) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/makers/${initialMaker.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed deleting maker.");
      router.push("/admin/makers");
      router.refresh();
    } catch (err: any) {
      alert(err.message);
      setIsDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/makers"
            className="p-1.5 rounded-sm hover:bg-stone-200 text-stone-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-serif text-2xl text-charcoal font-normal">
            {isEditing ? `Edit Maker: ${initialMaker.name}` : "Register New Women Artisan"}
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
              <span>Delete Maker</span>
            </Button>
          )}

          <Button type="submit" variant="editorial" size="sm" disabled={isSaving} className="text-xs">
            <Save className="w-3.5 h-3.5 mr-1.5" />
            <span>{isSaving ? "Saving..." : "Save Artisan Profile"}</span>
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

      {/* Main Info */}
      <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4 text-xs">
        <h2 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-2">
          Identity & Craft Profile
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-stone-700 font-semibold mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Sunita Devi"
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">Title / Designation *</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Master Dhurrie & Kilim Weaver"
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">Village & District in Haryana *</label>
            <input
              type="text"
              name="villageDistrict"
              required
              value={formData.villageDistrict}
              onChange={handleChange}
              placeholder="e.g. Panipat, Haryana"
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">Craft Discipline & Materials *</label>
            <input
              type="text"
              name="craftSkill"
              required
              value={formData.craftSkill}
              onChange={handleChange}
              placeholder="e.g. Upcycled Cotton & Raw Wool Pit-Loom Weaving"
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-stone-700 font-semibold mb-1">Portrait Photograph URL *</label>
            <input
              type="url"
              name="photo"
              required
              value={formData.photo}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-stone-700 font-semibold mb-1">Full Biography & Journey</label>
            <textarea
              name="biography"
              rows={4}
              value={formData.biography}
              onChange={handleChange}
              placeholder="Detailed life story, family background, enterprise leadership, and craft heritage..."
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-stone-700 font-semibold mb-1">Direct Maker Quote</label>
            <input
              type="text"
              name="quote"
              value={formData.quote}
              onChange={handleChange}
              placeholder="e.g. We do not simply push shuttles of thread; we weave our autonomy."
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white italic"
            />
          </div>
        </div>
      </div>

      {/* Verified Impact Metrics */}
      <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4 text-xs">
        <h2 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-2">
          Verified Social Impact Data
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-stone-700 font-semibold mb-1">Years Practicing Craft</label>
            <input
              type="number"
              name="yearsPracticing"
              value={formData.yearsPracticing}
              onChange={handleChange}
              placeholder="e.g. 19"
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">Women Apprentices Trained</label>
            <input
              type="number"
              name="womenTrained"
              value={formData.womenTrained}
              onChange={handleChange}
              placeholder="e.g. 28"
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">Income Increase Percentage (%)</label>
            <input
              type="number"
              name="incomeIncreasePct"
              value={formData.incomeIncreasePct}
              onChange={handleChange}
              placeholder="e.g. 140"
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>
        </div>
      </div>

      {/* Visibility */}
      <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs text-xs">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="rounded text-terracotta-600 focus:ring-terracotta-500"
          />
          <span className="text-stone-700 font-medium">Feature prominently on Homepage Spotlight</span>
        </label>
      </div>
    </form>
  );
}
