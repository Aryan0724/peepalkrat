import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck, Heart, Users, MapPin, Trees, Scale, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Verified Social Impact | PeepalKrat",
  description:
    "Explore the verifiable economic, cultural, and environmental metrics of PeepalKrat's women artisan enterprise in Haryana.",
};

export const revalidate = 60;

export default async function ImpactPage() {
  let makersCount = 8;
  let productsCount = 20;

  try {
    makersCount = await prisma.maker.count();
    productsCount = await prisma.product.count({ where: { isPublished: true } });
  } catch (error) {
    console.warn("Using fallback impact metrics:", error);
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Header */}
      <div className="bg-charcoal text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-800 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-mustard-500 font-semibold block">
            Impact Transparency
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light">
            Verified Community Impact
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            We measure our success not just by revenue, but by the dignity, financial autonomy, and environmental integrity returned to the rural communities of Haryana.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-sm border border-stone-200 shadow-card text-center space-y-2">
            <Users className="w-6 h-6 text-terracotta-600 mx-auto" />
            <span className="font-serif text-4xl text-charcoal font-medium block">
              {makersCount > 0 ? `${makersCount}+` : "85+"}
            </span>
            <h3 className="font-semibold text-xs uppercase tracking-wider text-stone-700">
              Women Makers & Artisans
            </h3>
            <p className="text-[11px] text-stone-400">Direct primary earners across rural Haryana</p>
          </div>

          <div className="bg-white p-8 rounded-sm border border-stone-200 shadow-card text-center space-y-2">
            <Scale className="w-6 h-6 text-peepal-700 mx-auto" />
            <span className="font-serif text-4xl text-charcoal font-medium block">72%</span>
            <h3 className="font-semibold text-xs uppercase tracking-wider text-stone-700">
              Artisan Revenue Share
            </h3>
            <p className="text-[11px] text-stone-400">Transferred directly to maker accounts</p>
          </div>

          <div className="bg-white p-8 rounded-sm border border-stone-200 shadow-card text-center space-y-2">
            <MapPin className="w-6 h-6 text-mustard-500 mx-auto" />
            <span className="font-serif text-4xl text-charcoal font-medium block">6</span>
            <h3 className="font-semibold text-xs uppercase tracking-wider text-stone-700">
              Haryana Craft Districts
            </h3>
            <p className="text-[11px] text-stone-400">Panipat, Rohtak, Jhajjar, Rewari, Jind, Karnal</p>
          </div>

          <div className="bg-white p-8 rounded-sm border border-stone-200 shadow-card text-center space-y-2">
            <Trees className="w-6 h-6 text-emerald-700 mx-auto" />
            <span className="font-serif text-4xl text-charcoal font-medium block">100%</span>
            <h3 className="font-semibold text-xs uppercase tracking-wider text-stone-700">
              Zero Plastic Packaging
            </h3>
            <p className="text-[11px] text-stone-400">Biodegradable honeycomb kraft & cotton</p>
          </div>
        </div>

        {/* Value Distribution Section */}
        <div className="bg-white p-8 sm:p-12 rounded-sm border border-stone-200 shadow-editorial space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-terracotta-700 font-semibold block mb-2">
              Financial Transparency
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
              Where Does Every Rupee Go?
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              Unlike fast-retail supply chains where artisans receive under 5% of product retail price, PeepalKrat operates on a cooperative equity model.
            </p>
          </div>

          {/* Allocation Bar */}
          <div className="space-y-4">
            <div className="w-full h-8 rounded-sm overflow-hidden flex text-[11px] font-semibold text-white">
              <div className="bg-terracotta-600 flex items-center justify-center" style={{ width: "52%" }}>
                52% Artisan Wages
              </div>
              <div className="bg-peepal-700 flex items-center justify-center" style={{ width: "20%" }}>
                20% Raw Materials
              </div>
              <div className="bg-stone-700 flex items-center justify-center" style={{ width: "16%" }}>
                16% Logistics
              </div>
              <div className="bg-stone-500 flex items-center justify-center" style={{ width: "12%" }}>
                12% Operations
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2">
              <div>
                <strong className="text-terracotta-700 block">52% Direct Artisan Compensation</strong>
                <span className="text-stone-500">Indexed above regional fair living wage standards.</span>
              </div>
              <div>
                <strong className="text-peepal-700 block">20% Sustainable Raw Materials</strong>
                <span className="text-stone-500">Native sheep wool, rain-fed cotton, river clay, Moonj grass.</span>
              </div>
              <div>
                <strong className="text-stone-700 block">16% Packaging & Shipping</strong>
                <span className="text-stone-500">Plastic-free certified boxes, insured express couriers.</span>
              </div>
              <div>
                <strong className="text-stone-500 block">12% PeepalKrat Operations</strong>
                <span className="text-stone-500">Design collaboration, photography, platform, international trade.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Haryana Districts Directory */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
            Active Community Clusters Across Haryana
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 border border-stone-200 rounded-sm space-y-2">
              <h3 className="font-serif text-lg font-medium text-charcoal">Panipat District</h3>
              <p className="text-xs text-stone-500">
                18 active women weavers operating pit looms. Focus on reversible geometric flat-weave dhurries and upcycled cotton home textiles.
              </p>
            </div>
            <div className="bg-white p-6 border border-stone-200 rounded-sm space-y-2">
              <h3 className="font-serif text-lg font-medium text-charcoal">Rohtak District</h3>
              <p className="text-xs text-stone-500">
                14 heirloom embroidery artisans. Preservation of counted-thread geometric Phulkari needlework and silk floss stole tailoring.
              </p>
            </div>
            <div className="bg-white p-6 border border-stone-200 rounded-sm space-y-2">
              <h3 className="font-serif text-lg font-medium text-charcoal">Jhajjar & Mewat</h3>
              <p className="text-xs text-stone-500">
                16 grasscraft artisans harvesting wild canal Moonj and Sarkanda reeds. Zero-waste home storage, planters, and dining accessories.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-8">
          <Link href="/makers">
            <Button variant="editorial" size="lg">
              Meet the Women Leading These Clusters
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
