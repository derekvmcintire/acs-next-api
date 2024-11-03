import databaseClient from "@/app/_database/get-client";
import ResultDAO from "@/app/_daos/result";
import ResultService from "@/app/_services/result";
import {
  CreateResultArgs,
  CreatedResult,
  IRacerHistory,
} from "@/app/_types/result/types";

const getResultService = (): ResultService => {
  const resultDao = new ResultDAO(databaseClient.result);
  return new ResultService(resultDao);
};

export async function getResultsByRiderId(
  riderId: number,
): Promise<IRacerHistory | null> {
  try {
    const resultService = getResultService();
    const riderHistory = await resultService.getResultsByRiderId(
      Number(riderId),
    );
    return riderHistory;
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function createResult(
  resultData: CreateResultArgs,
): Promise<CreatedResult> {
  try {
    const resultService = getResultService();
    const result = await resultService.createResult(resultData);
    const { categories } = resultData;
    if (categories && categories.length > 0 && result.id) {
      categories.forEach((id) => {
        const success = resultService.assignCategoryToResult({
          resultId: result.id,
          categoryId: Number(id),
        });
        if (!success) {
          throw new Error("Failed to create entry in JoinResultCategory");
        }
      });
    }
    return result;
  } catch (error) {
    throw new Error(String(error));
  }
}
