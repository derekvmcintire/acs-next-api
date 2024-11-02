import EventDAO from "@/app/_daos/event";
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

  async getRaceByName(name: string) {
    try {
      const race = await this.eventDao.getRaceByName(name);
      return race;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
