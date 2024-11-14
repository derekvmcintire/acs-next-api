import databaseClient from "@/app/_database/get-client";
import ResultDAO from "@/app/_daos/result";
import ResultService from "@/app/_services/result";
import {
  CreateResultArgs,
  CreatedResult,
  IRacerHistory,
  IResult,
} from "@/app/_types/result/types";
import EventService from "@/app/_services/event";
import EventDAO from "@/app/_daos/event";

const getResultService = (): ResultService => {
  const resultDao = new ResultDAO(databaseClient.result);
  return new ResultService(resultDao);
};

const getEventService = (): EventService => {
  const eventDao = new EventDAO(databaseClient.event, databaseClient.race);
  const resultDao = new ResultDAO(databaseClient.result);
  return new EventService(eventDao, resultDao);
};

export async function getResultsByRiderId(
  riderId: number,
): Promise<IRacerHistory | null> {
  try {
    const resultService = getResultService();
    const riderHistory = await resultService.getResultsByRiderId(
      Number(riderId),
    );

    return riderHistory;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getResultsByRaceId(
  raceId: number,
): Promise<IResult[] | null> {
  try {
    const eventService = getEventService();
    const race = await eventService.getListOfRaces({ ids: [raceId] });

    const { event } = race[0];

    if (!event || !event?.id) {
      throw new Error(`Failed to get event id from race id: ${raceId}`);
    }

    const resultService = getResultService();
    const results = await resultService.getResultsByEventId(Number(event.id));

    return results;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function createResult(
  resultData: CreateResultArgs,
): Promise<CreatedResult> {
  try {
    const resultService = getResultService();
    const result = await resultService.createResult(resultData);

    if (!result || !result.id) {
      throw new Error("Failed to create result");
    }

    const { categories } = resultData;

    if (categories && categories.length > 0) {
      categories.forEach((id) => {
        if (!result.id) {
          throw new Error("No result id available");
        }

        const success = resultService.assignCategoryToResult({
          resultId: result.id,
          categoryId: Number(id),
        });
        if (!success) {
          throw new Error("Failed to create entry in JoinResultCategory");
        }
      });
    }

    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
