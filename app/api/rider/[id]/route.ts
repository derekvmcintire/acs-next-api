import { getRiderById } from "@/app/_controllers/rider";
import corsMiddleware from "@/app/_middleware/cors";
import { NextRequest } from "next/server";

export type GetRiderByRiderIdParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  context: GetRiderByRiderIdParams,
) {
  const headers = corsMiddleware(request);

  if (headers instanceof Response) {
    return headers;
  }

  const response = await getRiderById(context);
  headers.forEach((value, key) => response.headers.set(key, value));

  return response;
}
