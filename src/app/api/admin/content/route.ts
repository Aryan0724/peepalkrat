import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");

    const where: any = {};
    if (page && page !== "ALL") {
      where.page = page;
    }

    const blocks = await prisma.contentBlock.findMany({
      where,
      orderBy: [{ page: "asc" }, { order: "asc" }],
    });
    return NextResponse.json({ success: true, blocks });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check if bulk array is provided
    if (body.blocks && Array.isArray(body.blocks)) {
      const results = [];
      for (const b of body.blocks) {
        if (!b.key) continue;
        const upserted = await prisma.contentBlock.upsert({
          where: { key: b.key },
          update: {
            page: b.page || undefined,
            section: b.section || undefined,
            title: b.title,
            subtitle: b.subtitle,
            content: b.content,
            linkUrl: b.linkUrl,
            imageUrl: b.imageUrl,
            isActive: b.isActive !== undefined ? Boolean(b.isActive) : true,
          },
          create: {
            key: b.key,
            page: b.page || "home",
            section: b.section || "general",
            title: b.title,
            subtitle: b.subtitle,
            content: b.content,
            linkUrl: b.linkUrl,
            imageUrl: b.imageUrl,
            isActive: b.isActive !== undefined ? Boolean(b.isActive) : true,
          },
        });
        results.push(upserted);
      }
      return NextResponse.json({ success: true, count: results.length, blocks: results });
    }

    // Single block upsert
    const { key, page, section, title, subtitle, content, linkUrl, imageUrl, isActive } = body;

    if (!key) {
      return NextResponse.json({ success: false, message: "Block key is required" }, { status: 400 });
    }

    const block = await prisma.contentBlock.upsert({
      where: { key },
      update: {
        page: page || undefined,
        section: section || undefined,
        title,
        subtitle,
        content,
        linkUrl,
        imageUrl,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
      create: {
        key,
        page: page || "home",
        section: section || "general",
        title,
        subtitle,
        content,
        linkUrl,
        imageUrl,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
    });

    return NextResponse.json({ success: true, block });
  } catch (err: any) {
    console.error("Failed saving content block:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
