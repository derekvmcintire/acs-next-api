import dayjs from "dayjs";
import { getDatabaseQueryErrorMessage } from "@/app/_constants/errors";
import { IEventDAO } from "../../_types/event/database/IEventDAO";
import { IEventRepository } from "@/app/_types/event/database/IEventRepository";
import { IRaceRepository } from "@/app/_types/event/database/IRaceRepository";
import { CreateRaceArgs } from "@/app/_types/event/types";
import {
  CreateEventArgs,
  GetRaceFilters,
  RaceRow,
} from "@/app/_types/event/database/base-types";

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

  async getRaceById(id: number): Promise<RaceRow | null> {
    try {
      const raceWithDetails = await this.raceRepo.findUnique({
        where: { id: id },
        include: {
          event: {
            select: {
              id: true,
              name: true,
            },
          },
          raceType: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      });

      return raceWithDetails;
    } catch (error) {
      throw new Error(getDatabaseQueryErrorMessage(String(error)));
    }
  }

  async createRace(raceData: CreateRaceArgs): Promise<RaceRow | null> {
    try {
      const newEvent = await this.createEvent({ name: raceData.name });

      // Format startDate and endDate using dayjs to ensure consistent YYYY-MM-DD format
      const formattedStartDate = dayjs(raceData.startDate, "MM-DD-YYYY").format(
        "YYYY-MM-DD",
      );
      const formattedEndDate = raceData.endDate
        ? dayjs(raceData.endDate, "MM-DD-YYYY").format("YYYY-MM-DD")
        : null;

      // Create the race with the correctly formatted dates
      const newRace = await this.raceRepo.create({
        data: {
          eventId: newEvent.id,
          raceTypeId: raceData.raceTypeId as number,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          location: raceData.location,
        },
      });

      // Retrieve the newly created race with the `include` clause
      if (!newRace?.id) {
        throw new Error("Database failed to return id");
      }
      const raceWithDetails = await this.getRaceById(newRace?.id);
      if (!raceWithDetails) {
        throw new Error("Race not found after creation.");
      }

      // Return the race in the expected `RaceRow` shape
      return {
        id: raceWithDetails.id,
        eventId: raceWithDetails.eventId,
        raceTypeId: raceWithDetails.raceTypeId,
        startDate: raceWithDetails.startDate,
        endDate: raceWithDetails.endDate,
        location: raceWithDetails.location,
        event: raceWithDetails.event,
        raceType: raceWithDetails.raceType,
      };
    } catch (error) {
      throw new Error(getDatabaseQueryErrorMessage(String(error)));
    }
  }

  // // Public Class Method createRace
  // async createRace(raceData: CreateRaceArgs): Promise<RaceRow | null> {
  //   try {
  //     const newEvent = await this.createEvent({ name: raceData.name });

  //     // First, create the race without the `include` clause
  //     const newRace = await this.raceRepo.create({
  //       data: {
  //         eventId: newEvent.id,
  //         raceTypeId: raceData.raceTypeId as number,
  //         startDate: raceData.startDate,
  //         endDate: raceData.endDate,
  //         location: raceData.location,
  //       },
  //     });

  //     // Then, retrieve the newly created race with the `include` clause
  //     // TODO: write new findUnique function and add types to get race by id
  //     if (!newRace?.id) {
  //       throw new Error("Database failed to return id");
  //     }
  //     const raceWithDetails = await this.getRaceById(newRace?.id);
  //     if (!raceWithDetails) {
  //       throw new Error("Race not found after creation.");
  //     }

  //     // Return the race in the expected `RaceRow` shape
  //     return {
  //       id: raceWithDetails.id,
  //       eventId: raceWithDetails.eventId,
  //       raceTypeId: raceWithDetails.raceTypeId,
  //       startDate: raceWithDetails.startDate,
  //       endDate: raceWithDetails.endDate,
  //       location: raceWithDetails.location,
  //       event: raceWithDetails.event,
  //       raceType: raceWithDetails.raceType,
  //     };
  //   } catch (error) {
  //     throw new Error(getDatabaseQueryErrorMessage(String(error)));
  //   }
  // }

  async getRace({ eventName, id, location, startDateRange }: GetRaceFilters) {
    try {
      const where: any = {};

      // Filter by event name if provided
      if (eventName) {
        const nameParts = eventName.split(" ");
        where.event = {
          AND: nameParts.map((partialName) => ({
            name: {
              contains: partialName,
              mode: "insensitive",
            },
          })),
        };
      }

      // Filter by race ID if provided
      if (id) {
        where.id = id;
      }

      // Filter by location if provided
      if (location) {
        where.location = {
          contains: location,
          mode: "insensitive",
        };
      }

      // Filter by startDate range if provided (string-based)
      if (startDateRange) {
        where.startDate = {
          gte: startDateRange.from,
          lte: startDateRange.to,
        };
      }

      // Fetch races with the constructed where clause
      const races = await this.raceRepo.findMany({
        where,
        include: {
          event: true,
          raceType: true,
        },
      });

      console.log("Returning races:", races);
      return races;
    } catch (error) {
      throw new Error(getDatabaseQueryErrorMessage(String(error)));
    }
  }
}
