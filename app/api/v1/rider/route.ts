import { NextRequest, NextResponse } from "next/server";
import { createRider, getMultipleRiders } from "@/app/_controllers/rider";
import { IGetRidersParams, RiderRow } from "@/app/_types/rider/types";
import { getInternalServerErrorMessage } from "@/app/_constants/errors";

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
      { error: getInternalServerErrorMessage(String(error)) },
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
      { error: getInternalServerErrorMessage(String(error)) },
      { status: 500 },
    );
  }
}

// Mock data for POST request to create a rider
// {
//   "firstName": "Mipper",
//   "lastName": "Mopperson",
//   "dob": "1990-01-01",
//   "country": "USA",
//   "hometown": "New York, NY",
//   "photo": "https://www.procyclingstats.com/images/riders/bp/bf/julian-alaphilippe-2024.jpeg",
//   "strava": "87935790234",
//   "insta": "portamip",
//   "about": "It reaaaallly bothered me."
// }
