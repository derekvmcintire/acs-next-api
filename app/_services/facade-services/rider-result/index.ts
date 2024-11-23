import ResultService from "../../result";
import {
  PreparedResult,
  calculatePoints,
  parseResults,
} from "cycling-results-parser";
import {
  AddResultsRequest,
  CreateResultArgs,
  CreatedResult,
} from "@/app/_types/result/types";
import RiderService from "../../rider";
import { IRider, RiderRow } from "@/app/_types/rider/types";

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
  async findExistingRider(name: string): Promise<IRider | null> {
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
      hometown: result?.hometown ? String(result.hometown) : "",
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
    categories: number[],
  ): Promise<void> {
    if (!resultId) {
      throw new Error("Result ID is undefined during category assignment.");
    }

    const assignments = categories.map(async (categoryId) => {
      return this.resultService.assignCategoryToResult({
        resultId,
        categoryId,
      });
    });

    await Promise.all(assignments);
  }

  /**
   * Parses raw results data into a structured array of `PreparedResult` objects.
   * @param rawResults - Raw results string.
   * @returns An array of parsed results.
   * @throws Error if no valid results are found.
   */
  private parseRawResults(rawResults: string): PreparedResult[] {
    const parsedResults = parseResults(rawResults) || [];

    if (parsedResults.length < 1) {
      throw new Error("No valid results to process.");
    }
    return parsedResults;
  }

  /**
   * Processes a single parsed result, including finding or creating the rider
   * and creating the result with associated data.
   * @param result - The parsed result data.
   * @param eventId - The ID of the event the result is for.
   * @param categories - List of category IDs the result belongs to.
   * @param totalRacers - Total number of participants in the race.
   * @returns The created result object.
   */
  private async processSingleResult(
    result: PreparedResult,
    eventId: number,
    categories: number[],
    totalRacers: number,
  ): Promise<CreatedResult> {
    const { name } = result;

    if (!name) {
      throw new Error("No rider name found in the result.");
    }

    // Find or create rider
    const existingRider = await this.findExistingRider(String(name));
    const rider = existingRider || (await this.createNewRider(result));

    if (!rider?.id) {
      throw new Error("Error finding or creating rider");
    }

    const place = Number(result?.place) || 0;

    // Prepare data for creating a new result
    const resultData: CreateResultArgs = {
      eventId,
      riderId: rider.id,
      place,
      time: result?.time ? String(result.time) : "",
      points: this.calculatePoints(totalRacers, place),
      resultTypeId: 1, // Placeholder, adapt based on actual logic.
      noPlaceCodeTypeId: 1, // Placeholder, adapt based on actual logic.
      lap: 1, // Placeholder, adapt based on actual logic.
      categories,
    };

    // Create the result in the database
    const createdResult = await this.resultService.createResult(resultData);

    // Assign the created result to specified categories
    await this.assignResultToCategories(Number(createdResult.id), categories);

    return createdResult;
  }

  /**
   * Processes all parsed results, creating them in the database and handling errors.
   * @param parsedResults - Array of parsed results.
   * @param eventId - The ID of the event the results are for.
   * @param categories - List of category IDs the results belong to.
   * @returns An object containing created results and any errors encountered.
   */
  private async processResults(
    parsedResults: PreparedResult[],
    eventId: number,
    categories: number[],
  ): Promise<{ createdResults: CreatedResult[]; errors: string[] }> {
    const totalRacers = parsedResults.length;

    const createdResults: CreatedResult[] = [];
    const errors: string[] = [];

    await Promise.all(
      parsedResults.map(async (result) => {
        try {
          const createdResult = await this.processSingleResult(
            result,
            eventId,
            categories,
            totalRacers,
          );
          createdResults.push(createdResult);
        } catch (error) {
          errors.push(
            `Error processing result for rider ${result.name}: ${
              (error as Error).message
            }`,
          );
        }
      }),
    );

    return { createdResults, errors };
  }

  /**
   * Adds a list of results to a race.
   * @param requestData - The request containing event details, results, and categories.
   * @returns A summary and details of the operation, including errors.
   */
  async addResultsToRace(requestData: AddResultsRequest) {
    const { categories, eventId, results } = requestData;

    const parsedResults = this.parseRawResults(results);

    const { createdResults, errors } = await this.processResults(
      parsedResults,
      eventId,
      categories,
    );

    return {
      summary: {
        total: parsedResults.length,
        successful: createdResults.length,
        failed: errors.length,
      },
      details: {
        createdResults,
        errors,
      },
    };
  }
}
