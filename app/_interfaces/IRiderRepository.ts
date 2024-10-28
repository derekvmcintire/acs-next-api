import { Prisma } from "@prisma/client";
import { RiderRow } from "../_types/rider/types";

export interface IRiderRepository {
  findMany(args: Prisma.RiderFindManyArgs): Promise<RiderRow[]>;
  findUnique(args: Prisma.RiderFindUniqueArgs): Promise<RiderRow>;
}
