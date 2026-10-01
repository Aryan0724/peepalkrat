import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      include: {
        _count: { select: { products: true } },
      },
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ success: true, collections });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, image, isFeatured } = await req.json();
    if (!name) {
      return NextResponse.json({ success: false, message: "Collection name is required" }, { status: 400 });
    }

    const slug = slugify(name);
    const collection = await prisma.collection.create({
      data: {
        name,
        slug: `${slug}-${Math.floor(100 + Math.random() * 900)}`,
        description,
        image,
        isFeatured: Boolean(isFeatured),
      },
    });

    return NextResponse.json({ success: true, collection });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
