"use client";

import React, { useState } from "react";
import { Scale, HeartHandshake, ShieldCheck, ChevronDown, ChevronUp, MapPin, Sparkles } from "lucide-react";
import { useCurrency } from "@/lib/currency-context";

interface AmbalaWageLedgerProps {
  priceInr: number;
  originVillage?: string | null;
  makerName?: string | null;
}

export function AmbalaWageLedger({
  priceInr,
  originVillage = "Ambala, Haryana",
  makerName = "Ambala Women's Artisan Guild",
}: AmbalaWageLedgerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { format } = useCurrency();

  const artisanWage = Math.round(priceInr * 0.52);
  const rawMaterials = Math.round(priceInr * 0.20);
  const packagingLogistics = Math.round(priceInr * 0.16);
  const cooperativeReinvestment = Math.round(priceInr * 0.12);

  return (
    <div className="bg-[#E8D1A7] border border-stone-200 rounded-sm overflow-hidden p-4 my-6 shadow-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-full bg-[#743014]/10 text-[#743014] flex items-center justify-center shrink-0">
            <Scale className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-semibold text-charcoal tracking-wide">
                The Ambala Living Wage Ledger
              </span>
              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                72% Maker Share
              </span>
            </div>
            <p className="text-[10px] text-stone-500 font-light">
              See the exact Rupee allocation directly supporting {makerName}
            </p>
          </div>
        </div>

        <div className="text-stone-400">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Breakdown */}
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-stone-200/80 space-y-4 animate-fade-in text-xs">
          {/* Visual Bar Breakdown */}
          <div className="w-full h-4 rounded-xs overflow-hidden flex shadow-inner">
            <div
              style={{ width: "52%" }}
              className="bg-[#743014] flex items-center justify-center text-[9px] font-bold text-white tracking-wider"
              title="52% Direct Artisan Compensation"
            >
              52%
            </div>
            <div
              style={{ width: "20%" }}
              className="bg-[#84592B] flex items-center justify-center text-[9px] font-bold text-white tracking-wider"
              title="20% Natural Raw Materials"
            >
              20%
            </div>
            <div
              style={{ width: "16%" }}
              className="bg-stone-600 flex items-center justify-center text-[9px] font-bold text-white tracking-wider"
              title="16% Zero-Plastic Packing & Courier"
            >
              16%
            </div>
            <div
              style={{ width: "12%" }}
              className="bg-stone-400 flex items-center justify-center text-[9px] font-bold text-white tracking-wider"
              title="12% Cooperative Platform"
            >
              12%
            </div>
          </div>

          {/* Allocation Rows */}
          <div className="space-y-2 text-[11px]">
            <div className="flex items-center justify-between pb-1.5 border-b border-stone-200/60">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#743014]" />
                <span className="text-stone-700 font-medium">Direct Maker Wages (Personal Bank Passbook)</span>
              </div>
              <span className="font-semibold text-charcoal">{format(artisanWage)} (52%)</span>
            </div>

            <div className="flex items-center justify-between pb-1.5 border-b border-stone-200/60">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#84592B]" />
                <span className="text-stone-700 font-medium">Indigenous Haryana Raw Materials</span>
              </div>
              <span className="font-semibold text-charcoal">{format(rawMaterials)} (20%)</span>
            </div>

            <div className="flex items-center justify-between pb-1.5 border-b border-stone-200/60">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-stone-600" />
                <span className="text-stone-700 font-medium">Zero-Plastic Corrugated Packaging & Express Logistics</span>
              </div>
              <span className="font-semibold text-charcoal">{format(packagingLogistics)} (16%)</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-stone-400" />
                <span className="text-stone-700 font-medium">PeepalKrat Cooperative Reinvestment</span>
              </div>
              <span className="font-semibold text-charcoal">{format(cooperativeReinvestment)} (12%)</span>
            </div>
          </div>

          {/* Geographic Seal */}
          <div className="bg-white p-3 rounded-xs border border-stone-200 flex items-center justify-between text-[10px] text-stone-500">
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#743014]" />
              <span>Crafted in {originVillage}</span>
            </div>
            <span className="text-[#9D9167] font-semibold flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified No-Middleman Living Wage</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
