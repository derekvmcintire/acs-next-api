import { NextResponse } from "next/server";
import { getInternalServerErrorMessage } from "@/app/_constants/errors";
import { getCategories } from "@/app/_controllers/categories";

export async function GET() {
  try {
    const row = await getCategories();

    return NextResponse.json(row, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getInternalServerErrorMessage((error as Error).message) },
      { status: 500 },
    );
  }
}
