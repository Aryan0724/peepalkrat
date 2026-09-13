import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const maker = await prisma.maker.findUnique({
      where: { id: params.id },
      include: { products: true },
    });
    if (!maker) {
      return NextResponse.json({ success: false, message: "Maker not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, maker });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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

    const updated = await prisma.maker.update({
      where: { id: params.id },
      data: {
        name,
        title,
        photo,
        villageDistrict,
        craftSkill,
        biography,
        quote: quote || null,
        videoUrl: videoUrl || null,
        verifiedImpactData:
          typeof verifiedImpactData === "object"
            ? JSON.stringify(verifiedImpactData)
            : verifiedImpactData,
        isFeatured: Boolean(isFeatured),
      },
    });

    return NextResponse.json({ success: true, maker: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Unlink products from this maker before deleting
    await prisma.product.updateMany({
      where: { makerId: params.id },
      data: { makerId: null },
    });

    await prisma.maker.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: "Maker removed" });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
