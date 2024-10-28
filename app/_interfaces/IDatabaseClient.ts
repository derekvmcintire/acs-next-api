import { Prisma, PrismaClient } from "@prisma/client";

export interface IDatabaseClient {
  rider: {
    findMany(args: Prisma.RiderFindManyArgs): Promise<any>;
    findUnique(args: Prisma.RiderFindUniqueArgs): Promise<any>;
  };
}

export class PrismaDatabaseClient implements IDatabaseClient {
  constructor(private prisma: PrismaClient) {}

  get rider() {
    return this.prisma.rider;
  }
}
