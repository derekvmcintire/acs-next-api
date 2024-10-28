import { NextRequest, NextResponse } from "next/server";
import databaseClient from "@/prisma/client";
import ResultDAO from "@/app/_daos/result";
import ResultService from "@/app/_services/result";

export async function getResultsByRiderId(
  request: NextRequest,
): Promise<NextResponse> {
  try {
    const riderId = request.nextUrl.searchParams.get("riderId");

    const resultDao = new ResultDAO(databaseClient.result);
    const resultService = new ResultService(resultDao);
    const results = await resultService.getResultsByRiderId(Number(riderId));

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 },
    );
  }
}
