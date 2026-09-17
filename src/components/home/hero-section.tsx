"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  data?: {
    title?: string | null;
    subtitle?: string | null;
    content?: string | null;
    linkUrl?: string | null;
    imageUrl?: string | null;
  };
}

export function HeroSection({ data }: HeroSectionProps) {
  const title = data?.title || "FOR THE PEOPLE. BY THE PEOPLE.";
  const subtitle = data?.subtitle || "Haryana Cultural Commerce Enterprise";
  const content =
    data?.content ||
    "Every piece has a maker. Every maker has a story. When you buy here, you participate in someone’s autonomy and livelihood across rural Haryana.";
  const linkUrl = data?.linkUrl || "/shop";
  const bgImage =
    data?.imageUrl ||
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=2000&q=85";

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Editorial Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Hands of Haryana woman weaver weaving pit-loom textile"
          fill
          priority
          className="object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Multilayer gradient for editorial depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-charcoal/40 to-charcoal" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Cultural Brand Eyebrow */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-khadi text-xs font-medium tracking-[0.25em] uppercase mb-8 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-mustard-500" />
          <span>{subtitle}</span>
        </div>

        {/* Primary Slogan */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-[1.08] mb-6 whitespace-pre-line">
          {title}
        </h1>

        {/* Supporting Narrative */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-stone-200 font-light leading-relaxed mb-10">
          {content}
        </p>

        {/* Dual Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={linkUrl} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-terracotta-600 hover:bg-terracotta-700 text-white tracking-wider uppercase text-xs font-semibold px-9 h-13 shadow-lg"
            >
              <span>Shop the Collection</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <Link href="/makers" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:border-white tracking-wider uppercase text-xs font-semibold px-8 h-13"
            >
              Meet the Makers
            </Button>
          </Link>
        </div>

        {/* Triple Traceability Metrics */}
        <div className="mt-16 pt-8 border-t border-white/15 grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
          <div>
            <span className="block font-serif text-2xl sm:text-3xl text-white font-medium">
              85+
            </span>
            <span className="block text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider mt-1">
              Women Artisans
            </span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl text-terracotta-300 font-medium">
              100%
            </span>
            <span className="block text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider mt-1">
              Traceable Provenance
            </span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl text-white font-medium">
              6
            </span>
            <span className="block text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider mt-1">
              Haryana Craft Districts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
