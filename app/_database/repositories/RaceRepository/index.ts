import { PrismaClient, Prisma } from "@prisma/client";
import { IRaceRepository } from "@/app/_types/event/database/IRaceRepository";
import { GetRaceTotalsFilters } from "@/app/_types/event/types";
import dayjs from "dayjs";
import {
  getRaceTotalsGroupedByMonth,
  getRaceTotalsGroupedByQuarter,
  getRaceTotalsGroupedByYear,
} from "./raw-sql";

export const RaceRepository = (prisma: PrismaClient): IRaceRepository => ({
  create: (args: Prisma.RaceCreateArgs) => prisma.race.create(args),
  findMany: (args: Prisma.RaceFindManyArgs) => prisma.race.findMany(args),
  findUnique: (args: Prisma.RaceFindUniqueArgs) => prisma.race.findUnique(args),
  getRaceTotalsGroupedRaw: async (filters: GetRaceTotalsFilters) => {
    const interval =
      filters.groupBy === "month"
        ? "month"
        : filters.groupBy === "quarter"
          ? "quarter"
          : "year";

    const dateRange = filters.startDateRange
      ? {
          gte: filters.startDateRange.from,
          lte: filters.startDateRange.to,
        }
      : {
          gte: dayjs()
            .subtract(11, "month")
            .startOf("month")
            .format("YYYY-MM-DD"), // default to last 11 months, since this will also include the current month up to today
          lte: dayjs().format("YYYY-MM-DD"),
        };

    if (
      !dayjs(dateRange.gte, "YYYY-MM-DD", true).isValid() ||
      !dayjs(dateRange.lte, "YYYY-MM-DD", true).isValid()
    ) {
      throw new Error("Invalid date format in dateRange");
    }

    try {
      switch (interval) {
        case "month":
          return getRaceTotalsGroupedByMonth({ prisma, dateRange });
        case "quarter":
          return getRaceTotalsGroupedByQuarter({ prisma, dateRange });
        default:
          return getRaceTotalsGroupedByYear({ prisma, dateRange });
      }
    } catch (error) {
      throw new Error(
        `Failed to fetch race totals grouped by ${interval}: ${(error as Error).message}`,
      );
    }
  },
});
