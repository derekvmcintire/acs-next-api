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
  RaceWhereInput,
} from "@/app/_types/event/types";
import { GetRaceResultsFilters } from "@/app/_types/result/types";

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
      throw new Error(
        getDatabaseQueryErrorMessage(`${(error as Error).message}`),
      );
    }
  }

  async getRaceById(id: number): Promise<IRace | null> {
    try {
      return await this.raceRepo.findUnique({
        where: { id },
        include: { event: true, raceType: true },
      });
    } catch (error) {
      throw new Error(
        getDatabaseQueryErrorMessage(`${(error as Error).message}`),
      );
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
      throw new Error(
        getDatabaseQueryErrorMessage(`${(error as Error).message}`),
      );
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

      const orderBy = filters.orderBy
        ? { [filters.orderBy.column]: filters.orderBy.direction }
        : undefined;

      return await this.raceRepo.findMany({
        where,
        orderBy,
        include: { event: true, raceType: true },
        take: filters.limit,
      });
    } catch (error) {
      throw new Error(
        getDatabaseQueryErrorMessage(`${(error as Error).message}`),
      );
    }
  }

  async getRaceTotalsGrouped(filters: GetRaceTotalsFilters) {
    const totals = await this.raceRepo.getRaceTotalsGroupedRaw(filters);

    return totals;
  }

  async getListOfRaces(filters: GetRaceResultsFilters) {
    try {
      const raceIds = filters.ids;
      const races = await this.raceRepo.findMany({
        where: {
          id: { in: raceIds },
        },
        select: {
          id: true,
          eventId: true,
          event: {
            select: {
              id: true,
              name: true,
              Race: {
                select: {
                  id: true,
                  eventId: true,
                  raceTypeId: true,
                  startDate: true,
                  endDate: true,
                  location: true,
                  raceType: {
                    select: {
                      id: true,
                      name: true,
                      description: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return races;
    } catch (error) {
      throw new Error(
        getDatabaseQueryErrorMessage(`${(error as Error).message}`),
      );
    }
  }
}
