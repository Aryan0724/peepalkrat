import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://peepalkraft.com";

  // Get dynamic products
  const products = await prisma.product.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true }
  });

  // Get dynamic categories
  const categories = await prisma.category.findMany({
    select: { slug: true, updatedAt: true }
  });

  const productRoutes = products.map((product: any) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryRoutes = categories.map((cat: any) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: cat.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const staticRoutes = [
    "",
    "/shop",
    "/our-story",
    "/makers",
    "/impact",
    "/community"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
