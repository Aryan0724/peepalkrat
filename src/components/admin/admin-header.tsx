"use client";

import React from "react";
import Link from "next/link";
import { Bell, ShieldCheck, User } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center space-x-2 text-xs text-stone-500">
        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
        <span>Haryana Artisan Guild Network • All Systems Online</span>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-xs text-charcoal">
          <div className="w-8 h-8 rounded-full bg-sandstone border border-stone-300 flex items-center justify-center text-charcoal font-semibold">
            PG
          </div>
          <div>
            <span className="font-semibold block leading-tight">Admin Coordinator</span>
            <span className="text-[10px] text-stone-400">admin@peepalkrat.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}
