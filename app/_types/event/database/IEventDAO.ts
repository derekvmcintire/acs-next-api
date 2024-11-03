import {
  BaseEvent,
  BaseRace,
  GetRaceFilters,
  IEvent,
  IRace,
} from "@/app/_types/event/types";

export interface IEventDAO {
  createRace(raceData: BaseRace): Promise<IRace | null>;
  createEvent(eventData: BaseEvent): Promise<IEvent>;
  getRace(filters: GetRaceFilters): Promise<IRace[]>;
  getRaceById(id: number): Promise<IRace | null>;
}
