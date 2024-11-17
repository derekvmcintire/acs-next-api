import EventDAO from "@/app/_daos/event";
import ResultDAO from "@/app/_daos/result";
import databaseClient from "@/app/_database/get-client";
import EventService from "@/app/_services/event";
import { EventResultFacadeService } from "@/app/_services/facade-services/race-result";
import ResultService from "@/app/_services/result";
import {
  CreateRaceArgs,
  GetRaceFilters,
  GetRaceTotalsFilters,
} from "@/app/_types/event/types";

const getEventService = (): EventService => {
  const eventDao = new EventDAO(databaseClient.event, databaseClient.race);
  return new EventService(eventDao);
};

const getResultService = (): ResultService => {
  const resultDao = new ResultDAO(databaseClient.result);
  return new ResultService(resultDao);
};

const getEventResultService = (
  eventService: EventService,
  resultService: ResultService,
): EventResultFacadeService => {
  return new EventResultFacadeService(eventService, resultService);
};

export async function createRace(raceData: CreateRaceArgs) {
  const eventService = getEventService();
  return eventService.createRace(raceData);
}

export async function getRace(filters: GetRaceFilters) {
  const eventService = getEventService();
  return eventService.getListOfRaces(filters);
}

export async function getRaceTotals(filters: GetRaceTotalsFilters) {
  const eventService = getEventService();
  return eventService.getRaceTotals(filters);
}

export async function getListOfRaceResults(filters: GetRaceFilters) {
  const eventService = getEventService();
  const resultService = getResultService();
  const eventResultService = getEventResultService(eventService, resultService);
  return eventResultService.getListOfEventsWithResults(filters);
}
