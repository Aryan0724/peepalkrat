import type { Metadata } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/lib/currency-context";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { WhatsAppWidget } from "@/components/layout/whatsapp-widget";

import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "PeepalKraft | Haryana Heritage Crafts & Women Artisan Commerce",
  description:
    "For the People. By the People. Discover premium handloom weaves, heirloom Phulkari textiles, wild Moonj grasscraft, and terracotta pottery crafted with dignity by women artisans across Haryana, India.",
  keywords: [
    "PeepalKraft",
    "Haryana craft",
    "Panipat handloom",
    "Phulkari embroidery",
    "Terracotta pottery",
    "Moonj grass baskets",
    "Women empowerment",
    "Social commerce",
    "Ethical luxury",
  ],
  openGraph: {
    title: "PeepalKraft | Haryana Heritage Crafts & Women Artisan Commerce",
    description: "Every purchase carries a story. Direct artisan commerce from Haryana.",
    url: "https://PeepalKraft.com",
    siteName: "PeepalKraft",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let headerBlock = null;
  let footerBlock = null;

  try {
    const blocks = await prisma.contentBlock.findMany({
      where: {
        page: { in: ["header", "footer"] },
        isActive: true,
      },
    });
    headerBlock = blocks.find((b) => b.key === "header_announcement");
    footerBlock = blocks.find((b) => b.key === "footer_tagline");
  } catch (error) {
    console.warn("Using fallback layout CMS content:", error);
  }

  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#E8D1A7] text-[#442D1C] selection:bg-[#84592B]/40 selection:text-[#442D1C]">
        <CurrencyProvider>
          <CartProvider>
            <Header announcement={headerBlock} />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer aboutBlock={footerBlock} />
            <WhatsAppWidget />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
