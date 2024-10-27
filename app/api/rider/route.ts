import { NextRequest } from "next/server";
import RiderController from "@/app/_controllers/rider";
import corsMiddleware from "@/app/_middleware/cors";

export async function GET(request: NextRequest) {
  const headers = corsMiddleware(request);

  if (headers instanceof Response) {
    return headers;
  }

  const response = await RiderController.getRider(request);
  headers.forEach((value, key) => response.headers.set(key, value));

  return response;
}
