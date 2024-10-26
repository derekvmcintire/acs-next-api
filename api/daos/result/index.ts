import { IRiderResultsRow } from "@/api/types/result/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class ResultDAO {
  static async getRiderResults(riderId: number): Promise<IRiderResultsRow[]> {
    try {
      const results = await prisma.result.findMany({
        where: {
          riderId: riderId,
        },
        include: {
          event: {
            include: {
              Race: {
                include: {
                  raceType: true,
                },
              },
            },
          },
          resultType: true,
          noPlaceCodeType: true,
        },
      });
      
      return results;
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error("Database query error");
    }
  }

  static async countResultsByEventId(eventId: number) {
    try {
      const resultCount = await prisma.result.count({
        where: {
          eventId: eventId,
        },
      });

      return resultCount;
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error("Database query error");
    }
  }
}
