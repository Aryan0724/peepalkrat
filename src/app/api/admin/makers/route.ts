import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const makers = await prisma.maker.findMany({
      include: {
        products: { select: { id: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, makers });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      title,
      photo,
      villageDistrict,
      craftSkill,
      biography,
      quote,
      videoUrl,
      verifiedImpactData,
      isFeatured,
    } = body;

    if (!name || !title || !photo || !villageDistrict) {
      return NextResponse.json(
        { success: false, message: "Name, Title, Photo, and Village/District are required." },
        { status: 400 }
      );
    }

    const slug = slugify(name);

    const maker = await prisma.maker.create({
      data: {
        name,
        slug: `${slug}-${Math.floor(100 + Math.random() * 900)}`,
        title,
        photo,
        villageDistrict,
        craftSkill: craftSkill || title,
        biography: biography || "",
        quote: quote || null,
        videoUrl: videoUrl || null,
        verifiedImpactData: verifiedImpactData ? JSON.stringify(verifiedImpactData) : null,
        isFeatured: Boolean(isFeatured),
      },
    });

    return NextResponse.json({ success: true, maker });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
