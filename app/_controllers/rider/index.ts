import RiderDAO from "@/app/_daos/rider";
import RiderService from "@/app/_services/rider";
import {
  AssignRiderToTeamParams,
  IGetRidersParams,
  IRider,
  RiderRow,
} from "@/app/_types/rider/types";
import databaseClient from "@/app/_database/get-client";

const getRiderService = (): RiderService => {
  const riderDao = new RiderDAO(databaseClient.rider);
  return new RiderService(riderDao);
};

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
