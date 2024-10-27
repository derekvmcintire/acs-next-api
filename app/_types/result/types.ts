export interface IEvent {
  eventId: number;
  name: string;
}

export interface IResult extends IEvent {
  type: string;
  startDate: string;
  endDate?: string;
  location?: string;
  resultType: string;
  lap?: number;
  place?: number;
  time?: string;
  points: number;
  racers?: number;
  noPlaceCode?: string;
  category: string;
}

export interface IResultYear {
  year: number;
  races: IResult[];
}

export interface IRacerHistory {
  racerId: number;
  results: IResultYear[];
}

// DB Table Row Types
export interface IPickTypeRow {
  id: number;
  name: string;
  description: string | null;
}

export interface IRaceRow {
  id: number;
  eventId: number;
  raceTypeId: number;
  raceType: IPickTypeRow;
  startDate: string;
  endDate: string | null;
  location: string | null;
}

export interface IEventRow {
  id: number;
  name: string;
  Race: IRaceRow[];
}

export interface IRiderResultsRow {
  id: number;
  eventId: number;
  riderId: number;
  resultTypeId: number;
  noPlaceCodeTypeId: number | null;
  event: IEventRow;
  resultType: IPickTypeRow;
  noPlaceCodeType: IPickTypeRow | null;
  lap: number | null;
  place: number | null;
  time: string | null;
  points: number | null;
}
