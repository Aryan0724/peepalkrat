"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, CheckCircle2, Send } from "lucide-react";

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
    <section className="relative w-full border-b border-black/10 overflow-hidden bg-[#F5F0E8]">
      
      {/* Hand-drawn village landscape banner */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px]">
        <Image
          src="/peepalkraft/illustrations/village-landscape.png"
          alt="Indian Village Scene Illustration"
          fill
          className="object-cover md:object-contain object-bottom opacity-90"
          sizes="100vw"
        />
        {/* Soft fade at the top to blend with any text if needed */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#F5F0E8] to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-20 md:-mt-32 pb-20">
        <div className="bg-[#FFFCF8] p-8 sm:p-12 rounded-sm border-stitch shadow-2xl relative">
          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="font-handwritten text-3xl text-[#E87722] transform -rotate-3">
              Join the PeepalKraft Parivar
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl text-[#1A1A1A] max-w-xl">
              Get hand-drawn tales of craft, exclusive artisan drops, and village stories.
            </h3>
            
            <p className="font-sans text-sm text-[#555] max-w-lg mb-6">
              Subscribe to our monthly gazette. No spam, just pure authentic Indian heritage and stories directly from the hands of the women in Ambala City.
            </p>

            {isSubmitted ? (
              <div className="p-4 bg-[#E87722]/10 border border-stitch rounded-sm flex items-center space-x-3 text-[#1A1A1A] animate-fade-in w-full max-w-md">
                <CheckCircle2 className="w-5 h-5 text-[#E87722]" />
                <div className="text-left">
                  <h4 className="font-sans font-medium text-sm">Welcome to the family!</h4>
                  <p className="text-xs text-[#555] mt-0.5">Your first letter arrives soon.</p>
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
