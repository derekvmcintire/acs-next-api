import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaDatabaseClient } from "./PrismaDatabaseClient";
import {
  mockEventId,
  mockRiderId,
} from "@/app/_constants/mock-data/result/mock-values";

jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    rider: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    result: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe("PrismaDatabaseClient", () => {
  let prismaClient: PrismaClient;
  let databaseClient: PrismaDatabaseClient;

  beforeEach(() => {
    prismaClient = new PrismaClient();
    databaseClient = new PrismaDatabaseClient(prismaClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("rider repository", () => {
    test("findMany calls prisma.rider.findMany with correct arguments", async () => {
      const findManyArgs: Prisma.RiderFindManyArgs = {
        where: { country: "Almania" },
      };
      (prismaClient.rider.findMany as jest.Mock).mockResolvedValueOnce([
        { id: 1, name: "Test Rider" },
      ]);

      const result = await databaseClient.rider.findMany(findManyArgs);

      expect(prismaClient.rider.findMany).toHaveBeenCalledWith(findManyArgs);
      expect(result).toEqual([{ id: 1, name: "Test Rider" }]);
    });

    test("findUnique calls prisma.rider.findUnique with correct arguments", async () => {
      const findUniqueArgs: Prisma.RiderFindUniqueArgs = { where: { id: 1 } };
      (prismaClient.rider.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 1,
        name: "Test Rider",
      });

      const result = await databaseClient.rider.findUnique(findUniqueArgs);

      expect(prismaClient.rider.findUnique).toHaveBeenCalledWith(
        findUniqueArgs,
      );
      expect(result).toEqual({ id: 1, name: "Test Rider" });
    });
  });

  describe("result repository", () => {
    test("findMany calls prisma.result.findMany with correct arguments", async () => {
      const findManyArgs: Prisma.ResultFindManyArgs = {
        where: { riderId: mockRiderId },
      };
      (prismaClient.result.findMany as jest.Mock).mockResolvedValueOnce([
        { id: 1, score: 60 },
      ]);

      const result = await databaseClient.result.findMany(findManyArgs);

      expect(prismaClient.result.findMany).toHaveBeenCalledWith(findManyArgs);
      expect(result).toEqual([{ id: 1, score: 60 }]);
    });

    test("count calls prisma.result.count with correct arguments", async () => {
      const countArgs: Prisma.ResultCountArgs = {
        where: { eventId: mockEventId },
      };
      (prismaClient.result.count as jest.Mock).mockResolvedValueOnce(5);

      const result = await databaseClient.result.count(countArgs);

      expect(prismaClient.result.count).toHaveBeenCalledWith(countArgs);
      expect(result).toBe(5);
    });
  });
});
