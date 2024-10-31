import { NextRequest, NextResponse } from "next/server";
import { createResult, getResultsByRiderId } from "@/app/_controllers/result";
import {
  getInternalServerErrorMessage,
  getResultsNotFoundErrorMessage,
} from "@/app/_constants/errors";
import { BaseResult } from "@/app/_types/result/database/base-types";

export async function GET(request: NextRequest) {
  const riderId = request.nextUrl.searchParams.get("riderId");

  try {
    const results = await getResultsByRiderId(Number(riderId));
    if (results === null) {
      return NextResponse.json(
        { error: getResultsNotFoundErrorMessage(String(riderId)) },
        { status: 404 },
      );
    }
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getInternalServerErrorMessage(String(error)) },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const {
    eventId,
    riderId,
    resultTypeId,
    noPlaceCodeTypeId,
    lap,
    place,
    time,
    points,
  }: BaseResult = await request.json();

  try {
    const row = await createResult({
      eventId: Number(eventId),
      riderId: Number(riderId),
      resultTypeId: Number(resultTypeId),
      noPlaceCodeTypeId: noPlaceCodeTypeId ? Number(noPlaceCodeTypeId) : 0,
      lap,
      place,
      time,
      points,
    });
    return NextResponse.json(row, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getInternalServerErrorMessage(String(error)) },
      { status: 500 },
    );
  }
}
