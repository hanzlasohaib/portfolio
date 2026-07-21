import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { AUTH_COOKIE_NAME } from "@/lib/auth/constants";
import { verifyAuthToken } from "@/lib/auth/jwt";

/**
 * Protect /dashboard/* and redirect authenticated users away from /login.
 * Phase 3.2 (docs/architecture/authentication.md, folder-structure.md).
 */

const LOGIN_PATH = "/login";
const DASHBOARD_PATH = "/dashboard";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const session = token ? await verifyAuthToken(token) : null;
  const isAuthenticated = session?.role === "ADMIN";

  const isDashboard = pathname.startsWith(DASHBOARD_PATH);
  const isLogin = pathname === LOGIN_PATH;

  if (isDashboard && !isAuthenticated) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = LOGIN_PATH;
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLogin && isAuthenticated) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = DASHBOARD_PATH;
    dashboardUrl.search = "";
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
