import { getRaceTotals } from "@/app/_controllers/event";
import { GetRaceTotalsFilters, GroupByOption } from "@/app/_types/event/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  function isValidGroupBy(value: string | null): value is GroupByOption {
    return value === "month" || value === "quarter" || value === "year";
  }
  const groupByParam = request.nextUrl.searchParams.get("groupby");

  const filters: GetRaceTotalsFilters = {
    groupBy: isValidGroupBy(groupByParam) ? groupByParam : undefined,
  };

  const from = request.nextUrl.searchParams.get("from") || undefined;
  const to = request.nextUrl.searchParams.get("to") || undefined;

  if (to && from) {
    filters.startDateRange = { from: from, to: to };
  }

  try {
    const results = await getRaceTotals(filters);
    if (results === null) {
      return NextResponse.json(
        { error: "Error getting race totals" },
        { status: 404 },
      );
    }
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
