import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FolderTree, Plus, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/db";
import { CategoryManagerClient } from "@/components/admin/category-manager-client";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { products: true } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-stone-200">
        <h1 className="font-serif text-2xl text-charcoal font-normal">
          Craft Categories & Disciplines
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Organize products across handlooms, pottery, Phulkari embroidery, and woodcraft.
        </p>
      </div>

      <CategoryManagerClient initialCategories={categories as any} />
    </div>
  );
}
