import { IGetRidersParams, RiderWhereInput } from "@/app/_types/rider/types";

const buildNameFilter = (name: string): RiderWhereInput => {
  const nameParts = name.split(" ");
  if (nameParts.length === 1) {
    // Single name part, search within firstName or lastName
    return {
      OR: [
        { firstName: { contains: nameParts[0], mode: "insensitive" } },
        { lastName: { contains: nameParts[0], mode: "insensitive" } },
      ],
    };
  } else {
    // Multiple name parts, check each part in both fields
    return {
      AND: nameParts.map((part) => ({
        OR: [
          { firstName: { contains: part, mode: "insensitive" } },
          { lastName: { contains: part, mode: "insensitive" } },
        ],
      })),
    };
  }
};

const buildWhereClause = (params: IGetRidersParams): RiderWhereInput => {
  const whereClause: RiderWhereInput = {};

  if (params.ids) {
    whereClause.id = { in: params.ids };
  }

  if (params.id) {
    whereClause.id = { in: [params.id] }; // Overrides `ids` if both are present
  }

  if (params.teamName) {
    whereClause.JoinRiderTeam = {
      some: {
        team: {
          name: {
            contains: params.teamName,
            mode: "insensitive",
          },
        },
      },
    };
  }

  if (params.country) {
    whereClause.country = params.country;
  }

  if (params.name) {
    Object.assign(whereClause, buildNameFilter(params.name));
  }

  return whereClause;
};

export const getRidersQueryConfig = (params: IGetRidersParams) => {
  return {
    where: buildWhereClause(params),
    include: {
      JoinRiderTeam: {
        include: {
          team: {
            select: {
              id: true,
              name: true,
              year: true,
              url: true,
              description: true,
            },
          },
        },
      },
    },
  };
};
