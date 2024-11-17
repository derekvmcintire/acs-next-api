import { NextRequest, NextResponse } from "next/server";
import { getInternalServerErrorMessage } from "@/app/_constants/errors";
import {
  createRace,
  getRace as getListOfRaces,
} from "@/app/_controllers/event";
import {
  CreateRaceArgs,
  GetRaceFilters,
  IRace,
} from "@/app/_types/event/types";
import { Race } from "@prisma/client";

export async function POST(request: NextRequest) {
  const { name, raceTypeId, startDate, endDate, location }: CreateRaceArgs =
    await request.json();

  try {
    const row = await createRace({
      name,
      raceTypeId: Number(raceTypeId),
      startDate,
      endDate,
      location,
    });
    return NextResponse.json(row, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getInternalServerErrorMessage(`${(error as Error).message}`) },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  const ids = request.nextUrl.searchParams.get("ids");
  //@TODO: ensure orderBy is an accepted column
  const orderBy = request.nextUrl.searchParams.get("orderby") || undefined;
  const direction = request.nextUrl.searchParams.get("direction") || undefined;

  const filters: GetRaceFilters = {
    ids: ids ? ids.split(",").map(Number) : undefined,
    eventName: request.nextUrl.searchParams.get("name") || undefined,
    eventId: Number(request.nextUrl.searchParams.get("eventid")) || undefined,
    location: request.nextUrl.searchParams.get("location") || undefined,
    limit: Number(request.nextUrl.searchParams.get("limit")) || undefined,
    orderBy:
      orderBy && direction
        ? {
            column: orderBy as keyof Race,
            direction: direction as "asc" | "desc",
          }
        : undefined,
  };

  const from = request.nextUrl.searchParams.get("from") || undefined;
  const to = request.nextUrl.searchParams.get("to") || undefined;

  if (to && from) {
    filters.startDateRange = { from: from, to: to };
  }

  try {
    const row: IRace[] = await getListOfRaces(filters);

    return NextResponse.json(row, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getInternalServerErrorMessage(`${(error as Error).message}`) },
      { status: 500 },
    );
  }
}
