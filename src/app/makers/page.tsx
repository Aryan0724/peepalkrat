import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles, Award } from "lucide-react";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "Meet the Makers | The Women of PeepalKrat Haryana",
  description:
    "Discover the master weavers, needlework artisans, earthen potters, and grass crafters of rural Haryana who form the foundation of PeepalKrat.",
};

export const revalidate = 60;

export default async function MakersPage() {
  let makers: any[] = [];
  try {
    makers = await prisma.maker.findMany({
      include: {
        products: {
          where: { isPublished: true },
          take: 3,
          include: {
            images: { where: { isPrimary: true } },
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.warn("Failed to load makers:", error);
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Editorial Header */}
      <div className="bg-charcoal text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-800 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-mustard-500 text-xs uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>The Living Foundation</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light">
            Meet the Makers of Haryana
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            People are not our marketing. People are our reason for being. Explore the stories, disciplines, and village workshops of the women who craft each PeepalKrat object.
          </p>
        </div>
      </div>

      {/* Makers List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {makers.map((maker) => {
            let impactData: any = {};
            try {
              if (maker.verifiedImpactData) {
                impactData = JSON.parse(maker.verifiedImpactData);
              }
            } catch {}

            return (
              <div
                key={maker.id}
                className="bg-white rounded-sm overflow-hidden border border-stone-200/90 shadow-card hover:shadow-editorial transition-all duration-300 flex flex-col md:flex-row"
              >
                {/* Maker Portrait */}
                <div className="relative w-full md:w-56 aspect-[3/4] md:aspect-auto shrink-0 bg-stone-100">
                  <Image
                    src={maker.photo}
                    alt={maker.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 224px"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-charcoal/80 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs font-medium">
                    {maker.villageDistrict.split(",")[0]}
                  </div>
                </div>

                {/* Maker Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center space-x-1.5 text-terracotta-700 text-xs font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{maker.villageDistrict}</span>
                    </div>

                    <h2 className="font-serif text-2xl font-medium text-charcoal">
                      <Link
                        href={`/makers/${maker.slug}`}
                        className="hover:text-terracotta-700 transition-colors"
                      >
                        {maker.name}
                      </Link>
                    </h2>

                    <p className="text-xs text-stone-500 font-medium mb-3">
                      {maker.title}
                    </p>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {maker.biography}
                    </p>

                    {maker.quote && (
                      <blockquote className="mt-3 pl-3 border-l-2 border-terracotta-400 italic text-xs text-stone-500 line-clamp-2">
                        “{maker.quote}”
                      </blockquote>
                    )}
                  </div>

                  {/* Impact Stats & Link */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-[11px] text-stone-500">
                      {impactData.yearsPracticing && (
                        <div>
                          <strong className="text-charcoal font-semibold block">
                            {impactData.yearsPracticing} yrs
                          </strong>
                          <span>Experience</span>
                        </div>
                      )}
                      {impactData.womenTrained && (
                        <div>
                          <strong className="text-charcoal font-semibold block">
                            {impactData.womenTrained}+
                          </strong>
                          <span>Apprentices</span>
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/makers/${maker.slug}`}
                      className="inline-flex items-center text-xs font-semibold text-terracotta-700 hover:text-terracotta-900 group"
                    >
                      <span>Explore Profile</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
