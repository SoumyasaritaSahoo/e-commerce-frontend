/**
 * Role-based route protection for the (customer)/(vendor)/(admin) route
 * groups (docs/10-project-structure.md calls this file middleware.ts, but
 * Next.js 16 deprecated `middleware` in favor of `proxy` — same role, new
 * file/export name; see https://nextjs.org/docs/app/api-reference/file-conventions/proxy).
 *
 * Vendor and admin pages live under explicit /vendor/* and /admin/*
 * segments (not just their route groups) because Next.js route groups
 * don't affect the URL — (vendor)/orders and (admin)/orders would
 * otherwise both resolve to /orders and collide at build time.
 *
 * Reads the role out of the session cookie set at login (docs/08-security-plan.md).
 * Actual authorization is still enforced by DRF permissions on every
 * request — this only avoids flashing gated UI to the wrong role.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROLE_PREFIXES: Record<string, string> = {
  "/cart": "customer",
  "/checkout": "customer",
  "/account": "customer",
  "/vendor": "vendor",
  "/admin": "admin",
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get("role")?.value;

  const requiredRole = Object.entries(ROLE_PREFIXES).find(([prefix]) =>
    pathname.startsWith(prefix),
  )?.[1];

  if (requiredRole && role !== requiredRole) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/checkout/:path*",
    "/account/:path*",
    "/vendor/:path*",
    "/admin/:path*",
  ],
};
