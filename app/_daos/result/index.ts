import { IRiderResultsRow } from "@/app/_types/result/types";
import { PrismaClient } from "@prisma/client";

export default class ResultDAO {
  constructor(private prisma: PrismaClient) {}

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
