import { calculatePoints, parseResults } from "cycling-results-parser";
import { RiderResultFacadeService } from ".";
import ResultService from "../../result";
import RiderService from "../../rider";
import RiderDAO from "@/app/_daos/rider";
import { IRiderRepository } from "@/app/_types/rider/database/IRiderRepository";
import {
  mockFindUniqueQueryResponse,
  mockGetRiderByIdResponse,
} from "@/app/_constants/mock-data/rider/mock-models";
import { IResultRepository } from "@/app/_types/result/database/IResultRepository";
import ResultDAO from "@/app/_daos/result";

const mockRequestData =
  "Pl\tName\tSex\tRacing Age\tDiv\tDiv Pl\tCity\tSection 1\tSection 2\tSection 3\tSpeed\tTime\tGap\n1206\tKeith Gerarden\tMen\t45\tM45-54\t1\t\t9:06.76\t6:46.31\t7:47.85\t21.78\t23:40.93\t--\n2182\tKerry Werner Jr.\tMen\t33\tM23-34\t1\tVinton VA\t9:12.37\t6:45.85\t7:47.16\t21.72\t23:45.39\t+0:04.458\n3125\tKelby Hanson\tMen\t21\tM23-\t1\tSalem VA\t9:17.07\t6:53.82\t7:45.36\t21.55\t23:56.26\t+0:15.332\n4163\tBrian Schworm\tMen\t54\tM45-54\t2\tMorehead KY\t9:27.84\t6:52.79\t8:01.50\t21.17\t24:22.14\t+0:41.208";

const mockParsedResults = [
  {
    place: "1206",
    name: "Keith Gerarden",
    category: "M45-54",
    hometown: undefined,
    time: "23:40.93",
    gap: "--",
  },
  {
    place: "2182",
    name: "Kerry Werner Jr.",
    category: "M23-34",
    hometown: "Vinton VA",
    time: "23:45.39",
    gap: "+0:04.458",
  },
  {
    place: "3125",
    name: "Kelby Hanson",
    category: "M23-",
    hometown: "Salem VA",
    time: "23:56.26",
    gap: "+0:15.332",
  },
  {
    place: "4163",
    name: "Brian Schworm",
    category: "M45-54",
    hometown: "Morehead KY",
    time: "24:22.14",
    gap: "+0:41.208",
  },
];

jest.mock("../../rider");
jest.mock("../../result");
jest.mock("cycling-results-parser");

const mockRiderService = () => {
  const mockRiderDao = new RiderDAO({} as IRiderRepository);
  jest.spyOn(mockRiderDao, "getRiders").mockResolvedValue([]);
  jest
    .spyOn(mockRiderDao, "getRiderById")
    .mockResolvedValue(mockFindUniqueQueryResponse); // @TODO update this mock value name
  jest
    .spyOn(mockRiderDao, "createRider")
    .mockResolvedValue(mockFindUniqueQueryResponse);
  jest.spyOn(mockRiderDao, "assignRiderToTeam").mockResolvedValue(null);

  return new RiderService(mockRiderDao) as jest.Mocked<RiderService>;
};

const mockResultService = () => {
  const mockResultDao = new ResultDAO({} as IResultRepository);
  jest.spyOn(mockResultDao, "getEventResults").mockResolvedValue([]);
  jest.spyOn(mockResultDao, "countResultsByEventId").mockResolvedValue(1);
  jest.spyOn(mockResultDao, "createResult").mockResolvedValue({
    id: 1,
    eventId: 1,
    riderId: 1,
  });
  jest.spyOn(mockResultDao, "assignCategoryToResult").mockResolvedValue(null);

  return new ResultService(mockResultDao) as jest.Mocked<ResultService>;
};

