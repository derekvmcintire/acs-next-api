import databaseClient from "@/app/_database/get-client";
import ResultDAO from "@/app/_daos/result";
import ResultService from "@/app/_services/result";
import {
  AddResultsRequest,
  CreateResultArgs,
  CreatedResult,
  IRacerHistory,
  IResult,
} from "@/app/_types/result/types";
import EventService from "@/app/_services/event";
import EventDAO from "@/app/_daos/event";
import { ResultCategoryFacadeService } from "@/app/_services/facade-services/result-category";
import RiderService from "@/app/_services/rider";
import RiderDAO from "@/app/_daos/rider";
import { RiderResultFacadeService } from "@/app/_services/facade-services/rider-result";

/**
 * Factory function to create an instance of ResultService.
 * Combines ResultDAO with the Prisma database client to provide result-specific operations.
 */
const getResultService = (): ResultService => {
  const resultDao = new ResultDAO(databaseClient.result);
  return new ResultService(resultDao);
};

/**
 * Factory function to create an instance of EventService.
 * Combines EventDAO with the Prisma database client to provide event and race-specific operations.
 */
const getEventService = (): EventService => {
  const eventDao = new EventDAO(databaseClient.event, databaseClient.race);
  return new EventService(eventDao);
};

/**
 * Factory function to create an instance of RiderService.
 * Combines RiderDAO with the Prisma database client to provide rider-specific operations.
 */
const getRiderService = (): RiderService => {
  const riderDao = new RiderDAO(databaseClient.rider);
  return new RiderService(riderDao);
};

/**
 * Factory function to create an instance of RiderResultFacadeService.
 * Combines RiderService and ResultService to handle complex rider-result-related workflows.
 */
const getRiderResultFacadeService = (): RiderResultFacadeService => {
  const riderService = getRiderService();
  const resultService = getResultService();
  return new RiderResultFacadeService(riderService, resultService);
};

/**
 * Factory function to create an instance of ResultCategoryFacadeService.
 * Combines ResultService to handle result-category-related workflows.
 */
const getResultCategoryFacadeService = (): ResultCategoryFacadeService => {
  const resultService = getResultService();
  return new ResultCategoryFacadeService(resultService);
};

/**
 * Retrieves all results for a specific rider based on their ID.
 *
 * @param riderId - ID of the rider.
 * @returns A promise resolving to the rider's result history, or null if no results are found.
 */
export async function getResultsByRiderId(
  riderId: number,
): Promise<IRacerHistory | null> {
  const resultService = getResultService();
  return resultService.getResultsByRiderId(Number(riderId));
}

/**
 * Retrieves all results for a specific race based on its ID.
 *
 * @param raceId - ID of the race.
 * @returns A promise resolving to an array of results, or null if no results are found.
 * @throws An error if the event associated with the race cannot be determined.
 */
export async function getResultsByRaceId(
  raceId: number,
): Promise<IResult[] | null> {
  const eventService = getEventService();

  // Fetch race details to determine associated event
  const race = await eventService.getListOfRaces({ ids: [raceId] });

  const { event } = race[0];

  // Ensure the event is valid
  if (!event || !event?.id) {
    throw new Error(`Failed to get event id from race id: ${raceId}`);
  }

  const resultService = getResultService();
  return resultService.getResultsByEventId(Number(event.id));
}

/**
 * Creates a new result and associates it with the specified categories.
 *
 * @param resultData - Data required to create a result, including categories.
 * @returns A promise resolving to the created result object.
 */
export async function createResult(
  resultData: CreateResultArgs,
): Promise<CreatedResult> {
  const resultCategoryFacadeService = getResultCategoryFacadeService();
  return resultCategoryFacadeService.createResultWithCategory(resultData);
}

/**
 * Adds multiple results to a race in bulk.
 * This includes creating new riders if necessary, assigning them results, and linking results to categories.
 *
 * @param requestData - Data containing the results to add and their associated race.
 * @returns A promise resolving to the added results.
 */
export async function addResultsToRace(requestData: AddResultsRequest) {
  const riderResultFacadeService = getRiderResultFacadeService();
  const result = await riderResultFacadeService.addResultsToRace(requestData);

  return result;
}
