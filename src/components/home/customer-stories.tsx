"use client";

import React from "react";
import { Star, ShieldCheck, Sparkles } from "lucide-react";

export function CustomerStories() {
  const testimonials = [
    {
      name: "Radhika K. Sundaram",
      location: "Bengaluru, India",
      role: "Architect & Spatial Designer",
      quote:
        "The Sohna Geometric Dhurrie transformed our living room. You can feel the tactile density of the Panipat pit-loom immediately. Knowing that Sunita Devi’s name is on the certificate gives the piece soul.",
      product: "Sohna Geometric Handloom Dhurrie",
      rating: 5,
    },
    {
      name: "Marcus Vance",
      location: "London, United Kingdom",
      role: "Art Collector",
      quote:
        "International shipping via PeepalKrat was impeccably fast and 100% plastic-free. The counted-thread silk work on the Phulkari stole is of museum-level rarity. Truly commendable social enterprise.",
      product: "Bagh Resham Embroidered Silk Stole",
      rating: 5,
    },
    {
      name: "Devendra Singhal",
      location: "Gurugram, Haryana",
      role: "Patron since 2024",
      quote:
        "PeepalKrat proves that Haryana’s craftsmanship does not need charity. It commands respect on the global stage. The earthen water carafe from Jind cools drinking water sweeter than any modern filter.",
      product: "Jind Burnished Terracotta Carafe",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta-700 font-semibold block mb-3">
            Voices of Our Patrons
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
            Objects of Character in Discerning Homes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-sm border border-stone-200 shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex space-x-1 text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <blockquote className="font-serif italic text-sm sm:text-base text-charcoal leading-relaxed mb-6">
                  “{t.quote}”
                </blockquote>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-charcoal">{t.name}</h4>
                  <p className="text-stone-500 text-[11px]">{t.location} • {t.role}</p>
                </div>
                <div className="flex items-center text-peepal-700 space-x-1" title="Verified Purchase">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-medium uppercase tracking-wider">Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
