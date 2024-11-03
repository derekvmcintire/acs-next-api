import EventDAO from "@/app/_daos/event";
import { GetRaceFilters } from "@/app/_types/event/database/base-types";
import { CreateRaceArgs } from "@/app/_types/event/types";

export default class EventService {
  constructor(private eventDao: EventDAO) {}

  async createRace(raceData: CreateRaceArgs) {
    try {
      const race = await this.eventDao.createRace(raceData);
      return race;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getRace(filters: GetRaceFilters) {
    try {
      const race = await this.eventDao.getRace(filters);
      return race;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
