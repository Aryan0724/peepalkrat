"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Quote, MapPin } from "lucide-react";

interface MakerItem {
  id: string;
  name: string;
  slug: string;
  title: string;
  photo: string;
  villageDistrict: string;
  craftSkill: string;
  biography: string;
  quote?: string | null;
}

interface MakerSpotlightProps {
  makers: MakerItem[];
}

export function MakerSpotlight({ makers }: MakerSpotlightProps) {
  return (
    <section className="py-24 bg-sandstone/50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta-700 font-semibold block mb-2">
              The Living Hands of Haryana
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
              Meet the Makers
            </h2>
          </div>
          <Link
            href="/makers"
            className="mt-4 md:mt-0 inline-flex items-center text-xs uppercase tracking-widest text-charcoal hover:text-terracotta-700 font-semibold group"
          >
            <span>View All 85+ Artisan Profiles</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Makers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {makers.slice(0, 4).map((maker) => (
            <div
              key={maker.id}
              className="bg-white rounded-sm overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-card transition-all duration-300 flex flex-col group"
            >
              {/* Portrait */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
                <Image
                  src={maker.photo}
                  alt={maker.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center space-x-1 text-[11px] text-stone-300 mb-0.5">
                    <MapPin className="w-3 h-3 text-terracotta-400 shrink-0" />
                    <span>{maker.villageDistrict}</span>
                  </div>
                  <h3 className="font-serif text-lg font-medium">{maker.name}</h3>
                  <p className="text-[11px] text-stone-300 line-clamp-1">{maker.title}</p>
                </div>
              </div>

              {/* Bio & Quote */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-terracotta-700 font-semibold block mb-1">
                    Specialty
                  </span>
                  <p className="text-xs text-charcoal font-medium line-clamp-1 mb-2">
                    {maker.craftSkill}
                  </p>
                  {maker.quote && (
                    <div className="relative pl-3 border-l-2 border-terracotta-400 italic text-xs text-stone-600 line-clamp-3">
                      “{maker.quote}”
                    </div>
                  )}
                </div>

                <Link
                  href={`/makers/${maker.slug}`}
                  className="inline-flex items-center text-xs font-semibold text-charcoal hover:text-terracotta-700 pt-2 border-t border-stone-100 group"
                >
                  <span>Explore Story & Pieces</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
