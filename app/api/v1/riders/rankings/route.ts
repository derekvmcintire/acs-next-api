import { NextRequest, NextResponse } from "next/server";
import { getRankings } from "@/app/_controllers/rider";
import { IGetRankingsParams } from "@/app/_types/rider/types";

export async function GET(request: NextRequest) {
  const params: IGetRankingsParams = {
    limit: Number(request.nextUrl.searchParams.get("limit")) || undefined,
    year: Number(request.nextUrl.searchParams.get("year")) || undefined,
  };
  try {
    const riders = await getRankings(params);
    return NextResponse.json(riders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
