import { IRiderResultsRow } from "@/app/_types/result/types";
import { PrismaClient } from "@prisma/client";

export default class ResultDAO {
  // Constructor
  constructor(private prisma: PrismaClient) {}

  // Public Class Method - getRiderResults
  async getRiderResults(riderId: number): Promise<IRiderResultsRow[]> {
    try {
      const results = await this.prisma.result.findMany({
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

  // Public CLass Method countResultsByEventId
  async countResultsByEventId(eventId: number) {
    try {
      const resultCount = await this.prisma.result.count({
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
