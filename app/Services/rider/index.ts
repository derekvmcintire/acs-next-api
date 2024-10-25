import RiderDAO from "@/app/DAOs/rider";
import { IGetRidersParams, IRider, RiderRow } from "./types";

export default class RiderService {
  static #buildRider(rider: RiderRow): IRider {
    const newRider: IRider = {
      id: rider.id,
      currentTeam: "Some Team",
      name: {
        first: rider.firstName || "",
        last: rider.lastName || "",
      },
      teams: [],
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
