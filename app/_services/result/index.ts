import { mockCategory } from "@/app/_constants/mock-data/result/mock-values";
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

export default class ResultService {
  constructor(private resultDao: ResultDAO) {}

  // Class Method buildResult
  async buildResult(result: IResult): Promise<TransformedRace> {
    const { eventId } = result;

    if (!eventId) {
      throw new Error("Can not count results without eventId");
    }
    try {
      const resultCount = await this.resultDao.countResultsByEventId(eventId);

      const race =
        result?.event?.Race && result?.event?.Race[0]
          ? result?.event?.Race[0]
          : null;

      const build = {
        id: race?.id,
        name: result?.event?.name || "",
        place: result?.place || undefined,
        time: result?.time || "",
        points: result?.points || 0,
        noPlaceCode:
          result?.place && result?.place > 0
            ? "NA"
            : result?.noPlaceCodeType?.name,
        lap: result?.lap || undefined,
        resultType: result?.resultType?.name || "",
        eventId: result?.event?.id || 0,
        category: mockCategory,
        racers: resultCount,
        type: race && race?.raceType?.name ? race.raceType.name : "",
        startDate: race ? race.startDate : "",
        endDate: race && race?.endDate ? race?.endDate : null,
        location: race && race?.location ? race?.location : null,
      };

      return build;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  // Class Method mapResults
  async mapResults(results: IResult[]): Promise<IResultYear[]> {
    const yearMap: Record<number, TransformedRace[]> = {};

    await Promise.all(
      results.map(async (result: IResult) => {
        const mappedResult = await this.buildResult(result);
        const year = getYearFromDateString(mappedResult.startDate);

        if (!yearMap[year]) {
          yearMap[year] = [];
        }
        yearMap[year].push(mappedResult);
      }),
    );

    const resultYears: IResultYear[] = Object.keys(yearMap).map((year) => ({
      year: Number(year),
      races: yearMap[Number(year)],
    }));

    resultYears.sort((a, b) => a.year - b.year);

    return resultYears;
  }

  async getResultsForYear(year: number): Promise<IResult[] | null> {
    try {
      const rankings = (await this.resultDao.getResultsForYear(year)) || [];
      return rankings;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  calculateRankings(allResultsForYear: IResult[]) {
    const sortedRankings = calculateTotalPoints(allResultsForYear);
    return sortedRankings;
  }

  // Class Method getResultsByRiderId
  async getResultsByRiderId(riderId: number): Promise<IRacerHistory> {
    try {
      const rows: IResult[] = await this.resultDao.getRiderResults(
        Number(riderId),
      );
      const results = await this.mapResults(rows);
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
