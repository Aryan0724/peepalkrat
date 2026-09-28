"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Landmark, Users } from "lucide-react";

interface MewatImpactPulseProps {
  makersCount?: number;
  disbursedAmountLakhs?: number;
  clustersCount?: number;
}

export function MewatImpactPulse({
  makersCount = 142,
  disbursedAmountLakhs = 28.4,
  clustersCount = 5,
}: MewatImpactPulseProps) {
  return (
    <section className="relative bg-[#1C1917] text-[#FAF8F5] py-14 px-4 sm:px-6 lg:px-8 overflow-hidden border-y border-stone-800">
      {/* Subtle traditional jaali background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none pattern-jaali" />
      
      {/* Decorative Golden Corner Accents */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-stone-800">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.28em] text-[#D4A338] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A338]" />
              <span>स्त्री शक्ति • मेवात का स्वाभिमान</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-snug">
              Every Object Carries the Hustle & Financial Freedom of Mewat Women.
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              In the heart of Mewat, Haryana — across Nuh, Taoru, Punhana, Ferozepur Jhirka, and Nagina — women are turning ancestral handloom, grasscraft, and pottery into generational autonomy. When you purchase from PeepalKrat, money goes straight into her personal bank passbook.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/community"
              className="inline-flex items-center space-x-2 bg-[#B84824] hover:bg-[#9A381C] text-white px-5 py-3 rounded-xs text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-editorial group"
            >
              <span>Voices of Mewat</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/impact"
              className="inline-flex items-center space-x-2 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white px-4 py-3 rounded-xs text-xs font-medium tracking-wide transition-colors"
            >
              <span>Living Wage Ledger</span>
            </Link>
          </div>
        </div>

        {/* Real-time Metric Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 text-center">
          {/* Pillar 1 */}
          <div className="p-4 rounded-xs border border-stone-800/80 bg-stone-900/40 backdrop-blur-xs space-y-1.5">
            <div className="w-8 h-8 mx-auto rounded-full bg-[#B84824]/20 flex items-center justify-center text-[#DA846A] mb-2">
              <Users className="w-4 h-4" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl text-white font-medium block">
              {makersCount}+
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#D4A338] font-semibold block">
              Mewat Women Artisans
            </span>
            <span className="text-[10px] text-stone-400 block font-light">
              Holding their own bank passbooks & independent income
            </span>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 rounded-xs border border-stone-800/80 bg-stone-900/40 backdrop-blur-xs space-y-1.5">
            <div className="w-8 h-8 mx-auto rounded-full bg-[#D4A338]/20 flex items-center justify-center text-[#D4A338] mb-2">
              <Landmark className="w-4 h-4" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl text-white font-medium block">
              ₹{disbursedAmountLakhs}L+
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#D4A338] font-semibold block">
              Direct Livelihood Disbursed
            </span>
            <span className="text-[10px] text-stone-400 block font-light">
              Transferred directly to village self-help groups (SHGs)
            </span>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 rounded-xs border border-stone-800/80 bg-stone-900/40 backdrop-blur-xs space-y-1.5">
            <div className="w-8 h-8 mx-auto rounded-full bg-[#4A6B52]/20 flex items-center justify-center text-[#4A6B52] mb-2">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl text-[#DA846A] font-medium block">
              72%
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#D4A338] font-semibold block">
              Direct Value Share
            </span>
            <span className="text-[10px] text-stone-400 block font-light">
              Of retail price goes to the maker & raw material clusters
            </span>
          </div>

          {/* Pillar 4 */}
          <div className="p-4 rounded-xs border border-stone-800/80 bg-stone-900/40 backdrop-blur-xs space-y-1.5">
            <div className="w-8 h-8 mx-auto rounded-full bg-stone-800 flex items-center justify-center text-stone-300 mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl text-white font-medium block">
              {clustersCount}
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#D4A338] font-semibold block">
              Mewat Craft Clusters
            </span>
            <span className="text-[10px] text-stone-400 block font-light">
              Nuh, Taoru, Punhana, Ferozepur Jhirka & Nagina
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
