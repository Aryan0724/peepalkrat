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
    <section className="relative bg-[#0B132B] text-[#FAF6EE] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-y border-[#C8A253]/30">
      {/* Subtle traditional jaali background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none pattern-jaali" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-[#C8A253]/20">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#DFBD69] font-cinzel font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#DFBD69]" />
              <span>Artisan Empowerment · The Pride of Mewat</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-snug">
              Every Object Honors the Defiance & Economic Freedom of Mewat Women.
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              In the historic soil of Mewat, Haryana — across Nuh, Taoru, Punhana, Ferozepur Jhirka, and Nagina — women are transforming ancestral pit-looms, wild Moonj grasscraft, and terracotta into self-determined autonomy. Every purchase transfers living wages straight into her individual bank passbook.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/community"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#881C10] to-[#501007] border border-[#DFBD69]/40 hover:border-[#DFBD69] text-white px-6 py-3 rounded-xs text-xs font-cinzel font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg group"
            >
              <span>Voices of Mewat</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/impact"
              className="inline-flex items-center space-x-2 border border-[#C8A253]/40 hover:border-[#DFBD69] bg-[#132247]/50 text-[#DFBD69] hover:text-white px-5 py-3 rounded-xs text-xs font-cinzel font-medium tracking-wide transition-colors"
            >
              <span>Living Wage Ledger</span>
            </Link>
          </div>
        </div>

        {/* Real-time Metric Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 text-center">
          {/* Pillar 1 */}
          <div className="p-5 rounded-xs border border-[#C8A253]/30 bg-[#132247]/50 backdrop-blur-xs space-y-1.5 hover:border-[#DFBD69] transition-colors">
            <div className="w-9 h-9 mx-auto rounded-full bg-[#881C10]/30 flex items-center justify-center text-[#DFBD69] mb-2 border border-[#C8A253]/40">
              <Users className="w-4 h-4" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl text-white font-medium block">
              {makersCount}+
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#DFBD69] font-cinzel font-semibold block">
              Mewat Women Artisans
            </span>
            <span className="text-[10px] text-stone-400 block font-light">
              Holding their own bank passbooks & independent income
            </span>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-xs border border-[#C8A253]/30 bg-[#132247]/50 backdrop-blur-xs space-y-1.5 hover:border-[#DFBD69] transition-colors">
            <div className="w-9 h-9 mx-auto rounded-full bg-[#C8A253]/20 flex items-center justify-center text-[#DFBD69] mb-2 border border-[#C8A253]/40">
              <Landmark className="w-4 h-4" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl text-[#DFBD69] font-medium block">
              ₹{disbursedAmountLakhs}L+
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#DFBD69] font-cinzel font-semibold block">
              Direct Livelihood Disbursed
            </span>
            <span className="text-[10px] text-stone-400 block font-light">
              Transferred directly to village self-help groups (SHGs)
            </span>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-xs border border-[#C8A253]/30 bg-[#132247]/50 backdrop-blur-xs space-y-1.5 hover:border-[#DFBD69] transition-colors">
            <div className="w-9 h-9 mx-auto rounded-full bg-emerald-900/30 flex items-center justify-center text-emerald-400 mb-2 border border-[#C8A253]/40">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl text-white font-medium block">
              72%
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#DFBD69] font-cinzel font-semibold block">
              Direct Value Share
            </span>
            <span className="text-[10px] text-stone-400 block font-light">
              Of retail price goes to the maker & raw material clusters
            </span>
          </div>

          {/* Pillar 4 */}
          <div className="p-5 rounded-xs border border-[#C8A253]/30 bg-[#132247]/50 backdrop-blur-xs space-y-1.5 hover:border-[#DFBD69] transition-colors">
            <div className="w-9 h-9 mx-auto rounded-full bg-[#132247] flex items-center justify-center text-[#DFBD69] mb-2 border border-[#C8A253]/40">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl text-[#DFBD69] font-medium block">
              {clustersCount}
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#DFBD69] font-cinzel font-semibold block">
              Mewat Tehsil Clusters
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
