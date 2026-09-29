"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Globe, Heart, Mail, ShieldCheck, Sparkles, Send, CheckCircle2 } from "lucide-react";
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
    <footer className="bg-[#070C19] text-stone-300 pt-16 pb-12 border-t border-[#C8A253]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Pillars: Swadeshi Movement & Women's Freedom Credos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-14 border-b border-[#C8A253]/20 text-center md:text-left">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-[#132247] flex items-center justify-center shrink-0 text-[#DFBD69] border border-[#C8A253]/40">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-serif text-base font-medium">1857 Swadeshi Lineage</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Carrying forward Haryana's 1857 spirit of self-reliance. Coarse Desi cotton and local craft as an act of dignified defiance against factory exploitation.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-[#132247] flex items-center justify-center shrink-0 text-[#DFBD69] border border-[#C8A253]/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-serif text-base font-medium">100% Living Wage Ledger</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                72% direct maker share reaches rural craftswomen without patriarchal or institutional cuts. Verified bank passbooks in every home.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-[#132247] flex items-center justify-center shrink-0 text-[#DFBD69] border border-[#C8A253]/40">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-serif text-base font-medium">Mewat Stree Swaraj</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                142+ rural women across Nuh, Taoru, Punhana, Nagina & Ferozepur Jhirka commanding their own creative leadership and financial autonomy.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Postal Dispatch Envelope */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14 border-b border-[#C8A253]/20">
          
          {/* Col 1 & 2: Brand & Royal Postal Dispatch (The Way Email is Represented) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl font-semibold tracking-wider text-white">
              PeepalKraft
            </span>
            <p className="text-[10px] tracking-[0.28em] uppercase text-[#DFBD69] font-cinzel font-bold -mt-2">
              Mewat & Haryana • Swadeshi Freedom Guild
            </p>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm pt-1">
              {aboutBlock?.content || "A social commerce guild rooted in the historic soil of Haryana, connecting patrons globally with the timeless mastery and feminist financial sovereignty of rural women makers."}
            </p>

            {/* Bespoke Postal Dispatch Card (Artistic Email Representation) */}
            <div className="postal-dispatch-envelope p-5 rounded-xs mt-4 text-[#0B132B]">
              <div className="flex items-center justify-between pb-2 border-b border-[#EAE0CE]">
                <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-[#881C10]">
                  The Swadeshi Gazette • डाक विभाग
                </span>
                <span className="text-[9px] font-mono text-stone-500">Mewat Div.</span>
              </div>
              
              <p className="text-xs text-stone-700 font-serif italic mt-2">
                Subscribe to receive quarterly archival monographs and private invitations to limited loom drops.
              </p>

              {newsletterStatus ? (
                <div className="mt-3 p-2 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-xs text-[11px] flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{newsletterStatus}</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="mt-3 flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your postal email..."
                    className="flex-1 bg-white border border-[#C8A253] text-xs text-stone-900 px-3 py-2 rounded-xs focus:outline-none placeholder:text-stone-400 font-serif"
                    required
                  />
                  <button
                    type="submit"
                    className="wax-seal-btn px-4 py-2 text-[10px] font-cinzel uppercase tracking-wider font-bold rounded-xs flex items-center space-x-1 shrink-0"
                  >
                    <span>Affix Seal</span>
                    <Send className="w-3 h-3 ml-1" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 3: Catalog */}
          <div className="space-y-3">
            <h4 className="text-[#DFBD69] text-xs font-cinzel font-semibold uppercase tracking-wider">
              The Swadeshi Catalog
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Handcrafted Pieces
                </Link>
              </li>
              <li>
                <Link href="/collections/panipat-heritage-weaves" className="hover:text-white transition-colors">
                  Panipat Pit-Loom Weaves
                </Link>
              </li>
              <li>
                <Link href="/collections/festive-phulkari" className="hover:text-white transition-colors">
                  Counted-Thread Phulkari
                </Link>
              </li>
              <li>
                <Link href="/collections/moonj-botanical-series" className="hover:text-white transition-colors">
                  Aravalli Moonj Grasscraft
                </Link>
              </li>
              <li>
                <Link href="/collections/rohtak-clay-studio" className="hover:text-white transition-colors">
                  Alluvial Riverbed Terracotta
                </Link>
              </li>
              <li>
                <Link href="/shop?category=woodcraft-serveware" className="hover:text-white transition-colors">
                  Rewari Hand-Beaten Brass
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Movement */}
          <div className="space-y-3">
            <h4 className="text-[#DFBD69] text-xs font-cinzel font-semibold uppercase tracking-wider">
              Our Movement
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/community" className="text-[#DFBD69] hover:text-white font-medium transition-colors">
                  Sisterhood Wall ↗
                </Link>
              </li>
              <li>
                <Link href="/makers" className="hover:text-white transition-colors">
                  Mewat Artisan Guild
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-white transition-colors">
                  1857 Rebellion Heritage
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-white transition-colors">
                  Living Wage Transparency
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors">
                  Operations & Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Clusters */}
          <div className="space-y-3">
            <h4 className="text-[#DFBD69] text-xs font-cinzel font-semibold uppercase tracking-wider">
              Mewat Tehsil Guilds
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <span className="text-stone-300 font-medium">Primary Clusters:</span>
                <p className="text-[11px] text-stone-400 mt-0.5">Nuh • Taoru • Punhana • Nagina • Ferozepur Jhirka</p>
              </li>
              <li>
                <span className="text-stone-300 font-medium">Textile Guild:</span>
                <p className="text-[11px] text-stone-400 mt-0.5">Sector 25, Panipat 132103</p>
              </li>
              <li>
                <span className="text-stone-300">Patron Care:</span>
                <p className="text-[11px] text-stone-400 mt-0.5">hello@PeepalKraft.com</p>
              </li>
              <li className="pt-1">
                <span className="text-[#DFBD69] text-[11px]">Direct Bank Transfers Every Friday to Women Artisans</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Currencies */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} PeepalKraft Enterprise. 1857 Rebellion Lineage to 2026 Women's Sovereignty. Registered in Haryana, India.
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Globe className="w-3.5 h-3.5 text-stone-400" />
              <span>Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-[#132247] border border-[#C8A253]/40 text-[#DFBD69] text-xs px-2 py-1 rounded focus:outline-none"
              >
                <option value="INR">INR (₹) India</option>
                <option value="USD">USD ($) United States</option>
                <option value="EUR">EUR (€) Europe</option>
                <option value="GBP">GBP (£) United Kingdom</option>
              </select>
            </div>
            <span>•</span>
            <span className="text-[#DFBD69] font-cinzel">100% Swadeshi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
