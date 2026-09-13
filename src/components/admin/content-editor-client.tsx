"use client";

import React, { useState } from "react";
import { Save, Check, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentBlockItem {
  id: string;
  key: string;
  type: string;
  title?: string | null;
  subtitle?: string | null;
  content?: string | null;
  linkUrl?: string | null;
  isActive: boolean;
}

export function ContentEditorClient({ initialBlocks }: { initialBlocks: ContentBlockItem[] }) {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savedSuccessKey, setSavedSuccessKey] = useState<string | null>(null);

  const handleFieldChange = (key: string, field: string, value: string) => {
    setBlocks(
      blocks.map((b) => (b.key === key ? { ...b, [field]: value } : b))
    );
  };

  const handleSaveBlock = async (block: ContentBlockItem) => {
    setSavingKey(block.key);
    setSavedSuccessKey(null);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(block),
      });

      if (res.ok) {
        setSavedSuccessKey(block.key);
        setTimeout(() => setSavedSuccessKey(null), 2500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="bg-sandstone/50 border border-stone-200 p-4 rounded-sm text-xs text-stone-600">
        <p className="font-semibold text-charcoal mb-1">
          Non-Technical Staff Visual CMS Controls
        </p>
        <p>
          Update the homepage headlines, announcement bar text, brand manifesto, and certified impact statistics in real-time without touching a line of code.
        </p>
      </div>

      <div className="space-y-6">
        {blocks.map((block) => (
          <div
            key={block.key}
            className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-terracotta-600" />
                <span className="font-semibold text-charcoal uppercase tracking-wider font-mono">
                  {block.key}
                </span>
                <span className="bg-sandstone text-stone-600 text-[10px] px-2 py-0.5 rounded">
                  {block.type}
                </span>
              </div>

              <Button
                type="button"
                variant="editorial"
                size="sm"
                disabled={savingKey === block.key}
                onClick={() => handleSaveBlock(block)}
                className="text-xs"
              >
                {savedSuccessKey === block.key ? (
                  <span className="flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Saved!</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1">
                    <Save className="w-3.5 h-3.5 mr-1" />
                    <span>{savingKey === block.key ? "Saving..." : "Save Block"}</span>
                  </span>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Primary Title / Headline</label>
                <input
                  type="text"
                  value={block.title || ""}
                  onChange={(e) => handleFieldChange(block.key, "title", e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">Subtitle / Eyebrow</label>
                <input
                  type="text"
                  value={block.subtitle || ""}
                  onChange={(e) => handleFieldChange(block.key, "subtitle", e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-stone-600 font-semibold mb-1">Body Text / Narrative</label>
                <textarea
                  rows={3}
                  value={block.content || ""}
                  onChange={(e) => handleFieldChange(block.key, "content", e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-stone-600 font-semibold mb-1">CTA Link Destination URL</label>
                <input
                  type="text"
                  value={block.linkUrl || ""}
                  onChange={(e) => handleFieldChange(block.key, "linkUrl", e.target.value)}
                  placeholder="/shop or /our-story"
                  className="w-full p-2.5 border border-stone-300 rounded-sm bg-white font-mono"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
