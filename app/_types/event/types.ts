import { Race } from "@prisma/client";
import { IPickTypeRow } from "../database/types";

// Base Types
export interface BaseEvent {
  id?: number;
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
  eventId?: number;
  id?: number;
  location?: string;
  startDateRange?: DateRangeFilter;
  limit?: number;
  orderBy?: { column: keyof Race; direction: "asc" | "desc" };
};

type InsensitiveStringSearch = { contains: string; mode?: "insensitive" }

export interface RaceWhereInput {
  event?: {
    AND?: Array<{ name: InsensitiveStringSearch }>;
  };
  eventId?: number;
  id?: number;
  location?: InsensitiveStringSearch;
  startDate?: { gte: string; lte: string };
}

export type GetRaceArgs = {
  name: string;
};
