import { EventRow } from "@/app/_types/event/types";
import { Prisma } from "@prisma/client";

export interface IEventRepository {
  create(args: Prisma.EventCreateArgs): Promise<EventRow | null>;
}
