"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, CheckCircle2, Send } from "lucide-react";

export function SwadeshiEmailDispatch() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      try {
        await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim() })
        });
        setIsSubmitted(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <section className="relative w-full border-b border-[#442D1C]/10 overflow-hidden bg-[#FAF7F2]">
      
      {/* Hand-drawn village landscape banner */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px]">
        <Image
          src="/peepalkraft/illustrations/village-landscape.jpg"
          alt="Indian Village Scene Illustration"
          fill
          className="object-cover md:object-contain object-bottom opacity-90"
          sizes="100vw"
        />
        {/* Soft fade at the top to blend with background */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FAF7F2] to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-20 md:-mt-32 pb-20">
        <div className="bg-white p-8 sm:p-12 rounded-xs border-stitch shadow-lg relative border border-[#E8D1A7]/60">
          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="font-handwritten text-3xl text-[#743014] transform -rotate-3">
              Join the PeepalKraft Parivar
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl text-[#442D1C] max-w-xl">
              Get hand-drawn tales of craft, exclusive artisan drops, and village stories.
            </h3>
            
            <p className="font-sans text-sm text-[#5A4231] max-w-lg mb-6">
              Subscribe to our monthly gazette. No spam, just pure authentic Indian heritage and stories directly from the hands of the women in Ambala City.
            </p>

            {isSubmitted ? (
              <div className="p-4 bg-[#743014]/10 border border-stitch rounded-xs flex items-center space-x-3 text-[#442D1C] animate-fade-in w-full max-w-md">
                <CheckCircle2 className="w-5 h-5 text-[#743014]" />
                <div className="text-left">
                  <h4 className="font-sans font-semibold text-sm">Welcome to the family!</h4>
                  <p className="text-xs text-[#5A4231] mt-0.5">Your first letter arrives soon.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full max-w-md pt-2">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email..."
                      className="w-full px-4 py-3 bg-white border border-[#E87722]/30 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#E87722] font-sans transition-colors rounded-sm"
                    />
                    <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E87722]/50" />
                  </div>

                  <button
                    type="submit"
                    className="btn-saffron px-6 py-3 font-sans font-medium text-sm flex items-center justify-center space-x-2 shrink-0 rounded-sm"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
