import { Prisma } from "@prisma/client";
import {
  CreateRaceQueryArgs,
  GetRaceTotalsFilters,
  IRace,
  RaceTotals,
} from "../types";

export interface IRaceRepository {
  create(args: CreateRaceQueryArgs): Promise<IRace | null>;
  findMany(args: Prisma.RaceFindManyArgs): Promise<IRace[]>;
  findUnique(args: Prisma.RaceFindUniqueArgs): Promise<IRace | null>;
  getRaceTotalsGroupedRaw(filters: GetRaceTotalsFilters): Promise<RaceTotals[]>;
}
