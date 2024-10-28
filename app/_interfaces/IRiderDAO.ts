import { IGetRidersParams } from "@/app/_types/rider/types";

export interface IRiderDAO {
  getRiders(params: IGetRidersParams): Promise<any>;
  getRiderById(id: number): Promise<any>;
}
