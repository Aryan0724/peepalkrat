"use client";

import React, { useState } from "react";
import { Save, Check, Globe, Truck, Building2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingItem {
  id: string;
  key: string;
  value: string;
  group: string;
}

export function SettingsEditorClient({ initialSettings }: { initialSettings: SettingItem[] }) {
  const initialMap: Record<string, string> = {};
  initialSettings.forEach((s) => {
    initialMap[s.key] = s.value;
  });

  const [settings, setSettings] = useState(initialMap);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      const payload = Object.entries(settings).map(([key, value]) => ({ key, value }));
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl text-xs">
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <p className="text-stone-500">
          Global storefront parameters, payment providers, and international currency conversions.
        </p>
        <Button type="submit" variant="editorial" size="sm" disabled={isSaving}>
          {savedSuccess ? (
            <span className="flex items-center space-x-1">
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span>Settings Saved!</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1">
              <Save className="w-3.5 h-3.5 mr-1" />
              <span>{isSaving ? "Saving..." : "Save All Settings"}</span>
            </span>
          )}
        </Button>
      </div>

      {/* Group 1: General Business Identity */}
      <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 border-b border-stone-100 pb-2">
          <Building2 className="w-4 h-4 text-terracotta-600" />
          <h2 className="font-serif text-base font-medium text-charcoal">
            Store Identity & Contact
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-stone-600 font-semibold mb-1">Store Name</label>
            <input
              type="text"
              value={settings.store_name || "PeepalKrat"}
              onChange={(e) => handleChange("store_name", e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-semibold mb-1">Tagline</label>
            <input
              type="text"
              value={settings.store_tagline || "For the People. By the People."}
              onChange={(e) => handleChange("store_tagline", e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-semibold mb-1">Customer Support Email</label>
            <input
              type="email"
              value={settings.contact_email || "hello@peepalkrat.com"}
              onChange={(e) => handleChange("contact_email", e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-semibold mb-1">Customer Support Phone</label>
            <input
              type="text"
              value={settings.contact_phone || "+91 180 264 0000"}
              onChange={(e) => handleChange("contact_phone", e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-stone-600 font-semibold mb-1">Artisan Headquarters Address</label>
            <input
              type="text"
              value={settings.headquarters || "Sector 25, Panipat, Haryana 132103, India"}
              onChange={(e) => handleChange("headquarters", e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>
        </div>
      </div>

      {/* Group 2: Shipping Rules */}
      <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 border-b border-stone-100 pb-2">
          <Truck className="w-4 h-4 text-terracotta-600" />
          <h2 className="font-serif text-base font-medium text-charcoal">
            Pan-India Shipping Parameters
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-stone-600 font-semibold mb-1">Free Shipping Minimum (₹)</label>
            <input
              type="number"
              value={settings.free_shipping_threshold_inr || "2000"}
              onChange={(e) => handleChange("free_shipping_threshold_inr", e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-semibold mb-1">Standard Domestic Courier Fee (₹)</label>
            <input
              type="number"
              value={settings.standard_shipping_fee_inr || "150"}
              onChange={(e) => handleChange("standard_shipping_fee_inr", e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-semibold mb-1">Express Air Courier Fee (₹)</label>
            <input
              type="number"
              value={settings.express_shipping_fee_inr || "250"}
              onChange={(e) => handleChange("express_shipping_fee_inr", e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>
        </div>
      </div>

      {/* Group 3: International Currency Conversion */}
      <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 border-b border-stone-100 pb-2">
          <Globe className="w-4 h-4 text-terracotta-600" />
          <h2 className="font-serif text-base font-medium text-charcoal">
            Multi-Currency Exchange Multipliers (vs 1 INR)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-stone-600 font-semibold mb-1">USD Rate ($)</label>
            <input
              type="number"
              step="0.0001"
              value={settings.usd_exchange_rate || "0.012"}
              onChange={(e) => handleChange("usd_exchange_rate", e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-semibold mb-1">EUR Rate (€)</label>
            <input
              type="number"
              step="0.0001"
              value={settings.eur_exchange_rate || "0.011"}
              onChange={(e) => handleChange("eur_exchange_rate", e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-semibold mb-1">GBP Rate (£)</label>
            <input
              type="number"
              step="0.0001"
              value={settings.gbp_exchange_rate || "0.0094"}
              onChange={(e) => handleChange("gbp_exchange_rate", e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
