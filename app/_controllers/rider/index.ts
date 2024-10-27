import RiderDAO from "@/app/_daos/rider";
import RiderService from "@/app/_services/rider";
import { IGetRidersParams } from "@/app/_types/rider/types";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export default class RiderController {
  static async getRider(request: NextRequest): Promise<NextResponse> {
    try {
      const ids = request.nextUrl.searchParams.get("ids");

      const params: IGetRidersParams = {
        teamName: request.nextUrl.searchParams.get("team") || undefined,
        country: request.nextUrl.searchParams.get("country") || undefined,
        name: request.nextUrl.searchParams.get("name") || undefined,
        ids: ids ? ids.split(",").map(Number) : undefined,
      };

      const riderDao = new RiderDAO(prisma);
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

  static async getRiderById({ id }: { id: string }): Promise<NextResponse> {
    try {
      const queryParams = {
        id: id ? Number(id) : undefined,
      };

      const riderDao = new RiderDAO(prisma);
      const riderService = new RiderService(riderDao);
      const rows = await riderService.getRiders(queryParams);

      if (rows.length === 0) {
        return NextResponse.json({ error: "Rider not found" }, { status: 404 });
      }

      return NextResponse.json(rows[0], { status: 200 });
    } catch (error) {
      console.error("Database query error:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }
  }
}
