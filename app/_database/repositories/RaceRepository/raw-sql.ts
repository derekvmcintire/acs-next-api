import { RaceTotals } from "@/app/_types/event/types";
import { PrismaClient } from "@prisma/client";

type GetGroupedRaceTotalsParams = {
  prisma: PrismaClient;
  dateRange: {
    gte: string;
    lte: string;
  };
};

// Grouped By Month
export const getRaceTotalsGroupedByMonth = async ({
  prisma,
  dateRange,
}: GetGroupedRaceTotalsParams): Promise<RaceTotals[]> =>
  await prisma.$queryRaw`
  SELECT
      DATE_TRUNC('month', TO_DATE("Race"."startDate", 'YYYY-MM-DD')) AS "startDate",
      COUNT(DISTINCT "Race".id)::INTEGER AS "totalRaces",
      COUNT("Result".id)::INTEGER AS "totalRiders"
  FROM "Race"
  LEFT JOIN "Result" ON "Race"."eventId" = "Result"."eventId"
  WHERE TO_DATE("Race"."startDate", 'YYYY-MM-DD') BETWEEN TO_DATE(${dateRange.gte}, 'YYYY-MM-DD') AND TO_DATE(${dateRange.lte}, 'YYYY-MM-DD')
  GROUP BY DATE_TRUNC('month', TO_DATE("Race"."startDate", 'YYYY-MM-DD'))
  ORDER BY DATE_TRUNC('month', TO_DATE("Race"."startDate", 'YYYY-MM-DD')) ASC;
  `;

// Grouped By Quarter
export const getRaceTotalsGroupedByQuarter = async ({
  prisma,
  dateRange,
}: GetGroupedRaceTotalsParams): Promise<RaceTotals[]> =>
  await prisma.$queryRaw`
  SELECT
      DATE_TRUNC('quarter', TO_DATE("Race"."startDate", 'YYYY-MM-DD')) AS "startDate",
      COUNT(DISTINCT "Race".id)::INTEGER AS "totalRaces",
      COUNT("Result".id)::INTEGER AS "totalRiders"
  FROM "Race"
  LEFT JOIN "Result" ON "Race"."eventId" = "Result"."eventId"
  WHERE TO_DATE("Race"."startDate", 'YYYY-MM-DD') BETWEEN TO_DATE(${dateRange.gte}, 'YYYY-MM-DD') AND TO_DATE(${dateRange.lte}, 'YYYY-MM-DD')
  GROUP BY DATE_TRUNC('quarter', TO_DATE("Race"."startDate", 'YYYY-MM-DD'))
  ORDER BY DATE_TRUNC('quarter', TO_DATE("Race"."startDate", 'YYYY-MM-DD')) ASC;
  `;

// Grouped By Year
export const getRaceTotalsGroupedByYear = async ({
  prisma,
  dateRange,
}: GetGroupedRaceTotalsParams): Promise<RaceTotals[]> =>
  await prisma.$queryRaw`
  SELECT
      DATE_TRUNC('year', TO_DATE("Race"."startDate", 'YYYY-MM-DD')) AS "startDate",
      COUNT(DISTINCT "Race".id)::INTEGER AS "totalRaces",
      COUNT("Result".id)::INTEGER AS "totalRiders"
  FROM "Race"
  LEFT JOIN "Result" ON "Race"."eventId" = "Result"."eventId"
  WHERE TO_DATE("Race"."startDate", 'YYYY-MM-DD') BETWEEN TO_DATE(${dateRange.gte}, 'YYYY-MM-DD') AND TO_DATE(${dateRange.lte}, 'YYYY-MM-DD')
  GROUP BY DATE_TRUNC('year', TO_DATE("Race"."startDate", 'YYYY-MM-DD'))
  ORDER BY DATE_TRUNC('year', TO_DATE("Race"."startDate", 'YYYY-MM-DD')) ASC;
  `;
