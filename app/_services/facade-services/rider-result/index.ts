import ResultService from "../../result";
import {
  PreparedResult,
  calculatePoints,
  parseResults,
} from "cycling-results-parser";
import { AddResultsRequest, CreateResultArgs } from "@/app/_types/result/types";
import RiderService from "../../rider";
import { RiderRow } from "@/app/_types/rider/types";

export interface FullName {
  firstName: string;
  lastName: string;
}

export class RiderResultFacadeService {
  constructor(
    private riderService: RiderService,
    private resultService: ResultService,
  ) {}

  /**
   * Calculates points earned by a rider based on their finishing position.
   * @param totalRacers - Total number of participants in the race.
   * @param position - Finishing position of the rider.
   * @returns Number of points earned (or 0 if position is invalid).
   */
  private calculatePoints(totalRacers: number, position: number): number {
    return calculatePoints({ totalRacers, position: Number(position) }) || 0;
  }

  /**
   * Splits a full name string into first and last name.
   * If no name is provided, defaults to "unknown rider".
   * @param name - Full name of the rider.
   * @returns An object containing `firstName` and `lastName`.
   */
  private splitFullName(name?: string): FullName {
    if (!name) {
      return { firstName: "unknown", lastName: "rider" };
    }
    const lastSpaceIndex = name.lastIndexOf(" ");
    if (lastSpaceIndex === -1) return { firstName: "", lastName: name };

    return {
      firstName: name.slice(0, lastSpaceIndex),
      lastName: name.slice(lastSpaceIndex + 1),
    };
  }

  /**
   * Finds an existing rider by name.
   * @param name - Full name of the rider.
   * @returns The existing rider or `null` if no match is found.
   */
  async findExistingRider(name: string): Promise<any | null> {
    const riders = await this.riderService.getRiders({ name });
    return riders?.[0] || null;
  }

  /**
   * Constructs a new rider object from a parsed result.
   * @param result - The parsed result data.
   * @returns A `RiderRow` object to be created.
   */
  private buildNewRiderData(result: PreparedResult): RiderRow {
    const { firstName, lastName } = this.splitFullName(String(result?.name));
    return {
      firstName,
      lastName,
      dob: null,
      country: null,
      hometown: String(result.hometown) || "",
      photo: null,
      strava: null,
      insta: null,
      about: null,
    };
  }

  /**
   * Creates a new rider in the database.
   * @param result - The parsed result data.
   * @returns The created rider.
   */
  private async createNewRider(result: PreparedResult) {
    const riderData = this.buildNewRiderData(result);
    return this.riderService.createRider(riderData);
  }

  /**
   * Maps a result to multiple categories by inserting joins into the database.
   * @param resultId - The ID of the created result.
   * @param categories - A list of category IDs to assign.
   */
  private async assignResultToCategories(
    resultId: number,
    categories: string[],
  ): Promise<void> {
    if (!resultId) {
      throw new Error("Result ID is undefined during category assignment.");
    }

    const assignments = categories.map(async (categoryId) => {
      return this.resultService.assignCategoryToResult({
        resultId,
        categoryId: Number(categoryId),
      });
    });

    await Promise.all(assignments);
  }

  /**
   * Adds a list of results to a race.
   * @param requestData - The request containing event details, results, and categories.
   * @returns A list of created results.
   */
  async addResultsToRace(requestData: AddResultsRequest) {
    const { categories, eventId, results } = requestData;

    // Parse raw results (e.g., CSV or tab-separated data) into JavaScript objects.
    const parsedResults = parseResults(results);

    const createdResults = await Promise.all(
      parsedResults.map(async (result: PreparedResult) => {
        const { name } = result;

        if (!name) {
          throw new Error("No rider name found in the result.");
        }

        // Attempt to find an existing rider or create a new one.
        const existingRider = await this.findExistingRider(String(name));
        const rider = existingRider || (await this.createNewRider(result));

        const place = Number(result?.place) || 0;

        // Prepare data for creating a new result.
        const resultData: CreateResultArgs = {
          eventId,
          riderId: rider.id,
          place,
          time: String(result.time) || "",
          points: this.calculatePoints(parsedResults.length, place),
          resultTypeId: 1, // Placeholder, adapt based on actual logic.
          noPlaceCodeTypeId: 1, // Placeholder, adapt based on actual logic.
          lap: 1, // Placeholder, adapt based on actual logic.
          categories,
        };

        // Create the result in the database.
        const createdResult = await this.resultService.createResult(resultData);

        // Assign the created result to specified categories.
        await this.assignResultToCategories(
          Number(createdResult.id),
          categories,
        );

        return createdResult;
      }),
    );

    return createdResults;
  }
}
