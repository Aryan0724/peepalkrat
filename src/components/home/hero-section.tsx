"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plane, Sparkles, ShieldCheck, Heart, Users } from "lucide-react";
import {
  CartoonWomanAtLoom,
  CartoonWomanSpinningCharkha,
  CartoonWomanWithPassbook,
  AnimatedCartoonEmpowermentBackground,
} from "@/components/illustrations/artisan-cartoons";
import { useCurrency } from "@/lib/currency-context";

interface HeroSectionProps {
  data?: {
    title?: string | null;
    subtitle?: string | null;
    content?: string | null;
    linkUrl?: string | null;
  };
}

export function HeroSection({ data }: HeroSectionProps) {
  const { currency, setCurrency } = useCurrency();
  const [activeCartoonTab, setActiveCartoonTab] = useState<"loom" | "charkha" | "passbook">("passbook");

  return (
    <section className="relative w-full bg-[#0B132B] text-[#FAF6EE] overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#C8A253]/30">
      {/* Background Animated Cartoon Motifs & Ambient Glow */}
      <AnimatedCartoonEmpowermentBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: NRI Diaspora Message & International CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Worldwide Diaspora Express Delivery Badge */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#132247]/90 border border-[#C8A253]/60 shadow-md backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#DFBD69] animate-pulse" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#DFBD69] font-cinzel font-semibold">
                Express Worldwide Delivery to US, UK, Canada & 45+ Countries
              </span>
            </div>

            {/* Main Headline for NRI & Global Patrons */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.06]">
                Handcrafted in Haryana. <br />
                <span className="italic font-cormorant text-[#DFBD69]">Cherished Worldwide.</span>
              </h1>
              <p className="font-cormorant text-xl sm:text-2xl text-stone-200 font-light italic">
                “Every heirloom you unbox abroad deposits a dignified living wage straight into a rural woman's bank account in Mewat.”
              </p>
            </div>

            {/* Narrative Paragraph */}
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-xl font-light">
              Connect your home with the authentic soul of India. From hand-plaited wild Moonj grass and pit-loom Panipat weaves to heirloom Phulkari textiles—lovingly handcrafted by 142+ independent women artisans across rural Haryana.
            </p>

            {/* Direct Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/shop" className="group">
                <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#C8A253] via-[#DFBD69] to-[#C8A253] text-[#0B132B] font-cinzel font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl hover:brightness-105 transition-all duration-300 flex items-center justify-center space-x-2 rounded-xs">
                  <span>Shop International Catalog</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link href="/community" className="group">
                <button className="w-full sm:w-auto px-7 py-4 bg-white/5 hover:bg-white/10 text-[#FAF6EE] border border-[#C8A253]/40 hover:border-[#DFBD69] font-cinzel text-xs uppercase tracking-[0.16em] transition-all duration-300 flex items-center justify-center space-x-2 rounded-xs">
                  <Heart className="w-3.5 h-3.5 text-[#DFBD69]" />
                  <span>Meet the Women Makers</span>
                </button>
              </Link>
            </div>

            {/* Global Trust Proof Points */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-[#DFBD69] font-medium">
                  3–5 Days
                </span>
                <span className="block text-[10px] sm:text-[11px] text-stone-400 uppercase tracking-widest mt-0.5">
                  DHL Express Pan-World
                </span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-white font-medium">
                  72%
                </span>
                <span className="block text-[10px] sm:text-[11px] text-stone-400 uppercase tracking-widest mt-0.5">
                  Direct Maker Share
                </span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-[#DFBD69] font-medium">
                  48+
                </span>
                <span className="block text-[10px] sm:text-[11px] text-stone-400 uppercase tracking-widest mt-0.5">
                  Countries Delivered
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Animated Cartoon Women Empowerment Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-[#132247]/80 backdrop-blur-md rounded-xs border-2 border-[#C8A253]/70 p-6 shadow-2xl">
              
              {/* Tab Selector for Cartoon Empowerment Animations */}
              <div className="flex items-center justify-between pb-4 border-b border-[#C8A253]/30">
                <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-[#DFBD69] flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  Mewat Women Empowerment
                </span>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setActiveCartoonTab("passbook")}
                    className={`px-2.5 py-1 text-[10px] rounded-xs font-cinzel transition-all ${
                      activeCartoonTab === "passbook"
                        ? "bg-[#DFBD69] text-[#0B132B] font-bold shadow-xs"
                        : "text-stone-400 hover:text-white"
                    }`}
                  >
                    Financial Freedom
                  </button>
                  <button
                    onClick={() => setActiveCartoonTab("loom")}
                    className={`px-2.5 py-1 text-[10px] rounded-xs font-cinzel transition-all ${
                      activeCartoonTab === "loom"
                        ? "bg-[#DFBD69] text-[#0B132B] font-bold shadow-xs"
                        : "text-stone-400 hover:text-white"
                    }`}
                  >
                    Weaving
                  </button>
                  <button
                    onClick={() => setActiveCartoonTab("charkha")}
                    className={`px-2.5 py-1 text-[10px] rounded-xs font-cinzel transition-all ${
                      activeCartoonTab === "charkha"
                        ? "bg-[#DFBD69] text-[#0B132B] font-bold shadow-xs"
                        : "text-stone-400 hover:text-white"
                    }`}
                  >
                    Spinning
                  </button>
                </div>
              </div>

              {/* Animated Cartoon Stage */}
              <div className="py-4 flex items-center justify-center min-h-[270px]">
                {activeCartoonTab === "passbook" && (
                  <div className="flex flex-col items-center animate-fade-in text-center">
                    <CartoonWomanWithPassbook className="w-56 h-56" />
                    <div className="mt-2 space-y-1">
                      <span className="text-xs font-serif font-bold text-white block">
                        Sole Signing Authority & Personal Passbook
                      </span>
                      <p className="text-[11px] text-stone-300 font-light max-w-xs">
                        142+ women in Nuh & Punhana command their own bank passbooks. 100% of craft earnings go directly to them.
                      </p>
                    </div>
                  </div>
                )}

                {activeCartoonTab === "loom" && (
                  <div className="flex flex-col items-center animate-fade-in text-center">
                    <CartoonWomanAtLoom className="w-56 h-56" />
                    <div className="mt-2 space-y-1">
                      <span className="text-xs font-serif font-bold text-white block">
                        Pit-Loom Weaving Mastery
                      </span>
                      <p className="text-[11px] text-stone-300 font-light max-w-xs">
                        Watch the animated wooden shuttle! Upcycled Desi cotton transformed into luxury dhurries and festive buntings.
                      </p>
                    </div>
                  </div>
                )}

                {activeCartoonTab === "charkha" && (
                  <div className="flex flex-col items-center animate-fade-in text-center">
                    <CartoonWomanSpinningCharkha className="w-56 h-56" />
                    <div className="mt-2 space-y-1">
                      <span className="text-xs font-serif font-bold text-white block">
                        Rotating Charkha & Pure Khadi Yarn
                      </span>
                      <p className="text-[11px] text-stone-300 font-light max-w-xs">
                        The charkha wheel spins non-stop! Reviving Mahatma Gandhi & Haryana's Swadeshi freedom tradition.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-[#C8A253]/30 flex items-center justify-between text-[11px] text-[#DFBD69]">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Fair Trade & Verified Wage</span>
                </span>
                <span className="font-cinzel text-[10px]">Estd. 1857 Lineage</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
