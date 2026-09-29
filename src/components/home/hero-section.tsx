"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, CheckCircle2, TrendingUp, MapPin } from "lucide-react";

interface HeroSectionProps {
  data?: {
    title?: string | null;
    subtitle?: string | null;
    content?: string | null;
    linkUrl?: string | null;
  };
}

const ARTISAN_SPOTLIGHT = [
  {
    name: "Master Tailoring Team",
    village: "Model Town, Ambala City",
    craft: "Garment Construction",
    incomeBefore: "₹1,200",
    incomeAfter: "₹8,500",
    years: "Working together as an empowered collective",
    image: "/peepalkraft/workshop/workshop-full-1.jpg",
  },
  {
    name: "Diksha & Team",
    village: "Kanshi Nagar, Ambala City",
    craft: "Hand Embroidery & Finishing",
    incomeBefore: "₹800",
    incomeAfter: "₹7,200",
    years: "Crafting beautiful accessories & garments",
    image: "/peepalkraft/workshop/artisan-portrait-1.jpg",
  },
  {
    name: "Artisan Collective",
    village: "Ambala City, Haryana",
    craft: "Fabric Cutting & Styling",
    incomeBefore: "₹950",
    incomeAfter: "₹9,000",
    years: "Direct living wages — 100% financial independence",
    image: "/peepalkraft/workshop/artisan-yellow-saree.jpg",
  },
];

const TRUST_TICKER = [
  "Women Earning Living Wages in Ambala City",
  "Express Worldwide Delivery · 48+ Countries",
  "Revenue Goes Directly to Artisans",
  "Zero Middlemen · Direct Craft-to-Home",
  "DHL Express 3–5 Days · Customs Pre-Cleared",
  "100% Handmade · Haryana, India",
];

