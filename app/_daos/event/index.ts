import { getDatabaseQueryErrorMessage } from "@/app/_constants/errors";
import { IEventDAO } from "../../_types/event/database/IEventDAO";
import { IEventRepository } from "@/app/_types/event/database/IEventRepository";
import { IRaceRepository } from "@/app/_types/event/database/IRaceRepository";
import {
  CreateEventArgs,
  CreateRaceArgs,
  GetRaceFilters,
  GetRaceTotalsFilters,
  IRace,
} from "@/app/_types/event/types";
import { getListOfRacesQueryConfig } from "./queries/get-list-of-races-query";

export default class EventDAO implements IEventDAO {
  constructor(
    private eventRepo: IEventRepository,
    private raceRepo: IRaceRepository,
  ) {}

  async createEvent(eventData: CreateEventArgs) {
    return this.eventRepo.create({
      data: {
        name: eventData.name,
      },
    });
  }

  async getRaceById(id: number): Promise<IRace | null> {
    return this.raceRepo.findUnique({
      where: { id },
      include: { event: true, raceType: true },
    });
  }

  async createRace(raceData: CreateRaceArgs): Promise<IRace | null> {
    if (!raceData.eventId) {
      throw new Error(
        getDatabaseQueryErrorMessage("Unable to create Race without eventId"),
      );
    }

    const newRace = await this.raceRepo.create({
      data: {
        eventId: raceData.eventId,
        raceTypeId: raceData.raceTypeId as number,
        startDate: raceData.startDate,
        endDate: raceData.endDate,
        location: raceData.location,
      },
    });

    if (!newRace?.id) throw new Error("Database failed to return id");

    return this.getRaceById(newRace.id);
  }

  async getListOfRaces(filters: GetRaceFilters) {
    return this.raceRepo.findMany(getListOfRacesQueryConfig(filters));
  }

  async getRaceTotalsGrouped(filters: GetRaceTotalsFilters) {
    return this.raceRepo.getRaceTotalsGroupedRaw(filters);
  }
}
