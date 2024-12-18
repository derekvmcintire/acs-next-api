import {
  mockGetRiderResultsQueryResponse,
  mockRacerHistory,
} from "@/app/_constants/mock-data/result/mock-models";
import {
  mockCount,
  mockRiderId,
  mockYearTwentyOne,
  mockYearTwentyTwo,
} from "@/app/_constants/mock-data/result/mock-values";
import ResultDAO from "@/app/_daos/result";
import databaseClient from "@/app/_database/get-client";
import ResultService from "@/app/_services/result";
import { IRacerHistory } from "@/app/_types/result/types";
import { getYearFromDateString } from "@/app/_utility/helper-functions";

jest.mock("@/app/_daos/result");
jest.mock("@/app/_utility/helper-functions");
jest.mock("@/app/_database/get-client", () => ({
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

  describe("getResultsByRiderId", () => {
    it("should return IRacerHistory with mapped results", async () => {
      resultDaoMock.getRiderResults.mockResolvedValue(
        mockGetRiderResultsQueryResponse,
      );
      resultDaoMock.countResultsByEventId.mockResolvedValue(mockCount);
      (getYearFromDateString as jest.Mock)
        .mockReturnValueOnce(mockYearTwentyOne)
        .mockReturnValueOnce(mockYearTwentyTwo);

      const result = await resultService.getResultsByRiderId(mockRiderId);
      expect(result).toEqual<IRacerHistory>(mockRacerHistory);
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
