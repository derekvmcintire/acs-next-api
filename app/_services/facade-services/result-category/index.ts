import { CreateResultArgs, CreatedResult } from "@/app/_types/result/types";
import ResultService from "../../result";

export class ResultCategoryFacadeService {
  /**
   * Facilitates the creation of results and their associated categories.
   *
   * - Combines result creation with the process of assigning categories.
   * - Acts as a higher-level abstraction for handling these related operations.
   *
   * @param resultService - Service to handle result-related operations.
   */
  constructor(private resultService: ResultService) {}

  /**
   * Creates a new result and assigns it to one or more categories.
   *
   * - Initiates the result creation using the provided data.
   * - Ensures that categories are associated with the result once it is created.
   * - Handles errors if the result creation fails or if no result ID is returned.
   *
   * @param resultData - Data required to create the result, including categories.
   * @returns The newly created result, including its ID and other details.
   * @throws If result creation fails or no result ID is available.
   */
  async createResultWithCategory(
    resultData: CreateResultArgs,
  ): Promise<CreatedResult> {
    // Create the result in the database using the result service.
    const result = await this.resultService.createResult(resultData);

    // Check if the result creation was successful and that an ID was returned.
    if (!result.id) {
      throw new Error("Failed to create result. No ID was returned.");
    }

    const { categories } = resultData;

    // Proceed to create join entries for each associated category.
    const categoryAssignments = (categories || []).map(async (categoryId) => {
      // Validate that the result ID exists before assigning categories.
      if (!result.id) {
        throw new Error("Result ID is undefined during category assignment.");
      }

      // Assign the result to the current category using the result service.
      await this.resultService.assignCategoryToResult({
        resultId: result.id,
        categoryId: Number(categoryId),
      });
    });

    // Wait for all category assignments to complete before proceeding.
    await Promise.all(categoryAssignments);

    // Return the successfully created result.
    return result;
  }
}
