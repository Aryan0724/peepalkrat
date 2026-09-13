import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Compass } from "lucide-react";
import { prisma } from "@/lib/db";
import { HeroSection } from "@/components/home/hero-section";
import { ImpactManifesto } from "@/components/home/impact-manifesto";
import { MakerSpotlight } from "@/components/home/maker-spotlight";
import { CulturalShowcase } from "@/components/home/cultural-showcase";
import { CustomerStories } from "@/components/home/customer-stories";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";

// Enable dynamic revalidation for new products/makers
export const revalidate = 60;

export default async function HomePage() {
  let featuredProducts: any[] = [];
  let collections: any[] = [];
  let makers: any[] = [];
  let categories: any[] = [];

  try {
    const [prods, cols, maks, cats] = await Promise.all([
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
        take: 6,
      }),
    ]);

    featuredProducts = prods;
    collections = cols;
    makers = maks;
    categories = cats;
  } catch (error) {
    console.warn("Using fallback homepage state:", error);
  }

  return (
    <div className="w-full">
      {/* 1. Cinematic Editorial Hero */}
      <HeroSection />

      {/* 2. Philosophy & Agency Over Charity Manifesto */}
      <ImpactManifesto />

      {/* 3. Featured Curated Collections */}
      <section className="py-24 bg-[#FAF8F5] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-terracotta-700 font-semibold block mb-2">
                Curated Series
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
                Heirloom Collections
              </h2>
            </div>
            <Link
              href="/shop"
              className="mt-4 md:mt-0 inline-flex items-center text-xs uppercase tracking-widest text-charcoal hover:text-terracotta-700 font-semibold group"
            >
              <span>Explore All Collections</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-stone-100 shadow-sm hover:shadow-editorial transition-all duration-300"
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
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent transition-opacity duration-300 group-hover:from-charcoal/90" />
                <div className="absolute bottom-6 inset-x-6 text-white space-y-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-terracotta-200 font-semibold">
                    Series
                  </span>
                  <h3 className="font-serif text-xl font-medium leading-snug group-hover:text-terracotta-200 transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed font-light">
                    {col.description}
                  </p>
                  <span className="inline-flex items-center text-[11px] uppercase tracking-wider text-white font-semibold pt-2">
                    <span>View Pieces</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Best Sellers & Signature Works */}
      <section className="py-24 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-terracotta-700 font-semibold block mb-2">
                Honored Craft
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
                Signature Works of Haryana
              </h2>
            </div>
            <Link
              href="/shop"
              className="mt-4 md:mt-0 inline-flex items-center text-xs uppercase tracking-widest text-charcoal hover:text-terracotta-700 font-semibold group"
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

      {/* 5. Meet the Makers Spotlight */}
      <MakerSpotlight makers={makers} />

      {/* 6. Living Craft Geography of Haryana */}
      <CulturalShowcase />

      {/* 7. Craft Category Visual Index */}
      <section className="py-20 bg-sandstone/30 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta-700 font-semibold block mb-2">
              Discipline By Discipline
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
              Explore by Craft Specialty
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group p-4 bg-white border border-stone-200 rounded-sm text-center hover:border-terracotta-600 transition-all duration-300 hover:shadow-card flex flex-col items-center"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3 bg-stone-100 border border-stone-200">
                  {cat.image ? (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-xs text-charcoal group-hover:text-terracotta-700 transition-colors line-clamp-2">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Patron Testimonials & Reviews */}
      <CustomerStories />

      {/* 9. Editorial Call to Action */}
      <section className="py-20 bg-[#FAF8F5] relative text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-[0.28em] text-terracotta-700 font-semibold block mb-3">
            Participate in Opportunity
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light leading-tight mb-6">
            “When you bring an object into your home, let it carry a genuine human story.”
          </h2>
          <p className="text-sm text-stone-600 max-w-xl mx-auto mb-8 leading-relaxed">
            All PeepalKrat items are packed in 100% biodegradable corrugated cardboard and recycled cotton pouches, accompanied by an artisan certificate with the maker’s name and village.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop">
              <Button size="lg" variant="editorial" className="px-8 h-12">
                Discover All Products
              </Button>
            </Link>
            <Link href="/our-story">
              <Button size="lg" variant="outline" className="px-8 h-12">
                Read Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
