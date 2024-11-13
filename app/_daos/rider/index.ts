import { getDatabaseQueryErrorMessage } from "@/app/_constants/errors";
import { IRiderDAO } from "@/app/_types/rider/database/IRiderDAO";
import { IRiderRepository } from "@/app/_types/rider/database/IRiderRepository";
import {
  AssignRiderToTeamParams,
  IGetRidersParams,
  RiderRow,
  RiderWhereInput,
} from "@/app/_types/rider/types";

export default class RiderDAO implements IRiderDAO {
  // Constructor
  constructor(private riderRepo: IRiderRepository) {}

  #buildNameFilter(name: string): RiderWhereInput {
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
  }

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
        some: {
          team: {
            name: {
              contains: teamName,
              mode: "insensitive",
            },
          },
        },
      },
    }),
    country: (country) => ({ country: country }),
    name: (name) => this.#buildNameFilter(name),
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
      const riders = (await this.riderRepo.findMany({
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
      })) as RiderRow[];
      return riders;
    } catch (error) {
      throw new Error(getDatabaseQueryErrorMessage((error as Error).message));
    }
  }

  // Public Class Method getRiderById
  async getRiderById(id: number) {
    try {
      const rider = (await this.riderRepo.findUnique({
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
      })) as RiderRow;
      return rider;
    } catch (error) {
      throw new Error(getDatabaseQueryErrorMessage((error as Error).message));
    }
  }

  // Public Class Method createRider
  async createRider(riderData: RiderRow) {
    try {
      const newRider = await this.riderRepo.create({
        data: {
          firstName: riderData.firstName,
          lastName: riderData.lastName,
          dob: riderData.dob,
          country: riderData.country,
          hometown: riderData.hometown,
          photo: riderData.photo,
          strava: riderData.strava,
          insta: riderData.insta,
          about: riderData.about,
        },
      });

      return newRider;
    } catch (error) {
      throw new Error(getDatabaseQueryErrorMessage((error as Error).message));
    }
  }

  async assignRiderToTeam(params: AssignRiderToTeamParams) {
    const { riderId, teamId } = params;
    try {
      const newJoin = await this.riderRepo.createJoin({
        data: {
          riderId: riderId,
          teamId: teamId,
        },
      });
      return newJoin;
    } catch (error) {
      throw new Error(getDatabaseQueryErrorMessage((error as Error).message));
    }
  }
}
