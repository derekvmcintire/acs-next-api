import { NextRequest } from "next/server";
import { createRace } from "@/app/_controllers/event";
import { getInternalServerErrorMessage } from "@/app/_constants/errors";
import { POST } from "./route";
import {
  mockCreateRaceArgs,
  mockCreateRaceResponse,
} from "@/app/_constants/mock-data/race/mock-models";
import { IRace } from "@/app/_types/event/types";

jest.mock("@/app/_controllers/event");
jest.mock("@/app/_constants/errors");

describe("POST /races", () => {
  const mockCreateRace = createRace as jest.Mock<Promise<IRace>>;
  const mockGetInternalServerErrorMessage =
    getInternalServerErrorMessage as jest.Mock<string>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and JSON data when createRace succeeds", async () => {
    const request = {
      json: jest.fn().mockResolvedValue(mockCreateRaceArgs),
    } as unknown as NextRequest;
    mockCreateRace.mockResolvedValue(mockCreateRaceResponse);

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(mockCreateRaceResponse);
    expect(createRace).toHaveBeenCalledWith({
      name: mockCreateRaceArgs.name,
      raceTypeId: mockCreateRaceArgs.raceTypeId,
      startDate: mockCreateRaceArgs.startDate,
      endDate: mockCreateRaceArgs.endDate,
      location: mockCreateRaceArgs.location,
    });
  });

  it("should return 500 and error message when createRace throws an error", async () => {
    const request = {
      json: jest.fn().mockResolvedValue(mockCreateRaceArgs),
    } as unknown as NextRequest;
    const mockError = new Error("Database connection failed");
    mockCreateRace.mockRejectedValue(mockError);
    mockGetInternalServerErrorMessage.mockReturnValue("Internal server error");

    const response = await POST(request);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: "Internal server error" });
    expect(getInternalServerErrorMessage).toHaveBeenCalledWith(
      String(mockError),
    );
  });
});
