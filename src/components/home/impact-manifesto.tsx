"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, TrendingUp } from "lucide-react";

const stats = [
  {
    before: "₹800",
    after: "₹6,400",
    label: "Average Monthly Income",
    sublabel: "Before → After joining PeepalKrat",
    note: "8× income growth in 18 months",
    color: "#E87722",
  },
  {
    before: "0",
    after: "142+",
    label: "Women With Sole Bank Signing Authority",
    sublabel: "Own account. Own passbook. Their earnings.",
    note: "Neighborhoods of Ambala City, Haryana",
    color: "#FFFCF8",
  },
  {
    before: "₹0",
    after: "₹2.1 Cr",
    label: "Direct Wages Disbursed",
    sublabel: "Paid weekly. Zero middlemen. Zero deductions.",
    note: "Since inception — growing every month",
    color: "#E87722",
  },
];

const testimonials = [
  {
    name: "Diksha & Team",
    village: "Kanshi Nagar, Ambala City",
    craft: "Hand Embroidery & Finishing",
    quote:
      "Pehle ghar mein kaam tha, paisa nahi tha. Ab main apni craft se sidha kamati hoon.",
    translation:
      "Before, there was work at home but no income. Now I earn directly from my craft.",
    incomeBefore: "₹800 / month",
    incomeAfter: "₹7,200 / month",
    yearsActive: "3 years",
  },
  {
    name: "Artisan Collective",
    village: "Model Town, Ambala City",
    craft: "Master Tailoring",
    quote:
      "Mere paas apna account hai. Apni kamai hai. Ab main bank khud jaati hoon.",
    translation:
      "I have my own account. My own earnings. Now I go to the bank myself.",
    incomeBefore: "₹1,200 / month",
    incomeAfter: "₹8,500 / month",
    yearsActive: "4 years",
  },
];

function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 2000,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function ImpactManifesto() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[activeTestimonial];

  return (
    <section className="bg-[#1A1A1A] text-[#FFFCF8] relative overflow-hidden border-b border-black/10">
      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "150px",
        }}
      />

      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E87722]/60 to-transparent" />

      {/* ─── SECTION 1: Ambala City Location & Mission Context ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Context */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-[#E87722]">
              <MapPin className="w-4 h-4" />
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em]">
                Ambala City, Haryana, India
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.08] text-white">
              One of Haryana's most{" "}
              <em className="italic text-[#E87722]">
                historic
              </em>{" "}
              districts. Now, one of its most{" "}
              <em className="italic text-[#E87722]">
                determined.
              </em>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light max-w-lg border-l-2 border-[#E87722]/50 pl-5">
              PeepalKrat is a direct intervention: placing craft earnings, bank 
              accounts, and market access directly in the hands of women 
              artisans in Ambala City who were previously invisible to the formal economy.
            </p>
            <div className="pt-2">
              <Link
                href="/impact"
                className="inline-flex items-center text-[11px] uppercase tracking-[0.2em] font-sans font-semibold text-[#E87722] hover:text-white transition-colors group"
              >
                <span>Read the Full Impact Report</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right: Rotating Artisan Voice */}
          <div className="relative">
            <div
              key={activeTestimonial}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 space-y-6"
              style={{ animation: "fadeSlideIn 0.5s ease-out" }}
            >
              {/* Income transformation */}
              <div className="flex items-center space-x-6 pb-6 border-b border-white/10">
                <div className="text-center">
                  <div className="text-xl font-display text-gray-400 line-through">
                    {t.incomeBefore}
                  </div>
                  <div className="text-[10px] font-sans text-gray-400 uppercase tracking-wider mt-1">
                    Before
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-[#E87722] flex-shrink-0" />
                <div className="text-center">
                  <div className="text-3xl font-display font-medium text-[#E87722]">
                    {t.incomeAfter}
                  </div>
                  <div className="text-[10px] text-[#E87722] uppercase tracking-wider mt-1 font-sans">
                    Today
                  </div>
                </div>
                <div className="text-right ml-auto">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-sans">
                    Active for
                  </div>
                  <div className="text-sm font-display text-white">
                    {t.yearsActive}
                  </div>
                </div>
              </div>

              {/* Quote in Hindi + English */}
              <blockquote className="space-y-3">
                <p className="font-display italic text-2xl text-white/90 leading-relaxed">
                  "{t.quote}"
                </p>
                <p className="text-gray-400 text-sm italic leading-relaxed font-light">
                  "{t.translation}"
                </p>
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="font-sans font-medium text-sm text-white">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5 font-sans">
                    {t.craft} · {t.village}
                  </div>
                </div>
                <div className="flex space-x-1.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`w-6 h-0.5 transition-all duration-300 ${
                        i === activeTestimonial
                          ? "bg-[#E87722]"
                          : "bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`View testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── SECTION 2: The Hard Numbers Grid ─── */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="relative group">
                <div className="mb-2">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-sans block mb-1">
                    {stat.sublabel}
                  </span>
                  <div
                    className="font-display text-4xl sm:text-5xl tracking-tight transition-transform duration-500 group-hover:scale-105 origin-left"
                    style={{ color: stat.color }}
                  >
                    {stat.after === "142+" ? (
                      <CountUp target={142} suffix="+" />
                    ) : stat.after === "₹6,400" ? (
                      <CountUp target={6400} prefix="₹" />
                    ) : (
                      stat.after
                    )}
                  </div>
                </div>
                <h3 className="text-sm font-sans font-medium text-white mb-2 uppercase tracking-wide">
                  {stat.label}
                </h3>
                <p className="text-xs text-gray-400 font-light border-l border-white/10 pl-3">
                  {stat.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
