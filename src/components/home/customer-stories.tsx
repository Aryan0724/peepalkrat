"use client";

import React from "react";
import { Star, ShieldCheck, Sparkles, Plane } from "lucide-react";

export function CustomerStories() {
  const testimonials = [
    {
      name: "Marcus Vance",
      location: "London, United Kingdom",
      role: "Interior Architect & Art Collector",
      quote:
        "International DHL Express shipping to London arrived in 3 days. The counted-thread silk needlework on the Phulkari stole is of museum-grade rarity. Truly an elevated, ethical Indian luxury brand.",
      product: "Bagh Resham Silk Stole • Panipat Guild",
      rating: 5,
    },
    {
      name: "Priya & Vikram Rao",
      location: "Fremont, California, USA",
      role: "NRI Diaspora Patrons",
      quote:
        "Having this earthen terracotta urn in our Bay Area home brings the aroma of Haryana's monsoon rain to our living room. Knowing that the maker holds her own bank passbook makes it priceless.",
      product: "Jind Earthen Clay Vessel • Nuh Cluster",
      rating: 5,
    },
    {
      name: "Simran Grewal",
      location: "Toronto, Ontario, Canada",
      role: "Artisan Gifting Patron",
      quote:
        "We ordered 12 custom Moonj grass storage vessels for Diwali gifts across Ontario. Every piece came with a handwritten certificate signed in Hindi and English. Flawless customs clearance.",
      product: "Aravalli Wild Moonj Basket Set",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-[#FAF6EE] border-b border-[#EAE0CE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#881C10] font-cinzel font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A253]" />
            <span>NRI & Global Diaspora Feedback</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0B132B] font-normal">
            Cherished in Discerning Homes Worldwide
          </h2>
          <p className="text-xs text-stone-500 font-light">
            Read unboxing impressions from patrons in London, New York, Toronto, San Francisco and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-xs border border-[#EAE0CE] hover:border-[#C8A253] shadow-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase font-cinzel text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Verified Global Delivery
                  </span>
                </div>
                <p className="font-serif italic text-stone-700 text-sm leading-relaxed mb-6">
                  “{t.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 space-y-1 text-xs">
                <span className="font-semibold text-[#0B132B] block text-sm">
                  {t.name}
                </span>
                <span className="text-stone-500 text-[11px] block">
                  {t.location} • <strong className="text-stone-600 font-normal">{t.role}</strong>
                </span>
                <span className="text-[11px] text-[#881C10] font-cinzel block pt-1">
                  Piece: {t.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
