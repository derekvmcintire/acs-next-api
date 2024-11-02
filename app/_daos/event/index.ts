import { getDatabaseQueryErrorMessage } from "@/app/_constants/errors";
import { IEventDAO } from "../../_types/event/database/IEventDAO";
import { IEventRepository } from "@/app/_types/event/database/IEventRepository";
import { IRaceRepository } from "@/app/_types/event/database/IRaceRepository";
import { CreateRaceArgs } from "@/app/_types/event/types";
import {
  CreateEventArgs,
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

  // Public Class Method createRace
  async createRace(raceData: CreateRaceArgs): Promise<RaceRow | null> {
    try {
      const newEvent = await this.createEvent({ name: raceData.name });

      // First, create the race without the `include` clause
      const newRace = await this.raceRepo.create({
        data: {
          eventId: newEvent.id,
          raceTypeId: raceData.raceTypeId as number,
          startDate: raceData.startDate,
          endDate: raceData.endDate,
          location: raceData.location,
        },
      });

      // Then, retrieve the newly created race with the `include` clause
      // TODO: write new findUnique function and add types to get race by id
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

  async getRaceByName(eventName: string) {
    try {
      const nameParts = eventName.split(" ");

      const race = await this.raceRepo.findMany({
        where: {
          event: {
            AND: nameParts.map((partialName: string) => ({
              name: {
                contains: partialName,
                mode: "insensitive",
              },
            })),
          },
        },
        include: {
          event: true,
          raceType: true,
        },
      });

      console.log("reeturning race: ", race);
      return race;
    } catch (error) {
      throw new Error(getDatabaseQueryErrorMessage(String(error)));
    }
  }
}
