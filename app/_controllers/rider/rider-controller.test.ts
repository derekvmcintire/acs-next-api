import RiderDAO from "@/app/_daos/rider";
import RiderService from "@/app/_services/rider";
import databaseClient from "@/app/_database/client";
import { getMultipleRiders, getRiderById } from ".";
import {
  mockGetAllRidersResponse,
  mockGetMultipleRiderParams,
  mockGetRiderByIdResponse,
} from "@/app/_constants/mock-data/rider-mock-data";

jest.mock("@/app/_database/client", () => ({
  rider: jest.fn(),
}));
jest.mock("@/app/_daos/rider");
jest.mock("@/app/_services/rider");

describe("RiderController", () => {
  let riderDaoMock: jest.Mocked<RiderDAO>;
  let riderServiceMock: jest.Mocked<RiderService>;

  beforeEach(() => {
    jest.clearAllMocks();
    riderDaoMock = new RiderDAO(databaseClient.rider) as jest.Mocked<RiderDAO>;
    riderServiceMock = new RiderService(
      riderDaoMock,
    ) as jest.Mocked<RiderService>;

    (RiderService as jest.Mock).mockImplementation(() => riderServiceMock);
  });

  describe("getMultipleRiders", () => {
    it("should return a list of riders if found", async () => {
      riderServiceMock.getRiders.mockResolvedValue(mockGetAllRidersResponse);

      const result = await getMultipleRiders(mockGetMultipleRiderParams);
      expect(result).toEqual(mockGetAllRidersResponse);
    });

    it("should return an empty array if no riders are found", async () => {
      riderServiceMock.getRiders.mockResolvedValue([]);

      const result = await getMultipleRiders(mockGetMultipleRiderParams);
      expect(result).toEqual([]);
    });

    it("should throw an error if an exception occurs", async () => {
      riderServiceMock.getRiders.mockRejectedValue(new Error("Database error"));

      await expect(
        getMultipleRiders(mockGetMultipleRiderParams),
      ).rejects.toThrow("Database error");
    });
  });

  describe("getRiderById", () => {
    it("should return a rider if found", async () => {
      riderServiceMock.getRiderById.mockResolvedValue(mockGetRiderByIdResponse);

      const result = await getRiderById(mockGetRiderByIdResponse.id);
      expect(result).toEqual(mockGetRiderByIdResponse);
    });

    it("should return null if no rider is found", async () => {
      const mockIncorrectId = 666;
      riderServiceMock.getRiderById.mockResolvedValue(null);

      const result = await getRiderById(mockIncorrectId);
      expect(result).toBeNull();
    });

    it("should throw an error if an exception occurs", async () => {
      riderServiceMock.getRiderById.mockRejectedValue(
        new Error("Database error"),
      );

      await expect(getRiderById(1)).rejects.toThrow("Database error");
    });
  });
});
