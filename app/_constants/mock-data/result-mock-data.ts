import { IEvent, IEventRow, IRacerHistory, IRiderResultsRow } from "@/app/_types/result/types";

export const mockResultsData: IRacerHistory = {
  riderId: 18,
  results: [
    {
      year: 2018,
      races: [
        {
          name: "Ronde Van Copenhagen",
          place: 47,
          points: 0,
          noPlaceCode: "NA",
          resultType: "default",
          eventId: 46,
          category: "1",
          racers: 38,
          type: "Road",
          startDate: "Fri Nov 30 2018",
          location: "Ronde Van Copenhagen",
        },
        {
          name: "De Lille",
          place: 27,
          points: 0,
          noPlaceCode: "NA",
          resultType: "default",
          eventId: 63,
          category: "1",
          racers: 39,
          type: "Road",
          startDate: "Wed Nov 21 2018",
          location: "De Lille",
        },
      ],
    },
    {
      year: 2019,
      races: [
        {
          name: "Chrono des Vienna",
          place: 25,
          points: 0,
          noPlaceCode: "NA",
          resultType: "default",
          eventId: 94,
          category: "1",
          racers: 34,
          type: "Road",
          startDate: "Mon Nov 19 20189",
          location: "Chrono des Vienna",
        },
        {
          name: "Wollongong to Oulu",
          place: 3,
          points: 0,
          noPlaceCode: "NA",
          resultType: "default",
          eventId: 117,
          category: "1",
          racers: 33,
          type: "Road",
          startDate: "Wed Nov 07 2019",
          location: "Wollongong to Oulu",
        },
      ],
    },
  ],
};

export const mockEmptyResultsData: IRacerHistory = {
  riderId: 18,
  results: [],
};

export const mockEventName = "Tour Barentu";
export const mockCategory = "1";
export const mockCount = 5;
export const mockResultId = 3;
const mockNoPlaceCodeId = 2;
const mockResultTypeId = 1;
const mockRaceTypeId = 1;
const mockRaceId = 4;
const mockRiderId = 1;
const mockEventId = 31;

export const mockRace = {
  id: mockRaceId,
  eventId: mockEventId,
  raceTypeId: mockRaceTypeId,
  raceType: { id: mockRaceTypeId, name: "road", description: "Some race" },
  startDate: "Wed Nov 07 2019",
  endDate: null,
  location: null,
};

// export const mockRaceRow = {
//   id: mockRaceId;
//   eventId: number;
//   raceTypeId: number;
//   raceType?: IPickTypeRow;
//   startDate: string;
//   endDate: string | null;
//   location: string | null;
// }

const mockEvent: IEventRow = { id: mockEventId, name: mockEventName, Race: [mockRace] };

export const mockSingleRiderResult = {
  id: mockResultId,
  eventId: mockEventId,
  riderId: mockRiderId,
  resultTypeId: mockResultTypeId,
  noPlaceCodeTypeId: mockNoPlaceCodeId,
  lap: 1,
  place: 5,
  time: "",
  points: 10,
  event: mockEvent,
  resultType: { id: mockResultTypeId, name: "default", description: "Default Result Type" },
  noPlaceCodeType: { id: mockNoPlaceCodeId, name: "NA", description: "Participant Placed" },
};


export const mockSingleResultRow: IRiderResultsRow = {
  place: mockSingleRiderResult.place,
  time: mockSingleRiderResult.time,
  points: mockSingleRiderResult.points,
  lap: mockSingleRiderResult.lap,
  eventId: mockSingleRiderResult.eventId,
  id: mockResultId,
  riderId: mockSingleRiderResult.id,
  resultTypeId: mockSingleRiderResult.resultType.id,
  noPlaceCodeTypeId: mockSingleRiderResult.noPlaceCodeType.id,
  event: mockSingleRiderResult.event,
}

export const expectedBuildFromMockSingleRiderResult = {
  name: mockEventName,
  place: mockSingleRiderResult.place,
  time: mockSingleRiderResult.time,
  points: mockSingleRiderResult.points,
  noPlaceCode: mockSingleRiderResult.noPlaceCodeType.name,
  lap: mockSingleRiderResult.lap,
  resultType: mockSingleRiderResult.resultType.name,
  eventId: mockSingleRiderResult.eventId,
  category: mockCategory,
  racers: mockCount,
  type: mockRace.raceType.name,
  startDate: mockRace.startDate,
  endDate: mockRace.endDate,
  location: mockRace.location,
}

// export const expectedBuildFromMockSingleRiderResult = {

//   id: mockResultId,
//   riderId: mockSingleRiderResult.id,
//   resultTypeId: mockSingleRiderResult.resultType.id,
//   noPlaceCodeTypeId: mockSingleRiderResult.noPlaceCodeType.id,
// };


export const mockGetRiderResultsQueryResponse = [
  {
    id: 1028,
    eventId: 31,
    riderId: 2,
    resultTypeId: 56,
    noPlaceCodeTypeId: 56,
    lap: undefined,
    place: 5,
    time: "",
    points: 1,
    event: { id: 31, name: "Tour Barentu", Race: [mockRace] },
    resultType: { id: 56, name: "default", description: "Default Result Type" },
    noPlaceCodeType: { id: 56, name: "NA", description: "Participant Placed" },
  },
  {
    id: 142,
    eventId: 5,
    riderId: 2,
    resultTypeId: 56,
    noPlaceCodeTypeId: 56,
    lap: undefined,
    place: 32,
    time: "",
    points: 1,
    event: { id: 5, name: "Grands Prix de Jakarta", Race: [mockRace] },
    resultType: { id: 56, name: "default", description: "Default Result Type" },
    noPlaceCodeType: { id: 56, name: "NA", description: "Participant Placed" },
  },
  {
    id: 443,
    eventId: 14,
    riderId: 2,
    resultTypeId: 56,
    noPlaceCodeTypeId: 56,
    lap: undefined,
    place: 14,
    time: "",
    points: 1,
    event: { id: 14, name: "De Cobar", Race: [mockRace] },
    resultType: { id: 56, name: "default", description: "Default Result Type" },
    noPlaceCodeType: { id: 56, name: "NA", description: "Participant Placed" },
  },
];
