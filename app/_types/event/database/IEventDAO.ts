import {
  BaseEvent,
  BaseRace,
  GetRaceFilters,
  GetRaceTotalsFilters,
  IEvent,
  IRace,
  RaceTotals,
} from "@/app/_types/event/types";

export interface IEventDAO {
  createRace(raceData: BaseRace): Promise<IRace | null>;
  createEvent(eventData: BaseEvent): Promise<IEvent>;
  getRace(filters: GetRaceFilters): Promise<IRace[]>;
  getRaceById(id: number): Promise<IRace | null>;
  getRaceTotalsGrouped(filters: GetRaceTotalsFilters): Promise<RaceTotals[]>;
}
