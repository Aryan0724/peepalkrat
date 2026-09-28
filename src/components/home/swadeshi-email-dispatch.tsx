"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, ShieldCheck, Sparkles, Send, Stamp } from "lucide-react";

export function SwadeshiEmailDispatch() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="py-20 bg-[#FAF6EE] relative overflow-hidden border-b border-[#EAE0CE]">
      {/* Background jaali pattern */}
      <div className="absolute inset-0 pattern-jaali opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Archival Envelope Container */}
        <div className="postal-dispatch-envelope p-8 sm:p-12 rounded-xs border-2 border-[#C8A253]/50 shadow-2xl relative bg-[#FAF6EE]">
          
          {/* Top Postmark and Cancellation Stamp */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#EAE0CE]">
            <div className="flex items-center space-x-3">
              {/* Circular Postal Postmark */}
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#881C10] flex flex-col items-center justify-center p-1 text-center rotate-[-6deg] bg-white/60">
                <span className="text-[7px] uppercase font-cinzel font-bold text-[#881C10]">MEWAT POSTAL</span>
                <span className="text-[9px] font-serif font-bold text-[#0B132B]">1857-2026</span>
                <span className="text-[6px] uppercase tracking-tighter text-stone-500">DISPATCH SEC.</span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#881C10] font-cinzel font-bold block">
                  Quarterly Swadeshi Gazette
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#0B132B] font-medium">
                  The Royal Postal Dispatch
                </h3>
              </div>
            </div>

            {/* Archival Classification Badge */}
            <div className="px-3 py-1 bg-[#0B132B] text-[#DFBD69] text-[9px] font-cinzel uppercase tracking-[0.18em] rounded-xs border border-[#C8A253]/40">
              Registered Courier • No Algorithmic Noise
            </div>
          </div>

          {/* Letter Body Content */}
          <div className="py-6 space-y-4 text-left">
            <p className="font-cormorant text-base sm:text-lg text-stone-700 leading-relaxed italic">
              “To those who honor the hands that weave: Subscribe to receive our quarterly letterpress gazette. We document oral histories of the 1857 Mewat peasant revolt, profiles of women who run the pit-looms of Haryana, and private invitations to limited artisan batch drops.”
            </p>

            {isSubmitted ? (
              <div className="p-6 bg-emerald-50/80 border border-emerald-300 rounded-xs flex items-start space-x-3 text-emerald-900 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-semibold text-sm">
                    Wax Seal Affixed • Dispatch Registered
                  </h4>
                  <p className="text-xs text-emerald-800/90 mt-1 leading-relaxed">
                    Thank you. Your address ({email}) has been enrolled in the Mewat Artisan Ledger. Your inaugural issue of The Swadeshi Gazette will arrive in your inbox.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-2">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email to receive the Gazette..."
                      className="w-full px-4 py-3.5 bg-white/90 border-b-2 border-[#C8A253] text-stone-900 text-sm focus:outline-none focus:bg-white placeholder:text-stone-400 font-serif tracking-wide shadow-inner"
                    />
                    <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C8A253]" />
                  </div>

                  <button
                    type="submit"
                    className="wax-seal-btn px-8 py-3.5 font-cinzel font-semibold text-xs uppercase tracking-[0.18em] flex items-center justify-center space-x-2 shrink-0 rounded-xs"
                  >
                    <span>Affix Seal & Dispatch</span>
                    <Send className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Postal Guarantees Footer */}
          <div className="pt-4 border-t border-[#EAE0CE] flex flex-wrap items-center justify-between text-[11px] text-stone-500 gap-3">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#881C10]" />
              <span>Zero promotional spam • Unsubscribe anytime with 1-click</span>
            </span>
            <span className="font-serif italic text-stone-400">
              Printed on virtual unbleached Khadi • Curated in Panipat & Nuh
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
