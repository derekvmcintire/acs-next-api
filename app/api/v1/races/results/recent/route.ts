import { getListOfRaceResults } from "@/app/_controllers/event";
import { GetRaceFilters } from "@/app/_types/event/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const filters: GetRaceFilters = {
    location: request.nextUrl.searchParams.get("location") || undefined,
    limit: Number(request.nextUrl.searchParams.get("limit")) || undefined,
    resultLimit:
      Number(request.nextUrl.searchParams.get("resultlimit")) || undefined,
    orderBy: {
      column: "startDate",
      direction: "desc",
    },
  };

  try {
    const results = await getListOfRaceResults(filters);
    if (results === null) {
      return NextResponse.json(
        { error: "Unable to find results for the given races" },
        { status: 404 },
      );
    }

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
