import RiderDAO from "@/app/_daos/rider";
import {
  AssignRiderToTeamParams,
  IGetRidersParams,
  IRider,
  RiderRow,
} from "../../_types/rider/types";
import { calculateTotalPoints } from "@/app/_utility/process-rankings-for-year";
import { IResult } from "@/app/_types/result/types";
import { buildRider } from "./utility";

export default class RiderService {
  constructor(private riderDao: RiderDAO) {
    this.riderDao = riderDao;
  }

  _mapRiders(riders: RiderRow[]): IRider[] {
    return riders.map((rider: RiderRow) => {
      return buildRider(rider);
    });
  }

  calculateRiderRankings(allResultsForYear: IResult[]) {
    const sortedRankings = calculateTotalPoints(allResultsForYear);
    return sortedRankings;
  }

  async getRiders(params: IGetRidersParams) {
    const riders: RiderRow[] = await this.riderDao.getRiders(params);
    return this._mapRiders(riders);
  }

  async getRiderById(id: number) {
    const rider: RiderRow | null = await this.riderDao.getRiderById(id);
    if (!rider) {
      return null;
    }
    return buildRider(rider);
  }

  async createRider(riderData: RiderRow) {
    return this.riderDao.createRider(riderData);
  }

  async assignRiderToTeam(data: AssignRiderToTeamParams) {
    return this.riderDao.assignRiderToTeam(data);
  }
}
