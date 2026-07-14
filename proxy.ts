import { NextRequest, NextResponse } from "next/server";

const APP_SLUGS = new Set(["recallgraph-ai", "virtual-data-scientist"]);

function subdomainFromHost(host: string) {
  const hostname = host.split(":")[0].toLowerCase();
  if (hostname === "portfolio.decision-layer.com") return "portfolio";
  if (hostname === "apps.decision-layer.com") return "apps";
  return null;
}

export function proxy(request: NextRequest) {
  const subdomain = subdomainFromHost(request.headers.get("host") ?? "");
  const { pathname } = request.nextUrl;

  if (!subdomain || pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (subdomain === "portfolio" && pathname === "/") {
    return NextResponse.rewrite(new URL("/portfolio", request.url));
  }

  if (subdomain === "apps") {
    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/apps", request.url));
    }

    const firstSegment = pathname.split("/").filter(Boolean)[0];
    if (APP_SLUGS.has(firstSegment) && !pathname.startsWith("/apps/")) {
      return NextResponse.rewrite(new URL(`/apps${pathname}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"],
};
