import { JoinResultCategory, Prisma } from "@prisma/client";
import { CreatedResult, IResult } from "../types";

export interface IResultRepository {
  findMany(args: Prisma.ResultFindManyArgs): Promise<IResult[]>;
  count(args: Prisma.ResultCountArgs): Promise<number | null>;
  create(args: Prisma.ResultCreateArgs): Promise<CreatedResult>;
  createJoin(
    args: Prisma.JoinResultCategoryCreateArgs,
  ): Promise<JoinResultCategory | null>;
}
