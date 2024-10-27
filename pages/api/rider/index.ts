import { NextApiRequest, NextApiResponse } from "next";
import RiderController from "@/api/controllers/rider";
import corsMiddleware from "@/api/middleware/cors";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (corsMiddleware(request, response)) return;
  if (request.method === "GET") {
    RiderController.getRider(request, response);
  } else {
    response.setHeader("Allow", ["GET"]);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}

// Below is what life could look like after upgrading to the App Router
// export async function GET(request: NextApiRequest, response: NextApiResponse) {
//   if (corsMiddleware(request, response)) return;
//   RiderController.getRider(request, response);
// }
