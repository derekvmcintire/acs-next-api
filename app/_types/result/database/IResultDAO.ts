import {
  BaseResult,
  CreatedResult,
  RiderResultRow,
} from "@/app/_types/result/database/base-types";

export interface IResultDAO {
  getRiderResults(riderId: number): Promise<RiderResultRow[] | null>;
  countResultsByEventId(eventId: number): Promise<number>;
  createResult(resultData: BaseResult): Promise<CreatedResult>;
}