import RiderDAO from "@/app/_daos/rider";
import RiderService from "@/app/_services/rider";
import {
  AssignRiderToTeamParams,
  IGetRankingsParams,
  IGetRidersParams,
  IRider,
  RiderRow,
} from "@/app/_types/rider/types";
import databaseClient from "@/app/_database/get-client";
import ResultService from "@/app/_services/result";
import ResultDAO from "@/app/_daos/result";
import dayjs from "dayjs";

const getRiderService = (): RiderService => {
  const riderDao = new RiderDAO(databaseClient.rider);
  return new RiderService(riderDao);
};

const getResultService = (): ResultService => {
  const resultDao = new ResultDAO(databaseClient.result);
  return new ResultService(resultDao);
};

export async function getRankings(params: IGetRankingsParams) {
  const riderService = getRiderService();
  const resultsService = getResultService();

  const year = params.year || dayjs().year();
  const resultsForYear = await resultsService.getResultsForYear(year);

  if (!resultsForYear) {
    throw new Error(`No Results Found for Year: ${year}`);
  }

  const rankings = riderService.calculateRiderRankings(resultsForYear);

  if (params.limit) {
    return rankings.splice(0, params.limit);
  }

  return rankings;
}

export async function getMultipleRiders(
  params: IGetRidersParams,
): Promise<IRider[]> {
  const riderService = getRiderService();
  return riderService.getRiders(params);
}

export async function getRiderById(id: number): Promise<IRider | null> {
  const riderService = getRiderService();
  return riderService.getRiderById(Number(id));
}

export async function createRider(riderData: RiderRow) {
  const riderService = getRiderService();
  return riderService.createRider(riderData);
}

export async function assignRiderToTeam(data: AssignRiderToTeamParams) {
  const riderService = getRiderService();
  return riderService.assignRiderToTeam(data);
}
