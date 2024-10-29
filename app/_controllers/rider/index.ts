import RiderDAO from "@/app/_daos/rider";
import RiderService from "@/app/_services/rider";
import { IGetRidersParams } from "@/app/_types/rider/types";
import { NextRequest, NextResponse } from "next/server";
import databaseClient from "@/prisma/client";
import { GetRiderByRiderIdParams } from "@/app/api/rider/[id]/route";

export async function getMultipleRiders(
  request: NextRequest,
): Promise<NextResponse> {
  try {
    const ids = request.nextUrl.searchParams.get("ids");

    const params: IGetRidersParams = {
      teamName: request.nextUrl.searchParams.get("team") || undefined,
      country: request.nextUrl.searchParams.get("country") || undefined,
      name: request.nextUrl.searchParams.get("name") || undefined,
      ids: ids ? ids.split(",").map(Number) : undefined,
    };

    const riderDao = new RiderDAO(databaseClient.rider);
    const riderService = new RiderService(riderDao);
    const riders = await riderService.getRiders(params);

    return NextResponse.json(riders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 },
    );
  }
}

export async function getRiderById(
  context: GetRiderByRiderIdParams,
): Promise<NextResponse> {
  try {
    const { params } = context;
    const { id } = await params;

    const riderDao = new RiderDAO(databaseClient.rider);
    const riderService = new RiderService(riderDao);
    const rider = await riderService.getRiderById(Number(id));

    if (!rider) {
      return NextResponse.json({ error: "Rider not found" }, { status: 404 });
    }

    return NextResponse.json(rider, { status: 200 });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
