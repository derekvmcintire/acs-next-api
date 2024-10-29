import { NextRequest, NextResponse } from "next/server";
import { setCorsHeaders } from "./app/_middleware/cors";
import { getUrlWithVersion } from "./app/_middleware/latest";

export function middleware(request: NextRequest) {
  const headers = setCorsHeaders();

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 200, headers });
  }

  const response = NextResponse.rewrite(getUrlWithVersion(request), {
    headers,
  });
  return response;
}

// Apply middleware to all API routes
export const config = {
  matcher: ["/api/:path*"],
};
