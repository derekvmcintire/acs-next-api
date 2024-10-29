import { GET as GET } from "./route";
import { NextRequest } from "next/server";
import { getRiderById } from "@/app/_controllers/rider";
import { jest } from "@jest/globals";
import { mockGetRiderByIdResponse } from "../mock-data";
import {
  getInternalServerErrorMessage,
  getRiderNotFoundErrorMessage,
} from "@/app/_constants/errors";

// Mocking the controller module directly
jest.mock("../../../../_controllers/rider");

const mockId = mockGetRiderByIdResponse.id;
const mockURL = `http://localhost/api/latest/rider/${mockId}`;

describe("GET /api/rider/[id]", () => {
  const context = {
    params: Promise.resolve({ id: String(mockId) }),
  };

  it("should return a rider by ID", async () => {
    jest.mocked(getRiderById).mockResolvedValueOnce(mockGetRiderByIdResponse);

    const request = new NextRequest(mockURL);
    const apiResponse = await GET(request, context);
    expect(apiResponse.status).toBe(200);

    const data = await apiResponse.json();
    expect(data).toEqual(mockGetRiderByIdResponse);
  });

  it("should return 404 if rider is not found", async () => {
    jest.mocked(getRiderById).mockResolvedValueOnce(null);

    const request = new NextRequest(mockURL);
    const apiResponse = await GET(request, context);
    expect(apiResponse.status).toBe(404);

    const data = await apiResponse.json();
    expect(data).toEqual({
      error: getRiderNotFoundErrorMessage(String(mockId)),
    });
  });

  it("should return 500 on internal server error", async () => {
    const mockErrorMessage = "Error message";
    jest.mocked(getRiderById).mockRejectedValueOnce(mockErrorMessage);

    const request = new NextRequest(mockURL);
    const apiResponse = await GET(request, context);
    expect(apiResponse.status).toBe(500);

    const data = await apiResponse.json();
    expect(data).toEqual({
      error: getInternalServerErrorMessage(mockErrorMessage),
    });
  });
});
