import { Prisma } from "@prisma/client";
import { CreatedResult, RiderResultRow } from "./base-types";

export interface IResultRepository {
  findMany(args: Prisma.ResultFindManyArgs): Promise<RiderResultRow[] | null>;
  count(args: Prisma.ResultCountArgs): Promise<number | null>;
  create(args: Prisma.ResultCreateArgs): Promise<CreatedResult>;
}
