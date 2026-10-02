"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Globe, Heart, ShieldCheck, Sparkles, Send, CheckCircle2, ArrowUpRight } from "lucide-react";
import { useCurrency } from "@/lib/currency-context";
import { CurrencyCode } from "@/types";

export function Footer({
  aboutBlock,
  contactBlock,
}: {
  aboutBlock?: any;
  contactBlock?: any;
} = {}) {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);

  if (pathname?.startsWith("/admin")) return null;

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterStatus("Wax seal affixed. You are registered for the Swadeshi Gazette.");
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="bg-[#442D1C] text-[#FAF7F2] pt-20 pb-14 border-t border-[#E8D1A7]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Pillars: Swadeshi Movement & Women's Freedom Credos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-[#E8D1A7]/20 text-center md:text-left">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2]/10 flex items-center justify-center shrink-0 text-[#E8D1A7] border border-[#E8D1A7]/30 shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-display text-lg font-medium">1857 Swadeshi Lineage</h4>
              <p className="text-sm text-[#FAF7F2]/80 mt-1.5 leading-relaxed font-light">
                Carrying forward Haryana's 1857 spirit of self-reliance. Coarse Desi cotton and local craft as an act of dignified defiance against factory exploitation.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2]/10 flex items-center justify-center shrink-0 text-[#E8D1A7] border border-[#E8D1A7]/30 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-display text-lg font-medium">100% Living Wage Ledger</h4>
              <p className="text-sm text-[#FAF7F2]/80 mt-1.5 leading-relaxed font-light">
                72% direct maker share reaches rural craftswomen without patriarchal or institutional cuts. Verified bank passbooks in every home.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2]/10 flex items-center justify-center shrink-0 text-[#E8D1A7] border border-[#E8D1A7]/30 shadow-xs">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-display text-lg font-medium">Ambala Stree Swaraj</h4>
              <p className="text-sm text-[#FAF7F2]/80 mt-1.5 leading-relaxed font-light">
                142+ rural women across Nuh, Taoru, Punhana, Nagina and Ferozepur Jhirka commanding their own creative leadership and financial autonomy.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Postal Dispatch Envelope */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 py-16 border-b border-[#E8D1A7]/20">
          
          {/* Col 1 & 2: Brand & Postal Dispatch */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src="/peepalkraft-logo-light.png"
                alt="PeepalKraft Logo"
                width={220}
                height={55}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-xs tracking-[0.25em] uppercase text-[#E8D1A7] font-semibold">
              Ambala & Haryana · Swadeshi Freedom Guild
            </p>
            <p className="text-sm text-[#FAF7F2]/80 leading-relaxed max-w-sm font-light">
              {aboutBlock?.content || "A social commerce guild rooted in the historic soil of Haryana, connecting patrons globally with the timeless mastery and feminist financial sovereignty of rural women makers."}
            </p>

            {/* Bespoke Postal Dispatch Card */}
            <div className="bg-[#FAF7F2] p-6 rounded-xs mt-4 text-[#442D1C] shadow-md border border-[#E8D1A7]">
              <div className="flex items-center justify-between pb-3 border-b border-[#442D1C]/15">
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#743014]">
                  The Swadeshi Gazette · Ambala Dispatch
                </span>
                <span className="text-[10px] font-mono text-[#84592B] font-semibold bg-[#E8D1A7]/40 px-2 py-0.5 rounded-xs">
                  Issue 2026
                </span>
              </div>
              
              <p className="text-xs sm:text-[13px] text-[#5A4231] font-serif italic mt-3 leading-relaxed">
                Subscribe to receive quarterly archival monographs, maker milestone reports, and private invitations to limited loom drops.
              </p>

              {newsletterStatus ? (
                <div className="mt-4 p-3 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-xs text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">{newsletterStatus}</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="mt-4 flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 bg-white border border-[#84592B]/40 text-sm text-[#442D1C] px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-[#743014] placeholder:text-stone-400 font-sans"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#743014] hover:bg-[#84592B] text-white px-5 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-xs flex items-center justify-center space-x-1.5 shrink-0 transition-colors shadow-xs"
                  >
                    <span>Affix Seal</span>
                    <Send className="w-3.5 h-3.5 ml-1" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 3: Catalog */}
          <div className="space-y-4">
            <h4 className="text-[#E8D1A7] text-sm font-sans font-semibold uppercase tracking-wider">
              The Swadeshi Catalog
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF7F2]/80 font-light">
              <li>
                <Link href="/shop" className="hover:text-white hover:underline transition-colors block py-0.5">
                  All Handcrafted Pieces
                </Link>
              </li>
              <li>
                <Link href="/collections/panipat-heritage-weaves" className="hover:text-white hover:underline transition-colors block py-0.5">
                  Panipat Pit-Loom Weaves
                </Link>
              </li>
              <li>
                <Link href="/collections/festive-phulkari" className="hover:text-white hover:underline transition-colors block py-0.5">
                  Counted-Thread Phulkari
                </Link>
              </li>
              <li>
                <Link href="/collections/moonj-botanical-series" className="hover:text-white hover:underline transition-colors block py-0.5">
                  Aravalli Moonj Grasscraft
                </Link>
              </li>
              <li>
                <Link href="/collections/rohtak-clay-studio" className="hover:text-white hover:underline transition-colors block py-0.5">
                  Alluvial Riverbed Terracotta
                </Link>
              </li>
              <li>
                <Link href="/shop?category=brassware-accents" className="hover:text-white hover:underline transition-colors block py-0.5">
                  Rewari Hand-Beaten Brass
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Movement */}
          <div className="space-y-4">
            <h4 className="text-[#E8D1A7] text-sm font-sans font-semibold uppercase tracking-wider">
              Our Movement
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF7F2]/80 font-light">
              <li>
                <Link href="/community" className="text-[#E8D1A7] hover:text-white font-medium transition-colors inline-flex items-center space-x-1 py-0.5">
                  <span>Sisterhood Wall</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/makers" className="hover:text-white hover:underline transition-colors block py-0.5">
                  Ambala Artisan Guild
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-white hover:underline transition-colors block py-0.5">
                  1857 Rebellion Heritage
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-white hover:underline transition-colors block py-0.5">
                  Living Wage Transparency
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white hover:underline transition-colors block py-0.5">
                  Operations & Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Clusters & Contact */}
          <div className="space-y-4">
            <h4 className="text-[#E8D1A7] text-sm font-sans font-semibold uppercase tracking-wider">
              Ambala Tehsil Guilds
            </h4>
            <div className="space-y-3 text-sm text-[#FAF7F2]/80 font-light">
              <div>
                <span className="text-white font-medium block">Primary Clusters:</span>
                <p className="text-xs text-[#FAF7F2]/70 mt-1 leading-relaxed">
                  Nuh · Taoru · Punhana · Nagina · Ferozepur Jhirka
                </p>
              </div>
              <div>
                <span className="text-white font-medium block">Textile Guild:</span>
                <p className="text-xs text-[#FAF7F2]/70 mt-0.5">Sector 25, Panipat 132103</p>
              </div>
              <div>
                <span className="text-white font-medium block">Patron Care:</span>
                <p className="text-xs text-[#E8D1A7] font-mono mt-0.5">peepalkraft@gmail.com</p>
              </div>
              <div className="pt-2 border-t border-[#E8D1A7]/15">
                <span className="text-xs text-[#E8D1A7] font-medium leading-relaxed block">
                  Direct Bank Transfers Every Friday to Women Artisans
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Currencies */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between text-xs text-[#FAF7F2]/70 space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} PeepalKraft Enterprise. 1857 Rebellion Lineage to Women's Sovereignty. Registered in Haryana, India.
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-[#E8D1A7]" />
              <span className="text-xs">Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-[#2E1E12] border border-[#E8D1A7]/40 text-[#FAF7F2] text-xs px-2.5 py-1.5 rounded-xs focus:outline-none focus:border-[#E8D1A7]"
              >
                <option value="INR">INR (₹) India</option>
                <option value="USD">USD ($) United States</option>
                <option value="EUR">EUR (€) Europe</option>
                <option value="GBP">GBP (£) United Kingdom</option>
              </select>
            </div>
            <span>·</span>
            <span className="text-[#E8D1A7] font-semibold uppercase tracking-wider text-xs">
              100% Swadeshi
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
