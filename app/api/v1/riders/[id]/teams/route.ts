import { NextRequest, NextResponse } from "next/server";
import { getInternalServerErrorMessage } from "@/app/_constants/errors";
import { assignRiderToTeam } from "@/app/_controllers/rider";
import { AssignRiderToTeamParams } from "@/app/_types/rider/types";

export type AssignRiderToTeamPathParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  request: NextRequest,
  context: AssignRiderToTeamPathParams,
) {
  const { teamId } = await request.json();
  const { params } = context;
  const { id } = await params;
  const joinData: AssignRiderToTeamParams = {
    riderId: Number(id),
    teamId: Number(teamId),
  };

  try {
    const row = await assignRiderToTeam(joinData);
    return NextResponse.json(row, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getInternalServerErrorMessage(`${(error as Error).message}`) },
      { status: 500 },
    );
  }
}
