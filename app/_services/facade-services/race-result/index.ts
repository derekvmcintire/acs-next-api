import EventService from "../../event";
import ResultService from "../../result";
import { GetRaceFilters, IRace } from "@/app/_types/event/types";
import { IResult } from "@/app/_types/result/types";

export type RaceResults = {
  raceId: number;
  results: IResult[];
};

export class EventResultFacadeService {
  constructor(
    private eventService: EventService,
    private resultService: ResultService,
  ) {}

  async getListOfEventsWithResults(filters: GetRaceFilters) {
    const listOfEvents = await this.eventService.getListOfRaceResults(filters);
    const eventIds = listOfEvents.map((event) => event.eventId);
    const listOfResults = await this.resultService.getListOfResults(
      eventIds,
      filters.resultLimit,
    );

    if (!listOfResults) {
      throw new Error("Unable to retrieve races with results");
    }

    return this.combineEventAndResults(listOfEvents, listOfResults);
  }

  private combineEventAndResults(
    listOfEvents: IRace[],
    listOfResults: IResult[],
  ): RaceResults[] {
    const resultsByEventId = listOfResults.reduce(
      (acc, result) => {
        if (!acc[result.eventId]) {
          acc[result.eventId] = [];
        }
        acc[result.eventId].push(result);
        return acc;
      },
      {} as Record<number, IResult[]>,
    );

    return listOfEvents.map((event) => ({
      raceId: event.id,
      results: resultsByEventId[event.eventId] || [],
    }));
  }
}
