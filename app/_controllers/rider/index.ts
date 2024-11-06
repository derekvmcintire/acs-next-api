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
  try {
    const riderService = getRiderService();
    const resultsService = getResultService();

    const year = params.year || dayjs().year();
    const resultsForYear = await resultsService.getResultsForYear(year);
    if (!resultsForYear) {
      throw new Error(`No Results Found for Year: ${year}`);
    }
    const rankings = riderService.calculateRankings(resultsForYear);

    return rankings;
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function getMultipleRiders(
  params: IGetRidersParams,
): Promise<IRider[]> {
  try {
    const riderService = getRiderService();
    const riders = await riderService.getRiders(params);

    return riders;
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function getRiderById(id: number): Promise<IRider | null> {
  try {
    const riderService = getRiderService();
    const rider = await riderService.getRiderById(Number(id));

    return rider;
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function createRider(riderData: RiderRow) {
  try {
    const riderService = getRiderService();
    const rider = await riderService.createRider(riderData);

    return rider;
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function assignRiderToTeam(data: AssignRiderToTeamParams) {
  try {
    const riderService = getRiderService();
    const row = await riderService.assignRiderToTeam(data);

    return row;
  } catch (error) {
    throw new Error(String(error));
  }
}
