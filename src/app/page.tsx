import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { HeroSection } from "@/components/home/hero-section";
import { OurWorkshopSection } from "@/components/home/our-workshop";
import { CircularCategoryStrip } from "@/components/home/circular-category-strip";
import { ImpactManifesto } from "@/components/home/impact-manifesto";
import { ProductCard } from "@/components/shop/product-card";
import { MakerSpotlight } from "@/components/home/maker-spotlight";
import { CustomerStories } from "@/components/home/customer-stories";
import { SwadeshiEmailDispatch } from "@/components/home/swadeshi-email-dispatch";

// Enable dynamic revalidation
export const revalidate = 60;

export default async function HomePage() {
  let contentBlocks: Record<string, any> = {};
  let makers: any[] = [];

  try {
    const blocks = await prisma.contentBlock.findMany({
      where: { page: "home", isActive: true },
    });

    makers = await prisma.maker.findMany({
      where: { isFeatured: true },
      take: 4,
    });

    if (blocks) {
      blocks.forEach((b) => {
        contentBlocks[b.key] = b;
      });
    }
  } catch (error) {
    console.warn("Using fallback homepage state:", error);
  }

  // Hardcode categories to perfectly feature the provided real images
  const showcaseCategories = [
    {
      id: "cat-1",
      name: "Hair Accessories",
      slug: "hair-accessories",
      image: "/peepalkraft/products/hair-flower-double.jpg"
    },
    {
      id: "cat-2",
      name: "Bag Charms",
      slug: "bag-charms",
      image: "/peepalkraft/products/bag-charm.jpg"
    },
    {
      id: "cat-3",
      name: "Latkans & Decor",
      slug: "latkans",
      image: "/peepalkraft/products/latkans-display.jpg"
    },
    {
      id: "cat-4",
      name: "Embroidered Skirts",
      slug: "skirts",
      image: "/peepalkraft/products/skirt-embroidered.jpg"
    },
    {
      id: "cat-5",
      name: "Pompom Pins",
      slug: "pins",
      image: "/peepalkraft/products/hair-pompom-pin.jpg"
    }
  ];

  // Hardcode products to perfectly feature the provided real images
  const showcaseProducts = [
    {
      id: "prod-1",
      name: "Double Flower Hair Accessory",
      slug: "double-flower-hair",
      price: 18,
      currency: "USD",
      images: [{ url: "/peepalkraft/products/hair-flower-double.jpg" }],
      category: { name: "Hair Accessories" },
      maker: { name: "Diksha & Team" }
    },
    {
      id: "prod-2",
      name: "Hand-Embroidered Fish Motif Skirt",
      slug: "embroidered-fish-skirt",
      price: 65,
      currency: "USD",
      images: [{ url: "/peepalkraft/products/skirt-embroidered.jpg" }],
      category: { name: "Apparel" },
      maker: { name: "Master Tailoring Team" }
    },
    {
      id: "prod-3",
      name: "Cowrie Shell Bag Charm",
      slug: "cowrie-shell-charm",
      price: 24,
      currency: "USD",
      images: [{ url: "/peepalkraft/products/bag-charm.jpg" }],
      category: { name: "Accessories" },
      maker: { name: "Diksha & Team" }
    },
    {
      id: "prod-4",
      name: "Festive Hanging Latkans",
      slug: "festive-latkans",
      price: 32,
      currency: "USD",
      images: [{ url: "/peepalkraft/products/latkans-hanging.jpg" }],
      category: { name: "Home Decor" },
      maker: { name: "Artisan Collective" }
    }
  ];

  return (
    <div className="w-full bg-[#E8D1A7]">
      {/* 1. Hero: Real Artisans and Storefront Info */}
      <HeroSection data={contentBlocks["home_hero"]} />

      {/* 2. Real Categories from images */}
      <CircularCategoryStrip
        categories={showcaseCategories}
        subtitle="Handcrafted in Haryana"
        title="Explore Our Crafts"
      />

      {/* 3. Our Workshop - Trust Building */}
      <OurWorkshopSection />

      {/* 4. Best Sellers (Real Products) */}
      <section className="py-20 bg-[#E8D1A7] border-b border-black/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl text-[#442D1C] font-normal">
                Signature Works of Haryana
              </h2>
            </div>
            <Link
              href="/shop"
              className="mt-4 md:mt-0 inline-flex items-center text-[13px] uppercase tracking-widest text-[#442D1C] hover:text-[#743014] font-sans font-medium transition-colors group"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {showcaseProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Impact Manifesto: Real Data & Artisan Voices */}
      <ImpactManifesto />

      {/* 6. Meet the Makers Spotlight */}
      <MakerSpotlight makers={makers} />

      {/* 7. Worldwide Customer Stories */}
      <CustomerStories />

      {/* 8. Newsletter Dispatch */}
      <SwadeshiEmailDispatch />

      {/* 9. Minimalist Editorial Call to Action */}
      <section className="py-20 bg-[#442D1C] text-white relative text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.15]">
            â€œBring authentic Indian heritage into your home while funding a woman's financial independence.â€
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed font-light mb-8">
            All overseas orders ship via DHL Express with verified artisan certificates and zero import customs hassle.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop">
              <button className="btn-saffron px-8 h-12 w-full sm:w-auto text-sm">
                Discover All Products
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
