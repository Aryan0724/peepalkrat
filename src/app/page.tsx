import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Plane, Heart, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/db";
import { HeroSection } from "@/components/home/hero-section";
import { GlobalDiasporaGlobe } from "@/components/home/global-diaspora-globe";
import { CircularCategoryStrip } from "@/components/home/circular-category-strip";
import { AnimatedImpactJourney } from "@/components/home/animated-impact-journey";
import { MakerSpotlight } from "@/components/home/maker-spotlight";
import { CustomerStories } from "@/components/home/customer-stories";
import { SwadeshiEmailDispatch } from "@/components/home/swadeshi-email-dispatch";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";

// Enable dynamic revalidation for new products/makers
export const revalidate = 60;

export default async function HomePage() {
  let featuredProducts: any[] = [];
  let collections: any[] = [];
  let makers: any[] = [];
  let categories: any[] = [];
  let contentBlocks: Record<string, any> = {};

  try {
    const [prods, cols, maks, cats, blocks] = await Promise.all([
      prisma.product.findMany({
        where: { isPublished: true, isFeatured: true },
        include: {
          category: true,
          maker: true,
          images: { orderBy: { order: "asc" } },
        },
        take: 8,
      }),
      prisma.collection.findMany({
        where: { isFeatured: true },
        take: 4,
      }),
      prisma.maker.findMany({
        where: { isFeatured: true },
        take: 4,
      }),
      prisma.category.findMany({
        where: { isFeatured: true },
        orderBy: { order: "asc" },
      }),
      prisma.contentBlock.findMany({
        where: { page: "home", isActive: true },
      }),
    ]);

    featuredProducts = prods;
    collections = cols;
    makers = maks;
    if (!cats || cats.length === 0) {
      categories = await prisma.category.findMany({ take: 10 });
    } else {
      categories = cats;
    }

    if (blocks) {
      blocks.forEach((b) => {
        contentBlocks[b.key] = b;
      });
    }
  } catch (error) {
    console.warn("Using fallback homepage state:", error);
  }

  return (
    <div className="w-full bg-[#FAF6EE]">
      {/* 1. Hero: Animated Cartoon Women Empowerment & NRI Global Delivery */}
      <HeroSection data={contentBlocks["home_hero"]} />

      {/* 2. Interactive "Mewat to the Globe" Diaspora Transit Globe */}
      <GlobalDiasporaGlobe />

      {/* 3. Pinklay-Style Circular Category Discovery (Ornaments, Buntings, Weaves) */}
      <CircularCategoryStrip
        categories={categories}
        subtitle="हस्तकला एवं स्वदेशी शिल्प • Handcrafted in Haryana"
        title="Explore by Guild Discipline"
      />

      {/* 4. Curated Heirloom Collections for Diaspora Living */}
      <section className="py-20 bg-[#FAF6EE] border-b border-[#EAE0CE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#881C10] font-cinzel font-semibold block mb-1">
                Heirloom Series
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#0B132B] font-normal">
                Curated Collections for Global Homes
              </h2>
            </div>
            <Link
              href="/shop"
              className="mt-4 md:mt-0 inline-flex items-center text-xs uppercase tracking-widest text-[#0B132B] hover:text-[#881C10] font-cinzel font-semibold group"
            >
              <span>Explore All Curations</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-xs bg-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EAE0CE] hover:border-[#C8A253]"
              >
                {col.image && (
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/90 via-[#0B132B]/40 to-transparent transition-opacity duration-300" />
                <div className="absolute bottom-5 inset-x-5 text-white space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-[#DFBD69] font-cinzel font-semibold">
                    Series
                  </span>
                  <h3 className="font-serif text-lg font-medium leading-snug group-hover:text-[#DFBD69] transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed font-light">
                    {col.description}
                  </p>
                  <span className="inline-flex items-center text-[10px] uppercase font-cinzel tracking-wider text-[#DFBD69] font-semibold pt-1">
                    <span>View Pieces</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Best Sellers & Signature Works (Direct Overseas Shopping) */}
      <section className="py-20 bg-white border-b border-[#EAE0CE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#881C10] font-cinzel font-semibold block mb-1">
                Diaspora Favorites
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#0B132B] font-normal">
                Signature Works of Haryana
              </h2>
            </div>
            <Link
              href="/shop"
              className="mt-4 md:mt-0 inline-flex items-center text-xs uppercase tracking-widest text-[#0B132B] hover:text-[#881C10] font-cinzel font-semibold group"
            >
              <span>View Full Catalog ({featuredProducts.length}+ pieces)</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Animated Illustrated 3-Step Impact Journey (Loom -> Bank Account -> Global Home) */}
      <AnimatedImpactJourney />

      {/* 7. Meet the Makers Spotlight */}
      <MakerSpotlight makers={makers} />

      {/* 8. Worldwide Customer Stories & Diaspora Unboxing Reviews */}
      <CustomerStories />

      {/* 9. The Royal Postal Dispatch & Swadeshi Gazette (Email Representation) */}
      <SwadeshiEmailDispatch />

      {/* 10. Minimalist Editorial Call to Action */}
      <section className="py-16 bg-[#0B132B] text-white relative text-center border-b border-[#C8A253]/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#DFBD69] font-cinzel font-semibold block">
            Direct Social Commerce
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light leading-snug">
            “Bring authentic Indian heritage into your home while funding a woman's financial independence.”
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed font-light">
            All overseas orders ship plastic-free via DHL Express with verified artisan certificates and zero import customs hassle.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop">
              <Button size="lg" className="px-8 h-12 bg-[#DFBD69] text-[#0B132B] hover:bg-[#F7E7B4] font-cinzel font-bold text-xs uppercase tracking-wider">
                Discover All Products
              </Button>
            </Link>
            <Link href="/our-story">
              <Button size="lg" variant="outline" className="px-8 h-12 border-[#C8A253]/50 text-[#FAF6EE] hover:bg-white/10 font-cinzel text-xs uppercase tracking-wider">
                Read Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
