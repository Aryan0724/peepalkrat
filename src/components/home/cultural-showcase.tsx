"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass } from "lucide-react";

export function CulturalShowcase() {
  const craftTraditions = [
    {
      region: "Panipat",
      title: "The Handloom Capital",
      description: "Centuries of pit-loom flat-weaving, upcycled cotton yarn spinning, and architectural dhurries.",
      image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80",
      link: "/collections/panipat-heritage-weaves",
    },
    {
      region: "Rohtak",
      title: "Heirloom Phulkari",
      description: "Counted-thread geometrical silk floss embroidery created entirely from memory without stencils.",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
      link: "/collections/festive-phulkari",
    },
    {
      region: "Jhajjar & Mewat",
      title: "Wild Moonj Grasscraft",
      description: "Sculptural, water-resilient home vessels hand-plaited from wild seasonal canal-bank reeds.",
      image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=600&q=80",
      link: "/collections/moonj-botanical-series",
    },
    {
      region: "Rewari",
      title: "The Historic Brass Guild",
      description: "Solid bell-brass urlis and ceremonial lamps shaped using ancient cold-hammering techniques.",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
      link: "/shop?category=brassware-accents",
    },
  ];

  return (
    <section className="py-24 bg-charcoal text-white relative overflow-hidden">
      {/* Subtle decorative weave pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none pattern-weave" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 text-mustard-500 text-xs uppercase tracking-[0.25em] font-semibold mb-3">
            <Compass className="w-4 h-4" />
            <span>Cultural Provenance</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light leading-tight">
            The Living Craft Geography of Haryana
          </h2>
          <p className="mt-4 text-stone-300 text-sm leading-relaxed">
            Haryana’s crafts are not relics of a forgotten past; they are living traditions adapted by self-reliant women for the contemporary home.
          </p>
        </div>

        {/* 4 Regional Craft Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {craftTraditions.map((craft) => (
            <Link
              key={craft.region}
              href={craft.link}
              className="group block relative bg-stone-900 border border-stone-800 rounded-sm overflow-hidden hover:border-terracotta-500 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={craft.image}
                  alt={craft.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <span className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-xs font-medium">
                  {craft.region}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif text-lg font-medium text-white group-hover:text-terracotta-300 transition-colors">
                    {craft.title}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                    {craft.description}
                  </p>
                </div>

                <div className="inline-flex items-center text-xs text-terracotta-400 font-semibold group-hover:text-terracotta-300 pt-3 border-t border-stone-800">
                  <span>Explore Guild</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
