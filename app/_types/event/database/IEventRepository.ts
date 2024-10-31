import { Prisma } from "@prisma/client";
import { BaseEvent } from "./base-types";

export interface IEventRepository {
  create(args: Prisma.EventCreateArgs): Promise<BaseEvent>;
}
