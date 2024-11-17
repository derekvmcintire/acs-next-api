import { IRiderDAO } from "@/app/_types/rider/database/IRiderDAO";
import { IRiderRepository } from "@/app/_types/rider/database/IRiderRepository";
import {
  AssignRiderToTeamParams,
  IGetRidersParams,
  RiderRow,
} from "@/app/_types/rider/types";
import { getRiderByIdQueryConfig } from "./queries/get-rider-by-id-query";
import { getRidersQueryConfig } from "./queries/get-riders-query";

export default class RiderDAO implements IRiderDAO {
  constructor(private riderRepo: IRiderRepository) {}

  async getRiders(params: IGetRidersParams) {
    return (await this.riderRepo.findMany(
      getRidersQueryConfig(params),
    )) as RiderRow[];
  }

  async getRiderById(id: number) {
    return (await this.riderRepo.findUnique(
      getRiderByIdQueryConfig(id),
    )) as RiderRow;
  }

  // Public Class Method createRider
  async createRider(riderData: RiderRow) {
    return this.riderRepo.create({
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
  }

  async assignRiderToTeam(params: AssignRiderToTeamParams) {
    const { riderId, teamId } = params;
    return this.riderRepo.createJoin({
      data: {
        riderId: riderId,
        teamId: teamId,
      },
    });
  }
}
