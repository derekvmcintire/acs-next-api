import { Prisma } from "@prisma/client";
import { CreateRaceQueryArgs, RaceRow } from "./base-types";

export interface IRaceRepository {
  create(args: CreateRaceQueryArgs): Promise<RaceRow | null>;
  findMany(args: Prisma.RaceFindManyArgs): Promise<RaceRow[]>;
  findUnique(args: Prisma.RaceFindUniqueArgs): Promise<RaceRow | null>;
}
