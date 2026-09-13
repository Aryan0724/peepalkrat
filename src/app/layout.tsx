import type { Metadata } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/lib/currency-context";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col selection:bg-terracotta-200 selection:text-charcoal">
        <CurrencyProvider>
          <CartProvider>
            <Header />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
