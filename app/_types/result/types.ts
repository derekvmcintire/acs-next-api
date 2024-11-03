import { IPickTypeRow } from "../database/types";
import { IEvent } from "../event/types";

export interface BaseResult {
  eventId: number;
  riderId: number;
  lap?: number | null;
  place?: number | null;
  time?: string | null;
  points?: number | null;
}

export interface CreateResultArgs extends BaseResult {
  resultTypeId: number;
  noPlaceCodeTypeId: number | null;
}

export interface ResultRow extends CreateResultArgs {
  id: number;
}

// @TODO Deprecate and replace with ResultRow
export interface CreatedResult extends BaseResult {
  id: number;
}

export interface IResult extends ResultRow {
  event?: IEvent | null;
  resultType?: IPickTypeRow | null;
  noPlaceCodeType?: IPickTypeRow | null;
}

export interface TransformedRace extends Omit<BaseResult, "riderId"> {
  type: string;
  startDate: string;
  endDate?: string | null;
  location?: string | null;
  resultType: string;
  racers?: number;
  noPlaceCode?: string;
  category: string;
  name: string;
}

export interface IResultYear {
  year: number;
  races: TransformedRace[];
}

export interface IRacerHistory {
  riderId: number;
  results: IResultYear[];
}
