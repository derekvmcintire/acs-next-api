export interface EventRow {
  id: number;
  name: string;
}

export interface RaceRow {
  id: number;
  eventId: number;
  raceTypeId: number;
  startDate: string;
  endDate?: string | null;
  location?: string | null;
}

export type CreateRaceArgs = Omit<EventRow, "id"> &
  Omit<Omit<RaceRow, "id">, "eventId">;
