import { NextRequest, NextResponse } from "next/server";
import { getInternalServerErrorMessage } from "@/app/_constants/errors";
import { createRace, getRaceByName } from "@/app/_controllers/event";
import { CreateRaceArgs } from "@/app/_types/event/types";

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
  const { name } = {
    name: request.nextUrl.searchParams.get("name") || undefined,
  };

  if (!name) {
    return NextResponse.json(
      { error: "Bad Request, missing name" },
      { status: 400 },
    );
  }

  try {
    const row = await getRaceByName(name);

    return NextResponse.json(row, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getInternalServerErrorMessage(String(error)) },
      { status: 500 },
    );
  }
}
