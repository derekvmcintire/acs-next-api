import { GET } from "@/app/api/v1/result/route";
import { NextRequest } from "next/server";
import {
  getInternalServerErrorMessage,
  getResultsNotFoundErrorMessage,
} from "@/app/_constants/errors";
import { mockResultsData } from "./mock-data";
import { getResultsByRiderId } from "@/app/_controllers/result";

// Mocking the controller module directly
jest.mock("../../../_controllers/result");

const mockGetRiderResultsURL = "http://localhost/api/latest/result?riderId=18";

describe("GET /api/result/", () => {
  it("should return results for a rider", async () => {
    jest.mocked(getResultsByRiderId).mockResolvedValueOnce(mockResultsData);

    const request = new NextRequest(mockGetRiderResultsURL);
    const apiResponse = await GET(request);
    expect(apiResponse.status).toBe(200);

    const data = await apiResponse.json();
    expect(data).toEqual(mockResultsData);
  });

  it.skip("should return 404 on results not found", async () => {
    const mockErrorMessage = "Error message";
    jest.mocked(getResultsByRiderId).mockResolvedValueOnce(null);

    const request = new NextRequest(mockGetRiderResultsURL);
    const apiResponse = await GET(request);
    expect(apiResponse.status).toBe(404);

    const data = await apiResponse.json();
    expect(data).toEqual({
      error: getResultsNotFoundErrorMessage(mockErrorMessage),
    });
  });

  it("should return 500 on internal server error", async () => {
    const mockErrorMessage = "Error message";
    jest.mocked(getResultsByRiderId).mockRejectedValueOnce(mockErrorMessage);

    const request = new NextRequest(mockGetRiderResultsURL);
    const apiResponse = await GET(request);
    expect(apiResponse.status).toBe(500);

    const data = await apiResponse.json();
    expect(data).toEqual({
      error: getInternalServerErrorMessage(mockErrorMessage),
    });
  });
});
