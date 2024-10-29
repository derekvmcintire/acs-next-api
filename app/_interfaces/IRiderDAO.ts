import { IGetRidersParams, RiderRow } from "@/app/_types/rider/types";

export interface IRiderDAO {
  getRiders(params: IGetRidersParams): Promise<RiderRow[] | null>;
  getRiderById(id: number): Promise<RiderRow | null>;
}
