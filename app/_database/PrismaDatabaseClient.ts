import { Prisma, PrismaClient } from "@prisma/client";
import { IRiderRepository } from "../_types/rider/database/IRiderRepository";
import { IResultRepository } from "../_types/result/database/IResultRepository";
import { IEventRepository } from "../_types/event/database/IEventRepository";
import { IDatabaseClient } from "../_types/database/types";
import { ICategoryRepository } from "../_types/category/database/ICategoryRepository";
import { RaceRepository } from "./repositories/RaceRepository";

export class PrismaDatabaseClient implements IDatabaseClient {
  constructor(private prisma: PrismaClient) {}

  get rider(): IRiderRepository {
    return {
      findMany: (args: Prisma.RiderFindManyArgs) =>
        this.prisma.rider.findMany(args),
      findUnique: (args: Prisma.RiderFindUniqueArgs) =>
        this.prisma.rider.findUnique(args),
      create: (args: Prisma.RiderCreateArgs) => this.prisma.rider.create(args),
      createJoin: (args: Prisma.JoinRiderTeamCreateArgs) =>
        this.prisma.joinRiderTeam.create(args),
    };
  }

  get result(): IResultRepository {
    return {
      findMany: (args: Prisma.ResultFindManyArgs) =>
        this.prisma.result.findMany(args),
      count: (args: Prisma.ResultCountArgs) => this.prisma.result.count(args),
      create: (args: Prisma.ResultCreateArgs) =>
        this.prisma.result.create(args),
      createJoin: (args: Prisma.JoinResultCategoryCreateArgs) =>
        this.prisma.joinResultCategory.create(args),
    };
  }

  get event(): IEventRepository {
    return {
      create: (args: Prisma.EventCreateArgs) => this.prisma.event.create(args),
    };
  }

  get race() {
    return RaceRepository(this.prisma);
  }

  get category(): ICategoryRepository {
    return {
      findMany: () => this.prisma.category.findMany(),
    };
  }
}
