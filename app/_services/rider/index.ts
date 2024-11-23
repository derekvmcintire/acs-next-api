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
import { JoinRiderTeam } from "@prisma/client";

export default class RiderService {
  constructor(private riderDao: RiderDAO) {
    // Inject the RiderDAO dependency to handle database operations.
    this.riderDao = riderDao;
  }

  /**
   * Maps a list of `RiderRow` objects (database format) to `IRider` objects (application format).
   *
   * - Converts raw database rows into structured application-ready objects.
   * - Uses `buildRider` utility for consistent transformation logic.
   *
   * @param {RiderRow[]} riders - The raw rider data from the database.
   * @returns {IRider[]} - The mapped rider objects.
   */
  _mapRiders(riders: RiderRow[]): IRider[] {
    return riders.map((rider: RiderRow) => {
      return buildRider(rider);
    });
  }

  /**
   * Calculates rider rankings for a specific year based on their results.
   *
   * - Delegates the logic to the `calculateTotalPoints` utility.
   * - Results are sorted to provide an ordered ranking.
   *
   * @param {IResult[]} allResultsForYear - The results to calculate rankings from.
   * @returns {any[]} - The sorted rider rankings (shape depends on `calculateTotalPoints`).
   */
  calculateRiderRankings(allResultsForYear: IResult[]) {
    const sortedRankings = calculateTotalPoints(allResultsForYear);
    return sortedRankings;
  }

  /**
   * Fetches a list of riders based on the given parameters.
   *
   * - Queries the database for rider data using the DAO.
   * - Maps the raw database rows to structured `IRider` objects.
   *
   * @param {IGetRidersParams} params - The filters for fetching riders.
   * @returns {Promise<IRider[]>} - A list of riders matching the filters.
   */
  async getRiders(params: IGetRidersParams): Promise<IRider[]> {
    const riders: RiderRow[] = await this.riderDao.getRiders(params);
    return this._mapRiders(riders);
  }

  /**
   * Fetches a single rider by their ID.
   *
   * - Queries the database for the rider using their unique ID.
   * - If a rider is found, maps it to the `IRider` format using `buildRider`.
   * - Returns `null` if no rider is found.
   *
   * @param {number} id - The ID of the rider to fetch.
   * @returns {Promise<IRider | null>} - The rider object or `null` if not found.
   */
  async getRiderById(id: number): Promise<IRider | null> {
    const rider: RiderRow | null = await this.riderDao.getRiderById(id);
    if (!rider) {
      return null;
    }
    return buildRider(rider);
  }

  /**
   * Creates a new rider in the database.
   *
   * - Delegates the creation logic to the DAO.
   *
   * @param {RiderRow} riderData - The data required to create the rider.
   * @returns {Promise<RiderRow | null>} - The created rider or `null` if creation fails.
   */
  async createRider(riderData: RiderRow): Promise<RiderRow | null> {
    return this.riderDao.createRider(riderData);
  }

  /**
   * Assigns a rider to a team.
   *
   * - Inserts a new entry into the `JoinRiderTeam` table to establish the relationship.
   * - Delegates the database operation to the DAO.
   *
   * @param {AssignRiderToTeamParams} data - The data needed to link the rider to the team.
   * @returns {Promise<JoinRiderTeam | null>} - The created relationship or `null` if it fails.
   */
  async assignRiderToTeam(
    data: AssignRiderToTeamParams,
  ): Promise<JoinRiderTeam | null> {
    return this.riderDao.assignRiderToTeam(data);
  }
}
