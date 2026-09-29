"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck, Mail, CheckCircle2, TrendingUp } from "lucide-react";

interface HeroSectionProps {
  data?: {
    title?: string | null;
    subtitle?: string | null;
    content?: string | null;
    linkUrl?: string | null;
  };
}

const LIVE_STATS = [
  { value: "142+", label: "Women Earning" },
  { value: "₹2.1 Cr", label: "Wages Paid Out" },
  { value: "12", label: "Villages Reached" },
  { value: "48+", label: "Countries Shipped" },
];

const ARTISAN_SPOTLIGHT = [
  {
    name: "Sameena Begum",
    village: "Nuh, Mewat",
    craft: "Pit-Loom Weaver",
    incomeBefore: "₹700",
    incomeAfter: "₹7,200",
    years: "3 years",
    initials: "SB",
    color: "#DFBD69",
  },
  {
    name: "Reshma Devi",
    village: "Punhana, Mewat",
    craft: "Moonj Grass Artisan",
    incomeBefore: "₹900",
    incomeAfter: "₹5,800",
    years: "2 years",
    initials: "RD",
    color: "#FAF6EE",
  },
  {
    name: "Fatima Khatoon",
    village: "Ferozpur Jhirka, Mewat",
    craft: "Phulkari Embroiderer",
    incomeBefore: "₹1,100",
    incomeAfter: "₹8,500",
    years: "4 years",
    initials: "FK",
    color: "#DFBD69",
  },
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
    <section className="relative w-full overflow-hidden" style={{ background: "#FAF6EE" }}>

      {/* ─── Subtle Jali Pattern Overlay (full bleed) ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C8A253' stroke-width='0.4' opacity='0.18'%3E%3Crect x='5' y='5' width='50' height='50' rx='2'/%3E%3Crect x='15' y='15' width='30' height='30' rx='1'/%3E%3Cline x1='5' y1='30' x2='15' y2='30'/%3E%3Cline x1='45' y1='30' x2='55' y2='30'/%3E%3Cline x1='30' y1='5' x2='30' y2='15'/%3E%3Cline x1='30' y1='45' x2='30' y2='55'/%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ─── Main grid: extends full viewport width ─── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[90vh]">

        {/* ════════════ LEFT PANEL ════════════ */}
        <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 py-20 space-y-9">

          {/* Location + contact credibility row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-[#881C10]">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-[11px] font-cinzel font-semibold uppercase tracking-[0.22em]">
                Mewat, Haryana, India · Est. 2021
              </span>
            </div>
            {/* Business email — credibility signal */}
            <a
              href="mailto:hello@peepalkrat.com"
              className="flex items-center space-x-1.5 text-[11px] text-stone-500 hover:text-[#881C10] transition-colors font-cinzel tracking-wide group"
            >
              <Mail className="w-3.5 h-3.5 group-hover:text-[#881C10] transition-colors" />
              <span>hello@peepalkrat.com</span>
            </a>
          </div>

          {/* Primary headline */}
          <div className="space-y-5">
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-7xl font-light text-[#0B132B] leading-[1.05] tracking-tight">
              {data?.title || (
                <>
                  Handcrafted in{" "}
                  <span className="relative inline-block">
                    Haryana.
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#C8A253] via-[#DFBD69] to-[#C8A253] hero-underline" />
                  </span>
                  <br />
                  <em className="font-cormorant italic text-[#881C10]">
                    Worn across the world.
                  </em>
                </>
              )}
            </h1>

            <p className="font-cormorant text-xl sm:text-2xl text-stone-500 font-light italic max-w-lg leading-relaxed">
              {data?.subtitle ||
                "Every piece you bring home sends a living wage directly into a woman's bank account in rural Mewat."}
            </p>
          </div>

          {/* Live impact stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 py-7 border-t border-b border-[#EAE0CE]">
            {LIVE_STATS.map((s, i) => (
              <div key={i}>
                <div className="font-serif text-2xl sm:text-3xl font-medium text-[#0B132B]">
                  {s.value}
                </div>
                <div className="text-[10px] font-cinzel uppercase tracking-widest text-stone-400 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link href="/shop" className="group">
              <button className="w-full sm:w-auto px-8 py-4 bg-[#0B132B] text-[#FAF6EE] font-cinzel font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#881C10] transition-colors duration-300 flex items-center justify-center space-x-2">
                <span>Shop the Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/impact" className="group">
              <button className="w-full sm:w-auto px-7 py-4 border border-[#0B132B]/25 text-[#0B132B] font-cinzel text-xs uppercase tracking-[0.16em] hover:border-[#C8A253] hover:text-[#881C10] transition-all duration-300 flex items-center justify-center">
                Read the Impact Report
              </button>
            </Link>
          </div>

          {/* ─── Inline Email Signup — social proof ─── */}
          <div className="border border-[#EAE0CE] bg-white/60 backdrop-blur-sm p-5 space-y-3">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <span className="text-[11px] font-cinzel font-bold uppercase tracking-[0.22em] text-[#0B132B]">
                The Artisan Dispatch
              </span>
              <span className="text-[10px] text-stone-400 font-serif italic">
                4,200+ diaspora homes subscribed
              </span>
            </div>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Weekly: new arrivals, artisan income milestones, and early access to limited batches. No spam — unsubscribe anytime.
            </p>
            {subscribed ? (
              <div className="flex items-center space-x-2 text-emerald-700 text-xs font-cinzel">
                <CheckCircle2 className="w-4 h-4" />
                <span>You're in. First dispatch arrives this week.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#EAE0CE] focus:outline-none focus:border-[#C8A253] text-stone-800 placeholder:text-stone-300 font-light"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#C8A253] text-[#0B132B] font-cinzel font-bold text-[11px] uppercase tracking-wider hover:bg-[#DFBD69] transition-colors flex items-center space-x-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Join</span>
                </button>
              </form>
            )}
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center gap-4 text-[10px] text-stone-400 font-cinzel uppercase tracking-wider">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Fair wage verified</span>
            </span>
            <span className="text-stone-300">·</span>
            <span>DHL Express Worldwide</span>
            <span className="text-stone-300">·</span>
            <span>Customs Pre-Cleared</span>
            <span className="text-stone-300">·</span>
            <span>No Middlemen</span>
          </div>
        </div>

        {/* ════════════ RIGHT PANEL — dark editorial ════════════ */}
        <div
          className="lg:col-span-5 relative flex flex-col min-h-[65vh] lg:min-h-0"
          style={{ background: "#0B132B" }}
        >
          {/* Subtle Phulkari diagonal pattern overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                #DFBD69 0px,
                #DFBD69 1px,
                transparent 1px,
                transparent 24px
              )`,
            }}
          />

          {/* Corner filigree accents */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t-[1.5px] border-r-[1.5px] border-[#C8A253]/40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[1.5px] border-l-[1.5px] border-[#C8A253]/40 pointer-events-none" />

          {/* Header strip */}
          <div className="px-8 pt-10 pb-5 border-b border-[#C8A253]/15 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[9px] font-cinzel font-semibold uppercase tracking-[0.35em] text-[#DFBD69]/70 mb-1">
                  Live · Updates Every Week
                </div>
                <div className="text-[13px] font-cinzel font-bold uppercase tracking-[0.18em] text-[#DFBD69]">
                  Women Behind Your Purchase
                </div>
              </div>
              {/* Pulsing live indicator */}
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-cinzel text-emerald-400 uppercase tracking-widest">
                  Live
                </span>
              </div>
            </div>
          </div>

          {/* Artisan card — crossfade */}
          <div className="flex-1 px-8 py-8 flex flex-col justify-center relative z-10" key={tick}>
            <div style={{ animation: "heroFadeIn 0.7s cubic-bezier(0.22, 1, 0.36, 1)" }}>

              {/* Monogram avatar */}
              <div
                className="w-14 h-14 rounded-full border border-[#C8A253]/50 flex items-center justify-center mb-7"
                style={{ background: "rgba(200,162,83,0.08)" }}
              >
                <span className="font-serif text-lg text-[#DFBD69] font-medium">
                  {artisan.initials}
                </span>
              </div>

              {/* Income transformation — the core message */}
              <div className="mb-7 pb-7 border-b border-white/8">
                <div className="text-[9px] font-cinzel uppercase tracking-[0.35em] text-stone-600 mb-3">
                  Monthly Income · Before → Now
                </div>
                <div className="flex items-end space-x-4">
                  <div>
                    <div className="text-xl font-serif text-stone-600 line-through leading-none">
                      {artisan.incomeBefore}
                    </div>
                    <div className="text-[9px] text-stone-600 mt-1 font-cinzel uppercase tracking-wider">
                      Before
                    </div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-[#DFBD69] mb-1 flex-shrink-0" />
                  <div>
                    <div
                      className="font-serif leading-none"
                      style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: artisan.color }}
                    >
                      {artisan.incomeAfter}
                    </div>
                    <div className="text-[9px] text-[#DFBD69] mt-1 font-cinzel uppercase tracking-wider">
                      / month today
                    </div>
                  </div>
                </div>
              </div>

              {/* Artisan identity */}
              <div className="space-y-4">
                <div>
                  <div className="font-cinzel font-bold text-base text-white leading-none">
                    {artisan.name}
                  </div>
                  <div className="text-stone-400 text-xs mt-1.5">
                    {artisan.craft}
                  </div>
                  <div className="text-stone-500 text-[11px] mt-0.5 flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{artisan.village}</span>
                  </div>
                </div>

                <div className="text-[11px] text-stone-500 font-light leading-relaxed border-l border-[#C8A253]/30 pl-3">
                  Active artisan partner for{" "}
                  <span className="text-[#DFBD69] font-medium">{artisan.years}</span>
                  {" "}— sole signing authority on her bank account
                </div>
              </div>

              {/* Progress indicator */}
              <div className="flex items-center space-x-2 mt-8">
                {ARTISAN_SPOTLIGHT.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveArtisan(i); setTick(t => t + 1); }}
                    className={`h-[2px] transition-all duration-500 ${
                      i === activeArtisan
                        ? "w-10 bg-[#DFBD69]"
                        : "w-4 bg-white/15 hover:bg-white/35"
                    }`}
                    aria-label={`View ${ARTISAN_SPOTLIGHT[i].name}`}
                  />
                ))}
                <span className="text-[9px] font-cinzel text-stone-600 ml-2 uppercase tracking-widest">
                  {activeArtisan + 1} / {ARTISAN_SPOTLIGHT.length}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom strip — contact + shipping */}
          <div className="px-8 py-5 border-t border-[#C8A253]/15 relative z-10" style={{ background: "rgba(19,34,71,0.5)" }}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[9px] font-cinzel uppercase tracking-[0.25em] text-stone-500 mb-1">
                  Write to us
                </div>
                <a
                  href="mailto:orders@peepalkrat.com"
                  className="text-[11px] font-serif text-[#DFBD69] hover:text-white transition-colors"
                >
                  orders@peepalkrat.com
                </a>
              </div>
              <div className="text-right">
                <div className="text-[9px] font-cinzel uppercase tracking-[0.25em] text-stone-500 mb-1">
                  Express Delivery
                </div>
                <div className="text-[11px] font-serif text-[#DFBD69]">
                  3–5 Days · 48+ Countries
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-underline {
          transform-origin: left;
          animation: underlineGrow 1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both;
        }
        @keyframes underlineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
