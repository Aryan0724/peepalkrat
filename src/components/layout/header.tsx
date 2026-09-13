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

export function Header() {
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
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Editorial Announcement Bar */}
      <div className="bg-charcoal text-khadi text-[11px] font-medium py-2 px-4 tracking-wider uppercase flex items-center justify-between border-b border-charcoal-light">
        <div className="hidden md:flex items-center space-x-2 text-stone-300">
          <Sparkles className="w-3 h-3 text-mustard-500" />
          <span>Handcrafted in Haryana • Dignified Artisan Livelihoods</span>
        </div>
        <div className="mx-auto md:mx-0 text-center text-stone-200">
          Complimentary pan-India shipping on orders above ₹2,000
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/impact" className="hover:text-terracotta-300 transition-colors">
            Our Social Impact
          </Link>
          <span className="text-stone-600">|</span>
          <Link href="/admin/login" className="hover:text-stone-100 transition-colors flex items-center space-x-1">
            <User className="w-3 h-3" />
            <span>Staff Portal</span>
          </Link>
        </div>
      </div>

      {/* Main Header Container */}
      <div
        className={`w-full bg-[#FAF8F5]/95 backdrop-blur-md transition-all duration-300 border-b ${
          isScrolled
            ? "py-3 shadow-sm border-stone-200"
            : "py-4.5 border-stone-200/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-charcoal hover:text-terracotta-600 transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Navigation Links Left */}
          <nav className="hidden lg:flex items-center space-x-8 text-[13px] font-medium tracking-wide uppercase">
            <Link
              href="/shop"
              className={`transition-colors hover:text-terracotta-600 ${
                pathname === "/shop" ? "text-terracotta-600 border-b border-terracotta-600 pb-0.5" : "text-charcoal"
              }`}
            >
              Shop
            </Link>
            <Link
              href="/collections/panipat-heritage-weaves"
              className={`transition-colors hover:text-terracotta-600 ${
                pathname.startsWith("/collections") ? "text-terracotta-600 border-b border-terracotta-600 pb-0.5" : "text-charcoal"
              }`}
            >
              Collections
            </Link>
            <Link
              href="/makers"
              className={`transition-colors hover:text-terracotta-600 ${
                pathname.startsWith("/makers") ? "text-terracotta-600 border-b border-terracotta-600 pb-0.5" : "text-charcoal"
              }`}
            >
              Meet the Makers
            </Link>
          </nav>

          {/* Centered Brand Identity */}
          <div className="text-center">
            <Link href="/" className="inline-block group">
              <span className="block font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-charcoal group-hover:text-terracotta-700 transition-colors">
                PEEPALKRAT
              </span>
              <span className="block text-[9px] uppercase tracking-[0.28em] text-stone-500 font-medium -mt-1 group-hover:text-stone-700">
                Haryana • For The People. By The People.
              </span>
            </Link>
          </div>

          {/* Right Navigation & Utility Actions */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Desktop Navigation Links Right */}
            <div className="hidden lg:flex items-center space-x-8 text-[13px] font-medium tracking-wide uppercase mr-2">
              <Link
                href="/our-story"
                className={`transition-colors hover:text-terracotta-600 ${
                  pathname === "/our-story" ? "text-terracotta-600 border-b border-terracotta-600 pb-0.5" : "text-charcoal"
                }`}
              >
                Our Story
              </Link>
              <Link
                href="/impact"
                className={`transition-colors hover:text-terracotta-600 ${
                  pathname === "/impact" ? "text-terracotta-600 border-b border-terracotta-600 pb-0.5" : "text-charcoal"
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
                  {(["INR", "USD", "EUR", "GBP"] as CurrencyCode[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-sandstone/60 transition-colors ${
                        currency === c ? "text-terracotta-700 font-semibold bg-sandstone/30" : "text-charcoal"
                      }`}
                    >
                      <span>{c}</span>
                      <span className="text-stone-500">
                        {c === "INR" ? "₹ (India)" : c === "USD" ? "$ (USD)" : c === "EUR" ? "€ (Euro)" : "£ (GBP)"}
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
                <span className="font-serif text-xl font-semibold text-charcoal">PEEPALKRAT</span>
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
              <p className="text-[10px] text-stone-400 mt-2">© 2026 PeepalKrat Enterprise</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
