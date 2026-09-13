import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const blocks = await prisma.contentBlock.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, blocks });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { key, title, subtitle, content, linkUrl, isActive } = await req.json();

    const block = await prisma.contentBlock.upsert({
      where: { key },
      update: {
        title,
        subtitle,
        content,
        linkUrl,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
      create: {
        key,
        title,
        subtitle,
        content,
        linkUrl,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
    });

    return NextResponse.json({ success: true, block });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
