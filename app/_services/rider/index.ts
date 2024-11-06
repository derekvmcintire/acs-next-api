import RiderDAO from "@/app/_daos/rider";
import {
  AssignRiderToTeamParams,
  IGetRidersParams,
  IRider,
  RiderRow,
} from "../../_types/rider/types";
import { ITeam, JoinRiderTeamRow } from "@/app/_types/team/types";
import { calculateTotalPoints } from "@/app/_utility/process-rankings-for-year";

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
        id: row.team.id,
        url: row.team.url || "",
        description: row.team.description || "",
      };
    });
  }

  // Private Class Method #buildRider
  #buildRider(rider: RiderRow): IRider {
    const teams: ITeam[] = this.#buildRiderTeam(rider.JoinRiderTeam || []);
    const currentTeam = teams && teams.length > 0 ? teams[0]?.name : "";

    if (!rider || !rider.id) {
      throw new Error("Missing rider id");
    }

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

  calculateRankings(allResultsForYear: RiderResult[]) {
    const sortedRankings = calculateTotalPoints(allResultsForYear);
    return sortedRankings;
  }

  // Public Class Method getRiders
  async getRiders(params: IGetRidersParams) {
    try {
      const riders: RiderRow[] = await this.riderDao.getRiders(params);
      return this.#mapRiders(riders);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getRiderById(id: number) {
    try {
      const rider: RiderRow | null = await this.riderDao.getRiderById(id);
      if (!rider) {
        return null;
      }
      return this.#buildRider(rider);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async createRider(riderData: RiderRow) {
    try {
      const rider = await this.riderDao.createRider(riderData);

      return rider;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async assignRiderToTeam(data: AssignRiderToTeamParams) {
    try {
      const row = await this.riderDao.assignRiderToTeam(data);

      return row;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
