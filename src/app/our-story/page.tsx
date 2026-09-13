import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Compass, ShieldCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Our Story & Origins | PeepalKrat",
  description:
    "The journey of PeepalKrat — rooted in the villages of Haryana, building a modern cultural commerce brand where women artisans are the foundation, not the marketing.",
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Editorial Hero */}
      <div className="relative bg-charcoal text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-800 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=2000&q=80"
            alt="Handloom weaving threads in Haryana"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-mustard-500 font-semibold block">
            Our Provenance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light leading-tight">
            For the People. By the People.
          </h1>
          <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            PeepalKrat was founded on a simple, uncompromising truth: the women of rural Haryana do not need charity. They possess centuries of inherited craftsmanship that commands reverence on the global stage.
          </p>
        </div>
      </div>

      {/* Narrative Section 1 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        <div className="space-y-6 text-stone-700 font-light leading-relaxed text-base sm:text-lg">
          <span className="text-xs uppercase tracking-widest text-terracotta-700 font-semibold block">
            Chapter I — Beyond the Donation Basket
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal leading-snug">
            Commerce with Dignity, Not Guilt-Driven Charity
          </h2>
          <p>
            For decades, artisan enterprises were treated as benevolent relief efforts or non-profit handicraft stalls. We rejected that premise entirely. When an artisan crafts a counted-thread silk Phulkari stole or burns a river-silt terracotta urn on a high-temperature kiln, she is not asking for sympathy. She is creating a masterpiece.
          </p>
          <p>
            At PeepalKrat, commerce comes first. The product must be deeply desirable, structurally durable, and aesthetically sublime. What makes the commerce meaningful is that its financial returns flow directly into the hands that shaped it.
          </p>
        </div>

        {/* Full Width Quote Frame */}
        <div className="bg-sandstone/60 p-8 sm:p-12 border-l-4 border-terracotta-600 rounded-r-sm space-y-3">
          <p className="font-serif italic text-xl sm:text-2xl text-charcoal leading-relaxed">
            “When needle and loom meet patience, our autonomy awakens. We do not just build products; we weave our community’s resilience.”
          </p>
          <span className="block text-xs uppercase tracking-wider text-terracotta-700 font-semibold">
            — Sunita Devi, Master Weaver & Co-operative Leader, Panipat
          </span>
        </div>

        {/* Narrative Section 2: Craft Disciplines */}
        <div className="space-y-6 text-stone-700 font-light leading-relaxed text-base sm:text-lg">
          <span className="text-xs uppercase tracking-widest text-terracotta-700 font-semibold block">
            Chapter II — The Living Geographies of Haryana
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal leading-snug">
            From the Pit-Looms of Panipat to Rewari’s Brass Foundries
          </h2>
          <p>
            Haryana possesses one of the most vibrant yet under-celebrated material design cultures in Northern India. From Panipat’s heavyweight geometric flat-weaves (dhurries and kilims) to the delicate darning needle stitches of Rohtak’s Phulkari, the riverbed Moonj wild grass basketry of Jhajjar, and the cold-hammered bell-metal vessels of historic Rewari.
          </p>
          <p>
            We work directly with women in six Haryana districts, setting up solar-lit weaving sheds, providing clean electric potter’s wheels, ensuring ergonomic pit-looms, and eliminating predatory middle-men.
          </p>
        </div>

        {/* Triple Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-stone-200">
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-medium text-charcoal">100% Traceability</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Every parcel carries a signed artisan card with the maker’s photo, craft discipline, and Haryana village name.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-medium text-charcoal">72% Living Wage Share</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Nearly three-quarters of retail revenue goes directly to raw material procurement and artisan labor.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-medium text-charcoal">Zero Plastic Footprint</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              All goods are packaged in recyclable kraft paper, molded pulp, and unbleached cotton pouches.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-10 text-center">
          <Link href="/shop">
            <Button variant="editorial" size="lg" className="px-9 h-13">
              Explore Our Collection
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
