import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export function OurWorkshopSection() {
  return (
    <section className="bg-white py-16 lg:py-24 border-b border-black/8 relative overflow-hidden">
      {/* Block print background texture */}
      <div className="absolute inset-0 pattern-block-print pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Images */}
          <div className="relative">
            <div className="absolute -top-6 -left-4 font-handwritten text-[#84592B] text-2xl transform -rotate-6 z-20 bg-white/90 px-3 py-0.5 rounded-xs border border-[#E8D1A7]/60 shadow-xs">
              Our Ambala City home
            </div>
            <div className="aspect-[4/5] sm:aspect-square lg:aspect-[4/5] relative w-full lg:w-11/12 overflow-hidden bg-[#FAF7F2] border-stitch p-2">
              <div className="relative w-full h-full">
                <Image 
                  src="/peepalkraft/store/storefront-1.jpg"
                  alt="PeepalKraft Storefront in Ambala City"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            {/* Overlapping secondary image */}
            <div className="hidden sm:block absolute -bottom-10 -right-4 lg:-right-8 w-2/3 aspect-[4/3] bg-white p-2 border-stitch shadow-xl transform rotate-2">
              <div className="relative w-full h-full">
                <Image 
                  src="/peepalkraft/workshop/workshop-cutting.jpg"
                  alt="PeepalKraft Artisans Cutting Fabric"
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center space-x-2 text-[#743014] mb-6">
              <MapPin className="w-4 h-4 text-[#743014]" />
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em]">
                Visit Our Physical Store
              </span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#442D1C] leading-[1.1] mb-6">
              From our Ambala City workshop to the world.
            </h2>
            
            <p className="text-[#5A4231] text-base leading-relaxed font-light mb-6">
              Behind every PeepalKraft piece is a thriving workshop in Model Town, Ambala City. We aren't just an online store; we are a physical collective of women coming together every day to create, earn, and build independence.
            </p>
            
            <p className="text-[#5A4231] text-base leading-relaxed font-light mb-10">
              When you purchase a hand-embroidered bag charm, a vibrant skirt, or a detailed hair accessory, you are directly supporting the women working at the sewing machines just behind our storefront doors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/our-story">
                <button className="btn-primary w-full sm:w-auto">
                  Meet the Artisans
                </button>
              </Link>
              <div className="flex items-center justify-center sm:justify-start px-4 text-sm text-[#9D9167] font-medium">
                #590, Kanshi Nagar, Model Town
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
