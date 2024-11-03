import { Prisma } from "@prisma/client";
import { IEvent } from "../types";

export interface IEventRepository {
  create(args: Prisma.EventCreateArgs): Promise<IEvent>;
}
