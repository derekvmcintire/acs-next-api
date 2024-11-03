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
  event?: BaseEvent;
}

export interface EventRow extends BaseEvent {
  Race?: RaceRow[];
}

export type CreateEventArgs = Omit<BaseEvent, "id">;

export interface CreateRaceArgs extends Omit<BaseEvent, "id">, BaseRace {
  eventId?: number;
}

export type CreateRaceQueryArgs = {
  data: Omit<CreateRaceArgs, "name"> & {
    eventId: number;
    raceTypeId: number; // Ensure this is a required field
  };
};

export type DateRangeFilter = { from: string; to: string };

export type GetRaceFilters = {
  eventName?: string;
  id?: number;
  location?: string;
  startDateRange?: DateRangeFilter;
};

export interface RaceWhereInput {
  event?: {
    AND?: Array<{ name: { contains: string; mode?: "insensitive" } }>;
  };
  id?: number;
  location?: { contains: string; mode?: "insensitive" };
  startDate?: { gte: string; lte: string };
}
