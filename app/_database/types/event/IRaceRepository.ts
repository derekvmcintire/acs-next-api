import { RaceRow } from "@/app/_types/event/types";
import { Prisma } from "@prisma/client";

export interface IRaceRepository {
  create(args: Prisma.RaceCreateArgs): Promise<RaceRow | null>;
}
