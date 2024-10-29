import ResultDAO from "@/app/_daos/result";
import {
  IRacerHistory,
  IResult,
  IResultYear,
  IRiderResultsRow,
} from "@/app/_types/result/types";
import { getYearFromDateString } from "@/app/_utility/helper-functions";

export default class ResultService {
  // Constructor
  constructor(private resultDao: ResultDAO) {}

  // Private Class Method #buildResult
  async #buildResult(result: IRiderResultsRow): Promise<IResult> {
    try {
      const resultCount = await this.resultDao.countResultsByEventId(
        result.eventId,
      );

      const race =
        result?.event?.Race && result?.event?.Race[0]
          ? result?.event?.Race[0]
          : null;

      return {
        name: result?.event?.name || "",
        place: result?.place || undefined,
        time: result?.time || undefined,
        points: result?.points || 0,
        noPlaceCode:
          result?.place && result?.place > 0
            ? "NA"
            : result?.noPlaceCodeType?.name,
        lap: result?.lap || undefined,
        resultType: result?.resultType?.name || "",
        eventId: result?.event?.id || 0,
        category: "1",
        racers: resultCount,
        type: race && race?.raceType?.name ? race.raceType.name : "",
        startDate: race ? race.startDate : "",
        endDate: race && race?.endDate ? race?.endDate : undefined,
        location: race && race?.location ? race?.location : undefined,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  // Private Class Method #mapResults
  async #mapResults(results: IRiderResultsRow[]): Promise<IResultYear[]> {
    const yearMap: Record<number, IResult[]> = {};

    await Promise.all(
      results.map(async (result: IRiderResultsRow) => {
        const mappedResult = await this.#buildResult(result);
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

  // Public Class Method getResultsByRiderId
  async getResultsByRiderId(riderId: number): Promise<IRacerHistory> {
    try {
      const rows: IRiderResultsRow[] = await this.resultDao.getRiderResults(
        Number(riderId),
      );
      const results = await this.#mapResults(rows);
      return {
        riderId,
        results,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
