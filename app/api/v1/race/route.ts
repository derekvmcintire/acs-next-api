import { NextRequest, NextResponse } from "next/server";
import { getInternalServerErrorMessage } from "@/app/_constants/errors";
import { createRace } from "@/app/_controllers/event";
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
