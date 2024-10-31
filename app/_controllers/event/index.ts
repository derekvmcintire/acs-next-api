import EventDAO from "@/app/_daos/event";
import databaseClient from "@/app/_database/client";
import EventService from "@/app/_services/event";
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
