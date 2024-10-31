import { getDatabaseQueryErrorMessage } from "@/app/_constants/errors";
import { IEventDAO } from "../../_types/event/database/IEventDAO";
import { IEventRepository } from "@/app/_types/event/database/IEventRepository";
import { IRaceRepository } from "@/app/_types/event/database/IRaceRepository";
import { CreateRaceArgs } from "@/app/_types/event/types";
import { CreateEventArgs } from "@/app/_types/event/database/base-types";

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

  // Public Class Method createRace
  async createRace(raceData: CreateRaceArgs) {
    try {
      const newEvent = await this.createEvent({ name: raceData.name });

      const newRace = await this.raceRepo.create({
        data: {
          eventId: newEvent.id,
          raceTypeId: raceData.raceTypeId,
          startDate: raceData.startDate,
          endDate: raceData.endDate,
          location: raceData.location,
        },
      });

      return newRace;
    } catch (error) {
      throw new Error(getDatabaseQueryErrorMessage(String(error)));
    }
  }
}
