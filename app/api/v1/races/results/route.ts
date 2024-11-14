import { getListOfRaceResults } from "@/app/_controllers/event";
import { GetRaceResultsFilters } from "@/app/_types/result/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const ids = request.nextUrl.searchParams.get("ids");

  if (!ids) {
    return NextResponse.json(
      { error: "Invalid request, missing list of ids." },
      { status: 400 },
    );
  }

  const filters: GetRaceResultsFilters = {
    ids: ids.split(",").map(Number),
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