export function HeroSection({ data }: HeroSectionProps) {
  const [activeArtisan, setActiveArtisan] = useState(0);
  const [tick, setTick] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveArtisan((p) => (p + 1) % ARTISAN_SPOTLIGHT.length);
      setTick((p) => p + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const artisan = ARTISAN_SPOTLIGHT[activeArtisan];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <>
      {/* ── Announcement ticker ── */}
      <div className="bg-[#1A1A1A] text-white overflow-hidden">
        <div className="ticker-track py-2.5">
          {[...TRUST_TICKER, ...TRUST_TICKER].map((item, i) => (
            <span key={i} className="inline-flex items-center px-8 text-[11px] font-medium tracking-widest uppercase">
              <span className="w-1 h-1 rounded-full bg-[#E87722] mr-8 flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main Hero ── */}
      <section className="w-full" style={{ background: "#FFFCF8" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[92vh]">

          {/* ════ LEFT: Content ════ */}
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 py-16 lg:py-20 order-2 lg:order-1">

            {/* Craft origin tag with handwritten accent */}
            <div className="mb-6 relative inline-block">
              <span className="section-label bg-[#E87722]/10 text-[#E87722] px-3 py-1 rounded-sm border border-[#E87722]/20">
                Handcrafted in Ambala City, Haryana
              </span>
              <div className="absolute -top-5 -right-16 transform rotate-[15deg] font-handwritten text-2xl text-[#1A1A1A]">
                100% Genuine
                {/* Hand-drawn squiggly arrow */}
                <svg className="w-8 h-8 absolute -bottom-4 -left-6 transform -rotate-45 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
              </div>
            </div>

            {/* Primary headline */}
            <h1 className="font-display text-[2.8rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.8rem] leading-[1.06] text-[#1A1A1A] mb-6 relative">
              {data?.title || (
                <>
                  Where every stitch funds a<br />
                  <span className="relative inline-block">
                    <span className="italic text-[#E87722] relative z-10">woman's independence.</span>
                    {/* Hand-drawn underline SVG */}
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#F5C89A] z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0,5 Q50,10 100,2" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>
                </>
              )}
            </h1>

            <p className="text-[#555] text-base sm:text-lg font-light leading-relaxed max-w-lg mb-10">
              {data?.subtitle ||
                "Authentic handcraft from women artisans in Ambala City, Haryana. Every purchase delivers a living wage directly — no middlemen, no charity."}
            </p>

            {/* Impact numbers — clean row */}
            <div className="flex flex-wrap gap-x-10 gap-y-5 mb-10 pb-10 border-b border-black/10">
              {[
                { n: "100%", l: "Handmade" },
                { n: "Zero", l: "Middlemen" },
                { n: "48+", l: "Countries" },
                { n: "72%", l: "To Artisan" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl sm:text-3xl text-[#1A1A1A]">{s.n}</div>
                  <div className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#888] mt-1">{s.l}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link href="/shop">
                <button className="btn-primary group w-full sm:w-auto">
                  <span>Shop the Collection</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/impact">
                <button className="btn-outline w-full sm:w-auto">
                  Our Impact
                </button>
              </Link>
            </div>

            {/* Email signup — credibility */}
            <div className="border-t border-black/8 pt-8">
              <div className="flex items-baseline gap-3 mb-3">
                <p className="text-[13px] font-semibold text-[#1A1A1A] tracking-wide">
                  The Artisan Dispatch
                </p>
                <span className="text-[11px] text-[#888]">
                  4,200+ subscribers
                </span>
              </div>
              <p className="text-[12px] text-[#888] mb-4 font-light">
                New arrivals, artisan income milestones & early access drops. Weekly. No spam.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-[13px] text-emerald-700 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  You're in — first dispatch arrives this week.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="email-strip-input flex-1 text-sm"
                    style={{ borderRight: "none" }}
                  />
                  <button
                    type="submit"
                    className="btn-saffron px-5 text-[11px] flex items-center gap-1.5 flex-shrink-0"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Join
                  </button>
                </form>
              )}
              <p className="text-[11px] text-[#aaa] mt-2">
                ✉ peepalkraft@gmail.com
              </p>
            </div>
          </div>

          {/* ════ RIGHT: Artisan Spotlight Panel (Image Dominant) ════ */}
          <div className="relative overflow-hidden min-h-[60vh] lg:min-h-0 order-1 lg:order-2 bg-[#1A1A1A]">
            {/* Background Image transitioning */}
            {ARTISAN_SPOTLIGHT.map((item, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  i === activeArtisan ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover opacity-60"
                  priority={i === 0}
                />
                {/* Gradient overlay to make text readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent" />
              </div>
            ))}

            {/* Artisan card content */}
            <div
              className="relative z-10 flex flex-col h-full p-8 sm:p-12 justify-end"
              key={tick}
              style={{ animation: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
            >
              {/* Header */}
              <div className="mb-4">
                <span className="section-label mb-4 block text-white/80">
                  Real Artisans. Real Impact.
                </span>

                {/* Identity */}
                <div className="space-y-2 mb-8">
                  <div className="font-display text-4xl text-white">{artisan.name}</div>
                  <div className="flex items-center text-[13px] text-white/80">
                    <MapPin className="w-3.5 h-3.5 mr-1" /> {artisan.village}
                  </div>
                  <div className="text-[13px] text-[#E87722] font-medium tracking-wide uppercase mt-1">
                    {artisan.craft}
                  </div>
                </div>

                {/* Income transformation */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 w-full max-w-sm">
                  <div className="section-label mb-3 !text-white/70">Monthly Income · Before → Now</div>
                  <div className="flex items-end gap-4">
                    <span className="font-display text-xl text-white/50 line-through">{artisan.incomeBefore}</span>
                    <TrendingUp className="w-5 h-5 text-[#E87722] mb-1 flex-shrink-0" />
                    <span className="font-display text-4xl text-white">{artisan.incomeAfter}</span>
                  </div>
                  <div className="text-[11px] text-white/70 mt-3 font-medium tracking-widest uppercase border-l-2 border-[#E87722] pl-3">
                    {artisan.years}
                  </div>
                </div>
              </div>

              {/* Progress indicators */}
              <div className="flex items-center gap-2 mt-4">
                {ARTISAN_SPOTLIGHT.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveArtisan(i); setTick((t) => t + 1); }}
                    className="h-[2px] transition-all duration-500 cursor-pointer"
                    style={{
                      width: i === activeArtisan ? 32 : 12,
                      background: i === activeArtisan ? "#FFFFFF" : "rgba(255,255,255,0.3)",
                    }}
                    aria-label={ARTISAN_SPOTLIGHT[i].name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
