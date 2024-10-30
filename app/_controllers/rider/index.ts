import RiderDAO from "@/app/_daos/rider";
import RiderService from "@/app/_services/rider";
import { IGetRidersParams, IRider, RiderRow } from "@/app/_types/rider/types";
import databaseClient from "@/app/_database/client";

export async function getMultipleRiders(
  params: IGetRidersParams,
): Promise<IRider[]> {
  try {
    const riderDao = new RiderDAO(databaseClient.rider);
    const riderService = new RiderService(riderDao);
    const riders = await riderService.getRiders(params);

    return riders;
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function getRiderById(id: number): Promise<IRider | null> {
  try {
    const riderDao = new RiderDAO(databaseClient.rider);
    const riderService = new RiderService(riderDao);
    const rider = await riderService.getRiderById(Number(id));

    return rider;
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function createRider(riderData: RiderRow) {
  try {
    const riderDao = new RiderDAO(databaseClient.rider);
    const riderService = new RiderService(riderDao);
    const rider = await riderService.createRider(riderData);

    return rider;
  } catch (error) {
    throw new Error(String(error));
  }
}
