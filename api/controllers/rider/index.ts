import RiderDAO from "@/api/daos/rider";
import RiderService from "@/api/services/rider";
import { IGetRidersParams } from "@/api/types/rider/types";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default class RiderController {
  static async getRider(request: NextApiRequest, response: NextApiResponse) {
    try {
      const { team, country, name, ids } = request.query;

      const params: IGetRidersParams = {
        teamName: typeof team === "string" ? team : undefined,
        country: typeof country === "string" ? country : undefined,
        name: typeof name === "string" ? name : undefined,
        ids: typeof ids === "string" ? ids.split(",").map(Number) : undefined,
      };

      const riderDao = new RiderDAO(prisma);
      const riderService = new RiderService(riderDao);
      const riders = await riderService.getRiders(params);

      response.status(200).json(riders);
    } catch (error) {
      response.status(500).json({ error: `Internal Server Error: ${error}` });
    }
  }
}
