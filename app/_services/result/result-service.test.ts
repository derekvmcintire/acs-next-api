import {
  expectedBuildFromMockSingleRiderResult,
  mockCount,
  mockSingleResultRow,
} from "@/app/_constants/mock-data/result-mock-data";
import ResultDAO from "@/app/_daos/result";
import databaseClient from "@/app/_database/client";
import ResultService from "@/app/_services/result";
import {
  IRacerHistory,
  IRiderResultsRow,
  IResult,
  IResultYear,
} from "@/app/_types/result/types";
import { getYearFromDateString } from "@/app/_utility/helper-functions";

jest.mock("@/app/_daos/result");
jest.mock("@/app/_utility/helper-functions");
jest.mock("@/app/_database/client", () => ({
  result: jest.fn(),
}));

describe("ResultService", () => {
  let resultService: ResultService;
  let resultDaoMock: jest.Mocked<ResultDAO>;

  beforeEach(() => {
    resultDaoMock = new ResultDAO(
      databaseClient.result,
    ) as jest.Mocked<ResultDAO>;
    resultService = new ResultService(resultDaoMock);
    jest.clearAllMocks();
  });

  describe("buildResult", () => {
    it("should build a result object with all fields", async () => {
      resultDaoMock.countResultsByEventId.mockResolvedValue(mockCount);

      const result = await resultService.buildResult(
        mockSingleResultRow,
      );
      expect(result).toEqual<IResult>(expectedBuildFromMockSingleRiderResult);
    });

    it("should throw an error if countResultsByEventId fails", async () => {
      const resultRow: IRiderResultsRow = { eventId: 1 } as any;
      resultDaoMock.countResultsByEventId.mockRejectedValue(
        new Error("Database error"),
      );

      await expect(
        resultService.buildResult(resultRow),
      ).rejects.toThrow("Database error");
    });
  });

  describe("#mapResults", () => {
    it("should map results into year buckets", async () => {
      resultDaoMock.countResultsByEventId.mockResolvedValue(mockCount);
      (getYearFromDateString as jest.Mock)
        .mockReturnValueOnce(2022)
        .mockReturnValueOnce(2021);

      const result = await resultService.mapResults(
        [mockSingleResultRow],
      );
      expect(result).toEqual<IResultYear[]>([
        { year: 2021, races: [expect.objectContaining({ name: "Event 2" })] },
        { year: 2022, races: [expect.objectContaining({ name: "Event 1" })] },
      ]);
    });
  });

  describe("getResultsByRiderId", () => {
    it("should return IRacerHistory with mapped results", async () => {
      const mockRiderId = mockSingleResultRow.riderId;

      resultDaoMock.getRiderResults.mockResolvedValue([mockSingleResultRow]);
      resultDaoMock.countResultsByEventId.mockResolvedValue(5);
      (getYearFromDateString as jest.Mock).mockReturnValue(2022);

      const result = await resultService.getResultsByRiderId(mockRiderId);
      expect(result).toEqual<IRacerHistory>({
        riderId: mockRiderId,
        results: [
          { year: 2022, races: [expect.objectContaining({ name: "Event 1" })] },
        ],
      });
    });

    it("should throw an error if getRiderResults fails", async () => {
      resultDaoMock.getRiderResults.mockRejectedValue(
        new Error("Database error"),
      );

      await expect(resultService.getResultsByRiderId(1)).rejects.toThrow(
        "Database error",
      );
    });
  });
});
