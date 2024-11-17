import { GetRaceFilters, RaceWhereInput } from "@/app/_types/event/types";

const buildRaceWhereClause = (filters: GetRaceFilters) => {
  const where: RaceWhereInput = {};

  if (filters.eventName) {
    const nameParts = filters.eventName.split(" ");
    where.event = {
      AND: nameParts.map((name) => ({
        name: { contains: name, mode: "insensitive" },
      })),
    };
  }

  if (filters.eventId) where.eventId = filters.eventId;
  if (filters.ids && filters.ids.length > 0) {
    where.id = { in: filters.ids };
  }
  if (filters.location) {
    where.location = { contains: filters.location, mode: "insensitive" };
  }
  if (filters.startDateRange) {
    where.startDate = {
      gte: filters.startDateRange.from,
      lte: filters.startDateRange.to,
    };
  }

  return where;
};

export const getListOfRacesQueryConfig = (filters: GetRaceFilters) => {
  const where = buildRaceWhereClause(filters);
  const orderBy = filters.orderBy
    ? { [filters.orderBy.column]: filters.orderBy.direction }
    : undefined;

  return {
    where,
    orderBy,
    include: { event: true, raceType: true },
    take: filters.limit,
  };
};
