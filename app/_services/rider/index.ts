import RiderDAO from "@/app/_daos/rider";
import {
  IGetRidersParams,
  IRider,
  ITeam,
  JoinRiderTeamRow,
  RiderRow,
} from "../../_types/rider/types";

export default class RiderService {
  // Constructor
  constructor(private riderDao: RiderDAO) {
    this.riderDao = riderDao;
  }

  // Private Class Method #buildRiderTeam
  #buildRiderTeam(teams: JoinRiderTeamRow[]): ITeam[] {
    return teams.map((row: JoinRiderTeamRow) => {
      return {
        year: row.team.year,
        name: row.team.name,
      };
    });
  }

  // Private Class Method #buildRider
  #buildRider(rider: RiderRow): IRider {
    const teams: ITeam[] = this.#buildRiderTeam(rider.JoinRiderTeam || []);
    const currentTeam = teams && teams.length > 0 ? teams[0]?.name : "";
    const newRider: IRider = {
      id: rider.id,
      currentTeam: currentTeam,
      name: {
        first: rider.firstName || "",
        last: rider.lastName || "",
      },
      teams,
      socials: {
        strava: rider.strava || "",
        insta: rider.insta || "",
      },
      categories: [{ discipline: "road", category: 1 }],
      hometown: {
        country: rider.country,
        city: rider.hometown,
      },
      dob: rider.dob || "",
      photo: rider.photo || "",
      wins: 43,
    };
    return newRider;
  }

  // Private Class Method #mapRiders
  #mapRiders(riders: RiderRow[]): IRider[] {
    return riders.map((rider: RiderRow) => {
      return this.#buildRider(rider);
    });
  }

  // Public Class Method getRiders
  async getRiders(params: IGetRidersParams) {
    const riders: RiderRow[] = await this.riderDao.getRiders(params);
    return this.#mapRiders(riders);
  }
}
