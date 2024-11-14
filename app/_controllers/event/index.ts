import EventDAO from "@/app/_daos/event";
import ResultDAO from "@/app/_daos/result";
import databaseClient from "@/app/_database/get-client";
import EventService from "@/app/_services/event";
import {
  CreateRaceArgs,
  GetRaceFilters,
  GetRaceTotalsFilters,
} from "@/app/_types/event/types";

const getEventService = (): EventService => {
  const eventDao = new EventDAO(databaseClient.event, databaseClient.race);
  const resultDao = new ResultDAO(databaseClient.result);
  return new EventService(eventDao, resultDao);
};

export async function createRace(raceData: CreateRaceArgs) {
  try {
    const eventService = getEventService();
    const race = await eventService.createRace(raceData);

    return race;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getRace(filters: GetRaceFilters) {
  try {
    const eventService = getEventService();
    const races = await eventService.getListOfRaces(filters);

    return races;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getRaceTotals(filters: GetRaceTotalsFilters) {
  try {
    const eventService = getEventService();
    const totals = await eventService.getRaceTotals(filters);

    return totals;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getListOfRaceResults(filters: GetRaceFilters) {
  try {
    const eventService = getEventService();
    const results = await eventService.getListOfRaceResults(filters);

    return results;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
