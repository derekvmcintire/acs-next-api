import { getDatabaseQueryErrorMessage } from "@/app/_constants/errors";
import { IResultDAO } from "@/app/_daos/result/IResultDAO";
import { IResultRepository } from "@/app/_database/types/result/IResultRepository";
import { IRiderResultsRow } from "@/app/_types/result/types";

export default class ResultDAO implements IResultDAO {
  // Constructor
  constructor(private resultRepo: IResultRepository) {}

  // Public Class Method - getRiderResults
  async getRiderResults(riderId: number) {
    try {
      const results = (await this.resultRepo.findMany({
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
      })) as IRiderResultsRow[];
      return results;
    } catch (error) {
      throw new Error(getDatabaseQueryErrorMessage(String(error)));
    }
  }

  // Public CLass Method countResultsByEventId
  async countResultsByEventId(eventId: number) {
    try {
      const resultCount = (await this.resultRepo.count({
        where: {
          eventId: eventId,
        },
      })) as number;

      return resultCount;
    } catch (error) {
      throw new Error(getDatabaseQueryErrorMessage(String(error)));
    }
  }
}
