import { CreateRaceArgs } from "@/app/_types/event/types";
import {
  mockRaceName,
  mockRaceTypeId,
  mockStartDate,
  mockEndDate,
  mockLocation,
  mockId,
  mockEventId,
} from "./mock-values";
import { RaceRow } from "@/app/_types/event/database/base-types";

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
