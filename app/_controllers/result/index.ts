import databaseClient from "@/app/_database/client";
import ResultDAO from "@/app/_daos/result";
import ResultService from "@/app/_services/result";
import { IRacerHistory } from "@/app/_types/result/types";

export async function getResultsByRiderId(
  riderId: number,
): Promise<IRacerHistory | null> {
  try {
    const resultDao = new ResultDAO(databaseClient.result);
    const resultService = new ResultService(resultDao);
    const riderHistory = await resultService.getResultsByRiderId(
      Number(riderId),
    );

    return riderHistory;
  } catch (error) {
    throw new Error(String(error));
  }
}
