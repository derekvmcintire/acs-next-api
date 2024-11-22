import { getListOfRaceResults } from "@/app/_controllers/event";
import { addResultsToRace } from "@/app/_controllers/result";
import { RaceResults } from "@/app/_services/facade-services/race-result";
import { GetRaceFilters } from "@/app/_types/event/types";
import { AddResultsRequest } from "@/app/_types/result/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const ids = request.nextUrl.searchParams.get("ids");

  const filters: GetRaceFilters = {
    ids: ids ? ids.split(",").map(Number) : undefined,
  };

  try {
    const results: RaceResults[] = await getListOfRaceResults(filters);
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

export async function POST(request: NextRequest) {
  try {
    const requestBody: AddResultsRequest = await request.json(); // @TODO confirm requestBody type

    // destructure params
    const { race, results, categories } = requestBody;

    if (!race || !results || !categories) {
      return NextResponse.json(
        { error: 'Invalid request to create a result, must include race, results and categories' },
        { status: 400 },
      );
    }

    const response = addResultsToRace({ race, results, categories })
    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}