import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Array of { key, value }

    for (const item of body) {
      await prisma.siteSetting.upsert({
        where: { key: item.key },
        update: { value: String(item.value) },
        create: { key: item.key, value: String(item.value) },
      });
    }

    return NextResponse.json({ success: true, message: "Settings updated successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
