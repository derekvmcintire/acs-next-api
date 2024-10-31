export interface IEvent {
  eventId: number;
  name: string;
}

export interface IResult extends IEvent {
  type: string;
  startDate: string;
  endDate?: string | null;
  location?: string | null;
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
  riderId: number;
  results: IResultYear[];
}
