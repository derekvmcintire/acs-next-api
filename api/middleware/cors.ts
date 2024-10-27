import { NextApiRequest, NextApiResponse } from "next";

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || "*";

/**
 * CORS middleware for Next.js API routes
 */
export default function corsMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return true; // Indicate that response has ended for OPTIONS
  }

  return false; // Indicate that response has not ended for other methods
}
