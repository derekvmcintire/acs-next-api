import { Prisma } from "@prisma/client";
import { EventRow } from "./base-types";

export interface IEventRepository {
  create(args: Prisma.EventCreateArgs): Promise<EventRow | null>;
}
