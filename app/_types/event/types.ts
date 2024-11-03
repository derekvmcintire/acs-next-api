import { BaseEvent, BaseRace } from "./database/base-types";

// export type CreateRaceArgs = Omit<BaseEvent, "id"> & BaseRace;
export interface CreateRaceArgs extends Omit<BaseEvent, "id">, BaseRace {
  eventId?: number;
}

export type GetRaceArgs = {
  name: string;
};
