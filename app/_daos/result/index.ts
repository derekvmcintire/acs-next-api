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
import { getListOfResultsQueryConfig } from "./queries/get-list-of-race-results-query";
import { getRiderResultsQueryConfig } from "./queries/get-rider-results-query";
import { getEventResultsQueryConfig } from "./queries/get-event-results-query";

export default class ResultDAO implements IResultDAO {
  constructor(private resultRepo: IResultRepository) {}

  async getRiderResults({ year, riderId }: getRiderResultsFilters) {
    return (await this.resultRepo.findMany(
      getRiderResultsQueryConfig(year, riderId),
    )) as IResult[];
  }

  async getEventResults(eventId: number) {
    return (await this.resultRepo.findMany(
      getEventResultsQueryConfig(eventId),
    )) as IResult[];
  }

  async countResultsByEventId(eventId: number) {
    return (await this.resultRepo.count({
      where: {
        eventId: eventId,
      },
    })) as number;
  }

  async createResult(resultData: CreateResultArgs) {
    const { eventId, riderId } = resultData;

    if (!eventId || !riderId) {
      throw new Error("Can not create a Result without eventId and riderId");
    }

    return this.resultRepo.create({
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
  }

  async assignCategoryToResult(joinData: AssignCategoryToResultArgs) {
    return this.resultRepo.createJoin({
      data: {
        resultId: joinData.resultId,
        categoryId: joinData.categoryId,
      },
    });
  }

  async getListOfRaceResults(eventIds: number[], limit?: number) {
    return this.resultRepo.findMany(
      getListOfResultsQueryConfig(eventIds, limit),
    );
  }
}
