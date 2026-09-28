"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote, Sparkles, MapPin, CheckCircle2 } from "lucide-react";

interface ArtisanVoice {
  name: string;
  role: string;
  cluster: string;
  photo: string;
  quote: string;
  impactStory: string;
  daughtersSupported: string;
  craftSpecialty: string;
  slug: string;
}

const MEWAT_ARTISAN_VOICES: ArtisanVoice[] = [
  {
    name: "Asmeena Begum",
    role: "President, Nuh Women's Moonj Cooperative",
    cluster: "Nuh, Mewat, Haryana",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    quote: "Before the loom, my voice was confined to the four walls of the courtyard. Today, my elder daughter is pursuing her B.Ed in Gurugram, funded entirely from my own bank passbook.",
    impactStory: "Led 28 women in Nuh to harvest wild canal reeds and build an independent bank balance.",
    daughtersSupported: "2 Daughters in Higher College",
    craftSpecialty: "Wild Moonj Reed Coiled Basketry & Tableware",
    slug: "kamlesh-rani", // linking to existing maker profile or dedicated
  },
  {
    name: "Parveena Khan",
    role: "Master Needlework Artisan",
    cluster: "Taoru, Mewat, Haryana",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    quote: "Our Phulkari needles do not merely stitch flowers on unbleached silk. They stitch our autonomy. Every Rupee I earn stays in my control, deciding our home's nutrition and healthcare.",
    impactStory: "Trains teenage village girls in traditional counted-thread embroidery to prevent early forced marriages.",
    daughtersSupported: "Trained 35+ Young Women",
    craftSpecialty: "Counted-Thread Silk Floss Phulkari Stoles",
    slug: "santosh-kumari",
  },
  {
    name: "Rukhsana Bano",
    role: "Studio Potter & Kiln Lead",
    cluster: "Punhana, Mewat, Haryana",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    quote: "For decades, men owned the clay carts while women prepared the silt in secret. Today, our earthenware carries my stamped seal. In Punhana, women are recognized as masters of commerce.",
    impactStory: "Installed solar-powered potter wheels in Punhana village, tripling daily income.",
    daughtersSupported: "Household Debt Cleared",
    craftSpecialty: "Alluvial Terracotta Kiln Vessels & Baubles",
    slug: "rekha-sharma",
  },
  {
    name: "Shakila Bibi",
    role: "Handloom Dhurrie Weaver",
    cluster: "Ferozepur Jhirka, Mewat, Haryana",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    quote: "We formed our collective so no predatory middleman could take our margin. 72% of what a customer in Delhi or London pays arrives straight into our hands.",
    impactStory: "Coordinates 18 pit-looms weaving upcycled zero-waste cotton dhurries.",
    daughtersSupported: "First Generation Literate Family",
    craftSpecialty: "Heavyweight Geometric Flat-Weave Dhurries",
    slug: "sunita-devi",
  },
];

export function MewatVoicesSection() {
  return (
    <section className="py-24 bg-[#FAF8F5] relative overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.28em] text-[#B84824] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Sisterhood of Mewat • नारी शक्ति</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal leading-tight">
            Voices of Financial Independence
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
            Behind every stitch, coil, and brass bell is an Indian woman who chose resilience over submission. Meet the artisans of Mewat transforming rural Haryana through dignified craft entrepreneurship.
          </p>
        </div>

        {/* 4 Editorial Voice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEWAT_ARTISAN_VOICES.map((artisan, index) => (
            <div
              key={index}
              className="bg-white border border-stone-200 rounded-sm overflow-hidden flex flex-col justify-between shadow-card hover:shadow-editorial hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Photo Header */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                <Image
                  src={artisan.photo}
                  alt={artisan.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-[#1C1917]/80 text-[#D4A338] text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs font-semibold backdrop-blur-xs flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-[#D4A338]" />
                  <span>{artisan.cluster.split(",")[0]}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif text-lg font-medium leading-snug">{artisan.name}</h3>
                  <span className="text-[10px] text-stone-300 block font-light">{artisan.role}</span>
                </div>
              </div>

              {/* Quote & Impact Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="relative pl-3 border-l-2 border-[#B84824]">
                    <p className="font-serif italic text-xs text-charcoal/90 leading-relaxed font-light">
                      “{artisan.quote}”
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
                      Craft Discipline
                    </span>
                    <span className="text-xs font-medium text-charcoal block line-clamp-1">
                      {artisan.craftSpecialty}
                    </span>
                  </div>
                </div>

                {/* Footer Impact Badge & Link */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="inline-flex items-center text-[10px] font-semibold text-[#4A6B52] bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    <span>{artisan.daughtersSupported}</span>
                  </span>

                  <Link
                    href={`/makers/${artisan.slug}`}
                    className="text-xs font-semibold text-[#B84824] hover:text-[#9A381C] flex items-center group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Pieces</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Stories CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/community"
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#B84824] hover:text-[#9A381C] border-b-2 border-[#B84824] pb-1 hover:border-[#9A381C] transition-colors"
          >
            <span>Read Full Mewat Sisterhood Journal & Leave a Note of Gratitude</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
