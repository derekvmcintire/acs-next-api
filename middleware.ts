// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getCorsHeaders } from "./app/_middleware/cors";
import { getRequestURL } from "./app/_middleware/latest";

export function middleware(request: NextRequest) {
  const headers = getCorsHeaders();

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 200, headers });
  }

  const url = getRequestURL(request);
  const response = NextResponse.rewrite(url, { headers });
  return response;
}

// Apply middleware to all API routes
export const config = {
  matcher: ["/api/:path*"],
};
