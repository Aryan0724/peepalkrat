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
    color: "#DFBD69",
  },
  {
    before: "0",
    after: "142+",
    label: "Women With Sole Bank Signing Authority",
    sublabel: "Own account. Own passbook. Their earnings.",
    note: "Villages of Nuh, Punhana, Taoru & Ferozpur Jhirka",
    color: "#FAF6EE",
  },
  {
    before: "₹0",
    after: "₹2.1 Cr",
    label: "Direct Wages Disbursed",
    sublabel: "Paid weekly. Zero middlemen. Zero deductions.",
    note: "Since inception — growing every month",
    color: "#DFBD69",
  },
];

const testimonials = [
  {
    name: "Sameena Begum",
    village: "Nuh, Mewat",
    craft: "Pit-Loom Weaver",
    quote:
      "Pehle ghar mein kaam tha, paisa nahi tha. Ab main apni beti ki fees khud bharta hoon.",
    translation:
      "Before, there was work at home but no income. Now I pay my daughter's school fees myself.",
    incomeBefore: "₹700 / month",
    incomeAfter: "₹7,200 / month",
    yearsActive: "3 years",
  },
  {
    name: "Reshma Devi",
    village: "Punhana, Mewat",
    craft: "Moonj Grass Artisan",
    quote:
      "Mere paas apna account hai. Apni kamai hai. Ab main apne pati par nirbhar nahi hoon.",
    translation:
      "I have my own account. My own earnings. I am no longer dependent on my husband.",
    incomeBefore: "₹900 / month",
    incomeAfter: "₹5,800 / month",
    yearsActive: "2 years",
  },
  {
    name: "Fatima Khatoon",
    village: "Ferozpur Jhirka, Mewat",
    craft: "Phulkari Embroiderer",
    quote:
      "Jab videsh se order aata hai, mujhe lagta hai ki meri kala duniya bhar mein pahunch rahi hai.",
    translation:
      "When an order comes from abroad, I feel my craft is reaching the whole world.",
    incomeBefore: "₹1,100 / month",
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
    <section className="bg-[#0B132B] text-[#FAF6EE] relative overflow-hidden border-b border-[#C8A253]/20">
      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "150px",
        }}
      />

      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C8A253]/60 to-transparent" />

      {/* ─── SECTION 1: Mewat Location & Mission Context ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Context */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-[#DFBD69]">
              <MapPin className="w-4 h-4" />
              <span className="text-[11px] font-cinzel font-semibold uppercase tracking-[0.25em]">
                Mewat District, Haryana, India
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.08] text-white">
              One of India's most{" "}
              <em className="font-cormorant italic not-italic text-[#DFBD69]">
                underserved
              </em>{" "}
              districts. Now, one of its most{" "}
              <em className="font-cormorant italic text-[#DFBD69]">
                determined.
              </em>
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light max-w-lg border-l-2 border-[#C8A253]/50 pl-5">
              Mewat — renamed Nuh district in 2016 — has historically ranked
              last or near-last in Haryana on female literacy, workforce
              participation, and income. PeepalKrat is a direct intervention:
              placing craft earnings, bank accounts, and market access directly
              in the hands of women who were previously invisible to the formal
              economy.
            </p>
            <div className="pt-2">
              <Link
                href="/impact"
                className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-cinzel font-semibold text-[#DFBD69] hover:text-white transition-colors group"
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
              className="bg-[#132247]/80 border border-[#C8A253]/30 p-8 space-y-6"
              style={{ animation: "fadeSlideIn 0.5s ease-out" }}
            >
              {/* Income transformation */}
              <div className="flex items-center space-x-6 pb-6 border-b border-[#C8A253]/20">
                <div className="text-center">
                  <div className="text-xl font-serif text-stone-500 line-through">
                    {t.incomeBefore}
                  </div>
                  <div className="text-[10px] text-stone-500 uppercase tracking-wider mt-1">
                    Before
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-[#DFBD69] flex-shrink-0" />
                <div className="text-center">
                  <div className="text-3xl font-serif font-medium text-[#DFBD69]">
                    {t.incomeAfter}
                  </div>
                  <div className="text-[10px] text-[#DFBD69] uppercase tracking-wider mt-1 font-cinzel">
                    Today
                  </div>
                </div>
                <div className="text-right ml-auto">
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">
                    Active for
                  </div>
                  <div className="text-sm font-serif text-white">
                    {t.yearsActive}
                  </div>
                </div>
              </div>

              {/* Quote in Hindi + English */}
              <blockquote className="space-y-3">
                <p className="font-cormorant italic text-xl sm:text-2xl text-white/90 leading-relaxed">
                  "{t.quote}"
                </p>
                <p className="text-stone-400 text-xs sm:text-sm italic leading-relaxed font-light">
                  "{t.translation}"
                </p>
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="font-cinzel font-semibold text-sm text-white">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
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
                          ? "bg-[#DFBD69]"
                          : "bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute -bottom-2 -right-2 w-12 h-12 border-r-2 border-b-2 border-[#C8A253]/40" />
            <div className="absolute -top-2 -left-2 w-12 h-12 border-l-2 border-t-2 border-[#C8A253]/40" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px max-w-7xl mx-auto bg-gradient-to-r from-transparent via-[#C8A253]/25 to-transparent" />

      {/* ─── SECTION 2: Raw Data Manifesto ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12 max-w-xl">
          <span className="text-[11px] font-cinzel font-semibold uppercase tracking-[0.25em] text-[#C8A253] block mb-3">
            The Numbers That Matter
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-white font-light leading-tight">
            This is not charity. This is commerce with a conscience.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#C8A253]/20">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-10 space-y-4 ${
                i < stats.length - 1
                  ? "border-b md:border-b-0 md:border-r border-[#C8A253]/20"
                  : ""
              }`}
            >
              {/* Before / After */}
              <div className="flex items-baseline space-x-3">
                <span className="font-serif text-lg text-stone-600 line-through">
                  {stat.before}
                </span>
                <span className="text-stone-500 text-sm">→</span>
                <span
                  className="font-serif text-4xl sm:text-5xl font-light"
                  style={{ color: stat.color }}
                >
                  {stat.after}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-white">
                  {stat.label}
                </h4>
                <p className="text-stone-400 text-xs font-light">
                  {stat.sublabel}
                </p>
              </div>

              <div className="pt-2 border-t border-[#C8A253]/15">
                <p className="text-[10px] font-cinzel uppercase tracking-widest text-[#DFBD69]">
                  {stat.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Live tracker row */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 bg-[#132247]/40 border border-[#C8A253]/20 px-8 py-6">
          <div>
            <div className="font-serif text-3xl text-[#DFBD69] font-light">
              <CountUp target={142} suffix="+" />
            </div>
            <div className="text-[10px] font-cinzel uppercase tracking-widest text-stone-400 mt-1">
              Women Artisans
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl text-white font-light">
              <CountUp target={12} />
            </div>
            <div className="text-[10px] font-cinzel uppercase tracking-widest text-stone-400 mt-1">
              Villages Reached
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl text-[#DFBD69] font-light">
              <CountUp target={48} suffix="+" />
            </div>
            <div className="text-[10px] font-cinzel uppercase tracking-widest text-stone-400 mt-1">
              Countries Delivered
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl text-white font-light">
              <CountUp target={72} suffix="%" />
            </div>
            <div className="text-[10px] font-cinzel uppercase tracking-widest text-stone-400 mt-1">
              Revenue to Artisan
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
