import { GET, POST } from "@/app/api/v1/results/route";
import { NextRequest } from "next/server";
import {
  CREATE_RESULT_INVALID_REQUEST,
  getResultsNotFoundErrorMessage,
} from "@/app/_constants/errors";
import {
  mockEmptyRacerHistory,
  mockRacerHistory,
} from "../../../_constants/mock-data/result/mock-models";
import { mockRiderId } from "../../../_constants/mock-data/result/mock-values";
import { createResult, getResultsByRiderId } from "@/app/_controllers/result";

// Mocking the controller module directly
jest.mock("../../../_controllers/result");

const mockGetRiderResultsURL = `http://localhost/api/latest/result?riderId=${mockRiderId}`;

describe("GET /api/result/", () => {
  it("should return results for a rider", async () => {
    jest.mocked(getResultsByRiderId).mockResolvedValueOnce(mockRacerHistory);

    const request = new NextRequest(mockGetRiderResultsURL);
    const apiResponse = await GET(request);
    expect(apiResponse.status).toBe(200);

    const data = await apiResponse.json();
    expect(data).toEqual(mockRacerHistory);
  });

  it("should return 200 on empty results", async () => {
    jest
      .mocked(getResultsByRiderId)
      .mockResolvedValueOnce(mockEmptyRacerHistory);

    const request = new NextRequest(mockGetRiderResultsURL);
    const apiResponse = await GET(request);
    expect(apiResponse.status).toBe(200);

    const data = await apiResponse.json();
    expect(data).toEqual(mockEmptyRacerHistory);
  });

  it("should return 404 on results not found", async () => {
    jest.mocked(getResultsByRiderId).mockResolvedValueOnce(null);

    const request = new NextRequest(mockGetRiderResultsURL);
    const apiResponse = await GET(request);
    expect(apiResponse.status).toBe(404);

    const data = await apiResponse.json();
    expect(data).toEqual({
      error: getResultsNotFoundErrorMessage(String(mockRiderId)),
    });
  });

  it("should return 500 on internal server error", async () => {
    const mockErrorMessage = "Error message";
    jest
      .mocked(getResultsByRiderId)
      .mockRejectedValueOnce(new Error(mockErrorMessage));

    const request = new NextRequest(mockGetRiderResultsURL);
    const apiResponse = await GET(request);
    expect(apiResponse.status).toBe(500);

    const data = await apiResponse.json();
    expect(data).toEqual({
      error: mockErrorMessage,
    });
  });
});

describe("POST /api/result/", () => {
  const validRequestBody = {
    eventId: 1,
    riderId: 2,
    resultTypeId: 3,
    noPlaceCodeTypeId: null,
    lap: 5,
    place: 1,
    time: "02:15:00",
    points: 10,
  };

  it("should create a new result and return 200", async () => {
    const mockCreatedResult = { id: 1, ...validRequestBody };
    jest.mocked(createResult).mockResolvedValueOnce(mockCreatedResult);

    const request = new NextRequest("http://localhost/api/latest/result", {
      method: "POST",
      body: JSON.stringify(validRequestBody),
    });
    const response = await POST(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual(mockCreatedResult);
  });

  it("should return 500 if creation fails", async () => {
    const mockErrorMessage = "Database error";
    jest
      .mocked(createResult)
      .mockRejectedValueOnce(new Error(mockErrorMessage));

    const request = new NextRequest("http://localhost/api/latest/result", {
      method: "POST",
      body: JSON.stringify(validRequestBody),
    });
    const response = await POST(request);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toEqual({
      error: `${mockErrorMessage}`,
    });
  });

  it("should return 400 if required fields are missing", async () => {
    const invalidRequestBody = { ...validRequestBody, riderId: undefined };
    const request = new NextRequest("http://localhost/api/latest/result", {
      method: "POST",
      body: JSON.stringify(invalidRequestBody),
    });
    const response = await POST(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data).toEqual({
      error: CREATE_RESULT_INVALID_REQUEST,
    });
  });
});
