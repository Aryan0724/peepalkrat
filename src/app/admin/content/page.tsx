import React from "react";
import { prisma } from "@/lib/db";
import { ContentEditorClient } from "@/components/admin/content-editor-client";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const blocks = await prisma.contentBlock.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-stone-200">
        <h1 className="font-serif text-2xl text-charcoal font-normal">
          Homepage & Brand Story CMS
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Modify marketing copy, headlines, and announcement banners without altering code.
        </p>
      </div>

      <ContentEditorClient initialBlocks={blocks as any} />
    </div>
  );
}
