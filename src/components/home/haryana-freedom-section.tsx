"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Flame, ShieldAlert, Award, ArrowRight, Sparkles } from "lucide-react";

export function HaryanaFreedomSection() {
  const chapters = [
    {
      period: "1857",
      title: "The Aravalli Rebellion",
      subtitle: "Historic Resistance & Peasant Autonomy",
      description:
        "When the 1857 revolt swept across northern India, the Meo peasant warriors of Mewat and Rao Tula Ram of Ahirwal rose in fierce defiance against colonial garrisons, declaring their soil sovereign.",
      stat: "1857 Uprising",
      statLabel: "Historic Cradle of Revolt",
      image: "/peepalkraft/workshop/workshop-full-2.jpg",
    },
    {
      period: "Swadeshi Era",
      title: "The Loom as Defiance",
      subtitle: "Hand-Spun Khadi & Indigenous Looms",
      description:
        "Colonial Manchester cloth was rejected for coarse, hand-spun Desi cotton. The pit-loom and charkha became instruments of non-violent rebellion, preserving Haryana's indigenous textile mastery.",
      stat: "100% Desi Khadi",
      statLabel: "Weapon of Self-Reliance",
      image: "/peepalkraft/products/skirt-embroidered.jpg",
    },
    {
      period: "2026",
      title: "Stree Swaraj (Women's Sovereignty)",
      subtitle: "Direct Living Wages & Financial Autonomy",
      description:
        "Today, the battleground is economic dignity. 142+ women in Mewat run the looms, sculpt clay, and weave Moonj grass—commanding their own bank accounts and leading the new wave of rural autonomy.",
      stat: "142+ Passbooks",
      statLabel: "Individual Financial Autonomy",
      image: "/peepalkraft/workshop/artisan-portrait-1.jpg",
    },
  ];

  return (
    <section className="py-24 bg-[#0B132B] text-[#FAF6EE] relative overflow-hidden border-b border-[#C8A253]/30">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#881C10] rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#C8A253] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#132247] border border-[#C8A253]/50 text-xs text-[#DFBD69] font-cinzel font-medium uppercase tracking-[0.2em]">
            <Flame className="w-3.5 h-3.5 text-[#DFBD69]" />
            <span>The Historical Continuum</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            From 1857 Swadeshi Defiance to 2026 Stree Swaraj
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#DFBD69]/90 font-light">
            “The threads we weave today were first spun in the fires of Haryana’s fight for independence.”
          </p>

          <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed pt-2 max-w-2xl mx-auto">
            PeepalKrat is not an ordinary commercial brand. It is the living continuation of Haryana's sacred Swadeshi tradition, channeling centuries of rural courage into women's financial autonomy.
          </p>
        </div>

        {/* 3 Chronological Chapters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {chapters.map((ch, idx) => (
            <div
              key={ch.title}
              className="bg-[#132247]/60 backdrop-blur-md rounded-xs border border-[#C8A253]/40 overflow-hidden shadow-xl hover:border-[#DFBD69] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Visual Imagery */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
                  <Image
                    src={ch.image}
                    alt={ch.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#132247] via-transparent to-transparent" />
                  
                  {/* Floating Era Tag */}
                  <span className="absolute top-3 left-3 bg-[#881C10] text-white text-[10px] font-cinzel font-bold px-2.5 py-1 rounded-xs uppercase tracking-wider border border-[#DFBD69]/40 shadow-sm">
                    {ch.period}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-2">
                  <span className="text-[11px] text-[#DFBD69] font-medium tracking-wide block font-serif">
                    {ch.subtitle}
                  </span>
                  <h3 className="font-serif text-xl text-white font-medium group-hover:text-[#DFBD69] transition-colors">
                    {ch.title}
                  </h3>
                  <p className="text-xs text-stone-300 font-light leading-relaxed pt-1">
                    {ch.description}
                  </p>
                </div>
              </div>

              {/* Bottom Stat Footer */}
              <div className="p-4 mx-6 mb-6 rounded-xs bg-[#0B132B]/80 border border-[#C8A253]/30 flex items-center justify-between text-xs">
                <div>
                  <span className="block font-serif text-sm font-semibold text-[#DFBD69]">
                    {ch.stat}
                  </span>
                  <span className="block text-[10px] text-stone-400">
                    {ch.statLabel}
                  </span>
                </div>
                <Sparkles className="w-4 h-4 text-[#C8A253]" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Bar */}
        <div className="text-center pt-2">
          <Link href="/our-story" className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-cinzel font-semibold text-[#DFBD69] hover:text-white transition-colors group">
            <span>Read the Complete 1857–2026 Swadeshi Manifesto</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
