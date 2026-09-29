"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";

interface HeroSectionProps {
  data?: {
    title?: string | null;
    subtitle?: string | null;
    content?: string | null;
    linkUrl?: string | null;
  };
}

const LIVE_STATS = [
  { value: "142+", label: "Women Earning" },
  { value: "12", label: "Mewat Villages" },
  { value: "₹2.1 Cr", label: "Wages Disbursed" },
  { value: "48+", label: "Countries Reached" },
];

const ARTISAN_SPOTLIGHT = [
  {
    name: "Sameena Begum",
    village: "Nuh",
    craft: "Pit-Loom Weaver",
    income: "₹7,200 / month",
    years: "3 yrs",
    initials: "SB",
  },
  {
    name: "Reshma Devi",
    village: "Punhana",
    craft: "Moonj Artisan",
    income: "₹5,800 / month",
    years: "2 yrs",
    initials: "RD",
  },
  {
    name: "Fatima Khatoon",
    village: "Ferozpur Jhirka",
    craft: "Phulkari Embroiderer",
    income: "₹8,500 / month",
    years: "4 yrs",
    initials: "FK",
  },
];

export function HeroSection({ data }: HeroSectionProps) {
  const [activeArtisan, setActiveArtisan] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveArtisan((p) => (p + 1) % ARTISAN_SPOTLIGHT.length);
      setTick((p) => p + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const artisan = ARTISAN_SPOTLIGHT[activeArtisan];

  return (
    <section className="relative w-full bg-[#FAF6EE] overflow-hidden border-b border-[#EAE0CE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[88vh]">

          {/* ─── LEFT: Main Editorial Content (7 cols) ─── */}
          <div className="lg:col-span-7 flex flex-col justify-center py-20 lg:pr-16 space-y-10">

            {/* Location badge */}
            <div className="flex items-center space-x-2 text-[#881C10]">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-[11px] font-cinzel font-semibold uppercase tracking-[0.25em]">
                Mewat, Haryana, India · Est. 2021
              </span>
            </div>

            {/* Primary headline */}
            <div className="space-y-4">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-[#0B132B] leading-[1.06] tracking-tight">
                {data?.title || (
                  <>
                    Handcrafted in{" "}
                    <span className="relative">
                      Haryana.
                      <span
                        className="absolute bottom-1 left-0 w-full h-0.5 bg-[#C8A253]"
                        style={{ transform: "scaleX(1)", transformOrigin: "left" }}
                      />
                    </span>
                    <br />
                    <em className="font-cormorant italic text-[#881C10] not-italic">
                      Worn across the world.
                    </em>
                  </>
                )}
              </h1>

              <p className="font-cormorant text-xl sm:text-2xl text-stone-500 font-light italic max-w-xl leading-relaxed">
                {data?.subtitle ||
                  "Every piece you bring home delivers a living wage directly to a woman's bank account in rural Mewat."}
              </p>
            </div>

            {/* Live stats ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 border-t border-b border-[#EAE0CE] py-7">
              {LIVE_STATS.map((s, i) => (
                <div key={i}>
                  <div className="font-serif text-2xl sm:text-3xl font-medium text-[#0B132B]">
                    {s.value}
                  </div>
                  <div className="text-[10px] font-cinzel uppercase tracking-widest text-stone-400 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/shop" className="group">
                <button className="w-full sm:w-auto px-8 py-4 bg-[#0B132B] text-[#FAF6EE] font-cinzel font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#881C10] transition-colors duration-300 flex items-center justify-center space-x-2">
                  <span>Shop the Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/impact" className="group">
                <button className="w-full sm:w-auto px-7 py-4 border border-[#0B132B]/30 text-[#0B132B] font-cinzel text-xs uppercase tracking-[0.16em] hover:border-[#C8A253] hover:text-[#881C10] transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Read the Impact Report</span>
                </button>
              </Link>
            </div>

            {/* Trust note */}
            <div className="flex items-center space-x-2 text-stone-400 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Fair wage verified · DHL Express worldwide · Customs pre-cleared</span>
            </div>
          </div>

          {/* ─── RIGHT: Dark Editorial Panel (5 cols) ─── */}
          <div className="lg:col-span-5 bg-[#0B132B] flex flex-col justify-between relative overflow-hidden min-h-[60vh] lg:min-h-0">

            {/* Top label */}
            <div className="p-8 border-b border-[#C8A253]/20">
              <div className="text-[10px] font-cinzel font-semibold uppercase tracking-[0.3em] text-[#DFBD69]">
                Women Behind Your Purchase
              </div>
            </div>

            {/* Artisan card — animated crossfade */}
            <div className="flex-1 p-8 flex flex-col justify-center" key={tick}>
              <div style={{ animation: "heroFadeIn 0.6s ease-out" }}>
                {/* Avatar placeholder with initials (premium style) */}
                <div className="w-16 h-16 rounded-full border-2 border-[#C8A253]/50 flex items-center justify-center mb-6">
                  <span className="font-serif text-xl text-[#DFBD69] font-medium">
                    {artisan.initials}
                  </span>
                </div>

                {/* Income transformation */}
                <div className="mb-6 pb-6 border-b border-white/10">
                  <div className="text-[10px] font-cinzel uppercase tracking-widest text-stone-500 mb-2">
                    Monthly Earnings Today
                  </div>
                  <div className="font-serif text-4xl sm:text-5xl font-light text-[#DFBD69]">
                    {artisan.income}
                  </div>
                </div>

                {/* Artisan details */}
                <div className="space-y-3">
                  <div>
                    <div className="font-cinzel font-bold text-base text-white">
                      {artisan.name}
                    </div>
                    <div className="text-stone-400 text-xs mt-0.5">
                      {artisan.craft} · {artisan.village}, Mewat
                    </div>
                  </div>
                  <div className="text-[11px] text-stone-400 font-light">
                    Active artisan for{" "}
                    <span className="text-[#DFBD69] font-medium">
                      {artisan.years}
                    </span>{" "}
                    with sole bank account authority
                  </div>
                </div>

                {/* Dot indicator */}
                <div className="flex space-x-1.5 mt-8">
                  {ARTISAN_SPOTLIGHT.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveArtisan(i)}
                      className={`h-0.5 transition-all duration-300 ${
                        i === activeArtisan
                          ? "w-8 bg-[#DFBD69]"
                          : "w-3 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom: global delivery bar */}
            <div className="p-6 border-t border-[#C8A253]/20 bg-[#132247]/60">
              <div className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-stone-400 mb-1">
                Express Worldwide Delivery
              </div>
              <div className="text-sm font-serif text-[#DFBD69] font-light">
                USA · UK · Canada · UAE · Australia · 45+ Countries
              </div>
              <div className="text-[10px] text-stone-500 mt-0.5">
                DHL Express · 3–5 Business Days
              </div>
            </div>

            {/* Decorative Phulkari-inspired corner border */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#C8A253]/30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#C8A253]/30 pointer-events-none" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
