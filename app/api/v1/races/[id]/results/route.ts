import { NextRequest, NextResponse } from "next/server";
import { getResultsNotFoundErrorMessage } from "@/app/_constants/errors";
import { getResultsByRaceId } from "@/app/_controllers/result";
import { IResult } from "@/app/_types/result/types";

export type GetRacePathParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: NextRequest, context: GetRacePathParams) {
  const { params } = context;
  const { id } = await params;

  try {
    const results: IResult[] | null = await getResultsByRaceId(Number(id));
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
