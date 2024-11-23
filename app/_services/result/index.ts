import ResultDAO from "@/app/_daos/result";
import {
  AssignCategoryToResultArgs,
  CreateResultArgs,
  IRacerHistory,
  IResult,
  IResultYear,
  TransformedRace,
} from "@/app/_types/result/types";
import { getYearFromDateString } from "@/app/_utility/helper-functions";
import { flattenResult } from "./utility/map-result";

export default class ResultService {
  constructor(private resultDao: ResultDAO) {}

  /**
   * Maps results into yearly groupings and transforms them into a structured format.
   *
   * @param results - Array of result objects to be mapped by year.
   * @returns A promise resolving to an array of yearly result groups, where each year contains its associated races.
   */
  private async mapResultsByYear(results: IResult[]): Promise<IResultYear[]> {
    const yearMap = new Map<number, TransformedRace[]>(); // Use Map for efficient grouping by year

    // Process each result, transforming it and assigning it to its corresponding year
    await Promise.all(
      results.map(async (result: IResult) => {
        const mappedResult = flattenResult(result);
        const racersCount = await this.resultDao.countResultsByEventId(
          result.eventId,
        );

        mappedResult.racers = racersCount;

        const year = getYearFromDateString(mappedResult.startDate);

        if (!yearMap.has(year)) {
          yearMap.set(year, []);
        }

        yearMap.get(year)!.push(mappedResult);
      }),
    );

    // Transform the yearMap into an array of IResultYear objects
    const resultYears: IResultYear[] = Array.from(yearMap.entries()).map(
      ([year, races]) => ({
        year,
        races,
      }),
    );

    // Sort the results by year in ascending order
    resultYears.sort((a, b) => a.year - b.year);

    return resultYears;
  }

  /**
   * Retrieves all results for a specific year.
   *
   * @param year - The year for which results are requested.
   * @returns A promise resolving to an array of results, or null if no results are found.
   */
  async getResultsForYear(year: number): Promise<IResult[] | null> {
    return (await this.resultDao.getRiderResults({ year: year })) || [];
  }

  /**
   * Retrieves results for a specific rider, grouped by year.
   *
   * @param riderId - ID of the rider whose results are being fetched.
   * @returns A promise resolving to an IRacerHistory object containing the rider's ID and grouped results.
   */
  async getResultsByRiderId(riderId: number): Promise<IRacerHistory> {
    // Fetch raw result rows for the rider
    const rows: IResult[] = await this.resultDao.getRiderResults({
      riderId: Number(riderId),
    });

    // Map results into yearly groupings
    const results = await this.mapResultsByYear(rows);

    return {
      riderId,
      results,
    };
  }

  /**
   * Retrieves all results for a specific event based on its ID.
   *
   * @param eventId - ID of the event for which results are requested.
   * @returns A promise resolving to an array of results for the event.
   */
  async getResultsByEventId(eventId: number): Promise<IResult[]> {
    return this.resultDao.getEventResults(Number(eventId));
  }

  /**
   * Retrieves a list of results for multiple events, with an optional result limit.
   *
   * @param eventIds - Array of event IDs to fetch results for.
   * @param resultLimit - Optional limit on the number of results to fetch.
   * @returns A promise resolving to an array of results for the specified events.
   */
  async getListOfResults(
    eventIds: number[],
    resultLimit?: number,
  ): Promise<IResult[]> {
    return this.resultDao.getListOfRaceResults(eventIds, resultLimit);
  }

  /**
   * Creates a new result record in the database.
   *
   * @param resultData - The data required to create the result.
   * @returns A promise resolving to the created result object.
   */
  async createResult(resultData: CreateResultArgs) {
    return this.resultDao.createResult(resultData);
  }

  /**
   * Assigns a category to a specific result by creating an association in the database.
   *
   * @param args - The arguments specifying the result ID and category ID.
   * @returns A promise resolving to the created association.
   */
  async assignCategoryToResult(args: AssignCategoryToResultArgs) {
    return this.resultDao.assignCategoryToResult(args);
  }
}
