import { Prisma, PrismaClient } from "@prisma/client";

export interface IDatabaseClient {
  rider: {
    findMany(args: Prisma.RiderFindManyArgs): Promise<any>;
    findUnique(args: Prisma.RiderFindUniqueArgs): Promise<any>;
  };
  result: {
    findMany(args: Prisma.ResultFindManyArgs): Promise<any>;
    findUnique(args: Prisma.ResultFindUniqueArgs): Promise<any>;
    count(args: Prisma.ResultCountArgs): Promise<number>; // Include the count method
  };
}

export class PrismaDatabaseClient implements IDatabaseClient {
  constructor(private prisma: PrismaClient) {}

  get rider() {
    return this.prisma.rider;
  }

  get result() {
    return this.prisma.result;
  }
}
