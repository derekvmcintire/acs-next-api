import EventDAO from "@/app/_daos/event";
import {
  CreateRaceArgs,
  GetRaceFilters,
  GetRaceTotalsFilters,
  IRace,
  RaceTotals,
} from "@/app/_types/event/types";
import dayjs from "dayjs";

export default class EventService {
  // Constructor to inject the EventDAO dependency
  constructor(private eventDao: EventDAO) {}

  /**
   * Creates a new race and its associated event.
   *
   * - Formats the `startDate` and `endDate` to ISO 8601 format (YYYY-MM-DD).
   * - Creates a new event using the provided race name.
   * - Links the newly created event to the race and saves it in the database.
   *
   * @param raceData - Data required to create a new race.
   * @returns - The created race object.
   */
  async createRace(raceData: CreateRaceArgs): Promise<IRace | null> {
    // Format start and end dates to ISO format for consistency
    const formattedStartDate = dayjs(raceData.startDate, "MM-DD-YYYY").format(
      "YYYY-MM-DD",
    );
    const formattedEndDate = raceData.endDate
      ? dayjs(raceData.endDate, "MM-DD-YYYY").format("YYYY-MM-DD")
      : null;

    // Create a new event associated with the race
    const event = await this.eventDao.createEvent({ name: raceData.name });

    // Create and return the race, linking it to the created event
    return this.eventDao.createRace({
      ...raceData,
      eventId: event.id,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
  }

  /**
   * Retrieves a list of races based on the provided filters.
   *
   * - Delegates the filtering logic to the DAO.
   *
   * @param filters - Filters to apply for fetching races.
   * @returns - A list of races matching the filters.
   */
  async getListOfRaces(filters: GetRaceFilters): Promise<IRace[]> {
    return this.eventDao.getListOfRaces(filters);
  }

  /**
   * Retrieves grouped totals for races based on provided filters.
   *
   * - Useful for summarizing race data, such as counts by category.
   *
   * @param filters - Filters for grouping and counting race totals.
   * @returns - Grouped totals for the races.
   */
  async getRaceTotals(filters: GetRaceTotalsFilters): Promise<RaceTotals[]> {
    return this.eventDao.getRaceTotalsGrouped(filters);
  }

  /**
   * Retrieves a list of race results based on the provided filters.
   *
   * - Calls the same DAO method as `getListOfRaces`, potentially a placeholder for additional logic.
   * - Can be extended later to include logic specific to race results.
   *
   * @param filters - Filters for fetching race results.
   * @returns - A list of race results matching the filters.
   */
  async getListOfRaceResults(filters: GetRaceFilters): Promise<IRace[]> {
    return this.eventDao.getListOfRaces(filters);
  }
}
