import EventDAO from "@/app/_daos/event";
import databaseClient from "@/app/_database/get-client";
import EventService from "@/app/_services/event";
import { GetRaceFilters } from "@/app/_types/event/database/base-types";
import { CreateRaceArgs } from "@/app/_types/event/types";

const getEventService = (): EventService => {
  const eventDao = new EventDAO(databaseClient.event, databaseClient.race);
  return new EventService(eventDao);
};

export async function createRace(raceData: CreateRaceArgs) {
  try {
    const eventService = getEventService();
    const race = await eventService.createRace(raceData);

    return race;
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function getRace(filters: GetRaceFilters) {
  try {
    const eventService = getEventService();
    const race = await eventService.getRace(filters);

    return race;
  } catch (error) {
    throw new Error(String(error));
  }
}