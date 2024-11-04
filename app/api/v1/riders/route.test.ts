import { GET } from "@/app/api/v1/riders/route";
import { getMultipleRiders } from "@/app/_controllers/rider";
import { NextRequest } from "next/server";
import { mockGetAllRidersResponse } from "../../../_constants/mock-data/rider/mock-models";

// Mocking the controller module directly
jest.mock("../../../_controllers/rider");

const mockGetMultipleRidersURL = "http://localhost/api/latest/rider/?ids=25,26";
const mockGetAllRidersURL = "http://localhost/api/latest/rider/";

describe("GET /api/rider/", () => {
  it("should return multiple riders", async () => {
    jest
      .mocked(getMultipleRiders)
      .mockResolvedValueOnce(mockGetAllRidersResponse);

    const request = new NextRequest(mockGetMultipleRidersURL);
    const apiResponse = await GET(request);

    expect(apiResponse.status).toBe(200);
    const data = await apiResponse.json();
    expect(data).toEqual(mockGetAllRidersResponse);
  });

  it("should return 500 on internal server error", async () => {
    const mockErrorMessage = "Error message";
    jest.mocked(getMultipleRiders).mockRejectedValueOnce(mockErrorMessage);

    const request = new NextRequest(mockGetAllRidersURL);
    const apiResponse = await GET(request);

    expect(apiResponse.status).toBe(500);
    const data = await apiResponse.json();
    expect(data).toEqual({
      error: mockErrorMessage,
    });
  });
});
