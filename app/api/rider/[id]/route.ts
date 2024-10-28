import { getRiderById } from "@/app/_controllers/rider";
import corsMiddleware from "@/app/_middleware/cors";
import { NextRequest } from "next/server";

export type RiderByRiderIdParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, context: RiderByRiderIdParams) {
  const headers = corsMiddleware(request);

  if (headers instanceof Response) {
    return headers;
  }

  const response = await getRiderById(context);
  headers.forEach((value, key) => response.headers.set(key, value));

  return response;
}
