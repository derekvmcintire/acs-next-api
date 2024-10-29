import { IRiderResultsRow } from "@/app/_types/result/types";

export interface IResultDAO {
  getRiderResults(riderId: number): Promise<IRiderResultsRow[] | null>;
  countResultsByEventId(eventId: number): Promise<number>;
}
