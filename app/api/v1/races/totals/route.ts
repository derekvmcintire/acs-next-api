import { getRaceTotals } from "@/app/_controllers/event";
import {
  GROUP_BY_OPTIONS,
  GetRaceTotalsFilters,
  GroupByOption,
  RaceTotals,
} from "@/app/_types/event/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const isValidGroupBy = (value?: string): value is GroupByOption =>
    GROUP_BY_OPTIONS.includes(value as GroupByOption);

  const groupByParam = request.nextUrl.searchParams.get("groupby") || undefined;

  const groupByParamIsValid = isValidGroupBy(groupByParam);

  if (groupByParam && !groupByParamIsValid) {
    return NextResponse.json(
      {
        error:
          "Invalid GroupBy Param. GroupBy must only be 'month', 'quarter' or 'year'.",
      },
      { status: 400 },
    );
  }

  const filters: GetRaceTotalsFilters = {
    groupBy: groupByParamIsValid ? groupByParam : undefined,
  };

  const from = request.nextUrl.searchParams.get("from") || undefined;
  const to = request.nextUrl.searchParams.get("to") || undefined;

  if (to && from) {
    filters.startDateRange = { from: from, to: to };
  }

  try {
    const results: RaceTotals[] = await getRaceTotals(filters);
    if (results === null) {
      return NextResponse.json(
        { error: "Error getting race totals" },
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
