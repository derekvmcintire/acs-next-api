import { IPickTypeRow } from "../result/database/base-types";
import { BaseEvent, BaseRace, RaceRow } from "./database/base-types";

export type CreateRaceArgs = Omit<BaseEvent, "id"> & BaseRace;

export interface IRace extends RaceRow {
  raceType: IPickTypeRow;
}
