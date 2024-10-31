import { getDatabaseQueryErrorMessage } from "@/app/_constants/errors";
import { IEventDAO } from "./IEventDAO";
import { IEventRepository } from "@/app/_database/types/event/IEventRepository";
import { IRaceRepository } from "@/app/_database/types/event/IRaceRepository";
import { CreateRaceArgs } from "@/app/_types/event/types";

export default class EventDAO implements IEventDAO {
  // Constructor
  constructor(
    private eventRepo: IEventRepository,
    private raceRepo: IRaceRepository,
  ) {}

  // Public Class Method createRace
  async createRace(raceData: CreateRaceArgs) {
    try {
      const newEvent = await this.eventRepo.create({
        data: {
          name: raceData.name,
        },
      });

      if (!newEvent) {
        throw new Error(getDatabaseQueryErrorMessage("Failed to create event"));
      }

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
