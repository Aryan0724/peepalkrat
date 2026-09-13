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
        images: true,
        variants: true,
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
      isFeatured,
      isPublished,
    } = body;

    const updated = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        sku,
        price: Number(price),
        compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
        categoryId,
        collectionId: collectionId || null,
        makerId: makerId || null,
        description,
        shortDescription,
        inventory: Number(inventory),
        material,
        dimensions,
        weight,
        careInstructions,
        productionLocation,
        storySnippet,
        impactNotes,
        isFeatured: Boolean(isFeatured),
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Delete variants and images first
    await prisma.productImage.deleteMany({ where: { productId: params.id } });
    await prisma.productVariant.deleteMany({ where: { productId: params.id } });
    await prisma.review.deleteMany({ where: { productId: params.id } });

    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
