"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Landmark, Users } from "lucide-react";

interface AmbalaImpactPulseProps {
  makersCount?: number;
  disbursedAmountLakhs?: number;
  clustersCount?: number;
}

export function AmbalaImpactPulse({
  makersCount = 142,
  disbursedAmountLakhs = 28.4,
  clustersCount = 5,
}: AmbalaImpactPulseProps) {
  return (
    <section className="relative bg-[#442D1C] text-[#E8D1A7] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-y border-[#C8A253]/30">
      {/* Subtle traditional jaali background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none pattern-jaali" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-[#C8A253]/20">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#84592B] font-cinzel font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#84592B]" />
              <span>à¤¸à¥à¤¤à¥à¤°à¥€ à¤¶à¤•à¥à¤¤à¤¿ â€¢ à¤®à¥‡à¤µà¤¾à¤¤ à¤•à¤¾ à¤¸à¥à¤µà¤¾à¤­à¤¿à¤®à¤¾à¤¨</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-snug">
              Every Object Honors the Defiance & Economic Freedom of Ambala Women.
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              In the historic soil of Ambala, Haryana â€” across Nuh, Taoru, Punhana, Ferozepur Jhirka, and Nagina â€” women are transforming ancestral pit-looms, wild Moonj grasscraft, and terracotta into self-determined autonomy. Every purchase transfers living wages straight into her individual bank passbook.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/community"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#743014] to-[#501007] border border-[#84592B]/40 hover:border-[#84592B] text-white px-6 py-3 rounded-xs text-xs font-cinzel font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg group"
            >
              <span>Voices of Ambala</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/impact"
              className="inline-flex items-center space-x-2 border border-[#C8A253]/40 hover:border-[#84592B] bg-[#132247]/50 text-[#84592B] hover:text-white px-5 py-3 rounded-xs text-xs font-cinzel font-medium tracking-wide transition-colors"
            >
              <span>Living Wage Ledger</span>
            </Link>
          </div>
        </div>

        {/* Real-time Metric Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 text-center">
          {/* Pillar 1 */}
          <div className="p-5 rounded-xs border border-[#C8A253]/30 bg-[#132247]/50 backdrop-blur-xs space-y-1.5 hover:border-[#84592B] transition-colors">
            <div className="w-9 h-9 mx-auto rounded-full bg-[#743014]/30 flex items-center justify-center text-[#84592B] mb-2 border border-[#C8A253]/40">
              <Users className="w-4 h-4" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl text-white font-medium block">
              {makersCount}+
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#84592B] font-cinzel font-semibold block">
              Ambala Women Artisans
            </span>
            <span className="text-[10px] text-stone-400 block font-light">
              Holding their own bank passbooks & independent income
            </span>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-xs border border-[#C8A253]/30 bg-[#132247]/50 backdrop-blur-xs space-y-1.5 hover:border-[#84592B] transition-colors">
            <div className="w-9 h-9 mx-auto rounded-full bg-[#C8A253]/20 flex items-center justify-center text-[#84592B] mb-2 border border-[#C8A253]/40">
              <Landmark className="w-4 h-4" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl text-[#84592B] font-medium block">
              â‚¹{disbursedAmountLakhs}L+
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#84592B] font-cinzel font-semibold block">
              Direct Livelihood Disbursed
            </span>
            <span className="text-[10px] text-stone-400 block font-light">
              Transferred directly to village self-help groups (SHGs)
            </span>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-xs border border-[#C8A253]/30 bg-[#132247]/50 backdrop-blur-xs space-y-1.5 hover:border-[#84592B] transition-colors">
            <div className="w-9 h-9 mx-auto rounded-full bg-emerald-900/30 flex items-center justify-center text-emerald-400 mb-2 border border-[#C8A253]/40">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl text-white font-medium block">
              72%
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#84592B] font-cinzel font-semibold block">
              Direct Value Share
            </span>
            <span className="text-[10px] text-stone-400 block font-light">
              Of retail price goes to the maker & raw material clusters
            </span>
          </div>

          {/* Pillar 4 */}
          <div className="p-5 rounded-xs border border-[#C8A253]/30 bg-[#132247]/50 backdrop-blur-xs space-y-1.5 hover:border-[#84592B] transition-colors">
            <div className="w-9 h-9 mx-auto rounded-full bg-[#132247] flex items-center justify-center text-[#84592B] mb-2 border border-[#C8A253]/40">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl text-[#84592B] font-medium block">
              {clustersCount}
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#84592B] font-cinzel font-semibold block">
              Ambala Tehsil Clusters
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
