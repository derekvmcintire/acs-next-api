import { IRaceRepository } from "../event/database/IRaceRepository";
import { IResultRepository } from "../result/database/IResultRepository";
import { IRiderRepository } from "../result/database/IRiderRepository";

export interface IDatabaseClient {
  rider: IRiderRepository;
  result: IResultRepository;
  race: IRaceRepository;
}
