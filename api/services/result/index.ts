import ResultDAO from "@/api/daos/result";
import { IResult, IResultYear } from "@/api/types/result/types";
import { getYearFromDateString } from "@/api/utility/helper-functions";

export default class ResultService {
  static async #buildResult(result: any): Promise<IResult> {
    const resultCount = await ResultDAO.countResultsByEventId(result.eventId);
    console.log('getting  result: ', result)
    return {
      name: result.event.name,
      type: result.event.Race[0].raceType.name,
      startDate: result.event.Race[0].startDate,
      endDate: result.event.Race[0].endDate,
      location: result.event.Race[0].location,
      place: result.place,
      time: result.time,
      points: result.points,
      noPlaceCode: result.place > 0 ? null : result.noPlaceCodeType?.name,
      lap: result.lap,
      resultType: result.resultType.name,
      eventId: result.event.id,
      category: "1",
      racers: resultCount,
    };
  }

  static async #mapResults(results: any[]): Promise<IResultYear[]> {
    const yearMap: Record<number, IResult[]> = {};

    await Promise.all(
      results.map(async (result: IResult) => {
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

  static async getResultsForRider(riderId: number) {
    const rows = await ResultDAO.getRiderResults(Number(riderId));
    const results = await this.#mapResults(rows);
    return {
      riderId,
      results,
    };
  }
}
