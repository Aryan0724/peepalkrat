import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        maker: true,
        images: { orderBy: { order: "asc" } },
        variants: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, products });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      sku,
      price,
      compareAtPrice,
      categoryId,
      collectionId,
      makerId,
      description,
      shortDescription,
      inventory,
      material,
      dimensions,
      weight,
      careInstructions,
      productionLocation,
      storySnippet,
      impactNotes,
      images, // array of url strings
      isFeatured,
    } = body;

    if (!name || !sku || !price || !categoryId) {
      return NextResponse.json(
        { success: false, message: "Name, SKU, Price, and Category are required." },
        { status: 400 }
      );
    }

    const slug = slugify(name);

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        sku,
        slug: `${slug}-${Math.floor(100 + Math.random() * 900)}`,
        price: Number(price),
        compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
        categoryId,
        collectionId: collectionId || null,
        makerId: makerId || null,
        description: description || name,
        shortDescription: shortDescription || null,
        inventory: Number(inventory) || 10,
        material: material || null,
        dimensions: dimensions || null,
        weight: weight || null,
        careInstructions: careInstructions || null,
        productionLocation: productionLocation || null,
        storySnippet: storySnippet || null,
        impactNotes: impactNotes || null,
        isFeatured: Boolean(isFeatured),
        isPublished: true,
        images: {
          create: (images || []).map((url: string, index: number) => ({
            url,
            isPrimary: index === 0,
            order: index,
          })),
        },
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    console.error("Failed creating product:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
