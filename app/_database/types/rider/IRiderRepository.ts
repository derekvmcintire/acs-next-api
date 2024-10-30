import { Prisma } from "@prisma/client";
import { RiderRow } from "../../../_types/rider/types";

export interface IRiderRepository {
  findMany(args: Prisma.RiderFindManyArgs): Promise<RiderRow[] | null>;
  findUnique(args: Prisma.RiderFindUniqueArgs): Promise<RiderRow | null>;
  create(args: Prisma.RiderCreateArgs): Promise<RiderRow | null>;
}
