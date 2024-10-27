import { NextApiRequest, NextApiResponse } from "next";
import corsMiddleware from "@/api/middleware/cors";
import RiderController from "@/api/controllers/rider";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (corsMiddleware(request, response)) return;
  if (request.method === "GET") {
    RiderController.getRiderById(request, response);
  } else {
    response.setHeader("Allow", ["GET"]);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
