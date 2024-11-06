import { getDatabaseQueryErrorMessage } from "@/app/_constants/errors";
import { IEventDAO } from "../../_types/event/database/IEventDAO";
import { IEventRepository } from "@/app/_types/event/database/IEventRepository";
import { IRaceRepository } from "@/app/_types/event/database/IRaceRepository";
import {
  CreateEventArgs,
  CreateRaceArgs,
  GetRaceFilters,
  IRace,
  RaceWhereInput,
} from "@/app/_types/event/types";

export default class EventDAO implements IEventDAO {
  // Constructor
  constructor(
    private eventRepo: IEventRepository,
    private raceRepo: IRaceRepository,
  ) {}

  async createEvent(eventData: CreateEventArgs) {
    try {
      const newEvent = await this.eventRepo.create({
        data: {
          name: eventData.name,
        },
      });

      return newEvent;
    } catch (error) {
      throw new Error(getDatabaseQueryErrorMessage(String(error)));
    }
  }

  async getRaceById(id: number): Promise<IRace | null> {
    try {
      return await this.raceRepo.findUnique({
        where: { id },
        include: { event: true, raceType: true },
      });
    } catch (error) {
      throw new Error(getDatabaseQueryErrorMessage(String(error)));
    }
  }

  async createRace(raceData: CreateRaceArgs): Promise<IRace | null> {
    if (!raceData.eventId) {
      throw new Error(
        getDatabaseQueryErrorMessage("Unable to create Race without eventId"),
      );
    }

    try {
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
    } catch (error) {
      throw new Error(getDatabaseQueryErrorMessage(String(error)));
    }
  }

  private buildRaceWhereClause(filters: GetRaceFilters) {
    const where: RaceWhereInput = {};
    if (filters.eventName) {
      const nameParts = filters.eventName.split(" ");
      where.event = {
        AND: nameParts.map((name) => ({
          name: { contains: name, mode: "insensitive" },
        })),
      };
    }
    if (filters.eventId) where.eventId = filters.eventId;
    if (filters.id) where.id = filters.id;
    if (filters.location)
      where.location = { contains: filters.location, mode: "insensitive" };
    if (filters.startDateRange) {
      where.startDate = {
        gte: filters.startDateRange.from,
        lte: filters.startDateRange.to,
      };
    }
    return where;
  }

  async getRace(filters: GetRaceFilters) {
    try {
      const where = this.buildRaceWhereClause(filters);
      return await this.raceRepo.findMany({
        where,
        include: { event: true, raceType: true },
      });
    } catch (error) {
      throw new Error(getDatabaseQueryErrorMessage(String(error)));
    }
  }
}
