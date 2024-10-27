import ResultController from "@/app/_controllers/result";
import corsMiddleware from "@/app/_middleware/cors";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const headers = corsMiddleware(request);

  if (headers instanceof Response) {
    return headers;
  }

  const response = await ResultController.getResultsByRiderId(request);
  headers.forEach((value, key) => response.headers.set(key, value));

  return response;
}
