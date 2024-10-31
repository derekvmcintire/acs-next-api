import { CreateRaceArgs, RaceRow } from "@/app/_types/event/types";
import { mockRaceName, mockRaceTypeId, mockStartDate, mockEndDate, mockLocation, mockId, mockEventId } from "./mock-values";

export const mockCreateRaceArgs: CreateRaceArgs = {
  name: mockRaceName,
  raceTypeId: mockRaceTypeId,
  startDate: mockStartDate,
  endDate: mockEndDate,
  location: mockLocation,
};

export const mockCreateRaceResponse: RaceRow = {
  id: mockId,
  eventId: mockEventId,
  raceTypeId: mockRaceTypeId,
  startDate: mockStartDate,
  endDate: mockEndDate,
  location: mockLocation,
};
