"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  BookOpen,
  Users,
  Sparkles,
  Megaphone,
  Layers,
  Save,
  Check,
  ExternalLink,
  Eye,
  RotateCcw,
  FileText,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ContentBlockItem {
  id: string;
  key: string;
  page: string;
  section: string;
  type: string;
  title?: string | null;
  subtitle?: string | null;
  content?: string | null;
  linkUrl?: string | null;
  imageUrl?: string | null;
  isActive: boolean;
}

const PAGE_DEFINITIONS = [
  {
    id: "home",
    name: "Homepage",
    slug: "/",
    icon: Home,
    description: "Hero headline, cultural slogan, philosophy manifesto, and craft showcase introductions.",
  },
  {
    id: "story",
    name: "Our Story",
    slug: "/our-story",
    icon: BookOpen,
    description: "Founding philosophy, 72% direct value distribution model, and Haryana craft history.",
  },
  {
    id: "makers",
    name: "Meet the Makers",
    slug: "/makers",
    icon: Users,
    description: "Artisan directory introduction, village cooperative narrative, and workshop ethos.",
  },
  {
    id: "impact",
    name: "Impact Transparency",
    slug: "/impact",
    icon: Sparkles,
    description: "Living wage guarantee statement, zero-plastic packaging commitment, and SDG alignment.",
  },
  {
    id: "header",
    name: "Header & Announcement",
    slug: "/",
    icon: Megaphone,
    description: "Top announcement promo banner, free shipping threshold alert, and header notices.",
  },
  {
    id: "footer",
    name: "Global Footer",
    slug: "/",
    icon: Layers,
    description: "Brand manifesto tagline, enterprise address, craft hub contact info, and legal notes.",
  },
];

