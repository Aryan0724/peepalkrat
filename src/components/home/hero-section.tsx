"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Mail, CheckCircle2, TrendingUp } from "lucide-react";

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
    name: "Sameena Begum",
    village: "Nuh, Mewat",
    craft: "Pit-Loom Weaver",
    incomeBefore: "₹700",
    incomeAfter: "₹7,200",
    years: "3 years with PeepalKrat",
    initials: "SB",
  },
  {
    name: "Reshma Devi",
    village: "Punhana, Mewat",
    craft: "Moonj Grass Artisan",
    incomeBefore: "₹900",
    incomeAfter: "₹5,800",
    years: "2 years with PeepalKrat",
    initials: "RD",
  },
  {
    name: "Fatima Khatoon",
    village: "Ferozpur Jhirka",
    craft: "Phulkari Embroiderer",
    incomeBefore: "₹1,100",
    incomeAfter: "₹8,500",
    years: "4 years with PeepalKrat",
    initials: "FK",
  },
];

const TRUST_TICKER = [
  "142+ Women Earning Living Wages in Mewat",
  "Express Worldwide Delivery · 48+ Countries",
  "72% Revenue Goes Directly to Artisans",
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

            {/* Craft origin tag */}
            <div className="mb-6">
              <span className="section-label">
                Handcrafted in Mewat, Haryana · Est. 2021
              </span>
            </div>

            {/* Primary headline */}
            <h1 className="font-display text-[2.8rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.8rem] leading-[1.06] text-[#1A1A1A] mb-6">
              {data?.title || (
                <>
                  Where every stitch funds a<br />
                  <span className="italic text-[#E87722]">woman's independence.</span>
                </>
              )}
            </h1>

            <p className="text-[#555] text-base sm:text-lg font-light leading-relaxed max-w-lg mb-10">
              {data?.subtitle ||
                "Authentic handcraft from 142+ women artisans across 12 villages of Mewat. Every purchase delivers a living wage directly — no middlemen, no charity."}
            </p>

            {/* Impact numbers — clean row */}
            <div className="flex flex-wrap gap-x-10 gap-y-5 mb-10 pb-10 border-b border-black/10">
              {[
                { n: "142+", l: "Women Earning" },
                { n: "₹2.1 Cr", l: "Wages Paid" },
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
                ✉ hello@peepalkrat.com &nbsp;·&nbsp; orders@peepalkrat.com
              </p>
            </div>
          </div>

          {/* ════ RIGHT: Artisan Spotlight Panel ════ */}
          <div
            className="relative overflow-hidden min-h-[55vh] lg:min-h-0 order-1 lg:order-2"
            style={{ background: "#F0E9DE" }}
          >
            {/* Large craft-pattern SVG watermark */}
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
              viewBox="0 0 400 400"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <pattern id="paisley" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path
                    d="M40 10 C55 10 70 25 70 40 C70 55 55 70 40 70 C25 70 10 55 10 40 C10 25 25 10 40 10Z M40 20 C50 20 60 30 60 40 C60 50 50 60 40 60 C30 60 20 50 20 40 C20 30 30 20 40 20Z"
                    fill="none"
                    stroke="#1A1A1A"
                    strokeWidth="0.8"
                  />
                  <circle cx="40" cy="40" r="4" fill="#1A1A1A" opacity="0.5" />
                </pattern>
              </defs>
              <rect width="400" height="400" fill="url(#paisley)" />
            </svg>

            {/* Artisan card content */}
            <div
              className="relative z-10 flex flex-col h-full p-8 sm:p-12"
              key={tick}
              style={{ animation: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
            >
              {/* Header */}
              <div className="mb-auto">
                <span className="section-label mb-8 block">
                  Women Behind Your Purchase
                </span>

                {/* Monogram */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ background: "#1A1A1A" }}
                >
                  <span className="font-display text-lg text-white">{artisan.initials}</span>
                </div>

                {/* Income transformation */}
                <div className="mb-8">
                  <div className="section-label mb-3">Monthly Income · Before → Now</div>
                  <div className="flex items-end gap-4">
                    <span className="font-display text-xl text-[#999] line-through">{artisan.incomeBefore}</span>
                    <TrendingUp className="w-5 h-5 text-[#E87722] mb-1 flex-shrink-0" />
                    <span className="font-display text-5xl text-[#1A1A1A]">{artisan.incomeAfter}</span>
                  </div>
                  <div className="text-[11px] text-[#888] mt-2 font-medium tracking-widest uppercase">
                    / month today
                  </div>
                </div>

                {/* Identity */}
                <div className="border-t border-black/10 pt-6 space-y-2">
                  <div className="font-semibold text-[#1A1A1A] text-base">{artisan.name}</div>
                  <div className="text-[13px] text-[#666]">{artisan.craft}</div>
                  <div className="text-[13px] text-[#888]">{artisan.village}</div>
                  <div className="text-[12px] text-[#888] font-light border-l-2 border-[#E87722] pl-3 mt-4">
                    {artisan.years} — sole signing authority on her bank account
                  </div>
                </div>
              </div>

              {/* Progress indicators */}
              <div className="flex items-center gap-2 mt-8">
                {ARTISAN_SPOTLIGHT.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveArtisan(i); setTick((t) => t + 1); }}
                    className="h-[2px] transition-all duration-500 cursor-pointer"
                    style={{
                      width: i === activeArtisan ? 32 : 12,
                      background: i === activeArtisan ? "#1A1A1A" : "rgba(26,26,26,0.2)",
                    }}
                    aria-label={ARTISAN_SPOTLIGHT[i].name}
                  />
                ))}
                <span className="text-[10px] text-[#999] ml-2 tracking-widest uppercase font-medium">
                  {activeArtisan + 1} / {ARTISAN_SPOTLIGHT.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
