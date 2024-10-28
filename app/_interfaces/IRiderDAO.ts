import { IGetRidersParams, RiderRow } from "@/app/_types/rider/types";

export interface IRiderDAO {
  getRiders(params: IGetRidersParams): Promise<RiderRow[]>;
  getRiderById(id: number): Promise<RiderRow>;
}