export function PageContentCmsClient({ initialBlocks }: { initialBlocks: ContentBlockItem[] }) {
  const [blocks, setBlocks] = useState<ContentBlockItem[]>(initialBlocks);
  const [activePageId, setActivePageId] = useState("home");
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [isSavingPage, setIsSavingPage] = useState(false);
  const [savedSuccessKey, setSavedSuccessKey] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; isError: boolean } | null>(null);

  // Active page details
  const activePage = PAGE_DEFINITIONS.find((p) => p.id === activePageId) || PAGE_DEFINITIONS[0];

  // Blocks belonging to active page
  const pageBlocks = blocks.filter((b) => b.page === activePageId);

  const handleFieldChange = (key: string, field: keyof ContentBlockItem, value: any) => {
    setBlocks((prev) =>
      prev.map((b) => (b.key === key ? { ...b, [field]: value } : b))
    );
  };

  // Save single section
  const handleSaveBlock = async (block: ContentBlockItem) => {
    setSavingKey(block.key);
    setNotification(null);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(block),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed saving content block.");
      }

      setSavedSuccessKey(block.key);
      setTimeout(() => setSavedSuccessKey(null), 2500);
      setNotification({ message: `Section "${block.title || block.key}" updated live!`, isError: false });
    } catch (err: any) {
      setNotification({ message: err.message, isError: true });
    } finally {
      setSavingKey(null);
    }
  };

  // Save all sections on active page
  const handleSavePage = async () => {
    setIsSavingPage(true);
    setNotification(null);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocks: pageBlocks }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed saving page content.");
      }

      setNotification({
        message: `All content on "${activePage.name}" saved and live on storefront!`,
        isError: false,
      });
    } catch (err: any) {
      setNotification({ message: err.message, isError: true });
    } finally {
      setIsSavingPage(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Instructions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-4">
        <div>
          <h1 className="font-serif text-2xl text-charcoal font-normal">
            Site-Wide Page & Content CMS
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Complete authority to modify marketing headlines, story narratives, and promo banners across every page.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-end sm:self-auto">
          <Link
            href={activePage.slug}
            target="_blank"
            className="px-3.5 py-2 text-xs text-stone-600 hover:text-charcoal hover:bg-stone-100 rounded-xs border border-stone-200 transition-colors flex items-center space-x-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Preview {activePage.name}</span>
          </Link>

          <Button
            type="button"
            disabled={isSavingPage || pageBlocks.length === 0}
            onClick={handleSavePage}
            className="bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-semibold px-4 py-2 rounded-xs shadow-xs transition-colors flex items-center space-x-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSavingPage ? "Saving Page..." : `Save All ${activePage.name} Content`}</span>
          </Button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`p-3.5 rounded-xs text-xs flex items-center justify-between animate-in fade-in duration-200 ${
            notification.isError
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-emerald-50 text-emerald-800 border border-emerald-200"
          }`}
        >
          <span className="font-medium">{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="text-stone-400 hover:text-stone-600 font-bold ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Visual Page Selector Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 border-b border-stone-200 pb-2">
        {PAGE_DEFINITIONS.map((p) => {
          const Icon = p.icon;
          const isActive = p.id === activePageId;
          const count = blocks.filter((b) => b.page === p.id).length;

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePageId(p.id)}
              className={`p-3 rounded-xs text-left transition-all border ${
                isActive
                  ? "bg-charcoal text-white border-charcoal shadow-sm"
                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-stone-50"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Icon className={`w-4 h-4 ${isActive ? "text-terracotta-300" : "text-stone-400"}`} />
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? "bg-stone-800 text-stone-300" : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {count} sections
                </span>
              </div>
              <span className="font-medium text-xs block truncate">{p.name}</span>
            </button>
          );
        })}
      </div>

      {/* Page Header Intro */}
      <div className="bg-sandstone/30 border border-stone-200 p-4 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div>
          <span className="font-semibold text-charcoal uppercase tracking-wider text-[11px] block">
            Managing: {activePage.name}
          </span>
          <p className="text-stone-500 mt-0.5">{activePage.description}</p>
        </div>
        <div className="text-[11px] text-stone-400">
          Target Route: <code className="bg-stone-200 px-1 py-0.5 rounded text-charcoal">{activePage.slug}</code>
        </div>
      </div>

      {/* Sections List for Active Page */}
      <div className="space-y-6">
        {pageBlocks.length === 0 ? (
          <div className="text-center py-12 bg-white border border-dashed border-stone-200 rounded-sm text-stone-400 text-xs">
            No content sections configured for this page yet.
          </div>
        ) : (
          pageBlocks.map((block) => (
            <div
              key={block.key}
              className="bg-white border border-stone-200 rounded-sm shadow-xs overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-4 bg-sandstone/20 border-b border-stone-100 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-2.5">
                  <FileText className="w-4 h-4 text-terracotta-600 shrink-0" />
                  <div>
                    <span className="font-mono text-[11px] font-semibold text-charcoal">
                      {block.key}
                    </span>
                    <span className="ml-2 text-[10px] text-stone-400 uppercase tracking-wider">
                      Section: {block.section}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-1.5 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={block.isActive}
                      onChange={(e) => handleFieldChange(block.key, "isActive", e.target.checked)}
                      className="rounded-xs text-terracotta-600 focus:ring-terracotta-500 w-3.5 h-3.5"
                    />
                    <span className="text-stone-600 text-[11px]">Active</span>
                  </label>

                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={savingKey === block.key}
                    onClick={() => handleSaveBlock(block)}
                    className="text-xs h-7 px-3 bg-stone-100 hover:bg-stone-200"
                  >
                    {savedSuccessKey === block.key ? (
                      <span className="text-emerald-700 flex items-center space-x-1">
                        <Check className="w-3 h-3" />
                        <span>Saved</span>
                      </span>
                    ) : (
                      <span>{savingKey === block.key ? "Saving..." : "Save Section"}</span>
                    )}
                  </Button>
                </div>
              </div>

              {/* Form Body */}
              <div className="p-6 space-y-4 text-xs">
                {/* Headline / Title */}
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Headline / Main Title
                  </label>
                  <input
                    type="text"
                    value={block.title || ""}
                    onChange={(e) => handleFieldChange(block.key, "title", e.target.value)}
                    placeholder="e.g. FOR THE PEOPLE. BY THE PEOPLE."
                    className="w-full p-2.5 border border-stone-300 rounded-sm font-medium text-charcoal"
                  />
                </div>

                {/* Subtitle / Eyebrow */}
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Subtitle / Eyebrow Text
                  </label>
                  <input
                    type="text"
                    value={block.subtitle || ""}
                    onChange={(e) => handleFieldChange(block.key, "subtitle", e.target.value)}
                    placeholder="e.g. Every purchase carries a story."
                    className="w-full p-2.5 border border-stone-300 rounded-sm text-stone-600"
                  />
                </div>

                {/* Body Content / Narrative */}
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Body Narrative / Paragraph Description
                  </label>
                  <textarea
                    rows={3}
                    value={block.content || ""}
                    onChange={(e) => handleFieldChange(block.key, "content", e.target.value)}
                    placeholder="Enter the full paragraph or certified narrative..."
                    className="w-full p-2.5 border border-stone-300 rounded-sm text-stone-600 leading-relaxed"
                  />
                </div>

                {/* Secondary row: Links & Image */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Call-to-Action Link URL
                    </label>
                    <input
                      type="text"
                      value={block.linkUrl || ""}
                      onChange={(e) => handleFieldChange(block.key, "linkUrl", e.target.value)}
                      placeholder="/shop or /our-story"
                      className="w-full p-2 border border-stone-300 rounded-sm font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Feature / Background Image URL
                    </label>
                    <input
                      type="url"
                      value={block.imageUrl || ""}
                      onChange={(e) => handleFieldChange(block.key, "imageUrl", e.target.value)}
                      placeholder="https://..."
                      className="w-full p-2 border border-stone-300 rounded-sm text-[11px]"
                    />
                  </div>
                </div>

                {/* Live Preview Box */}
                <div className="mt-4 pt-4 border-t border-stone-100">
                  <div className="flex items-center justify-between text-[11px] text-stone-400 mb-2">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span className="font-semibold uppercase tracking-wider">Live Visual Preview</span>
                    </span>
                    <span>Storefront Rendering</span>
                  </div>

                  <div className="p-4 rounded-xs border border-stone-200 bg-[#FAF8F5] space-y-1.5">
                    {block.subtitle && (
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-terracotta-700 block">
                        {block.subtitle}
                      </span>
                    )}
                    {block.title && (
                      <h4 className="font-serif text-lg font-light text-charcoal leading-snug">
                        {block.title}
                      </h4>
                    )}
                    {block.content && (
                      <p className="text-stone-600 text-xs leading-relaxed font-light">
                        {block.content}
                      </p>
                    )}
                    {block.linkUrl && (
                      <span className="text-[11px] font-semibold text-charcoal underline block pt-1">
                        Link: {block.linkUrl} →
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
