import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "peepalkrat-super-secret-jwt-key-2026-production-ready"
);

const SESSION_COOKIE_NAME = process.env.ADMIN_SESSION_COOKIE || "peepalkrat_admin_session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes
  if (pathname.startsWith("/admin")) {
    // Exclude login route and static assets
    if (pathname === "/admin/login") {
      // If already logged in, redirect to /admin dashboard
      const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
      if (token) {
        try {
          await jwtVerify(token, JWT_SECRET);
          return NextResponse.redirect(new URL("/admin", req.url));
        } catch {
          // invalid token, let proceed to login
        }
      }
      return NextResponse.next();
    }

    // Check session token
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      if (!payload || (payload.role !== "ADMIN" && payload.role !== "STAFF")) {
        return NextResponse.redirect(new URL("/admin/login?error=unauthorized", req.url));
      }
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login?error=expired", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
