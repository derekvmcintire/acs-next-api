// Rider Data Types

export interface IRiderName {
  first: string;
  last: string;
}

export interface ITeam {
  id: number;
  name: string;
  year: number;
  url: string | null;
  description: string | null;
}

export interface ISocials {
  strava?: string;
  insta?: string;
}

export interface ICategory {
  discipline: string;
  category: number;
}

export interface IHometown {
  country: string | null;
  city: string | null;
}

export interface IRider {
  id: number;
  currentTeam?: string | null;
  name: IRiderName;
  teams?: ITeam[] | null;
  socials: ISocials;
  categories: ICategory[];
  hometown: IHometown;
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

// DB Table Row Types

export interface TeamRow {
  id: number;
  name: string;
  year: number;
  url: string | null;
  description: string | null;
}

export interface JoinRiderTeamRow {
  id: number;
  riderId: number;
  teamId: number;
  team: TeamRow;
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
