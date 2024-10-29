import { IRacerHistory } from "@/app/_types/result/types";

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
