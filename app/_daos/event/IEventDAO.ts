import { CreateRaceArgs, RaceRow } from "@/app/_types/event/types";

export interface IEventDAO {
  createRace(raceData: CreateRaceArgs): Promise<RaceRow | null>;
}
