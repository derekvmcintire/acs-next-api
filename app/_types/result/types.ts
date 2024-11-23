import { IPickTypeRow } from "../database/types";
import { IEvent } from "../event/types";
import { TransformedRider } from "../rider/types";

export interface BaseResult {
  id?: number;
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
  categories?: number[] | null;
}

export interface ResultRow extends CreateResultArgs {
  id?: number;
}

// @TODO Deprecate and replace with ResultRow
export interface CreatedResult extends BaseResult {
  id?: number;
}

export interface IResult extends ResultRow {
  event?: IEvent | null;
  resultType?: IPickTypeRow | null;
  noPlaceCodeType?: IPickTypeRow | null;
  rider?: TransformedRider;
  points?: number | null;
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

export interface AssignCategoryToResultArgs {
  resultId: number;
  categoryId: number;
}

export type AddResultsRequest = {
  eventId: number;
  results: string;
  categories: number[];
};

export type AddResultsReturnSummary = {
  total: number;
  successful: number;
  failed: number;
};

export type AddResultsReturnDetails = {
  createdResults: CreatedResult[];
  errors: string[];
};

export type AddResultsReturn = {
  summary: AddResultsReturnSummary;
  details: AddResultsReturnDetails;
};
