import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Sparkles, Award, ShieldCheck, Heart } from "lucide-react";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/shop/product-card";

interface MakerDetailProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: MakerDetailProps) {
  const maker = await prisma.maker.findUnique({
    where: { slug: params.slug },
  });

  if (!maker) return { title: "Maker Not Found | PeepalKrat" };

  return {
    title: `${maker.name} — ${maker.title} | PeepalKrat`,
    description: maker.biography,
  };
}

export default async function MakerDetailPage({ params }: MakerDetailProps) {
  const maker = await prisma.maker.findUnique({
    where: { slug: params.slug },
    include: {
      products: {
        where: { isPublished: true },
        include: {
          category: true,
          maker: true,
          images: { orderBy: { order: "asc" } },
        },
      },
    },
  });

  if (!maker) notFound();

  let impactData: any = {};
  try {
    if (maker.verifiedImpactData) {
      impactData = JSON.parse(maker.verifiedImpactData);
    }
  } catch {}

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/makers"
          className="inline-flex items-center text-xs uppercase tracking-wider text-stone-500 hover:text-charcoal transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
          <span>Back to All Makers</span>
        </Link>
      </div>

      {/* Maker Profile Header Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-sm border border-stone-200 shadow-editorial overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Portrait (5 cols) */}
            <div className="lg:col-span-5 relative aspect-[4/5] bg-stone-100">
              <Image
                src={maker.photo}
                alt={maker.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-xs flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-terracotta-400" />
                <span>{maker.villageDistrict}</span>
              </div>
            </div>

            {/* Biography & Credo (7 cols) */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-terracotta-700 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Master Artisan & Enterprise Leader</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl font-light text-charcoal">
                  {maker.name}
                </h1>

                <p className="text-sm font-medium text-stone-600">
                  {maker.title} • {maker.craftSkill}
                </p>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-light">
                  {maker.biography}
                </p>

                {maker.quote && (
                  <div className="p-5 bg-sandstone/50 border-l-3 border-terracotta-600 rounded-r-sm italic font-serif text-charcoal text-base sm:text-lg leading-snug my-4">
                    “{maker.quote}”
                  </div>
                )}
              </div>

              {/* Verified Impact Grid */}
              <div className="pt-6 border-t border-stone-200">
                <span className="text-[11px] uppercase tracking-widest text-stone-500 font-semibold block mb-3">
                  Verified Artisan Metrics
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {impactData.yearsPracticing && (
                    <div className="bg-sandstone/40 p-3 rounded-sm">
                      <span className="block font-serif text-2xl font-medium text-charcoal">
                        {impactData.yearsPracticing} yrs
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-stone-500">
                        Heritage Practice
                      </span>
                    </div>
                  )}
                  {impactData.womenTrained && (
                    <div className="bg-sandstone/40 p-3 rounded-sm">
                      <span className="block font-serif text-2xl font-medium text-terracotta-700">
                        {impactData.womenTrained}+
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-stone-500">
                        Apprentices Mentored
                      </span>
                    </div>
                  )}
                  {impactData.averageIncomeIncreasePct && (
                    <div className="bg-sandstone/40 p-3 rounded-sm">
                      <span className="block font-serif text-2xl font-medium text-peepal-700">
                        +{impactData.averageIncomeIncreasePct}%
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-stone-500">
                        Income Resilience
                      </span>
                    </div>
                  )}
                  <div className="bg-sandstone/40 p-3 rounded-sm">
                    <span className="block font-serif text-2xl font-medium text-charcoal">
                      100%
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-stone-500">
                      Plastic-Free Craft
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crafted Pieces Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex justify-between items-end pb-6 mb-8 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-terracotta-700 font-semibold block mb-1">
              Crafted in {maker.villageDistrict}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-charcoal">
              Heirloom Works by {maker.name}
            </h2>
          </div>
          <span className="text-xs text-stone-500 uppercase tracking-wider">
            {maker.products.length} authenticated items
          </span>
        </div>

        {maker.products.length === 0 ? (
          <div className="bg-white p-12 text-center border border-stone-200 rounded-sm text-sm text-stone-500">
            {maker.name} is currently working on her next seasonal series on the loom.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {maker.products.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
