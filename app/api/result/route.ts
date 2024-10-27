import corsMiddleware from "@/app/_middleware/cors";
import { NextRequest } from "next/server";
import { getResultsByRiderId } from "@/app/_controllers/result";

export async function GET(request: NextRequest) {
  const headers = corsMiddleware(request);

  if (headers instanceof Response) {
    return headers;
  }

  const response = await getResultsByRiderId(request);
  headers.forEach((value, key) => response.headers.set(key, value));

  return response;
}
