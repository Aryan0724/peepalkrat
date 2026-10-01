import React from "react";
import { prisma } from "@/lib/db";
import { CollectionManagerClient } from "@/components/admin/collection-manager-client";

export const dynamic = "force-dynamic";

export default async function AdminCollectionsPage() {
  const collections = await prisma.collection.findMany({
    include: {
      _count: { select: { products: true } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-stone-200">
        <h1 className="font-serif text-2xl text-charcoal font-normal">
          Curated Series & Collections
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Seasonal, thematic, and design story collections featured on the storefront.
        </p>
      </div>

      <CollectionManagerClient initialCollections={collections as any} />
    </div>
  );
}
