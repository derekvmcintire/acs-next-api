import { GET as GET } from "./route";
import { NextRequest, NextResponse } from "next/server";
import { getRiderById } from "../../../_controllers/rider";
import { jest } from "@jest/globals";
import { mockGetRiderByIdResponse } from "../mock-data";

// Mocking the controller function directly
jest.mock("../../../_controllers/rider");

describe("GET /api/rider/[id]", () => {
  const context = {
    params: Promise.resolve({ id: String(mockGetRiderByIdResponse.id) }),
  };

  it("should return a rider by ID", async () => {
    // Create a mock NextResponse
    const response = NextResponse.json(mockGetRiderByIdResponse, {
      status: 200,
    });
    jest.mocked(getRiderById).mockResolvedValueOnce(response);

    const request = new NextRequest("http://localhost/api/rider/25");
    const apiResponse = await GET(request, context);

    expect(apiResponse.status).toBe(200);
    const data = await apiResponse.json();
    expect(data).toEqual(mockGetRiderByIdResponse);
  });

  it("should return 404 if rider is not found", async () => {
    const response = NextResponse.json(
      { error: "Rider not found" },
      { status: 404 },
    );
    jest.mocked(getRiderById).mockResolvedValueOnce(response);

    const request = new NextRequest("http://localhost/api/rider/25");
    const apiResponse = await GET(request, context);

    expect(apiResponse.status).toBe(404);
    const data = await apiResponse.json();
    expect(data).toEqual({ error: "Rider not found" });
  });

  it("should return 500 on internal server error", async () => {
    const response = NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
    jest.mocked(getRiderById).mockResolvedValueOnce(response);

    const request = new NextRequest("http://localhost/api/rider/25");
    const apiResponse = await GET(request, context);

    expect(apiResponse.status).toBe(500);
    const data = await apiResponse.json();
    expect(data).toEqual({ error: "Internal Server Error" });
  });
});

// // Tests for GET /api/rider/ endpoint

// import { GET as getMultipleRiders } from "@/app/api/rider/route";
// import { getMultipleRiders as fetchMultipleRiders } from "@/app/_controllers/rider";

// describe("GET /api/rider/", () => {
//   const mockGetRiderByIdResponses = [
//     { id: 25, name: { first: "John", last: "Doe" } },
//     { id: 26, name: { first: "Jane", last: "Smith" } },
//   ];

//   it("should return multiple riders", async () => {
//     const response = NextResponse.json(mockRiders, { status: 200 });
//     jest.mocked(fetchMultipleRiders).mockResolvedValueOnce(response);

//     const request = new NextRequest("http://localhost/api/rider/?ids=25,26");
//     const apiResponse = await getMultipleRiders(request);

//     expect(apiResponse.status).toBe(200);
//     const data = await apiResponse.json();
//     expect(data).toEqual(mockRiders);
//   });

//   it("should return 500 on internal server error", async () => {
//     const response = NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     jest.mocked(fetchMultipleRiders).mockResolvedValueOnce(response);

//     const request = new NextRequest("http://localhost/api/rider/");
//     const apiResponse = await getMultipleRiders(request);

//     expect(apiResponse.status).toBe(500);
//     const data = await apiResponse.json();
//     expect(data).toEqual({ error: "Internal Server Error" });
//   });
// });
