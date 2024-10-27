import ResultDAO from "@/app/_daos/result";
import {
  IResult,
  IResultYear,
  IRiderResultsRow,
} from "@/app/_types/result/types";
import { getYearFromDateString } from "@/app/_utility/helper-functions";

export default class ResultService {
  constructor(private resultDao: ResultDAO) {}

  async #buildResult(result: IRiderResultsRow): Promise<IResult> {
    const resultCount = await this.resultDao.countResultsByEventId(
      result.eventId,
    );
    return {
      name: result?.event?.name,
      type: result?.event?.Race[0]?.raceType?.name,
      startDate: result?.event?.Race[0]?.startDate,
      endDate: result?.event?.Race[0]?.endDate || undefined,
      location: result?.event?.Race[0]?.location || undefined,
      place: result?.place || undefined,
      time: result?.time || undefined,
      points: result?.points || 0,
      noPlaceCode:
        result?.place && result?.place > 0
          ? "NA"
          : result?.noPlaceCodeType?.name,
      lap: result?.lap || undefined,
      resultType: result?.resultType?.name,
      eventId: result?.event?.id,
      category: "1",
      racers: resultCount,
    };
  }

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

  async getResultsByRiderId(riderId: number) {
    const rows: IRiderResultsRow[] = await this.resultDao.getRiderResults(
      Number(riderId),
    );
    const results = await this.#mapResults(rows);
    return {
      riderId,
      results,
    };
  }
}