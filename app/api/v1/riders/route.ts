import { NextRequest, NextResponse } from "next/server";
import { createRider, getMultipleRiders } from "@/app/_controllers/rider";
import { IGetRidersParams } from "@/app/_types/rider/types";

export async function GET(request: NextRequest) {
  const ids = request.nextUrl.searchParams.get("ids");

  const params: IGetRidersParams = {
    teamName: request.nextUrl.searchParams.get("team") || undefined,
    country: request.nextUrl.searchParams.get("country") || undefined,
    name: request.nextUrl.searchParams.get("name") || undefined,
    ids: ids ? ids.split(",").map(Number) : undefined,
  };

  try {
    const riders = await getMultipleRiders(params);
    return NextResponse.json(riders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const params = await request.json();

  try {
    const rider = await createRider(params);
    return NextResponse.json(rider, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
