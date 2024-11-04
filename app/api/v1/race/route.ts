import { NextRequest, NextResponse } from "next/server";
import { getInternalServerErrorMessage } from "@/app/_constants/errors";
import { createRace, getRace } from "@/app/_controllers/event";
import { CreateRaceArgs, GetRaceFilters } from "@/app/_types/event/types";

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
      { error: getInternalServerErrorMessage(String(error)) },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  const filters: GetRaceFilters = {
    eventName: request.nextUrl.searchParams.get("name") || undefined,
    id: Number(request.nextUrl.searchParams.get("id")) || undefined,
    location: request.nextUrl.searchParams.get("location") || undefined,
  };

  const from = request.nextUrl.searchParams.get("from") || undefined;
  const to = request.nextUrl.searchParams.get("to") || undefined;

  if (to && from) {
    filters.startDateRange = { from: from, to: to };
 q  }

  try {
    const row = await getRace(filters);

    return NextResponse.json(row, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getInternalServerErrorMessage(String(error)) },
      { status: 500 },
    );
  }
}
