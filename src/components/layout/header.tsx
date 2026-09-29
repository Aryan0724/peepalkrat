"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Globe,
  Heart,
  ChevronDown,
  User,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { CurrencyCode } from "@/types";

export function Header({ announcement }: { announcement?: any }) {
  const pathname = usePathname();
  const { openCart, itemCount } = useCart();
  const { currency, setCurrency, currencyConfig } = useCurrency();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdminRoute) return null; // Don't render storefront header in admin routes

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Main Header — iTokri style: warm cream, clean, minimal */}
      <div
        className={`w-full transition-all duration-300 border-b ${
          isScrolled ? "py-3 shadow-sm border-black/10" : "py-4 border-black/8"
        }`}
        style={{ background: "#FFFCF8" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-[#1A1A1A] hover:text-[#E87722] transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Navigation Links Left */}
          <nav className="hidden lg:flex items-center space-x-8 text-[12px] font-medium tracking-[0.08em] uppercase text-[#555]">
            <Link
              href="/shop"
              className={`transition-colors hover:text-[#1A1A1A] ${pathname === "/shop" ? "text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5" : ""}`}
            >
              Shop
            </Link>
            <Link
              href="/collections/panipat-heritage-weaves"
              className={`transition-colors hover:text-[#1A1A1A] ${pathname.startsWith("/collections") ? "text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5" : ""}`}
            >
              Collections
            </Link>
            <Link
              href="/makers"
              className={`transition-colors hover:text-[#1A1A1A] ${pathname.startsWith("/makers") ? "text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5" : ""}`}
            >
              Artisans
            </Link>
          </nav>

          {/* Centered Brand Identity */}
          <div className="text-center">
            <Link href="/" className="inline-flex flex-col items-center group">
              <div className="flex items-center space-x-2">
                {/* Peepal Leaf Logo (Matching Storefront Sign) */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-8 h-8 text-[#5E5063] group-hover:text-[#E87722] transition-colors"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M50 95 C 45 80, 10 70, 10 40 C 10 15, 30 5, 50 20 C 70 5, 90 15, 90 40 C 90 70, 55 80, 50 95 Z" />
                  <path
                    d="M50 20 L50 90 M50 40 L30 30 M50 50 L25 45 M50 60 L30 65 M50 40 L70 30 M50 50 L75 45 M50 60 L70 65"
                    stroke="#FFFCF8"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path d="M50 20 L50 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <span className="block font-display text-2xl sm:text-3xl font-normal tracking-tight text-[#1A1A1A] group-hover:text-[#E87722] transition-colors pt-1">
                  PeepalKraft
                </span>
              </div>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-[#888] font-medium mt-0.5">
                Ambala City · Haryana
              </span>
            </Link>
          </div>

          {/* Right Navigation & Utility Actions */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Desktop Navigation Links Right */}
            <div className="hidden lg:flex items-center space-x-8 text-[12px] font-medium tracking-[0.08em] uppercase text-[#555] mr-2">
              <Link
                href="/community"
                className={`transition-colors hover:text-[#1A1A1A] ${pathname === "/community" ? "text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5" : ""}`}
              >
                Community
              </Link>
              <Link
                href="/our-story"
                className={`transition-colors hover:text-[#1A1A1A] ${pathname === "/our-story" ? "text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5" : ""}`}
              >
                Our Story
              </Link>
              <Link
                href="/impact"
                className={`transition-colors hover:text-[#1A1A1A] ${
                  pathname === "/impact" ? "text-[#881C10] border-b-2 border-[#881C10] pb-0.5" : "text-[#0B132B]"
                }`}
              >
                Impact
              </Link>
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center space-x-1 text-xs font-medium text-stone-600 hover:text-charcoal px-2 py-1 rounded hover:bg-stone-100 transition-colors"
                title="Change currency"
              >
                <Globe className="w-3.5 h-3.5 text-stone-400" />
                <span>{currency}</span>
                <span className="text-stone-400 text-[10px]">({currencyConfig.symbol})</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {currencyDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 bg-white border border-stone-200 rounded-sm shadow-lg py-1.5 z-50 animate-fade-in"
                  onMouseLeave={() => setCurrencyDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-stone-400 font-semibold border-b border-stone-100">
                    Select Currency
                  </div>
                  {(["USD", "GBP", "EUR", "CAD", "AUD", "INR"] as CurrencyCode[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#FAF6EE] transition-colors ${
                        currency === c ? "text-[#881C10] font-semibold bg-[#FAF6EE]" : "text-charcoal"
                      }`}
                    >
                      <span className="font-cinzel">{c}</span>
                      <span className="text-stone-500 text-[11px]">
                        {c === "USD"
                          ? "$ (United States)"
                          : c === "GBP"
                          ? "£ (United Kingdom)"
                          : c === "EUR"
                          ? "€ (Europe)"
                          : c === "CAD"
                          ? "CA$ (Canada)"
                          : c === "AUD"
                          ? "AU$ (Australia)"
                          : "₹ (India)"}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 text-charcoal hover:text-terracotta-600 transition-colors"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Slide-out Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-1.5 text-charcoal hover:text-terracotta-600 transition-colors group"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-terracotta-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Dropdown Search Bar */}
        {searchOpen && (
          <div className="max-w-4xl mx-auto px-4 pt-3 pb-2 animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search handloom rugs, phulkari stoles, terracotta pottery, makers..."
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-stone-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-terracotta-500 shadow-inner"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-3 text-stone-400 hover:text-charcoal"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl flex flex-col p-6 z-50 animate-slide-up">
            <div className="flex justify-between items-center pb-5 border-b border-stone-200">
              <div>
                <span className="font-serif text-xl font-semibold text-charcoal">PeepalKraft</span>
                <span className="block text-[8px] uppercase tracking-widest text-stone-400">Haryana Heritage</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-stone-400 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 py-6 space-y-4 text-base font-medium">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-charcoal hover:text-terracotta-600 transition-colors py-1"
              >
                Shop All Products
              </Link>
              <Link
                href="/collections/panipat-heritage-weaves"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-charcoal hover:text-terracotta-600 transition-colors py-1"
              >
                Curated Collections
              </Link>
              <Link
                href="/makers"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-charcoal hover:text-terracotta-600 transition-colors py-1"
              >
                Meet the Makers
              </Link>
              <Link
                href="/community"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-charcoal hover:text-terracotta-600 transition-colors py-1"
              >
                Sisterhood & Community Journal
              </Link>
              <Link
                href="/our-story"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-charcoal hover:text-terracotta-600 transition-colors py-1"
              >
                Our Story & Origins
              </Link>
              <Link
                href="/impact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-charcoal hover:text-terracotta-600 transition-colors py-1"
              >
                Verified Social Impact
              </Link>
              <div className="border-t border-stone-200 pt-4 mt-6">
                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-charcoal py-1"
                >
                  Admin / Staff Portal
                </Link>
              </div>
            </nav>

            <div className="border-t border-stone-200 pt-4 text-xs text-stone-500">
              <p className="italic">“When needle and loom meet patience, our autonomy awakens.”</p>
              <p className="text-[10px] text-stone-400 mt-2">© 2026 PeepalKraft Enterprise</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
