import { Prisma } from "@prisma/client";
import { CreatedResult, IResult } from "../types";

export interface IResultRepository {
  findMany(args: Prisma.ResultFindManyArgs): Promise<IResult[] | null>;
  count(args: Prisma.ResultCountArgs): Promise<number | null>;
  create(args: Prisma.ResultCreateArgs): Promise<CreatedResult>;
}
