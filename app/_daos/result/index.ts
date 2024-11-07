import { getDatabaseQueryErrorMessage } from "@/app/_constants/errors";
import {
  IResultDAO,
  getRiderResultsFilters,
} from "@/app/_types/result/database/IResultDAO";
import { IResultRepository } from "@/app/_types/result/database/IResultRepository";
import {
  AssignCategoryToResultArgs,
  CreateResultArgs,
  IResult,
} from "@/app/_types/result/types";

export default class ResultDAO implements IResultDAO {
  constructor(private resultRepo: IResultRepository) {}

  // Public Class Method - getRiderResults
  async getRiderResults({ year, riderId }: getRiderResultsFilters) {
    try {
      const results = (await this.resultRepo.findMany({
        where: {
          ...(riderId && { riderId }), // If riderId is provided, filter by it
          // Optionally filter by year if provided
          ...(year && {
            event: {
              Race: {
                some: {
                  startDate: {
                    contains: `${year}-`, // Filters for races starting in the given year
                  },
                },
              },
            },
          }),
        },
        include: {
          rider: true,
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
      })) as IResult[];

      return results;
    } catch (error) {
      throw new Error(getDatabaseQueryErrorMessage(String(error)));
    }
  }

  async getEventResults(eventId: number) {
    try {
      const results = (await this.resultRepo.findMany({
        where: {
          eventId: eventId,
        },
        include: {
          rider: true,
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
      })) as IResult[];
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

  async createResult(resultData: CreateResultArgs) {
    const { eventId, riderId } = resultData;
    if (!eventId || !riderId) {
      throw new Error("Can not create a Result without eventId and riderId");
    }

    try {
      const result = await this.resultRepo.create({
        data: {
          eventId: eventId,
          riderId: riderId,
          resultTypeId: resultData.resultTypeId,
          noPlaceCodeTypeId: resultData?.noPlaceCodeTypeId || 0,
          lap: resultData.lap,
          place: resultData.place,
          time: resultData.time,
          points: resultData.points,
        },
      });
      return result;
    } catch (error) {
      throw new Error(getDatabaseQueryErrorMessage(String(error)));
    }
  }

  async assignCategoryToResult(joinData: AssignCategoryToResultArgs) {
    try {
      const newJoin = await this.resultRepo.createJoin({
        data: {
          resultId: joinData.resultId,
          categoryId: joinData.categoryId,
        },
      });
      return newJoin;
    } catch (error) {
      throw new Error(getDatabaseQueryErrorMessage(String(error)));
    }
  }
}
