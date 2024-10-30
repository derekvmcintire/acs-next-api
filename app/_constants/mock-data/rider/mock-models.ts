import { IGetRidersParams, IRider, RiderRow } from "@/app/_types/rider/types";
import {
  mockTeamName,
  mockName,
  mockRiderId,
  mockCategory,
  mockTeam,
  mockSocials,
  mockHometown,
  mockDob,
  mockPhoto,
  mockWins,
  mockAbout,
} from "./mock-values";

// mock IRider values
export const mockGetRiderByIdResponse: IRider = {
  id: mockRiderId,
  currentTeam: mockTeamName,
  name: mockName,
  teams: [mockTeam],
  socials: mockSocials,
  categories: [mockCategory],
  hometown: mockHometown,
  dob: mockDob,
  photo: mockPhoto,
  wins: mockWins,
};

export const mockGetAllRidersResponse: IRider[] = [
  { ...mockGetRiderByIdResponse, id: 1 },
  { ...mockGetRiderByIdResponse, id: 2 },
  { ...mockGetRiderByIdResponse, id: 3 },
  { ...mockGetRiderByIdResponse, id: 4 },
  { ...mockGetRiderByIdResponse, id: 5 },
];

/// mock RiderRow values
export const mockFindUniqueQueryResponse: RiderRow = {
  id: mockRiderId,
  firstName: mockName.first,
  lastName: mockName.last,
  dob: mockDob,
  country: mockHometown.country,
  hometown: mockHometown.city,
  photo: mockPhoto,
  strava: mockSocials.strava,
  insta: mockSocials.insta,
  about: mockAbout,
};

export const mockGetMultipleRiderParams: IGetRidersParams = {
  teamName: "Human",
};
