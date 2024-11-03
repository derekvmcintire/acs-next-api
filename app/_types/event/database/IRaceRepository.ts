import { Prisma } from "@prisma/client";
import { CreateRaceQueryArgs, IRace } from "../types";

export interface IRaceRepository {
  create(args: CreateRaceQueryArgs): Promise<IRace | null>;
  findMany(args: Prisma.RaceFindManyArgs): Promise<IRace[]>;
  findUnique(args: Prisma.RaceFindUniqueArgs): Promise<IRace | null>;
}
