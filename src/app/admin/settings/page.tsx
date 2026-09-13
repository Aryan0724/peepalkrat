import React from "react";
import { prisma } from "@/lib/db";
import { SettingsEditorClient } from "@/components/admin/settings-editor-client";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findMany({
    orderBy: { key: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-stone-200">
        <h1 className="font-serif text-2xl text-charcoal font-normal">
          Store Configuration & Currencies
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Manage currency multipliers, domestic shipping tiers, and enterprise contact details.
        </p>
      </div>

      <SettingsEditorClient initialSettings={settings as any} />
    </div>
  );
}
