import { NextRequest, NextResponse } from "next/server";
import { createResult, getResultsByRiderId } from "@/app/_controllers/result";
import {
  CREATE_RESULT_INVALID_REQUEST,
  getResultsNotFoundErrorMessage,
} from "@/app/_constants/errors";
import { CreateResultArgs } from "@/app/_types/result/types";

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
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: Partial<CreateResultArgs> = await request.json();

    const { eventId, riderId, resultTypeId, categories } = body;
    if (eventId == null || riderId == null || resultTypeId == null) {
      return NextResponse.json(
        { error: CREATE_RESULT_INVALID_REQUEST },
        { status: 400 },
      );
    }

    const row = await createResult({
      eventId: Number(eventId),
      riderId: Number(riderId),
      resultTypeId: Number(resultTypeId),
      noPlaceCodeTypeId: body.noPlaceCodeTypeId
        ? Number(body.noPlaceCodeTypeId)
        : 0,
      lap: body?.lap || null,
      place: body?.place || null,
      time: body?.time || null,
      points: body?.points || null,
      categories: categories || [],
    });

    return NextResponse.json(row, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
