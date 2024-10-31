import { IPickTypeRow } from "../../result/database/base-types";

export interface BaseEvent {
  id: number;
  name: string;
}

export interface BaseRace extends Omit<BaseEvent, "id"> {
  raceTypeId?: number;
  startDate: string;
  endDate?: string | null;
  location?: string | null;
}

export interface RaceRow extends Omit<BaseRace, "name"> {
  id: number;
  eventId: number;
  raceType?: IPickTypeRow;
}

export interface EventRow extends BaseEvent {
  Race?: RaceRow[];
}

export type CreateEventArgs = Omit<BaseEvent, "id">;

export interface CreateRaceArgs extends Omit<BaseEvent, "id">, BaseRace {
  eventId?: number;
}

export type CreateRaceQueryArgs = {
  data: Omit<CreateRaceArgs, "name">;
};
