import { NextRequest, NextResponse } from "next/server";

const LATEST_VERSION = "v1";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  if (path.startsWith("/api/latest")) {
    url.pathname = path.replace("/api/latest", `/api/${LATEST_VERSION}`);

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Apply this middleware only to API routes
export const config = {
  matcher: "/api/:path*",
};
