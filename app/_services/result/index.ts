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
import { calculateTotalPoints } from "@/app/_utility/process-rankings-for-year";
import { flattenResult } from "./utility/map-result";

export default class ResultService {
  constructor(private resultDao: ResultDAO) {}

  async processResults(results: IResult[]): Promise<IResultYear[]> {
    const yearMap = new Map<number, TransformedRace[]>(); // Use Map instead of Record

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

    const resultYears: IResultYear[] = Array.from(yearMap.entries()).map(
      ([year, races]) => ({
        year,
        races,
      }),
    );

    resultYears.sort((a, b) => a.year - b.year); // Sort by year in ascending order

    return resultYears;
  }

  async getResultsForYear(year: number): Promise<IResult[] | null> {
    try {
      const rankings =
        (await this.resultDao.getRiderResults({ year: year })) || [];

      return rankings;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  calculateRankings(results: IResult[]) {
    const sortedRankings = calculateTotalPoints(results);

    return sortedRankings;
  }

  async getResultsByRiderId(riderId: number): Promise<IRacerHistory> {
    try {
      const rows: IResult[] = await this.resultDao.getRiderResults({
        riderId: Number(riderId),
      });
      const results = await this.processResults(rows);

      return {
        riderId,
        results,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getResultsByEventId(eventId: number): Promise<IResult[]> {
    try {
      const results: IResult[] = await this.resultDao.getEventResults(
        Number(eventId),
      );

      return results;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async createResult(resultData: CreateResultArgs) {
    try {
      const race = this.resultDao.createResult(resultData);

      return race;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async assignCategoryToResult(args: AssignCategoryToResultArgs) {
    try {
      const result = this.resultDao.assignCategoryToResult(args);

      return result;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
