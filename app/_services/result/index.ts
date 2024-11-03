import { mockCategory } from "@/app/_constants/mock-data/result/mock-values";
import ResultDAO from "@/app/_daos/result";
import {
  BaseResult,
  RiderResultRow,
} from "@/app/_types/result/database/base-types";
import { IRacerHistory, IResult, IResultYear } from "@/app/_types/result/types";
import { getYearFromDateString } from "@/app/_utility/helper-functions";

export default class ResultService {
  // Constructor
  constructor(private resultDao: ResultDAO) {}

  // Class Method buildResult
  async buildResult(result: RiderResultRow): Promise<IResult> {
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
  async mapResults(results: RiderResultRow[]): Promise<IResultYear[]> {
    const yearMap: Record<number, IResult[]> = {};

    await Promise.all(
      results.map(async (result: RiderResultRow) => {
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

  // Class Method getResultsByRiderId
  async getResultsByRiderId(riderId: number): Promise<IRacerHistory> {
    try {
      const rows: RiderResultRow[] = await this.resultDao.getRiderResults(
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

  async createResult(resultData: BaseResult) {
    try {
      const race = this.resultDao.createResult(resultData);
      return race;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
