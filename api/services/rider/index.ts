import RiderDAO from "@/api/daos/rider";
import {
  IGetRidersParams,
  IRider,
  JoinRiderTeamRow,
  RiderRow,
} from "../../types/rider/types";

export default class RiderService {
  static #buildRiderTeam(teams: JoinRiderTeamRow[]) {
    return teams.map((row: JoinRiderTeamRow) => {
      return {
        year: row.team.year,
        name: row.team.name,
      };
    });
  }

  static #buildRider(rider: RiderRow): IRider {
    const teams = this.#buildRiderTeam(rider.JoinRiderTeam || []);
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

  static #mapRiders(riders: RiderRow[]) {
    return riders.map((rider: RiderRow) => {
      return this.#buildRider(rider);
    });
  }

  static async getRiders(params: IGetRidersParams) {
    const riders: RiderRow[] = await RiderDAO.getRiders(params);
    return this.#mapRiders(riders);
  }
}
