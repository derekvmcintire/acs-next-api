import { IGetRidersParams, RiderWhereInput } from "@/app/Services/rider/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class RiderDAO {
  static async getAllRiders() {
    try {
      const riders = await prisma.rider.findMany();
      return riders;
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error("Database query error");
    }
  }

  static async getRiders({
    teamName,
    country,
    name,
    ids,
    id,
  }: IGetRidersParams) {
    try {
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
      console.log("Where clause:", whereClause);
      console.log("ids is: ", ids);
      const riders = await prisma.rider.findMany({
        where: whereClause,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          country: true,
          hometown: true,
          dob: true,
          photo: true,
          strava: true,
          insta: true,
          about: true,
        },
      });

      return riders;
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error("Database query error");
    }
  }
}
