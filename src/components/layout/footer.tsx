"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Globe, Heart, Mail, ShieldCheck, Sparkles } from "lucide-react";
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
      setNewsletterStatus("Thank you for joining the PeepalKrat community journal.");
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="bg-charcoal text-stone-300 pt-16 pb-12 border-t border-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Pillars / Credo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-14 border-b border-stone-800 text-center md:text-left">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center shrink-0 text-terracotta-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-serif text-base font-medium">Agency Over Charity</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                The women of Haryana are not beneficiaries of charity. They are master craftswomen and entrepreneurs co-creating luxury heritage goods.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center shrink-0 text-mustard-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-serif text-base font-medium">100% Traceable Craft</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Every piece bears the name, village, and craft heritage of its maker. Honest compensation and transparent value creation.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center shrink-0 text-peepal-500">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-serif text-base font-medium">Regenerative & Natural</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Desi cotton, wild Moonj canal grass, alluvial pottery clay, and plant-based botanical dyes with plastic-free shipping.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14 border-b border-stone-800">
          {/* Col 1 & 2: Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl font-semibold tracking-wider text-white">
              PEEPALKRAT
            </span>
            <p className="text-xs tracking-[0.25em] uppercase text-stone-400 font-semibold -mt-2">
              {aboutBlock?.subtitle || "For The People. By The People."}
            </p>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm pt-1">
              {aboutBlock?.content || "A Haryana-rooted social commerce brand connecting discerning patrons globally with the timeless mastery and entrepreneurial power of rural women makers."}
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-medium text-white block mb-2">
                Join the PeepalKrat Journal
              </span>
              <form onSubmit={handleNewsletter} className="flex max-w-sm">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-stone-900 border border-stone-700 text-xs text-white px-3.5 py-2.5 rounded-l-sm focus:outline-none focus:border-terracotta-500 placeholder:text-stone-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs px-4 py-2.5 rounded-r-sm font-medium transition-colors flex items-center"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              {newsletterStatus && (
                <p className="text-[11px] text-peepal-300 mt-1.5">{newsletterStatus}</p>
              )}
            </div>
          </div>

          {/* Col 3: Shop */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider">
              The Catalog
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections/panipat-heritage-weaves" className="hover:text-white transition-colors">
                  Panipat Handlooms & Dhurries
                </Link>
              </li>
              <li>
                <Link href="/collections/festive-phulkari" className="hover:text-white transition-colors">
                  Festive Phulkari Textiles
                </Link>
              </li>
              <li>
                <Link href="/collections/moonj-botanical-series" className="hover:text-white transition-colors">
                  Moonj Wild Grass Baskets
                </Link>
              </li>
              <li>
                <Link href="/collections/rohtak-clay-studio" className="hover:text-white transition-colors">
                  Earthen Pottery & Ceramics
                </Link>
              </li>
              <li>
                <Link href="/shop?category=woodcraft-serveware" className="hover:text-white transition-colors">
                  Kikar Wood & Brass Accents
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Story & Makers */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider">
              Our Movement
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/makers" className="hover:text-white transition-colors">
                  Meet the Makers
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-white transition-colors">
                  Our Founding Story
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-white transition-colors">
                  Social Impact Model
                </Link>
              </li>
              <li>
                <Link href="/makers/sunita-devi" className="hover:text-white transition-colors">
                  Panipat Weaver Spotlight
                </Link>
              </li>
              <li>
                <Link href="/makers/santosh-kumari" className="hover:text-white transition-colors">
                  Rohtak Phulkari Heritage
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors">
                  Admin & Operations Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Client Support & Policies */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider">
              Assistance & Policies
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <span className="text-stone-300">Panipat Workshop HQ:</span>
                <p className="text-[11px] text-stone-500 mt-0.5">Sector 25, Panipat, Haryana 132103</p>
              </li>
              <li>
                <span className="text-stone-300">Patron Care:</span>
                <p className="text-[11px] text-stone-500 mt-0.5">hello@peepalkrat.com</p>
              </li>
              <li className="pt-1">
                <span className="text-stone-400">Plastic-Free Pan-India Delivery (3-5 Days)</span>
              </li>
              <li>
                <span className="text-stone-400">International DHL Express to 45+ Countries</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Currencies & Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} PeepalKrat Enterprise. All rights reserved. Registered Social Enterprise in Haryana, India.
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Globe className="w-3.5 h-3.5 text-stone-400" />
              <span>Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-stone-900 border border-stone-800 text-stone-300 text-xs px-2 py-1 rounded focus:outline-none"
              >
                <option value="INR">INR (₹) India</option>
                <option value="USD">USD ($) United States</option>
                <option value="EUR">EUR (€) Europe</option>
                <option value="GBP">GBP (£) United Kingdom</option>
              </select>
            </div>
            <span>•</span>
            <span>Ethical Luxury</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
