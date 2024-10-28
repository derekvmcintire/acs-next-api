import { IDatabaseClient } from "@/app/_interfaces/IDatabaseClient";
import { IResultDAO } from "@/app/_interfaces/IResultDAO";
import { IRiderResultsRow } from "@/app/_types/result/types";

export default class ResultDAO implements IResultDAO {
  // Constructor
  constructor(private prisma: IDatabaseClient) {}

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
