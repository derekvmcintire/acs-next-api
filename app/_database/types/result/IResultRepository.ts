import { Prisma } from "@prisma/client";
import { IRiderResultsRow } from "../../../_types/result/types";

export interface IResultRepository {
  findMany(args: Prisma.ResultFindManyArgs): Promise<IRiderResultsRow[] | null>;
  count(args: Prisma.ResultCountArgs): Promise<number | null>;
}
