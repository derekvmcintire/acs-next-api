import { IGetRidersParams, RiderWhereInput } from "@/app/_types/rider/types";
import { PrismaClient } from "@prisma/client";

export default class RiderDAO {
  // Constructor
  constructor(private prisma: PrismaClient) {}

  // Private Class Property #filterHandlers
  #filterHandlers: {
    ids?: (value: number[]) => RiderWhereInput;
    id?: (value: number) => RiderWhereInput;
    teamName?: (value: string) => RiderWhereInput;
    country?: (value: string) => RiderWhereInput;
    name?: (value: string) => RiderWhereInput;
  } = {
    ids: (ids) => ({ id: { in: ids } }),
    id: (id) => ({ id: { in: [id] } }),
    teamName: (teamName) => ({
      JoinRiderTeam: {
        some: { team: { name: teamName } },
      },
    }),
    country: (country) => ({ country: country }),
    name: (name) => ({
      OR: [
        { firstName: { contains: name, mode: "insensitive" } },
        { lastName: { contains: name, mode: "insensitive" } },
      ],
    }),
  };

  // Private Class Method #buildWhereClause
  #buildWhereClause(params: IGetRidersParams): RiderWhereInput {
    const whereClause: RiderWhereInput = {};

    Object.entries(params).forEach(([key, value]) => {
      const typedKey = key as keyof IGetRidersParams;
      const handler = this.#filterHandlers[typedKey];

      if (handler && value !== undefined) {
        const filterCondition = handler(value as never);
        Object.assign(whereClause, filterCondition);
      }
    });

    return whereClause;
  }

  // Public Class Method getRiders
  async getRiders(params: IGetRidersParams) {
    try {
      const riders = await this.prisma.rider.findMany({
        where: this.#buildWhereClause(params),
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
      });

      return riders;
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error("Database query error");
    }
  }

  // Public Class Method getRiderById
  async getRiderById(id: number) {
    try {
      const rider = await this.prisma.rider.findUnique({
        where: { id: id },
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
      });

      return rider;
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error("Database query error");
    }
  }
}
