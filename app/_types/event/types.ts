import { IPickTypeRow } from "../database/types";

// Base Types
export interface BaseEvent {
  name: string;
}

export interface BaseRace extends BaseEvent {
  raceTypeId?: number;
  eventId?: number;
  startDate: string;
  endDate?: string | null;
  location?: string | null;
}

// Resource Types
export interface IRace extends Omit<BaseRace, "name"> {
  id: number;
  eventId: number;
  raceType?: IPickTypeRow;
  event?: BaseEvent;
}

export interface IEvent extends BaseEvent {
  // look for duplicate in result types
  id: number;
  Race?: IRace[];
}

// Create Event Argument
export type CreateEventArgs = BaseEvent;
export type CreateRaceArgs = BaseRace;

// Query Types
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

export type GetRaceArgs = {
  name: string;
};
