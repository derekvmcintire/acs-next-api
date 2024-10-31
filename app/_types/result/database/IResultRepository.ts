import { Prisma } from "@prisma/client";
import { RiderResultRow } from "./base-types";

export interface IResultRepository {
  findMany(args: Prisma.ResultFindManyArgs): Promise<RiderResultRow[] | null>;
  count(args: Prisma.ResultCountArgs): Promise<number | null>;
}
