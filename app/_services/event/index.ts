import EventDAO from "@/app/_daos/event";
import {
  CreateRaceArgs,
  GetRaceFilters,
  GetRaceTotalsFilters,
} from "@/app/_types/event/types";
import dayjs from "dayjs";

export default class EventService {
  constructor(private eventDao: EventDAO) {}

  async createRace(raceData: CreateRaceArgs) {
    const formattedStartDate = dayjs(raceData.startDate, "MM-DD-YYYY").format(
      "YYYY-MM-DD",
    );
    const formattedEndDate = raceData.endDate
      ? dayjs(raceData.endDate, "MM-DD-YYYY").format("YYYY-MM-DD")
      : null;

    const event = await this.eventDao.createEvent({ name: raceData.name });

    return this.eventDao.createRace({
      ...raceData,
      eventId: event.id,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
  }

  async getListOfRaces(filters: GetRaceFilters) {
    try {
      const race = await this.eventDao.getListOfRaces(filters);

      return race;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getRaceTotals(filters: GetRaceTotalsFilters) {
    try {
      const totals = await this.eventDao.getRaceTotalsGrouped(filters);

      return totals;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getListOfRaceResults(filters: GetRaceFilters) {
    try {
      const races = await this.eventDao.getListOfRaces(filters);

      return races;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
