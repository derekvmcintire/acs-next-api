import { getListOfRaceResults } from "@/app/_controllers/event";
import { addResultsToRace } from "@/app/_controllers/result";
import { RaceResults } from "@/app/_services/facade-services/race-result";
import { GetRaceFilters } from "@/app/_types/event/types";
import { AddResultsRequest } from "@/app/_types/result/types";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles GET requests to fetch a list of race results based on specified filters.
 *
 * @param request - The incoming HTTP request object from Next.js.
 * @returns A JSON response containing the race results or an error message.
 */
export async function GET(request: NextRequest) {
  const ids = request.nextUrl.searchParams.get("ids");
  const filters: GetRaceFilters = {
    ids: ids ? ids.split(",").map(Number) : undefined, // Convert comma-separated IDs to an array of numbers
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

/**
 * Handles POST requests to add results to a race.
 *
 * @param request - The incoming HTTP request object from Next.js.
 * @returns A JSON response indicating success or failure of the operation.
 */
export async function POST(request: NextRequest) {
  try {
    const requestBody: AddResultsRequest = await request.json();
    const { eventId, results, categories } = requestBody;

    if (!eventId || !results || !categories) {
      return NextResponse.json(
        {
          error:
            "Invalid request to create a result, must include race, results and categories",
        },
        { status: 400 },
      );
    }

    const response = await addResultsToRace({ eventId: Number(eventId), results, categories: categories.map(Number) });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
