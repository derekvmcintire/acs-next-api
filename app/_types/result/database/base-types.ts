import { BaseEvent, EventRow } from "../../event/database/base-types";

export interface IPickTypeRow {
  id: number;
  name: string;
  description: string | null;
}

export interface BaseResult {
  eventId: number;
  riderId: number;
  resultTypeId: number;
  noPlaceCodeTypeId: number | null;
  lap: number | null;
  place: number | null;
  time: string | null;
  points: number | null;
}

export interface CreatedResult extends BaseResult {
  id: number;
}

export interface RiderResultRow extends BaseResult {
  id: number;
  event?: EventRow | null;
  resultType?: IPickTypeRow | null;
  noPlaceCodeType?: IPickTypeRow | null;
}

export type CreateResultArgs = Omit<BaseEvent, "id"> & BaseResult;
