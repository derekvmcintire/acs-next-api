import {
  getInternalServerErrorMessage,
  getRiderNotFoundErrorMessage,
} from "@/app/_constants/errors";
import { getRiderById } from "@/app/_controllers/rider";
import { NextRequest, NextResponse } from "next/server";

export type GetRiderByRiderIdParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  context: GetRiderByRiderIdParams,
) {
  const { params } = context;
  const { id } = await params;

  try {
    const rider = await getRiderById(Number(id));
    if (!rider) {
      return NextResponse.json(
        { error: getRiderNotFoundErrorMessage(String(id)) },
        { status: 404 },
      );
    }
    return NextResponse.json(rider, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getInternalServerErrorMessage(`${(error as Error).message}`) },
      { status: 500 },
    );
  }
}
