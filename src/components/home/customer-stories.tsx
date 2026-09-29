"use client";

import React from "react";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";

export function CustomerStories() {
  const testimonials = [
    {
      name: "Marcus Vance",
      location: "London, UK",
      quote: "The hand-embroidered details on the skirt were breathtaking. Arrived in 3 days. Truly an elevated, authentic Indian craft experience.",
      product: "Hand-Embroidered Fish Motif Skirt",
    },
    {
      name: "Priya & Vikram Rao",
      location: "California, USA",
      quote: "These beautiful bag charms and latkans bring a piece of home to the Bay Area. Knowing the women hold their own bank accounts makes it priceless.",
      product: "Cowrie Shell Bag Charms & Latkans",
    },
    {
      name: "Simran Grewal",
      location: "Toronto, Canada",
      quote: "We ordered the double flower hair accessories for our Diwali party. Every piece is flawless. The handwritten note from Diksha made my day.",
      product: "Double Flower Hair Accessory",
    },
  ];

  return (
    <section className="py-20 bg-[#FFFCF8] relative overflow-hidden border-b border-black/8">
      {/* Decorative illustration from iTokri uploaded by user */}
      <div className="absolute top-20 right-10 lg:right-32 w-64 h-64 opacity-20 lg:opacity-10 pointer-events-none hidden md:block">
        <Image
          src="/peepalkraft/illustrations/people-on-rug.png"
          alt="People on rug illustration"
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center space-x-2 text-[12px] uppercase tracking-widest text-[#E87722] font-sans font-medium">
            <span>Global Diaspora Feedback</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#1A1A1A] font-normal relative inline-block">
            Cherished Worldwide
            <span className="absolute -top-6 -right-16 transform rotate-[12deg] font-handwritten text-[#E87722] text-xl hidden sm:block">
              Made with love!
            </span>
          </h2>
          <p className="text-sm text-[#555] font-light max-w-lg mx-auto">
            Read stories from patrons in London, New York, Toronto, San Francisco and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-sm shadow-sm border border-black/5 hover:border-[#E87722]/30 transition-colors flex flex-col"
            >
              <div className="flex text-[#E87722] mb-4 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              
              <blockquote className="flex-1 font-display text-lg text-[#1A1A1A] leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="mt-auto border-t border-black/5 pt-4">
                <div className="font-sans font-medium text-sm text-[#1A1A1A]">
                  {testimonial.name}
                </div>
                <div className="flex items-center text-[11px] text-[#888] mt-1 space-x-1 uppercase tracking-wider">
                  <MapPin className="w-3 h-3 text-[#E87722]" />
                  <span>{testimonial.location}</span>
                </div>
                <div className="text-[11px] text-[#E87722] mt-2 font-medium">
                  {testimonial.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
