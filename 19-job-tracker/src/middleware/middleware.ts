import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/signup");

  const ProtectedRoutes = ["/dashboard", "/jobs", "analytics", "/profile"];

  const isProtectedPage = ProtectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  const token = req.cookies.get("token")?.value;
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("signup", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard:path*", "/login", "/signup"],
};
