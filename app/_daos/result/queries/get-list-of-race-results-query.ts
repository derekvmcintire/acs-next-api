import { Prisma } from "@prisma/client";

const riderSelectFields = {
  id: true,
  firstName: true,
  lastName: true,
  dob: true,
  country: true,
  hometown: true,
  photo: true,
  strava: true,
  insta: true,
  about: true,
};

const eventSelectFields = {
  id: true,
  name: true,
  Race: {
    select: {
      id: true,
      eventId: true,
      raceTypeId: true,
      startDate: true,
      endDate: true,
      location: true,
      raceType: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
    },
  },
};

export const getListOfResultsQueryConfig = (
  eventIds: number[],
  limit?: number,
) => ({
  where: {
    eventId: { in: eventIds },
  },
  orderBy: [
    { eventId: "asc" as Prisma.SortOrder }, // Sort by eventId first
    { place: "asc" as Prisma.SortOrder }, // Then sort by place (nulls will appear last by default)
  ],
  select: {
    id: true,
    eventId: true,
    riderId: true,
    resultTypeId: true,
    noPlaceCodeTypeId: true,
    lap: true,
    place: true,
    time: true,
    points: true,
    rider: {
      select: riderSelectFields,
    },
    event: {
      select: eventSelectFields,
    },
    resultType: {
      select: {
        id: true,
        name: true,
        description: true,
      },
    },
    noPlaceCodeType: {
      select: {
        id: true,
        name: true,
        description: true,
      },
    },
  },
  take: limit || 1000, // default to 1000 record limit
});
