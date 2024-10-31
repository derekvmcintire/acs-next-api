import { Prisma, PrismaClient } from "@prisma/client";
import { IRiderRepository } from "../_types/result/database/IRiderRepository";
import { IResultRepository } from "../_types/result/database/IResultRepository";
import { IEventRepository } from "../_types/event/database/IEventRepository";
import { IRaceRepository } from "../_types/event/database/IRaceRepository";
import { IDatabaseClient } from "../_types/database/types";

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
    };
  }

  get event(): IEventRepository {
    return {
      create: (args: Prisma.EventCreateArgs) => this.prisma.event.create(args),
    };
  }

  get race(): IRaceRepository {
    return {
      create: (args: Prisma.RaceCreateArgs) => this.prisma.race.create(args),
    };
  }
}
