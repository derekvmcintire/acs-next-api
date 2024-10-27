import { NextRequest } from "next/server";
import corsMiddleware from "@/app/_middleware/cors";
import { getMultipleRiders } from "@/app/_controllers/rider";

export async function GET(request: NextRequest) {
  const headers = corsMiddleware(request);

  if (headers instanceof Response) {
    return headers;
  }

  const response = await getMultipleRiders(request);
  headers.forEach((value, key) => response.headers.set(key, value));

  return response;
}