describe("RiderResultFacadeService", () => {
  let riderService: jest.Mocked<RiderService>;
  let resultService: jest.Mocked<ResultService>;
  let service: RiderResultFacadeService;

  beforeEach(() => {
    riderService = mockRiderService();
    resultService = mockResultService();
    service = new RiderResultFacadeService(riderService, resultService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("calculatePoints", () => {
    it("should calculate points correctly", () => {
      const totalRacers = 10;
      const position = 1;
      (calculatePoints as jest.Mock).mockReturnValueOnce(10);

      const points = service["calculatePoints"](totalRacers, position);

      expect(points).toBe(10);
      expect(calculatePoints).toHaveBeenCalledWith({ totalRacers, position });
    });

    it("should return 0 for invalid position", () => {
      const totalRacers = 10;
      const position = -1;
      (calculatePoints as jest.Mock).mockReturnValueOnce(0);

      const points = service["calculatePoints"](totalRacers, position);

      expect(points).toBe(0);
      expect(calculatePoints).toHaveBeenCalledWith({ totalRacers, position });
    });
  });

  describe("splitFullName", () => {
    it("should split full name into first and last name", () => {
      const fullName = "John Doe";
      const result = service["splitFullName"](fullName);

      expect(result).toEqual({ firstName: "John", lastName: "Doe" });
    });

    it("should handle single names as last name", () => {
      const fullName = "Doe";
      const result = service["splitFullName"](fullName);

      expect(result).toEqual({ firstName: "", lastName: "Doe" });
    });

    it("should default to 'unknown rider' if name is undefined", () => {
      const result = service["splitFullName"](undefined);

      expect(result).toEqual({ firstName: "unknown", lastName: "rider" });
    });
  });

  describe("findExistingRider", () => {
    it("should find an existing rider", async () => {
      const riderName = "John Doe";
      const mockRiders = [mockGetRiderByIdResponse];
      riderService.getRiders.mockResolvedValueOnce(mockRiders);

      const rider = await service.findExistingRider(riderName);

      expect(rider).toEqual(mockRiders[0]);
      expect(riderService.getRiders).toHaveBeenCalledWith({ name: riderName });
    });

    it("should return null if no rider is found", async () => {
      riderService.getRiders.mockResolvedValueOnce([]);

      const rider = await service.findExistingRider("Non Existent");

      expect(rider).toBeNull();
    });
  });

  describe("buildNewRiderData", () => {
    it("should construct new rider data from a parsed result", () => {
      const result = mockParsedResults[0];
      const expected = {
        firstName: "Keith",
        lastName: "Gerarden",
        dob: null,
        country: null,
        hometown: "",
        photo: null,
        strava: null,
        insta: null,
        about: null,
      };

      const riderData = service["buildNewRiderData"](result);

      expect(riderData).toEqual(expected);
    });
  });

  describe("parseRawResults", () => {
    it("should parse raw results string into structured data", () => {
      (parseResults as jest.Mock).mockReturnValueOnce(mockParsedResults);

      const parsedResults = service["parseRawResults"](mockRequestData);

      expect(parsedResults).toEqual(mockParsedResults);
      expect(parseResults).toHaveBeenCalledWith(mockRequestData);
    });

    it("should throw an error if no results are parsed", () => {
      (parseResults as jest.Mock).mockReturnValueOnce([]);

      expect(() => service["parseRawResults"]("")).toThrow(
        "No valid results to process.",
      );
    });
  });

  describe("addResultsToRace", () => {
    it("should process results and return a summary", async () => {
      const eventId = 25;
      const categories = ["99"];
      (parseResults as jest.Mock).mockReturnValueOnce(mockParsedResults);
      service["processResults"] = jest.fn().mockResolvedValueOnce({
        createdResults: [{ id: 1 }, { id: 2 }],
        errors: ["Error 1"],
      });

      const result = await service.addResultsToRace({
        categories,
        eventId,
        results: mockRequestData,
      });

      expect(result).toEqual({
        summary: {
          total: mockParsedResults.length,
          successful: 2,
          failed: 1,
        },
        details: {
          createdResults: [{ id: 1 }, { id: 2 }],
          errors: ["Error 1"],
        },
      });
    });
  });

  describe("processResults", () => {
    it("should process all results and handle errors", async () => {
      const eventId = 25;
      const categories = ["99"];
      const parsedResults = mockParsedResults;

      service["processSingleResult"] = jest
        .fn()
        .mockResolvedValueOnce({ id: 1 })
        .mockRejectedValueOnce(new Error("Test Error"));

      const result = await service["processResults"](
        parsedResults,
        eventId,
        categories,
      );

      expect(result).toEqual({
        createdResults: [{ id: 1 }],
        errors: [
          "Error processing result for rider Kerry Werner Jr.: Test Error",
        ],
      });
    });
  });
});
