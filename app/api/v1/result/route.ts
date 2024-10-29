import { NextRequest, NextResponse } from "next/server";
import { getResultsByRiderId } from "@/app/_controllers/result";
import {
  getInternalServerErrorMessage,
  getResultsNotFoundErrorMessage,
} from "@/app/_constants/errors";

export async function GET(request: NextRequest) {
  const riderId = request.nextUrl.searchParams.get("riderId");

  try {
    const results = await getResultsByRiderId(Number(riderId));
    if (!results) {
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
