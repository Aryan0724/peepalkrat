"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  title = "Explore the Collection",
  subtitle = "Handcrafted in Haryana",
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
    <section className="relative w-full bg-[#FAF7F2] py-14 sm:py-16 border-b border-[#442D1C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div className="text-xs sm:text-sm font-sans text-[#743014] font-semibold mb-1.5 tracking-widest uppercase">
              {subtitle}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#442D1C] tracking-tight font-normal">
              {title}
            </h2>
          </div>

          {/* Desktop Navigation Chevrons */}
          <div className="hidden sm:flex items-center space-x-2 mt-4 sm:mt-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full border border-[#442D1C]/20 flex items-center justify-center text-[#442D1C] hover:border-[#743014] hover:text-[#743014] hover:bg-[#FAF7F2] transition-colors bg-white shadow-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full border border-[#442D1C]/20 flex items-center justify-center text-[#442D1C] hover:border-[#743014] hover:text-[#743014] hover:bg-[#FAF7F2] transition-colors bg-white shadow-xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container - with generous top padding to prevent badge/hover clipping */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex items-start space-x-6 sm:space-x-8 overflow-x-auto pt-6 pb-6 px-2 scroll-smooth snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: "none" }}
          >
            {categories.map((cat) => {
              const isActive = activeSlug === cat.slug;
              const href = baseUrl === "/shop" ? `/shop?category=${cat.slug}` : `/categories/${cat.slug}`;

              return (
                <Link
                  key={cat.id}
                  href={href}
                  className="group flex flex-col items-center flex-shrink-0 snap-start text-center focus:outline-none transition-transform"
                  style={{ width: "150px" }}
                >
                  {/* Circular Frame */}
                  <div className="relative">
                    {cat.badge && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-[#743014] text-[#FAF7F2] text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                        {cat.badge}
                      </span>
                    )}
                    <div
                      className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full p-[3px] transition-all duration-300 shadow-sm ${
                        isActive
                          ? "bg-[#743014] ring-2 ring-[#743014] ring-offset-2 ring-offset-[#FAF7F2]"
                          : "bg-transparent group-hover:bg-[#E8D1A7] group-hover:scale-105"
                      }`}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden bg-white border border-[#E8D1A7]/60 relative shadow-inner">
                        {cat.image ? (
                          <Image
                            src={cat.image}
                            alt={cat.name}
                            fill
                            sizes="(max-width: 640px) 128px, 144px"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl font-display text-[#442D1C]">
                            {cat.name.charAt(0)}
                          </div>
                        )}
                        {/* Soft overlay on hover */}
                        <div className="absolute inset-0 bg-[#743014]/0 group-hover:bg-[#743014]/10 transition-colors duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="mt-4 w-full px-1">
                    <h3
                      className={`text-sm sm:text-[15px] font-sans font-medium leading-snug transition-colors line-clamp-2 ${
                        isActive ? "text-[#743014] font-semibold" : "text-[#442D1C] group-hover:text-[#743014]"
                      }`}
                    >
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
