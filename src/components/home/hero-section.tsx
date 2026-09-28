"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Shield, Flame, Compass } from "lucide-react";

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
  const title = "The Loom is Our Rebellion.";
  const subtitle = "1857 हरियाणा स्वाधीनता से 2026 स्त्री स्वराज्य";
  const content =
    "From the fiery 1857 peasant uprisings of Mewat and Ahirwal to modern economic independence—every piece we craft is an unbroken lineage of Swadeshi defiance. Pure hand-spun Desi cotton, wild Moonj grass, and alluvial pottery crafted by self-reliant women across rural Haryana.";
  const linkUrl = data?.linkUrl || "/shop";
  const heroImage =
    data?.imageUrl ||
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=85";

  return (
    <section className="relative w-full bg-[#0B132B] text-[#FAF6EE] overflow-hidden pt-8 pb-16 lg:py-24 border-b border-[#C8A253]/30">
      {/* Background ambient lighting and subtle Jaali grain */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(200,162,83,0.18)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(167,38,24,0.18)_0%,_transparent_60%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Swadeshi Movement Manifesto & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Archival Swadeshi Proclamation Badge */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#132247]/80 border border-[#C8A253]/50 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#DFBD69] animate-pulse" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#DFBD69] font-medium font-cinzel">
                {subtitle}
              </span>
            </div>

            {/* Main Editorial Headline with Indian Heritage Typography */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.05]">
                {title}
              </h1>
              <p className="font-cormorant italic text-xl sm:text-2xl text-[#DFBD69]/90 font-light">
                “When women spin their own freedom, an entire nation stands tall.”
              </p>
            </div>

            {/* Narrative Paragraph */}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              {content}
            </p>

            {/* High-Luxury Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href={linkUrl} className="group">
                <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#C8A253] via-[#DFBD69] to-[#C8A253] text-[#0B132B] font-cinzel font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:shadow-2xl hover:brightness-105 transition-all duration-300 flex items-center justify-center space-x-2 rounded-xs">
                  <span>Explore Swadeshi Catalog</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link href="/our-story" className="group">
                <button className="w-full sm:w-auto px-7 py-4 bg-white/5 hover:bg-white/10 text-[#FAF6EE] border border-[#C8A253]/40 hover:border-[#DFBD69] font-cinzel text-xs uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-center space-x-2 rounded-xs">
                  <Flame className="w-3.5 h-3.5 text-[#DFBD69]" />
                  <span>1857 Freedom Lineage</span>
                </button>
              </Link>
            </div>

            {/* Proof of Dignity & Social Sovereignty Metrics */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-[#DFBD69] font-medium">
                  142+
                </span>
                <span className="block text-[10px] sm:text-[11px] text-stone-400 uppercase tracking-widest mt-0.5">
                  Women Artisans
                </span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-white font-medium">
                  72%
                </span>
                <span className="block text-[10px] sm:text-[11px] text-stone-400 uppercase tracking-widest mt-0.5">
                  Living Wage Share
                </span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-[#DFBD69] font-medium">
                  5 Tehsils
                </span>
                <span className="block text-[10px] sm:text-[11px] text-stone-400 uppercase tracking-widest mt-0.5">
                  Mewat Clusters
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Museum Art Piece Framing (5 cols) */}
          <div className="lg:col-span-5 relative">
            {/* Gilded Double Border & Decorative Corner Plaque */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#C8A253]/30 via-transparent to-[#881C10]/30 rounded-xs blur-lg opacity-70" />

              {/* Main Image Frame with Archival Gold Edges */}
              <div className="relative rounded-xs overflow-hidden border-2 border-[#C8A253]/60 shadow-2xl bg-[#132247]">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={heroImage}
                    alt="Master weaver crafting heirloom Swadeshi textiles on traditional loom in Mewat"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent opacity-80" />
                </div>

                {/* Archival Museum Provenance Placard */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-xs bg-[#0B132B]/95 backdrop-blur-md border border-[#C8A253]/50 text-left space-y-1.5 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-cinzel font-semibold uppercase tracking-widest text-[#DFBD69]">
                      Dispatch #1857-MWT
                    </span>
                    <span className="text-[9px] bg-[#881C10] text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                      Swadeshi Authentic
                    </span>
                  </div>
                  <h4 className="font-serif text-base text-white font-medium">
                    Hand-Spun Desi Cotton & Moonj Weft
                  </h4>
                  <p className="text-[11px] text-stone-300 font-light flex items-center space-x-1.5">
                    <span>Cluster: <strong>Nuh & Taoru, Haryana</strong></span>
                    <span>•</span>
                    <span className="text-[#DFBD69]">14 Days on Pit Loom</span>
                  </p>
                </div>
              </div>

              {/* Decorative Floating Wax Seal Badge */}
              <div className="absolute -top-4 -right-4 hidden sm:flex flex-col items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#881C10] to-[#501007] border-2 border-[#DFBD69] text-center shadow-xl rotate-12">
                <span className="text-[8px] uppercase tracking-tighter text-[#DFBD69] font-cinzel font-bold">ESTD. 1857</span>
                <span className="text-[10px] text-white font-serif font-bold">MEWAT</span>
                <span className="text-[7px] text-[#DFBD69]/90 tracking-tighter">SWARAJ</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
