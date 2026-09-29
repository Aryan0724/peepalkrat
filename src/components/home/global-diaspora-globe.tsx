"use client";

import React, { useState } from "react";
import { Globe, Plane, Clock, ShieldCheck, Heart, Sparkles, MapPin, CheckCircle2 } from "lucide-react";

interface DiasporaHub {
  id: string;
  name: string;
  country: string;
  flag: string;
  transitDays: string;
  deliveredCount: string;
  popularCraft: string;
  testimonial: string;
  patronName: string;
  coordinates: { x: number; y: number }; // SVG percentage positions
}

export function GlobalDiasporaGlobe() {
  const diasporaHubs: DiasporaHub[] = [
    {
      id: "us-east",
      name: "New York & New Jersey",
      country: "United States",
      flag: "🇺🇸",
      transitDays: "3–4 Business Days",
      deliveredCount: "3,180+ Heirlooms",
      popularCraft: "Festive Phulkari Quilts & Brass Urlis",
      testimonial: "“Unboxing this in New Jersey made Diwali feel like home in Rohtak. The note signed by Sunita Devi made my mother cry with joy.”",
      patronName: "Dr. Ananya Sharma • Princeton, NJ",
      coordinates: { x: 23, y: 35 },
    },
    {
      id: "uk",
      name: "London & Midlands",
      country: "United Kingdom",
      flag: "🇬🇧",
      transitDays: "3 Business Days",
      deliveredCount: "1,420+ Heirlooms",
      popularCraft: "Panipat Handloom Dhurries",
      testimonial: "“DHL Express arrived in London in just 3 days! The texture of the desi cotton is unlike anything you can find in European stores.”",
      patronName: "Rohan & Priya Mehta • Richmond, London",
      coordinates: { x: 47, y: 26 },
    },
    {
      id: "canada",
      name: "Toronto & Vancouver",
      country: "Canada",
      flag: "🇨🇦",
      transitDays: "4 Business Days",
      deliveredCount: "1,890+ Heirlooms",
      popularCraft: "Aravalli Moonj Grass Baskets",
      testimonial: "“My living room in Brampton now carries the soul of Haryana. Knowing 72% goes to women who hold bank passbooks makes every piece priceless.”",
      patronName: "Simran Grewal • Toronto, ON",
      coordinates: { x: 21, y: 28 },
    },
    {
      id: "us-west",
      name: "San Francisco / Bay Area",
      country: "United States",
      flag: "🇺🇸",
      transitDays: "4 Business Days",
      deliveredCount: "1,260+ Heirlooms",
      popularCraft: "Hand-Carved Kikar & Brass Platters",
      testimonial: "“In Silicon Valley, everything is digital. Having raw terracotta sculpted by women in Mewat brings grounded humanity to our space.”",
      patronName: "Vikram & Neha Roy • Palo Alto, CA",
      coordinates: { x: 12, y: 38 },
    },
    {
      id: "uae",
      name: "Dubai & Abu Dhabi",
      country: "United Arab Emirates",
      flag: "🇦🇪",
      transitDays: "2 Business Days",
      deliveredCount: "980+ Heirlooms",
      popularCraft: "Royal Embroidered Wall Hangings",
      testimonial: "“Fastest overseas shipping ever. Ordered Monday, arrived Wednesday in Dubai Marina. Flawless packaging.”",
      patronName: "Farhan & Ayesha Siddiqui • Dubai",
      coordinates: { x: 62, y: 44 },
    },
    {
      id: "australia",
      name: "Sydney & Melbourne",
      country: "Australia",
      flag: "🇦🇺",
      transitDays: "4–5 Business Days",
      deliveredCount: "820+ Heirlooms",
      popularCraft: "Botanical Dyed Cotton Stoles",
      testimonial: "“Gifting these to friends in Melbourne created so many conversations about Indian women's rural autonomy.”",
      patronName: "Kavita Nair • Sydney, NSW",
      coordinates: { x: 86, y: 78 },
    },
  ];

  const [activeHub, setActiveHub] = useState<DiasporaHub>(diasporaHubs[0]);

  return (
    <section className="py-20 bg-[#0B132B] text-[#FAF6EE] relative overflow-hidden border-b border-[#C8A253]/30">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#C8A253]/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#881C10]/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#132247] border border-[#C8A253]/50 text-xs text-[#DFBD69] font-cinzel font-semibold uppercase tracking-[0.2em]">
            <Globe className="w-3.5 h-3.5 text-[#DFBD69]" />
            <span>Worldwide Diaspora Transit • मेवात से विश्व तक</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            From Rural Haryana to Diaspora Homes in 48+ Countries
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#DFBD69]/90 font-light">
            “Distance dissolves when ancestral craft meets love across oceans.”
          </p>

          <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed max-w-2xl mx-auto">
            Crafted in the village workshops of Nuh, Taoru, and Panipat. Custom-inspected, insured, and delivered express to your doorstep across North America, Europe, the Middle East, and Australasia.
          </p>
        </div>

        {/* The Interactive Diaspora Map & Flight Arc Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          
          {/* Left/Center: Interactive Stylized Globe Map (7 cols) */}
          <div className="lg:col-span-7 bg-[#132247]/70 backdrop-blur-md rounded-xs border border-[#C8A253]/40 p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#C8A253]/20 text-xs">
              <span className="font-cinzel text-[#DFBD69] font-semibold uppercase tracking-wider flex items-center">
                <Plane className="w-3.5 h-3.5 mr-1.5" />
                Live Express Transit Routes
              </span>
              <span className="text-stone-400 text-[11px]">
                Origin: <strong>Haryana, India (28°N, 77°E)</strong>
              </span>
            </div>

            {/* Stylized World Map SVG with Parabolic Flight Arcs */}
            <div className="relative aspect-[16/9] w-full mt-4 select-none">
              <svg viewBox="0 0 800 450" className="w-full h-full">
                {/* World Continental Outlines (Stylized Geometric Silhouettes) */}
                <path
                  d="M 120 100 Q 180 80 240 120 T 260 220 T 160 250 T 100 180 Z"
                  fill="#0B132B"
                  stroke="#C8A253"
                  strokeWidth="0.8"
                  opacity="0.5"
                /> {/* North America */}
                <path
                  d="M 200 240 Q 240 280 260 380 T 210 400 T 180 300 Z"
                  fill="#0B132B"
                  stroke="#C8A253"
                  strokeWidth="0.8"
                  opacity="0.5"
                /> {/* South America */}
                <path
                  d="M 370 70 Q 420 60 460 110 T 400 160 T 360 100 Z"
                  fill="#0B132B"
                  stroke="#C8A253"
                  strokeWidth="0.8"
                  opacity="0.5"
                /> {/* Europe */}
                <path
                  d="M 380 160 Q 450 170 480 280 T 420 380 T 360 260 Z"
                  fill="#0B132B"
                  stroke="#C8A253"
                  strokeWidth="0.8"
                  opacity="0.5"
                /> {/* Africa */}
                <path
                  d="M 460 80 Q 600 60 700 120 T 680 240 T 540 200 T 460 140 Z"
                  fill="#0B132B"
                  stroke="#C8A253"
                  strokeWidth="0.8"
                  opacity="0.5"
                /> {/* Asia */}
                <path
                  d="M 640 310 Q 720 300 740 380 T 660 410 T 630 350 Z"
                  fill="#0B132B"
                  stroke="#C8A253"
                  strokeWidth="0.8"
                  opacity="0.5"
                /> {/* Australia */}

                {/* Origin: Haryana / Mewat, India (x: 550, y: 185) */}
                <g transform="translate(550, 185)">
                  {/* Glowing Pulse Rings */}
                  <circle cx="0" cy="0" r="14" fill="#DFBD69" opacity="0.25" className="animate-ping" />
                  <circle cx="0" cy="0" r="7" fill="#C8A253" />
                  <circle cx="0" cy="0" r="3.5" fill="#881C10" />
                  <text x="0" y="-12" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#DFBD69" fontFamily="Cinzel">
                    MEWAT, HARYANA
                  </text>
                </g>

                {/* Animated Parabolic Transit Flight Arcs from Mewat to Cities */}
                {/* 1. To US East (New York x: 200, y: 130) */}
                <path
                  d="M 550 185 Q 360 40 200 130"
                  fill="none"
                  stroke="#DFBD69"
                  strokeWidth={activeHub.id === "us-east" ? "2.5" : "1.2"}
                  strokeDasharray="4 3"
                  opacity={activeHub.id === "us-east" ? "1" : "0.45"}
                />
                {/* 2. To UK (London x: 395, y: 105) */}
                <path
                  d="M 550 185 Q 460 90 395 105"
                  fill="none"
                  stroke="#DFBD69"
                  strokeWidth={activeHub.id === "uk" ? "2.5" : "1.2"}
                  strokeDasharray="4 3"
                  opacity={activeHub.id === "uk" ? "1" : "0.45"}
                />
                {/* 3. To Canada (Toronto x: 185, y: 115) */}
                <path
                  d="M 550 185 Q 340 30 185 115"
                  fill="none"
                  stroke="#DFBD69"
                  strokeWidth={activeHub.id === "canada" ? "2.5" : "1.2"}
                  strokeDasharray="4 3"
                  opacity={activeHub.id === "canada" ? "1" : "0.45"}
                />
                {/* 4. To UAE (Dubai x: 495, y: 195) */}
                <path
                  d="M 550 185 Q 520 180 495 195"
                  fill="none"
                  stroke="#DFBD69"
                  strokeWidth={activeHub.id === "uae" ? "2.5" : "1.2"}
                  strokeDasharray="4 3"
                  opacity={activeHub.id === "uae" ? "1" : "0.45"}
                />
                {/* 5. To Australia (Sydney x: 710, y: 360) */}
                <path
                  d="M 550 185 Q 650 250 710 360"
                  fill="none"
                  stroke="#DFBD69"
                  strokeWidth={activeHub.id === "australia" ? "2.5" : "1.2"}
                  strokeDasharray="4 3"
                  opacity={activeHub.id === "australia" ? "1" : "0.45"}
                />

                {/* Destination Hub Markers */}
                {/* New York */}
                <circle cx="200" cy="130" r={activeHub.id === "us-east" ? "6" : "4"} fill="#DFBD69" stroke="#0B132B" strokeWidth="1.5" />
                {/* London */}
                <circle cx="395" cy="105" r={activeHub.id === "uk" ? "6" : "4"} fill="#DFBD69" stroke="#0B132B" strokeWidth="1.5" />
                {/* Toronto */}
                <circle cx="185" cy="115" r={activeHub.id === "canada" ? "6" : "4"} fill="#DFBD69" stroke="#0B132B" strokeWidth="1.5" />
                {/* Dubai */}
                <circle cx="495" cy="195" r={activeHub.id === "uae" ? "6" : "4"} fill="#DFBD69" stroke="#0B132B" strokeWidth="1.5" />
                {/* Sydney */}
                <circle cx="710" cy="360" r={activeHub.id === "australia" ? "6" : "4"} fill="#DFBD69" stroke="#0B132B" strokeWidth="1.5" />
              </svg>
            </div>

            {/* City Hub Quick Click Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3 border-t border-[#C8A253]/20">
              {diasporaHubs.map((hub) => (
                <button
                  key={hub.id}
                  onClick={() => setActiveHub(hub)}
                  className={`px-3 py-1.5 rounded-xs text-[11px] font-cinzel transition-all ${
                    activeHub.id === hub.id
                      ? "bg-[#DFBD69] text-[#0B132B] font-bold shadow-md"
                      : "bg-[#0B132B] text-stone-300 hover:text-white border border-[#C8A253]/30"
                  }`}
                >
                  <span className="mr-1">{hub.flag}</span>
                  <span>{hub.name.split("&")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Selected Hub Diaspora Profile Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF6EE] text-[#0B132B] rounded-xs border-2 border-[#C8A253] p-6 sm:p-8 shadow-2xl relative space-y-4">
            {/* Top Badge */}
            <div className="flex items-center justify-between border-b border-[#EAE0CE] pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{activeHub.flag}</span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#0B132B]">
                    {activeHub.name}
                  </h3>
                  <span className="text-[10px] text-stone-500 font-cinzel font-semibold uppercase tracking-wider">
                    {activeHub.country} Destination Hub
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-[10px] font-bold uppercase tracking-wider">
                DHL Express
              </span>
            </div>

            {/* Key Delivery & Diaspora Metrics */}
            <div className="grid grid-cols-2 gap-3 py-1 text-xs">
              <div className="p-3 bg-white rounded-xs border border-[#EAE0CE]">
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Doorstep Delivery</span>
                <span className="font-semibold text-charcoal text-sm flex items-center mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-[#881C10] mr-1" />
                  {activeHub.transitDays}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xs border border-[#EAE0CE]">
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Diaspora Patrons</span>
                <span className="font-semibold text-charcoal text-sm flex items-center mt-0.5">
                  <Heart className="w-3.5 h-3.5 text-[#C8A253] mr-1" />
                  {activeHub.deliveredCount}
                </span>
              </div>
            </div>

            {/* Popular Craft in This Region */}
            <div className="text-xs space-y-1">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold font-cinzel block">
                Top Cherished Heirloom:
              </span>
              <p className="font-serif font-medium text-[#881C10] text-sm">
                {activeHub.popularCraft}
              </p>
            </div>

            {/* Testimonial Quote */}
            <div className="p-4 bg-white/80 rounded-xs border-l-2 border-[#881C10] text-xs text-stone-700 italic space-y-2">
              <p>{activeHub.testimonial}</p>
              <span className="not-italic text-[11px] font-semibold text-[#0B132B] block">
                — {activeHub.patronName}
              </span>
            </div>

            {/* Guaranteed Trust Badges */}
            <div className="pt-2 border-t border-[#EAE0CE] flex items-center justify-between text-[11px] text-stone-600">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Duties Pre-Cleared</span>
              </span>
              <span>•</span>
              <span>100% Cotton Air Packaging</span>
              <span>•</span>
              <span className="font-semibold text-[#881C10]">Insured Flight</span>
            </div>
          </div>

        </div>

        {/* Global Diaspora Shopping Guarantees Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-[#C8A253]/20 text-xs">
          <div className="flex items-start space-x-3 p-3 rounded-xs bg-[#132247]/40 border border-[#C8A253]/20">
            <Plane className="w-4 h-4 text-[#DFBD69] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-cinzel text-white font-semibold">Worldwide DHL Express</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">3–5 days to USA, UK, Canada, UAE & Australia with real-time live GPS tracking.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-xs bg-[#132247]/40 border border-[#C8A253]/20">
            <ShieldCheck className="w-4 h-4 text-[#DFBD69] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-cinzel text-white font-semibold">Customs & Duties Paid</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Zero surprise fees upon arrival. What you pay in USD, GBP, or EUR is all-inclusive.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-xs bg-[#132247]/40 border border-[#C8A253]/20">
            <Heart className="w-4 h-4 text-[#DFBD69] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-cinzel text-white font-semibold">72% Maker Living Wage</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Your foreign currency converts directly into living wages in a Mewat woman's passbook.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-xs bg-[#132247]/40 border border-[#C8A253]/20">
            <Sparkles className="w-4 h-4 text-[#DFBD69] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-cinzel text-white font-semibold">Handwritten Artisan Note</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Every parcel carries a signed blessing certificate in Hindi & English from the maker.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
