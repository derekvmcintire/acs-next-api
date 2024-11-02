import { BaseEvent, BaseRace } from "./database/base-types";

export type CreateRaceArgs = Omit<BaseEvent, "id"> & BaseRace;

export type GetRaceArgs = {
  name: string;
};
