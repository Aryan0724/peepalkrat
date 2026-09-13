import { NextRequest, NextResponse } from "next/server";
import { getSessionCookieOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ success: true, message: "Logged out." });
  const cookieOptions = getSessionCookieOptions();
  response.cookies.set(cookieOptions.name, "", {
    ...cookieOptions,
    maxAge: 0,
  });
  return response;
}
