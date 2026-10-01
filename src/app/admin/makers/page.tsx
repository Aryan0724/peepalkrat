import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, MapPin, ExternalLink, Users } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminMakersPage() {
  const makers = await prisma.maker.findMany({
    include: {
      products: { select: { id: true } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-4">
        <div>
          <h1 className="font-serif text-2xl text-charcoal font-normal">
            Maker & Artisan Profiles
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {makers.length} registered women artisan leaders across Haryana.
          </p>
        </div>

        <Link
          href="/admin/makers/new"
          className="bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xs shadow-xs transition-colors flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Artisan</span>
        </Link>
      </div>

      {/* Makers Grid Table */}
      <div className="bg-white border border-stone-200 rounded-sm shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-sandstone/40 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Artisan</th>
                <th className="py-3.5 px-4">District / Village</th>
                <th className="py-3.5 px-4">Craft Specialty</th>
                <th className="py-3.5 px-4">Catalog Pieces</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {makers.map((m) => (
                <tr key={m.id} className="hover:bg-sandstone/20 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <Image src={m.photo} alt={m.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div>
                        <span className="font-medium text-charcoal block">{m.name}</span>
                        <span className="text-[10px] text-stone-400">{m.title}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-terracotta-600 shrink-0" />
                      <span>{m.villageDistrict}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-700 font-medium">{m.craftSkill}</td>
                  <td className="py-3.5 px-4 text-stone-600">{m.products.length} products</td>
                  <td className="py-3.5 px-4">
                    {m.isFeatured ? (
                      <span className="text-terracotta-600 font-semibold text-[10px] uppercase">Yes</span>
                    ) : (
                      <span className="text-stone-400 text-[10px]">No</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <Link
                        href={`/makers/${m.slug}`}
                        target="_blank"
                        title="View on storefront"
                        className="text-stone-400 hover:text-charcoal"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/makers/${m.id}`}
                        className="text-terracotta-700 hover:text-terracotta-900 font-semibold"
                      >
                        Edit Profile →
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
