"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export interface CircularCategoryItem {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  badge?: string | null;
  isFeatured?: boolean;
}

interface CircularCategoryStripProps {
  categories: CircularCategoryItem[];
  title?: string;
  subtitle?: string;
  activeSlug?: string;
  baseUrl?: string;
}

export function CircularCategoryStrip({
  categories,
  title = "Explore the Guild Disciplines",
  subtitle = "हस्तकला एवं स्वदेशी शिल्प • Handcrafted in Haryana",
  activeSlug,
  baseUrl = "/categories",
}: CircularCategoryStripProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!categories || categories.length === 0) return null;

  return (
    <section className="relative w-full bg-[#FAF6EE] py-10 border-b border-[#EAE0CE] overflow-hidden">
      {/* Subtle jaali texture backdrop */}
      <div className="absolute inset-0 pattern-jaali pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Regal Heritage Styling */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#EAE0CE]/80">
          <div>
            <div className="flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#881C10] font-cinzel font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A253]" />
              <span>{subtitle}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#0B132B] font-medium tracking-tight">
              {title}
            </h2>
          </div>

          {/* Desktop Gilded Navigation Chevrons */}
          <div className="hidden sm:flex items-center space-x-2 mt-3 sm:mt-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll disciplines left"
              className="w-9 h-9 rounded-full bg-white border border-[#C8A253]/50 flex items-center justify-center text-[#0B132B] hover:bg-[#DFBD69]/20 hover:border-[#C8A253] transition-all shadow-xs"
            >
              <ChevronLeft className="w-4 h-4 text-[#881C10]" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll disciplines right"
              className="w-9 h-9 rounded-full bg-white border border-[#C8A253]/50 flex items-center justify-center text-[#0B132B] hover:bg-[#DFBD69]/20 hover:border-[#C8A253] transition-all shadow-xs"
            >
              <ChevronRight className="w-4 h-4 text-[#881C10]" />
            </button>
          </div>
        </div>

        {/* Carousel Container with Scroll Snap and Verified Tailwind Dimensions */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex items-start space-x-6 sm:space-x-8 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: "none" }}
          >
            {categories.map((cat, idx) => {
              const isActive = activeSlug === cat.slug;
              const href = baseUrl === "/shop" ? `/shop?category=${cat.slug}` : `/categories/${cat.slug}`;
              const disciplineIndex = (idx + 1).toString().padStart(2, "0");

              return (
                <Link
                  key={cat.id}
                  href={href}
                  className="group flex flex-col items-center flex-shrink-0 snap-start text-center focus:outline-none"
                  style={{ width: "100px" }}
                >
                  {/* Circular Medallion Frame */}
                  <div className="relative">
                    {/* Floating Discipline Number or Badge */}
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 bg-[#0B132B] text-[#DFBD69] text-[9px] font-cinzel font-semibold px-2 py-0.5 rounded-full border border-[#C8A253]/60 shadow-xs whitespace-nowrap">
                      {cat.badge || disciplineIndex}
                    </span>

                    {/* Circular Image Container with Verified Sizing & Gold Filigree Rim */}
                    <div
                      className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-tr from-[#C8A253] via-[#DFBD69] to-[#881C10] ring-2 ring-[#C8A253] scale-105 shadow-md"
                          : "bg-white border-2 border-[#C8A253]/40 group-hover:border-[#C8A253] group-hover:shadow-lg group-hover:scale-105"
                      }`}
                    >
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-stone-100 shadow-inner">
                        {cat.image ? (
                          <Image
                            src={cat.image}
                            alt={cat.name}
                            fill
                            sizes="(max-width: 640px) 80px, 96px"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-400 bg-sandstone/30">
                            <Sparkles className="w-5 h-5 text-[#C8A253]" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Discipline Name */}
                  <span
                    className={`mt-3 text-xs leading-snug font-serif line-clamp-2 px-1 transition-colors ${
                      isActive
                        ? "text-[#881C10] font-semibold"
                        : "text-[#0B132B] group-hover:text-[#881C10]"
                    }`}
                  >
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
