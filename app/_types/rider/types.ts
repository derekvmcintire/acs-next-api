import { ITeam, JoinRiderTeamRow } from "@/app/_types/team/types";

// Rider Data Types
export interface SubRiderName {
  first: string;
  last: string;
}

export interface SubRiderSocials {
  strava?: string;
  insta?: string;
}

export interface SubRiderCategory {
  disicpline: string;
  category: number;
}

export interface SubRiderHometown {
  country: string | null;
  city: string | null;
}

export interface BaseRider {
  id?: number;
  dob: string;
  photo: string;
}

export interface IRider extends BaseRider {
  currentTeam?: string | null;
  name: SubRiderName;
  teams?: ITeam[] | null;
  socials: SubRiderSocials;
  categories: SubRiderCategory[];
  hometown: SubRiderHometown;
  wins?: number;
}

// used for rankings
export type JoinRiderTeam = {
  team: { name: string };
};

export interface TransformedRider extends BaseRider {
  firstName: string;
  lastName: string;
  country: string;
  hometown: string;
  strava: string;
  insta: string;
  about: string;
  JoinRiderTeam?: JoinRiderTeam[];
}

// Request Types
export interface IGetRidersParams {
  teamName?: string;
  country?: string;
  name?: string;
  ids?: number[];
  id?: number;
}

export interface IGetRankingsParams {
  limit?: number;
  year?: number;
}

export interface AssignRiderToTeamParams {
  riderId: number;
  teamId: number;
}

export interface RiderRow {
  id?: number;
  firstName: string | null;
  lastName: string | null;
  dob: string | null;
  country: string | null;
  hometown: string | null;
  photo: string | null;
  strava: string | null;
  insta: string | null;
  about: string | null;
  JoinRiderTeam?: JoinRiderTeamRow[] | null;
}

type InsensitiveStringSearch = { contains: string; mode?: "insensitive" };

// Query Building Types
export type RiderWhereInput = {
  id?: { in?: number[] };
  JoinRiderTeam?: {
    some: {
      team: {
        name: {
          contains: string;
          mode?: "insensitive";
        };
      };
    };
  };
  country?: string;
  OR?: Array<{
    firstName?: InsensitiveStringSearch;
    lastName?: InsensitiveStringSearch;
  }>;
  AND?: Array<{
    firstName?: InsensitiveStringSearch;
    lastName?: InsensitiveStringSearch;
    id?: { in?: number[] };
    JoinRiderTeam?: {
      some: {
        team: {
          name: string;
        };
      };
    };
    country?: string;
    OR?: Array<{
      firstName?: InsensitiveStringSearch;
      lastName?: InsensitiveStringSearch;
    }>;
  }>;
};
