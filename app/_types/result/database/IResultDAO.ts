import { JoinResultCategory } from "@prisma/client";
import {
  AssignCategoryToResultArgs,
  CreateResultArgs,
  CreatedResult,
  IResult,
} from "../types";

export interface IResultDAO {
  getRiderResults(riderId: number): Promise<IResult[] | null>;
  countResultsByEventId(eventId: number): Promise<number>;
  createResult(resultData: CreateResultArgs): Promise<CreatedResult>;
  assignCategoryToResult(
    params: AssignCategoryToResultArgs,
  ): Promise<JoinResultCategory | null>;
}
