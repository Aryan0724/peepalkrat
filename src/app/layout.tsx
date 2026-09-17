import type { Metadata } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/lib/currency-context";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";

import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "PEEPALKRAT | Haryana Heritage Crafts & Women Artisan Commerce",
  description:
    "For the People. By the People. Discover premium handloom weaves, heirloom Phulkari textiles, wild Moonj grasscraft, and terracotta pottery crafted with dignity by women artisans across Haryana, India.",
  keywords: [
    "PeepalKrat",
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
    title: "PEEPALKRAT | Haryana Heritage Crafts & Women Artisan Commerce",
    description: "Every purchase carries a story. Direct artisan commerce from Haryana.",
    url: "https://peepalkrat.com",
    siteName: "PeepalKrat",
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
      <body className="min-h-screen flex flex-col selection:bg-terracotta-200 selection:text-charcoal">
        <CurrencyProvider>
          <CartProvider>
            <Header announcement={headerBlock} />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer aboutBlock={footerBlock} />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
