import { NextResponse } from "next/server";
import { getInternalServerErrorMessage } from "@/app/_constants/errors";
import { getCategories } from "@/app/_controllers/categories";
import { CategoryRow } from "@/app/_types/category/types";

export async function GET() {
  try {
    const row: CategoryRow[] = await getCategories();

    return NextResponse.json(row, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getInternalServerErrorMessage(`${(error as Error).message}`) },
      { status: 500 },
    );
  }
}
