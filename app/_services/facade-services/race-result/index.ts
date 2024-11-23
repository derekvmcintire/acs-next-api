import EventService from "../../event";
import ResultService from "../../result";
import { GetRaceFilters, IRace } from "@/app/_types/event/types";
import { IResult } from "@/app/_types/result/types";

export type RaceResults = {
  raceId: number;
  results: IResult[];
};

export class EventResultFacadeService {
  /**
   * Combines functionality from EventService and ResultService to retrieve
   * a list of races (events) along with their corresponding results.
   *
   * - Acts as a facade, consolidating operations that span multiple services.
   * - Simplifies client code by hiding the complexity of interacting with multiple layers.
   *
   * @param eventService - Service to handle event-related operations.
   * @param resultService - Service to handle result-related operations.
   */
  constructor(
    private eventService: EventService,
    private resultService: ResultService,
  ) {}

  /**
   * Fetches a list of events and their corresponding results.
   *
   * - Retrieves events based on the provided filters.
   * - Fetches results for the retrieved events, applying a result limit if provided.
   * - Combines the events and results into a structured format.
   *
   * @param filters - Filters for retrieving races (events).
   * @returns - A list of events with their results.
   * @throws - If results cannot be retrieved.
   */
  async getListOfEventsWithResults(
    filters: GetRaceFilters,
  ): Promise<RaceResults[]> {
    // Fetch a list of events (races) that match the given filters.
    const listOfEvents = await this.eventService.getListOfRaceResults(filters);

    // Extract event IDs to use for fetching corresponding results.
    const eventIds = listOfEvents.map((event) => event.eventId);

    // Fetch results for the retrieved events, applying any result limits.
    const listOfResults = await this.resultService.getListOfResults(
      eventIds,
      filters.resultLimit,
    );

    if (!listOfResults) {
      // Handle the case where results couldn't be retrieved.
      throw new Error("Unable to retrieve races with results");
    }

    // Combine the events and their results into a single structured response.
    return this.combineEventAndResults(listOfEvents, listOfResults);
  }

  /**
   * Combines a list of events with their corresponding results.
   *
   * - Groups results by their associated event ID.
   * - Maps each event to its results using a structured format.
   * - Ensures events without results are still included, with an empty results array.
   *
   * @param listOfEvents - The list of events (races) to combine.
   * @param listOfResults - The list of results to associate with the events.
   * @returns - A combined list of events and their results.
   */
  private combineEventAndResults(
    listOfEvents: IRace[],
    listOfResults: IResult[],
  ): RaceResults[] {
    // Group results by event ID for quick lookup.
    const resultsByEventId = listOfResults.reduce(
      (acc, result) => {
        // Initialize an array for the event ID if it doesn't already exist.
        if (!acc[result.eventId]) {
          acc[result.eventId] = [];
        }
        // Add the result to the appropriate event ID group.
        acc[result.eventId].push(result);
        return acc;
      },
      {} as Record<number, IResult[]>,
    );

    // Map each event to its associated results, or an empty array if none exist.
    return listOfEvents.map((event) => ({
      raceId: event.id,
      results: resultsByEventId[event.eventId] || [],
    }));
  }
}
