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
  baseUrl?: string; // "/categories" or "/shop?category="
}

export function CircularCategoryStrip({
  categories,
  title,
  subtitle,
  activeSlug,
  baseUrl = "/categories",
}: CircularCategoryStripProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!categories || categories.length === 0) return null;

  return (
    <section className="relative w-full bg-[#FAF8F5] py-7 sm:py-9 border-b border-stone-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Optional Section Header */}
        {(title || subtitle) && (
          <div className="flex items-center justify-between mb-5">
            <div>
              {subtitle && (
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-terracotta-700 font-semibold block">
                  {subtitle}
                </span>
              )}
              {title && (
                <h2 className="font-serif text-xl sm:text-2xl text-charcoal font-normal">
                  {title}
                </h2>
              )}
            </div>

            {/* Desktop Navigation Chevrons */}
            <div className="hidden md:flex items-center space-x-1.5">
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll categories left"
                className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-charcoal hover:bg-stone-100 hover:border-stone-300 transition-colors shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll categories right"
                className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-charcoal hover:bg-stone-100 hover:border-stone-300 transition-colors shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Carousel Container with Scroll Snap */}
        <div className="relative group">
          {/* Edge Blur / Fade gradients for smooth scrolling feel */}
          <div className="hidden md:block pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10" />
          <div className="hidden md:block pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10" />

          {/* Desktop Left/Right floating chevrons if no header title */}
          {!title && (
            <>
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll categories left"
                className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 border border-stone-200 items-center justify-center text-charcoal hover:bg-white hover:shadow-md transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll categories right"
                className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 border border-stone-200 items-center justify-center text-charcoal hover:bg-white hover:shadow-md transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Horizontally scrollable row of circular bubbles */}
          <div
            ref={scrollContainerRef}
            className="flex items-start space-x-4 sm:space-x-7 overflow-x-auto pb-2 scrollbar-none scroll-smooth snap-x snap-mandatory px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((cat) => {
              const isActive = activeSlug === cat.slug;
              const href = baseUrl === "/shop" ? `/shop?category=${cat.slug}` : `/categories/${cat.slug}`;

              return (
                <Link
                  key={cat.id}
                  href={href}
                  className="group flex flex-col items-center flex-shrink-0 snap-start text-center focus:outline-none"
                  style={{ width: "88px" }}
                >
                  {/* Circular Avatar Frame */}
                  <div className="relative">
                    {/* Floating Badge */}
                    {cat.badge && (
                      <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 z-20 bg-terracotta-600 text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                        {cat.badge}
                      </span>
                    )}

                    {/* Circular Image Container with Outer Accent Ring */}
                    <div
                      className={`relative w-18 h-18 sm:w-21 sm:h-21 rounded-full p-[3px] transition-all duration-300 ${
                        isActive
                          ? "bg-terracotta-600 ring-2 ring-terracotta-600 ring-offset-2 ring-offset-[#FAF8F5] scale-105"
                          : "bg-white border-2 border-stone-200/90 group-hover:border-terracotta-500 group-hover:shadow-md group-hover:scale-105"
                      }`}
                    >
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-stone-100">
                        {cat.image ? (
                          <Image
                            src={cat.image}
                            alt={cat.name}
                            fill
                            sizes="(max-width: 640px) 72px, 84px"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-400 bg-sandstone/30">
                            <Sparkles className="w-5 h-5 text-terracotta-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Category Title Underneath */}
                  <span
                    className={`mt-2.5 text-[11px] sm:text-xs leading-tight font-medium line-clamp-2 px-0.5 transition-colors ${
                      isActive
                        ? "text-terracotta-700 font-semibold"
                        : "text-charcoal group-hover:text-terracotta-700"
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
