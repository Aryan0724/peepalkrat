import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Heart, ShieldCheck, Mail, Phone, MapPin, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Our Story & Founder | PeepalKraft Ambala",
  description:
    "The story of PeepalKraft — founded in Ambala by Kamla Bhagat (Retd. Vice Principal, ITI Ambala) to empower needy women with stitching, embroidery, and crochet, and carried forward by her daughter.",
};

export const revalidate = 60;

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-24 text-[#442D1C]">
      
      {/* ── 1. Editorial Hero: Our Founding Philosophy ── */}
      <section className="relative bg-[#2D1B11] text-[#FAF7F2] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-[#E8D1A7]/30 text-center overflow-hidden">
        {/* Subtle background workshop texture */}
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/peepalkraft/workshop/workshop-full-1.jpg"
            alt="PeepalKraft Ambala Workshop"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D1B11]/70 via-[#2D1B11]/90 to-[#2D1B11]" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FAF7F2]/10 border border-[#E8D1A7]/40 text-xs text-[#E8D1A7] font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-4 h-4 text-[#E8D1A7]" />
            <span>Swadeshi Freedom Guild · Ambala, Haryana</span>
          </div>

          {/* High-contrast, prominent heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] text-[#FAF7F2] tracking-tight">
            Our Founding Philosophy
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl text-[#E8D1A7] max-w-2xl mx-auto font-light leading-relaxed">
            “When you give charity, you feed a family for a day. When you teach a woman to master the needle, you build a generation’s self-reliance.”
          </p>

          <p className="text-[#FAF7F2]/85 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed pt-2">
            PeepalKraft was founded on an uncompromising conviction: the women of Haryana do not need sympathy. They need master vocational training, direct market access, and unmediated financial sovereignty.
          </p>
        </div>
      </section>

      {/* ── 2. The Founder Section: Kamla Bhagat ── */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xs border border-[#E8D1A7] shadow-sm p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Founder Portrait & Archival Badge */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-md aspect-[3/4] rounded-xs overflow-hidden border-4 border-[#FAF7F2] shadow-lg bg-[#FAF7F2]">
                <Image
                  src="/peepalkraft/founder/kamla-bhagat.png"
                  alt="Kamla Bhagat, Founder of PeepalKraft"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                
                {/* Historic Independence Day Badge */}
                <div className="absolute top-4 left-4 bg-[#743014] text-[#FAF7F2] text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md border border-[#E8D1A7]/40">
                  Born 15th August 1947
                </div>

                {/* Pedigree seal */}
                <div className="absolute bottom-4 right-4 bg-[#442D1C]/90 backdrop-blur-sm text-[#E8D1A7] text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-xs border border-[#E8D1A7]/30">
                  Ambala Guild Heritage
                </div>
              </div>

              {/* Founder Credential Card */}
              <div className="mt-6 text-center w-full max-w-md bg-[#FAF7F2] p-4 rounded-xs border border-[#E8D1A7]/60">
                <h3 className="font-display text-2xl text-[#442D1C] font-normal">
                  Kamla Bhagat
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#743014] font-semibold mt-1">
                  Founder & Craft Mentor, PeepalKraft
                </p>
                <p className="text-xs text-[#5A4231] mt-1 font-light">
                  Retired Vice Principal, Industrial Training Institute (ITI) Ambala
                </p>
              </div>
            </div>

            {/* Right: The Inspiring Story */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#743014] font-sans font-bold block">
                The Seed of 1947 · A Life Dedicated to Skill
              </span>

              <h2 className="font-display text-3xl sm:text-4xl text-[#442D1C] font-normal leading-tight">
                Born with Free India, Devoted to Women's Independence
              </h2>

              <div className="space-y-4 text-[#5A4231] text-base leading-relaxed font-light">
                <p>
                  Born on <strong>15th August 1947</strong>—the historic day our nation claimed its independence—<strong>Kamla Bhagat</strong> grew up with an innate belief that true freedom is incomplete until every woman has economic sovereignty in her own hands.
                </p>

                <p>
                  For decades, she served with distinction as the <strong>Vice Principal at the Industrial Training Institute (ITI) Ambala</strong>, teaching generations of students the technical discipline of cutting, pattern-making, garment construction, and needle mastery. At ITI, she instilled rigorous professional standards, precision, and respect for textiles.
                </p>

                <p>
                  When retirement came, Kamla ji did not step back into quiet ease. Looking around her community in Ambala, she saw countless needy girls, young widows, and underprivileged women trapped in cycles of poverty simply because they lacked formal vocation. She knew that financial vulnerability was the root cause of inequality.
                </p>

                <p className="p-4 bg-[#FAF7F2] border-l-4 border-[#743014] rounded-r-xs italic text-[#442D1C] font-serif text-lg">
                  “I had spent my career teaching curriculum. After retirement, I knew my true mission was to open my doors and train every needy girl who walked in, completely free of charge.”
                </p>

                <p>
                  Kamla Bhagat turned her own home in Ambala into an open artisan workshop. Day after day, she patiently sat with needy girls and women, training them from scratch in <strong>precision cutting, tailoring, intricate hand embroidery, and fine crochet work</strong>. Women who had never touched a pair of tailor shears or earned a rupee began crafting work of breathtaking beauty.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. The Torch Carried Forward: Mother to Daughter ── */}
      <section className="py-20 bg-[#FAF7F2] border-y border-[#442D1C]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#743014] font-sans font-semibold block">
              Generational Continuum
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#442D1C] font-normal">
              Carried Forward by Her Daughter
            </h2>
            <p className="text-base text-[#5A4231] font-light leading-relaxed">
              Transforming a mother's selfless grassroots training circle in Ambala into an international, ethical craft enterprise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Story block */}
            <div className="space-y-6 text-[#5A4231] text-base leading-relaxed font-light">
              <h3 className="font-display text-2xl sm:text-3xl text-[#442D1C]">
                From an Ambala Courtyard to Discerning Homes Worldwide
              </h3>
              <p>
                Growing up watching her mother transform lives stitch by stitch, <strong>Kamla Bhagat's daughter</strong> realized that training was only the first step. To ensure these women never had to depend on anyone again, they needed sustained orders, fair wages, and access to patrons who truly appreciated genuine handmade luxury.
              </p>
              <p>
                Stepping in to lead the mission, her daughter founded <strong>PeepalKraft</strong>—named after the sacred, sheltering Peepal tree that thrives through all seasons. She infused modern design palettes, contemporary silhouettes, and global quality control into the traditional techniques taught by Kamla ji.
              </p>
              <p>
                Under her leadership, PeepalKraft built a transparent social commerce model: eliminating middlemen, ensuring that <strong>72% of retail revenues flow directly to the women makers</strong>, and opening individual bank passbooks for every artisan.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-4 text-xs font-semibold uppercase tracking-wider text-[#743014]">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#743014]" />
                  <span>100% Ambala & Haryana Made</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#743014]" />
                  <span>Verified Passbook Wages</span>
                </div>
              </div>
            </div>

            {/* Visual workshop grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-xs overflow-hidden shadow-xs border border-[#E8D1A7]/60">
                <Image
                  src="/peepalkraft/workshop/workshop-cutting.jpg"
                  alt="Precision cutting and pattern training"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-xs overflow-hidden shadow-xs border border-[#E8D1A7]/60">
                <Image
                  src="/peepalkraft/workshop/artisan-yellow-saree.jpg"
                  alt="Artisan embroidering accessories"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-xs overflow-hidden shadow-xs border border-[#E8D1A7]/60">
                <Image
                  src="/peepalkraft/products/skirt-embroidered.jpg"
                  alt="Handcrafted finished garment"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-xs overflow-hidden shadow-xs border border-[#E8D1A7]/60">
                <Image
                  src="/peepalkraft/workshop/workshop-full-2.jpg"
                  alt="Ambala collective sewing room"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. The 4 Cornerstones of PeepalKraft ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#743014] font-sans font-semibold block">
            Our Standards
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#442D1C] font-normal">
            The Principles Built by Kamla Bhagat
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white p-7 rounded-xs border border-[#E8D1A7]/60 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#E8D1A7]/30 flex items-center justify-center text-[#743014]">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-display text-xl text-[#442D1C]">ITI Precision Standards</h4>
            <p className="text-xs text-[#5A4231] font-light leading-relaxed">
              Every garment and accessory adheres to the rigorous vocational tailoring guidelines shaped by decades at ITI Ambala.
            </p>
          </div>

          <div className="bg-white p-7 rounded-xs border border-[#E8D1A7]/60 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#E8D1A7]/30 flex items-center justify-center text-[#743014]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-display text-xl text-[#442D1C]">Direct Passbook Credit</h4>
            <p className="text-xs text-[#5A4231] font-light leading-relaxed">
              Wages are paid every Friday directly into each woman's personal bank account, eliminating household dependency.
            </p>
          </div>

          <div className="bg-white p-7 rounded-xs border border-[#E8D1A7]/60 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#E8D1A7]/30 flex items-center justify-center text-[#743014]">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-display text-xl text-[#442D1C]">Free Skill Mentorship</h4>
            <p className="text-xs text-[#5A4231] font-light leading-relaxed">
              We continue Kamla ji’s pledge: any underprivileged girl who enters our Ambala workshop receives free training and raw materials.
            </p>
          </div>

          <div className="bg-white p-7 rounded-xs border border-[#E8D1A7]/60 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#E8D1A7]/30 flex items-center justify-center text-[#743014]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-display text-xl text-[#442D1C]">Authentic Heritage</h4>
            <p className="text-xs text-[#5A4231] font-light leading-relaxed">
              Preserving authentic Phulkari, Resham silk darning stitch, crochet, and Desi cotton weaves without synthetic shortcuts.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. Official Contact & Guild Secretariat ── */}
      <section className="py-16 bg-[#FAF7F2] border-t border-[#442D1C]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#442D1C] text-[#FAF7F2] rounded-xs p-8 sm:p-12 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#E8D1A7] font-semibold block mb-2">
                  Get in Touch With Our Guild
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-white font-normal">
                  Connect with the PeepalKraft Team
                </h3>
                <p className="text-sm text-[#FAF7F2]/80 mt-2 font-light leading-relaxed">
                  Have questions about custom bridal orders, wholesale boutique partnerships, or our artisan empowerment program? Reach our Ambala workshop directly.
                </p>
              </div>

              <div className="space-y-3 text-sm border-t md:border-t-0 md:border-l border-[#E8D1A7]/20 pt-6 md:pt-0 md:pl-8">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#E8D1A7]" />
                  <a href="mailto:peepalkraft1947@gmail.com" className="hover:text-[#E8D1A7] font-mono transition-colors">
                    peepalkraft1947@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#E8D1A7]" />
                  <a href="tel:9015112753" className="hover:text-[#E8D1A7] font-mono transition-colors">
                    +91 9015112753 (9015112753)
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#E8D1A7] mt-0.5 shrink-0" />
                  <span className="text-[#FAF7F2]/80 font-light">
                    PeepalKraft Guild Workshop, Model Town / Kanshi Nagar, Ambala City, Haryana 134003, India
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[#E8D1A7]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#FAF7F2]/70 font-light">
                Founded by Kamla Bhagat (Born 15 August 1947) · Carried forward by her daughter
              </p>
              <Link href="/shop">
                <Button className="btn-saffron px-7 h-11 text-xs">
                  Discover Our Creations
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
