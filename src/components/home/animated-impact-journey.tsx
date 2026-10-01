"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Heart } from "lucide-react";
import {
  CartoonWomanSpinningCharkha,
  CartoonWomanWithPassbook,
  CartoonWomanAtLoom,
} from "@/components/illustrations/artisan-cartoons";

export function AnimatedImpactJourney() {
  const steps = [
    {
      step: "01",
      title: "Hand-Crafted with Dignity",
      subtitle: "The Loom, Wheel & Charkha",
      description:
        "In the villages of Nuh, Taoru & Panipat, 142+ women spin Desi cotton and plait wild Moonj grass. No automated millsâ€”every thread carries human patience and ancestral Haryana skill.",
      component: <CartoonWomanSpinningCharkha className="w-48 h-48 mx-auto" />,
      badge: "100% Hand-Crafted",
    },
    {
      step: "02",
      title: "Direct Living Wage Credit",
      subtitle: "Sole Signing Passbook Autonomy",
      description:
        "72% of retail price is credited directly into her personal bank passbook via weekly direct transfers. Her earnings fund her daughter's secondary schooling and household self-reliance.",
      component: <CartoonWomanWithPassbook className="w-48 h-48 mx-auto" />,
      badge: "72% Maker Share",
    },
    {
      step: "03",
      title: "Express to Your Overseas Home",
      subtitle: "Insured Pan-World Transit",
      description:
        "Carefully wrapped in unbleached cotton pouches and biodegradable corrugated boxes. Flown via DHL Express to USA, UK, Canada & 45+ countries within 3â€“5 days with customs pre-cleared.",
      component: <CartoonWomanAtLoom className="w-48 h-48 mx-auto" />,
      badge: "DHL 3â€“5 Days Worldwide",
    },
  ];

  return (
    <section className="py-20 bg-[#E8D1A7] text-[#442D1C] relative overflow-hidden border-b border-[#EAE0CE]">
      {/* Background jaali pattern */}
      <div className="absolute inset-0 pattern-jaali opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-[#C8A253]/50 text-xs text-[#743014] font-cinzel font-semibold uppercase tracking-[0.2em] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A253]" />
            <span>The Empowerment Continuum â€¢ à¤¸à¥à¤µà¤¾à¤µà¤²à¤‚à¤¬à¤¨ à¤¯à¤¾à¤¤à¥à¤°à¤¾</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#442D1C] leading-tight">
            How Your Diaspora Purchase Creates Rural Independence
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#743014] font-light">
            â€œFrom a quiet village courtyard in Ambala to your dining table abroad.â€
          </p>

          <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed max-w-2xl mx-auto">
            We eliminated middlemen, export distributors, and charitable pity. Here is the direct three-step journey linking rural women entrepreneurs with conscious global diaspora homes.
          </p>
        </div>

        {/* 3 Animated Illustrated Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((s) => (
            <div
              key={s.step}
              className="bg-white rounded-xs border border-[#EAE0CE] hover:border-[#C8A253] p-6 shadow-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <span className="font-cinzel text-xl font-bold text-[#84592B]">
                    {s.step}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-cinzel font-semibold bg-[#E8D1A7] text-[#743014] border border-[#C8A253]/40 uppercase tracking-wider">
                    {s.badge}
                  </span>
                </div>

                {/* Animated Cartoon Illustration */}
                <div className="py-4 my-2 bg-[#E8D1A7]/50 rounded-xs flex items-center justify-center border border-[#EAE0CE]/60">
                  {s.component}
                </div>

                {/* Step Details */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] uppercase font-cinzel font-semibold tracking-wider text-[#C8A253] block">
                    {s.subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#442D1C] group-hover:text-[#743014] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-light leading-relaxed pt-1">
                    {s.description}
                  </p>
                </div>
              </div>

              {/* Bottom Guarantee */}
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-[11px] text-stone-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5 shrink-0" />
                <span>Verified Traceability & Zero Exploitation</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-2">
          <Link
            href="/impact"
            className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-cinzel font-semibold text-[#743014] hover:text-[#442D1C] transition-colors group"
          >
            <span>View The Complete Ambala Living Wage Ledger</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
