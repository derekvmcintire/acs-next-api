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
import { ResultCategoryFacadeService } from "@/app/_services/facade-services/result-category";

const getResultService = (): ResultService => {
  const resultDao = new ResultDAO(databaseClient.result);
  return new ResultService(resultDao);
};

const getEventService = (): EventService => {
  const eventDao = new EventDAO(databaseClient.event, databaseClient.race);
  return new EventService(eventDao);
};

const getResultCategoryFacadeService = (): ResultCategoryFacadeService => {
  const resultService = getResultService();
  return new ResultCategoryFacadeService(resultService);
};

export async function getResultsByRiderId(
  riderId: number,
): Promise<IRacerHistory | null> {
  const resultService = getResultService();
  return resultService.getResultsByRiderId(Number(riderId));
}

export async function getResultsByRaceId(
  raceId: number,
): Promise<IResult[] | null> {
  const eventService = getEventService();
  const race = await eventService.getListOfRaces({ ids: [raceId] });

  const { event } = race[0];

  if (!event || !event?.id) {
    throw new Error(`Failed to get event id from race id: ${raceId}`);
  }

  const resultService = getResultService();
  return resultService.getResultsByEventId(Number(event.id));
}

export async function createResult(
  resultData: CreateResultArgs,
): Promise<CreatedResult> {
  const resultCategoryFacadeService = getResultCategoryFacadeService();
  return resultCategoryFacadeService.createResultWithCategory(resultData);
}
