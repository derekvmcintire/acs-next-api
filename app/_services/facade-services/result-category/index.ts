import { CreateResultArgs } from "@/app/_types/result/types";
import ResultService from "../../result";

//@TODO maybe deprecate this class in favor of RiderResultFacadeSErvice.createResultWithCategory
export class ResultCategoryFacadeService {
  constructor(private resultService: ResultService) {}

  async createResultWithCategory(resultData: CreateResultArgs) {
    const result = await this.resultService.createResult(resultData);

    if (!result.id) {
      throw new Error("Failed to create result. No ID was returned.");
    }

    const { categories } = resultData;

    // proceed with creating join entries for each category
    const categoryAssignments = (categories || []).map(async (categoryId) => {
      if (!result.id) {
        throw new Error("Result ID is undefined during category assignment.");
      }
      await this.resultService.assignCategoryToResult({
        resultId: result.id,
        categoryId: Number(categoryId),
      });
    });

    await Promise.all(categoryAssignments);

    return result;
  }
}
