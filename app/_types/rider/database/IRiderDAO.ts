import {
  AssignRiderToTeamParams,
  IGetRidersParams,
  RiderRow,
} from "@/app/_types/rider/types";
import { JoinRiderTeam } from "@prisma/client";

export interface IRiderDAO {
  getRiders(params: IGetRidersParams): Promise<RiderRow[] | null>;
  getRiderById(id: number): Promise<RiderRow | null>;
  createRider(riderData: RiderRow): Promise<RiderRow | null>;
  assignRiderToTeam(
    params: AssignRiderToTeamParams,
  ): Promise<JoinRiderTeam | null>;
}
