// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// Define the latest API version for routing
const LATEST_VERSION = "v1";
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || "*";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  // CORS Headers Setup
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGINS);
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 200, headers });
  }

  // API Version Rewrite for "latest"
  if (path.startsWith("/api/latest")) {
    url.pathname = path.replace("/api/latest", `/api/${LATEST_VERSION}`);
    return NextResponse.rewrite(url, { headers });
  }

  // Apply CORS headers to all other API responses
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGINS);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}

// Apply middleware to all API routes
export const config = {
  matcher: ["/api/:path*"],
};
