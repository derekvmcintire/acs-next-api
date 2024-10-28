import { Prisma, PrismaClient } from "@prisma/client";
import { IRiderRepository } from "./IRiderRepository";
import { IResultRepository } from "./IResultRepository";

export interface IDatabaseClient {
  rider: IRiderRepository;
  result: IResultRepository;
}

export class PrismaDatabaseClient implements IDatabaseClient {
  constructor(private prisma: PrismaClient) {}

  get rider(): IRiderRepository {
    return {
      findMany: (args: Prisma.RiderFindManyArgs) =>
        this.prisma.rider.findMany(args),
      findUnique: (args: Prisma.RiderFindUniqueArgs) =>
        this.prisma.rider.findUnique(args),
    };
  }

  get result(): IResultRepository {
    return {
      findMany: (args: Prisma.ResultFindManyArgs) =>
        this.prisma.result.findMany(args),
      count: (args: Prisma.ResultCountArgs) => this.prisma.result.count(args),
    };
  }
}
