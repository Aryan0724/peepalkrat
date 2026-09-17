import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        collection: true,
        maker: true,
        images: { orderBy: { order: "asc" } },
        variants: true,
        recommendations: {
          include: {
            recommendedProduct: {
              include: {
                images: { where: { isPrimary: true } },
                maker: true,
              },
            },
          },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const {
      name,
      sku,
      price,
      compareAtPrice,
      costPrice,
      categoryId,
      collectionId,
      makerId,
      description,
      shortDescription,
      inventory,
      lowStockThreshold,
      material,
      dimensions,
      weight,
      careInstructions,
      shippingInfo,
      productionLocation,
      storySnippet,
      impactNotes,
      isFeatured,
      isPublished,
      images,
      recommendations,
    } = body;

    // 1. Update core product fields
    const updated = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        sku,
        price: Number(price),
        compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
        costPrice: costPrice ? Number(costPrice) : null,
        categoryId,
        collectionId: collectionId || null,
        makerId: makerId || null,
        description,
        shortDescription: shortDescription || null,
        inventory: inventory !== undefined ? Number(inventory) : 10,
        lowStockThreshold: lowStockThreshold !== undefined ? Number(lowStockThreshold) : 3,
        material: material || null,
        dimensions: dimensions || null,
        weight: weight || null,
        careInstructions: careInstructions || null,
        shippingInfo: shippingInfo || null,
        productionLocation: productionLocation || null,
        storySnippet: storySnippet || null,
        impactNotes: impactNotes || null,
        isFeatured: Boolean(isFeatured),
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    });

    // 2. Synchronize images if an array was provided
    if (Array.isArray(images)) {
      await prisma.productImage.deleteMany({ where: { productId: params.id } });
      if (images.length > 0) {
        await prisma.productImage.createMany({
          data: images.map((url: string, index: number) => ({
            productId: params.id,
            url,
            isPrimary: index === 0,
            order: index,
          })),
        });
      }
    }

    // 3. Synchronize recommendations if provided
    if (Array.isArray(recommendations)) {
      await prisma.productRecommendation.deleteMany({ where: { productId: params.id } });
      
      const validRecs = recommendations
        .map((r: any, idx: number) => {
          const recId = typeof r === "string" ? r : r.recommendedProductId;
          const note = typeof r === "object" ? r.note || null : null;
          if (!recId || recId === params.id) return null;
          return {
            productId: params.id,
            recommendedProductId: recId,
            note,
            order: idx,
          };
        })
        .filter(Boolean) as { productId: string; recommendedProductId: string; note: string | null; order: number }[];

      const seen = new Set<string>();
      const uniqueRecs = validRecs.filter((item) => {
        if (seen.has(item.recommendedProductId)) return false;
        seen.add(item.recommendedProductId);
        return true;
      });

      if (uniqueRecs.length > 0) {
        await prisma.productRecommendation.createMany({
          data: uniqueRecs,
        });
      }
    }

    // Return fresh product
    const freshProduct = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        images: { orderBy: { order: "asc" } },
        recommendations: {
          include: {
            recommendedProduct: {
              include: {
                images: { where: { isPrimary: true } },
                maker: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ success: true, product: freshProduct });
  } catch (err: any) {
    console.error("Failed updating product:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // 1. Clean up recommendation records where this product is source or target
    await prisma.productRecommendation.deleteMany({
      where: {
        OR: [{ productId: id }, { recommendedProductId: id }],
      },
    });

    // 2. Clean up cart items referencing this product
    await prisma.cartItem.deleteMany({ where: { productId: id } });

    // 3. Clean up reviews, images, variants
    await prisma.productImage.deleteMany({ where: { productId: id } });
    await prisma.productVariant.deleteMany({ where: { productId: id } });
    await prisma.review.deleteMany({ where: { productId: id } });

    // 4. Safe unlink from historical order items (preserves order records while freeing product)
    await prisma.orderItem.updateMany({
      where: { productId: id },
      data: { productId: null },
    });

    // 5. Delete product
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (err: any) {
    console.error("Failed deleting product:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
