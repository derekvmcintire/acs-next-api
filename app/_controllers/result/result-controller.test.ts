import ResultDAO from "@/app/_daos/result";
import ResultService from "@/app/_services/result";
import databaseClient from "@/app/_database/client";
import { IRacerHistory } from "@/app/_types/result/types";
import {
  mockEmptyRacerHistory,
  mockRacerHistory,
} from "@/app/_constants/mock-data/result/mock-models";
import { getResultsByRiderId } from ".";

jest.mock("@/app/_database/client", () => ({
  result: jest.fn(),
}));
jest.mock("@/app/_daos/result");
jest.mock("@/app/_services/result");

describe("getResultsByRiderId", () => {
  const riderId = 1;
  const mockResultDao = new ResultDAO(databaseClient.result);
  const mockResultService = new ResultService(mockResultDao);

  beforeEach(() => {
    jest.clearAllMocks();
    (ResultService as jest.Mock).mockImplementation(() => mockResultService);
  });

  it("should return rider history if results are found", async () => {
    mockResultService.getResultsByRiderId = jest
      .fn()
      .mockResolvedValue(mockRacerHistory);

    const result = await getResultsByRiderId(riderId);
    expect(result).toEqual(mockRacerHistory);
  });

  it("should return null if no results are found", async () => {
    const mockRiderHistory: IRacerHistory = mockEmptyRacerHistory;
    mockResultService.getResultsByRiderId = jest
      .fn()
      .mockResolvedValue(mockRiderHistory);

    const result = await getResultsByRiderId(riderId);
    expect(result).toBeNull();
  });

  it("should throw an error if an exception occurs", async () => {
    mockResultService.getResultsByRiderId = jest
      .fn()
      .mockRejectedValue(new Error("Database error"));

    await expect(getResultsByRiderId(riderId)).rejects.toThrow(
      "Database error",
    );
  });
});
