import { NextRequest, NextResponse } from "next/server";
import { getResultsByRiderId } from "@/app/_controllers/result";
import {
  getResultsNotFoundErrorMessage,
} from "@/app/_constants/errors";
import {
  IRacerHistory,
} from "@/app/_types/result/types";
import { AssignRiderToTeamPathParams } from "../teams/route";

export async function GET(_request: NextRequest, context: AssignRiderToTeamPathParams,) {
  const { params } = context;
  const { id } = await params;

  try {
    const results: IRacerHistory | null = await getResultsByRiderId(
      Number(id),
    );
    if (results === null) {
      return NextResponse.json(
        { error: getResultsNotFoundErrorMessage(String(id)) },
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