import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: { select: { products: true } },
      },
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ success: true, categories });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, image, badge, isFeatured, order } = await req.json();
    if (!name) {
      return NextResponse.json({ success: false, message: "Category name is required" }, { status: 400 });
    }

    const slug = slugify(name);
    const category = await prisma.category.create({
      data: {
        name,
        slug: `${slug}-${Math.floor(100 + Math.random() * 900)}`,
        description,
        image,
        badge: badge || null,
        isFeatured: Boolean(isFeatured),
        order: order ? parseInt(order, 10) : 0,
      },
    });

    return NextResponse.json({ success: true, category });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, badge, isFeatured, order, image, name, description } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, message: "Category ID is required" }, { status: 400 });
    }

    const updated = await prisma.category.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(image !== undefined && { image }),
        ...(badge !== undefined && { badge }),
        ...(isFeatured !== undefined && { isFeatured: Boolean(isFeatured) }),
        ...(order !== undefined && { order: parseInt(order, 10) }),
      },
    });

    return NextResponse.json({ success: true, category: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
