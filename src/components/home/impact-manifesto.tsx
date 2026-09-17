"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface ImpactManifestoProps {
  data?: {
    title?: string | null;
    subtitle?: string | null;
    content?: string | null;
    linkUrl?: string | null;
  };
}

export function ImpactManifesto({ data }: ImpactManifestoProps = {}) {
  const subtitle = data?.subtitle || "The Philosophy of PeepalKrat";
  const title = data?.title || "Agency Over Charity.\nCraftsmanship Over Sympathy.";
  const content =
    data?.content ||
    "When you purchase an object from PeepalKrat, you are not making a donation. You are acquiring a museum-caliber piece of living craft while actively partnering with women building financial autonomy across Haryana.";
  const linkUrl = data?.linkUrl || "/makers";

  return (
    <section className="py-20 bg-[#FAF8F5] relative overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta-700 font-semibold block mb-3">
            {subtitle}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal leading-tight whitespace-pre-line">
            {title}
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            {content}
          </p>
        </div>

        {/* 3 Storytelling Narrative Columns with High-Res Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="group bg-white rounded-sm overflow-hidden border border-stone-200/90 shadow-card transition-all duration-300 hover:shadow-editorial hover:-translate-y-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                alt="Haryana artisan woman preparing warp threads"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-white text-xs font-serif italic tracking-wide">
                Panipat & Rohtak Clusters
              </span>
            </div>
            <div className="p-6">
              <span className="text-[11px] uppercase tracking-wider text-terracotta-700 font-semibold block mb-1.5">
                Who Made This?
              </span>
              <h3 className="font-serif text-lg font-medium text-charcoal mb-2">
                Independent Women Artisans
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Over 85 women running pit-looms, embroidery frames, and clay wheels. They hold the equity, the bank accounts, and the creative leadership.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-sm overflow-hidden border border-stone-200/90 shadow-card transition-all duration-300 hover:shadow-editorial hover:-translate-y-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
                alt="Close-up of geometric silk needlework"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-white text-xs font-serif italic tracking-wide">
                Heirloom Disciplines
              </span>
            </div>
            <div className="p-6">
              <span className="text-[11px] uppercase tracking-wider text-terracotta-700 font-semibold block mb-1.5">
                Crafted With Skill
              </span>
              <h3 className="font-serif text-lg font-medium text-charcoal mb-2">
                Centuries-Old Living Heritage
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                From counted-thread Phulkari stoles to burnished river-silt ceramics and cold-beaten Rewari brassware. Real materials, zero shortcuts.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-white rounded-sm overflow-hidden border border-stone-200/90 shadow-card transition-all duration-300 hover:shadow-editorial hover:-translate-y-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80"
                alt="Wild Moonj grass crafted into zero-waste baskets"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-white text-xs font-serif italic tracking-wide">
                Community Resilience
              </span>
            </div>
            <div className="p-6">
              <span className="text-[11px] uppercase tracking-wider text-terracotta-700 font-semibold block mb-1.5">
                Built For Opportunity
              </span>
              <h3 className="font-serif text-lg font-medium text-charcoal mb-2">
                Direct Value To The Maker
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                72% of retail price returns directly to the maker and village raw material cooperatives, funding children's higher schooling and healthcare.
              </p>
            </div>
          </div>
        </div>

        {/* Transition CTA */}
        <div className="text-center">
          <Link
            href="/makers"
            className="inline-flex items-center text-sm font-semibold uppercase tracking-widest text-terracotta-700 hover:text-terracotta-900 group"
          >
            <span>Discover Their Work & Individual Journeys</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
