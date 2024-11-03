import { IRaceRepository } from "../event/database/IRaceRepository";
import { IResultRepository } from "../result/database/IResultRepository";
import { IRiderRepository } from "../rider/database/IRiderRepository";

export interface IDatabaseClient {
  rider: IRiderRepository;
  result: IResultRepository;
  race: IRaceRepository;
}

export interface IPickTypeRow {
  id: number;
  name: string;
  description: string | null;
}
