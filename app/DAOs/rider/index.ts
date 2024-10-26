import { IGetRidersParams, RiderWhereInput } from "@/app/Services/rider/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class RiderDAO {
  static #buildWhereClause(params: IGetRidersParams) {
    const { teamName, country, name, ids, id } = params;

    const whereClause: RiderWhereInput = {};

    if (ids && ids.length > 0) {
      whereClause.id = { in: ids };
    } else if (id) {
      whereClause.id = { in: [id] };
    }

    if (teamName) {
      whereClause.JoinRiderTeam = {
        some: {
          team: {
            name: teamName,
          },
        },
      };
    }

    if (country) {
      whereClause.country = country;
    }

    if (name) {
      whereClause.OR = [
        { firstName: { contains: name, mode: "insensitive" } },
        { lastName: { contains: name, mode: "insensitive" } },
      ];
    }

    return whereClause;
  }

  static async getRiders(params: IGetRidersParams) {
    try {
      const riders = await prisma.rider.findMany({
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
}
