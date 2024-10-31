import { BaseEvent, CreateEventArgs, RaceRow } from "@/app/_types/event/database/base-types";
import { CreateRaceArgs } from "@/app/_types/event/types";

export interface IEventDAO {
  createRace(raceData: CreateRaceArgs): Promise<RaceRow | null>;
  createEvent(eventData: CreateEventArgs): Promise<BaseEvent>;
}
