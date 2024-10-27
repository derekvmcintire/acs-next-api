const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || "*";

export default function corsMiddleware(req: Request) {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGINS);
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers });
  }

  return headers;
}
