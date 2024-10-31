import { CreateRaceQueryArgs, RaceRow } from "./base-types";

export interface IRaceRepository {
  create(args: CreateRaceQueryArgs): Promise<RaceRow | null>;
}
