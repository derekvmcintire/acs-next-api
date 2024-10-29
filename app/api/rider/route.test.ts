import { GET } from "@/app/api/rider/route";
import { getMultipleRiders } from "@/app/_controllers/rider";
import { NextResponse, NextRequest } from "next/server";
import { mockGetAllRidersResponse } from "./mock-data";

// Mocking the controller function directly
jest.mock("../../_controllers/rider");

describe("GET /api/rider/", () => {
  it("should return multiple riders", async () => {
    const response = NextResponse.json(mockGetAllRidersResponse, {
      status: 200,
    });
    jest.mocked(getMultipleRiders).mockResolvedValueOnce(response);

    const request = new NextRequest("http://localhost/api/rider/?ids=25,26");
    const apiResponse = await GET(request);

    expect(apiResponse.status).toBe(200);
    const data = await apiResponse.json();
    expect(data).toEqual(mockGetAllRidersResponse);
  });

  it("should return 500 on internal server error", async () => {
    const response = NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
    jest.mocked(getMultipleRiders).mockResolvedValueOnce(response);

    const request = new NextRequest("http://localhost/api/rider/");
    const apiResponse = await GET(request);

    expect(apiResponse.status).toBe(500);
    const data = await apiResponse.json();
    expect(data).toEqual({ error: "Internal Server Error" });
  });
});
