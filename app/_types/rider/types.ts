import { ITeam, JoinRiderTeamRow } from "../team/types";

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
  discipline: string;
  category: number;
}

export interface SubRiderHometown {
  country: string | null;
  city: string | null;
}

export interface IRider {
  id: number;
  currentTeam?: string | null;
  name: SubRiderName;
  teams?: ITeam[] | null;
  socials: SubRiderSocials;
  categories: SubRiderCategory[];
  hometown: SubRiderHometown;
  dob: string;
  photo: string;
  wins?: number;
}

// Request Types
export interface IGetRidersParams {
  teamName?: string;
  country?: string;
  name?: string;
  ids?: number[];
  id?: number;
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

// Query Building Types
export type RiderWhereInput = {
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
    firstName?: { contains: string; mode?: "insensitive" };
    lastName?: { contains: string; mode?: "insensitive" };
  }>;
  AND?: Array<{
    firstName?: { contains: string; mode?: "insensitive" };
    lastName?: { contains: string; mode?: "insensitive" };
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
      firstName?: { contains: string; mode?: "insensitive" };
      lastName?: { contains: string; mode?: "insensitive" };
    }>;
  }>;
};
