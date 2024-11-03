import { IResult, IResultYear, IRacerHistory } from "@/app/_types/result/types";
import {
  mockNoPlaceCodeId,
  mockResultTypeId,
  mockRaceTypeId,
  mockRaceId,
  mockEventId,
  mockStartDateTwentyOne,
  mockEndDate,
  mockLocation,
  mockStartDateTwentyTwo,
  mockLap,
  mockPlace,
  mockTime,
  mockPoints,
  mockCategory,
  mockCount,
  mockEventName,
  mockResultId,
  mockRiderId,
  mockYearTwentyOne,
  mockYearTwentyTwo,
} from "./mock-values";
import {
  IPickTypeRow,
  RiderResultRow,
} from "@/app/_types/result/database/base-types";
import { IEvent, IRace } from "@/app/_types/event/types";

// mock IPickTypeRow values
const mockNoPlaceCodeType: IPickTypeRow = {
  id: mockNoPlaceCodeId,
  name: "NA",
  description: "Participant Placed",
};
const mockResultType: IPickTypeRow = {
  id: mockResultTypeId,
  name: "default",
  description: "Default Result Type",
};
const mockRaceType: IPickTypeRow = {
  id: mockRaceTypeId,
  name: "road",
  description: "Some race",
};

// mock IRaceRow values
export const mockRaceTwentyOne: IRace = {
  id: mockRaceId,
  eventId: mockEventId,
  raceTypeId: mockRaceTypeId,
  raceType: mockRaceType,
  startDate: mockStartDateTwentyOne,
  endDate: mockEndDate,
  location: mockLocation,
};

export const mockRaceTwentyTwo: IRace = {
  id: mockRaceId,
  eventId: mockEventId,
  raceTypeId: mockRaceTypeId,
  raceType: mockRaceType,
  startDate: mockStartDateTwentyTwo,
  endDate: mockEndDate,
  location: mockLocation,
};

// mock IEventRow values
const mockEventTwentyOne: IEvent = {
  id: mockEventId,
  name: mockEventName,
  Race: [mockRaceTwentyOne],
};
const mockEventTwentyTwo: IEvent = {
  id: mockEventId,
  name: mockEventName,
  Race: [mockRaceTwentyTwo],
};

// mock IRiderResultsRow values
export const mockSingleRiderResultRowTwentyOne: RiderResultRow = {
  id: mockResultId,
  eventId: mockEventId,
  riderId: mockRiderId,
  resultTypeId: mockResultTypeId,
  noPlaceCodeTypeId: mockNoPlaceCodeId,
  lap: mockLap,
  place: mockPlace,
  time: mockTime,
  points: mockPoints,
  event: mockEventTwentyOne,
  resultType: mockResultType,
  noPlaceCodeType: mockNoPlaceCodeType,
};

export const mockSingleRiderResultRowTwentyTwo: RiderResultRow = {
  id: mockResultId,
  eventId: mockEventId,
  riderId: mockRiderId,
  resultTypeId: mockResultTypeId,
  noPlaceCodeTypeId: mockNoPlaceCodeId,
  lap: mockLap,
  place: mockPlace,
  time: mockTime,
  points: mockPoints,
  event: mockEventTwentyTwo,
  resultType: mockResultType,
  noPlaceCodeType: mockNoPlaceCodeType,
};

export const mockGetRiderResultsQueryResponse: RiderResultRow[] = [
  mockSingleRiderResultRowTwentyOne,
  mockSingleRiderResultRowTwentyTwo,
];

// mock IResult values
export const expectedBuildFromMockSingleRiderResultTwentyOne: IResult = {
  name: mockEventName,
  place: mockPlace,
  time: mockTime,
  points: mockPoints,
  noPlaceCode: mockNoPlaceCodeType.name,
  lap: mockLap,
  resultType: mockResultType.name,
  eventId: mockEventId,
  category: mockCategory,
  racers: mockCount,
  type: mockRaceType.name,
  startDate: mockStartDateTwentyOne,
  endDate: mockEndDate,
  location: mockLocation,
};

export const expectedBuildFromMockSingleRiderResultTwentyTwo: IResult = {
  name: mockEventName,
  place: mockPlace,
  time: mockTime,
  points: mockPoints,
  noPlaceCode: mockNoPlaceCodeType.name,
  lap: mockLap,
  resultType: mockResultType.name,
  eventId: mockEventId,
  category: mockCategory,
  racers: mockCount,
  type: mockRaceType.name,
  startDate: mockStartDateTwentyTwo,
  endDate: mockEndDate,
  location: mockLocation,
};

// mock IResultYear values
export const mockExpectedResultsYearTwentyOne: IResultYear = {
  year: mockYearTwentyOne,
  races: [expectedBuildFromMockSingleRiderResultTwentyOne],
};

export const mockExpectedResultsYearTwentyTwo: IResultYear = {
  year: mockYearTwentyTwo,
  races: [expectedBuildFromMockSingleRiderResultTwentyTwo],
};

export const mockExpectedResultYears: IResultYear[] = [
  mockExpectedResultsYearTwentyOne,
  mockExpectedResultsYearTwentyTwo,
];

// mock IRacerHistory values
export const mockEmptyRacerHistory: IRacerHistory = {
  riderId: mockRiderId,
  results: [],
};

export const mockRacerHistory: IRacerHistory = {
  riderId: mockRiderId,
  results: mockExpectedResultYears,
};
