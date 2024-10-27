import corsMiddleware from "@/app/_middleware/cors";
import RiderController from "@/app/_controllers/rider";
import { NextRequest } from "next/server";

type RiderByRiderIdParams = {
  params: {
    id: string;
  };
};

export async function GET(
  request: NextRequest,
  { params }: RiderByRiderIdParams,
) {
  const headers = corsMiddleware(request);

  if (headers instanceof Response) {
    return headers;
  }

  const response = await RiderController.getRiderById(params);
  headers.forEach((value, key) => response.headers.set(key, value));

  return response;
}
