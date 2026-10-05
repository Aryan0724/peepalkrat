"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

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
  makers?: MakerItem[];
}

export function MakerSpotlight({ makers = [] }: MakerSpotlightProps) {
  // Use mock data for visual demonstration if DB is empty, matching real artisans.
  const displayMakers = makers && makers.length > 0 ? makers : [
    {
      id: "1",
      name: "Diksha & Team",
      slug: "diksha-team",
      title: "Master Artisans",
      photo: "/peepalkraft/workshop/artisan-portrait-1.jpg",
      villageDistrict: "Kanshi Nagar, Ambala City",
      craftSkill: "Hand Embroidery",
      biography: "Diksha leads a collective of women specializing in intricate hand embroidery for accessories and garments.",
    },
    {
      id: "2",
      name: "Artisan Collective",
      slug: "artisan-collective",
      title: "Garment Makers",
      photo: "/peepalkraft/workshop/workshop-full-1.jpg",
      villageDistrict: "Model Town, Ambala City",
      craftSkill: "Master Tailoring",
      biography: "A tight-knit group of skilled tailors crafting high-quality skirts, kurtas, and traditional wear.",
    }
  ];

  return (
    <section className="py-24 bg-[#FAF7F2] relative overflow-hidden border-b border-[#442D1C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="relative">
            <span className="text-[12px] uppercase tracking-widest text-[#743014] font-sans font-semibold block mb-2">
              The Hands Behind the Craft
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#442D1C] font-normal">
              Meet the Women of PeepalKraft
            </h2>
            <div className="absolute -top-10 -right-24 transform rotate-[15deg] font-handwritten text-[#84592B] text-2xl hidden md:block">
              Our Heroes
            </div>
          </div>
          <Link
            href="/our-story"
            className="mt-4 md:mt-0 inline-flex items-center text-xs uppercase tracking-widest text-[#442D1C] hover:text-[#743014] font-sans font-semibold transition-colors group"
          >
            <span>View All Artisan Profiles</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform text-[#743014]" />
          </Link>
        </div>

        {/* Makers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {displayMakers.slice(0, 2).map((maker) => (
            <div
              key={maker.id}
              className="bg-white p-5 rounded-xs shadow-xs border border-[#E8D1A7]/40 hover:border-[#743014]/40 transition-colors flex flex-col sm:flex-row gap-6 group"
            >
              {/* Portrait */}
              <div className="relative w-full sm:w-2/5 aspect-[3/4] sm:aspect-auto overflow-hidden bg-[#FAF7F2] border-stitch">
                <Image
                  src={maker.photo}
                  alt={maker.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-center py-2 sm:py-6 sm:pr-6">
                <div className="font-sans text-[11px] text-[#9D9167] uppercase tracking-wider mb-2 font-semibold">
                  {maker.craftSkill}
                </div>
                <h3 className="font-display text-2xl text-[#442D1C] mb-2">
                  {maker.name}
                </h3>
                <div className="flex items-center text-[12px] text-[#5A4231] mb-4">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-[#743014]" />
                  {maker.villageDistrict}
                </div>
                <p className="text-sm text-[#5A4231] font-light leading-relaxed mb-6">
                  {maker.biography}
                </p>
                <Link
                  href={`/makers/${maker.slug}`}
                  className="inline-flex items-center text-xs font-sans uppercase tracking-widest font-semibold text-[#743014] hover:text-[#5C240E] transition-colors mt-auto"
                >
                  Read Story <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
