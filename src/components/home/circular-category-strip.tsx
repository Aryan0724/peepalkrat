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
    <section className="relative w-full bg-[#FAF7F2] py-12 border-b border-[#442D1C]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl text-[#442D1C] tracking-tight">
              {title}
            </h2>
            <div className="text-[11.5px] font-sans text-[#9D9167] font-semibold mt-1 tracking-wider uppercase">
              {subtitle}
            </div>
          </div>

          {/* Desktop Navigation Chevrons */}
          <div className="hidden sm:flex items-center space-x-2 mt-3 sm:mt-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-8 h-8 rounded-full border border-[#442D1C]/15 flex items-center justify-center text-[#442D1C] hover:border-[#743014] hover:text-[#743014] transition-colors bg-white shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-8 h-8 rounded-full border border-[#442D1C]/15 flex items-center justify-center text-[#442D1C] hover:border-[#743014] hover:text-[#743014] transition-colors bg-white shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex items-start space-x-6 sm:space-x-8 overflow-x-auto pb-6 pt-1 scroll-smooth snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: "none" }}
          >
            {categories.map((cat, idx) => {
              const isActive = activeSlug === cat.slug;
              const href = baseUrl === "/shop" ? `/shop?category=${cat.slug}` : `/categories/${cat.slug}`;

              return (
                <Link
                  key={cat.id}
                  href={href}
                  className="group flex flex-col items-center flex-shrink-0 snap-start text-center focus:outline-none"
                  style={{ width: "100px" }}
                >
                  {/* Circular Frame */}
                  <div className="relative">
                    <div
                      className={`w-[90px] h-[90px] rounded-full p-[2px] transition-all duration-300 ${
                        isActive
                          ? "bg-[#743014]"
                          : "bg-transparent group-hover:bg-[#E8D1A7]"
                      }`}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden bg-[#FAF7F2] border border-[#E8D1A7]/40 relative">
                        {cat.image ? (
                          <Image
                            src={cat.image}
                            alt={cat.name}
                            fill
                            sizes="90px"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl font-display text-[#442D1C]">
                            {cat.name.charAt(0)}
                          </div>
                        )}
                        {/* Soft overlay on hover */}
                        <div className="absolute inset-0 bg-[#743014]/0 group-hover:bg-[#743014]/10 transition-colors duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="mt-3 w-full">
                    <h3
                      className={`text-[12px] font-sans font-medium leading-tight transition-colors line-clamp-2 ${
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
