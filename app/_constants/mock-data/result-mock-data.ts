import {
  IEventRow,
  IPickTypeRow,
  IRaceRow,
  IRacerHistory,
  IResult,
  IResultYear,
  IRiderResultsRow,
} from "@/app/_types/result/types";

// Mock Values
export const mockEventName = "Tour Barentu";
export const mockCategory = "1";
export const mockCount = 5;
export const mockResultId = 3;
const mockNoPlaceCodeId = 2;
const mockResultTypeId = 1;
const mockRaceTypeId = 1;
const mockRaceId = 4;
export const mockRiderId = 1;
const mockEventId = 31;
const mockEndDate = null;
const mockStartDateTwentyOne = "Wed Nov 07 2021";
const mockStartDateTwentyTwo = "Wed Nov 07 2022";
const mockLocation = "Boston, mA";
const mockLap = 1;
const mockPlace = 3;
const mockTime = "";
const mockPoints = 300;
export const mockYearTwentyOne = 2021;
export const mockYearTwentyTwo = 2022;

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
export const mockRaceTwentyOne: IRaceRow = {
  id: mockRaceId,
  eventId: mockEventId,
  raceTypeId: mockRaceTypeId,
  raceType: mockRaceType,
  startDate: mockStartDateTwentyOne,
  endDate: mockEndDate,
  location: mockLocation,
};

export const mockRaceTwentyTwo: IRaceRow = {
  id: mockRaceId,
  eventId: mockEventId,
  raceTypeId: mockRaceTypeId,
  raceType: mockRaceType,
  startDate: mockStartDateTwentyTwo,
  endDate: mockEndDate,
  location: mockLocation,
};

// mock IEventRow values
const mockEventTwentyOne: IEventRow = {
  id: mockEventId,
  name: mockEventName,
  Race: [mockRaceTwentyOne],
};
const mockEventTwentyTwo: IEventRow = {
  id: mockEventId,
  name: mockEventName,
  Race: [mockRaceTwentyTwo],
};

// mock IRiderResultsRow values
export const mockSingleRiderResultRowTwentyOne: IRiderResultsRow = {
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

export const mockSingleRiderResultRowTwentyTwo: IRiderResultsRow = {
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

export const mockGetRiderResultsQueryResponse: IRiderResultsRow[] = [
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
  eventId: mockSingleRiderResultRowTwentyOne.eventId,
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
  eventId: mockSingleRiderResultRowTwentyTwo.eventId,
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
