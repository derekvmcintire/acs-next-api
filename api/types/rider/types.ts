import {
  Rider as PrismaRider,
  Team as PrismaTeam,
  JoinRiderTeam as PrismaJoinRiderTeam,
} from "@prisma/client";

// Rider Data Types

export interface IRiderName {
  first: string;
  last: string;
}

export interface ITeam {
  year: number;
  name: string;
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

// DB Table Row Types
export type TeamRow = Pick<PrismaTeam, "year" | "name">;

export type JoinRiderTeamRow = {
  id: number;
  riderId: number;
  teamId: number;
  team: TeamRow;
};

export type RiderRow = Pick<
  PrismaRider,
  | "id"
  | "firstName"
  | "lastName"
  | "dob"
  | "country"
  | "hometown"
  | "photo"
  | "strava"
  | "insta"
  | "about"
> & {
  JoinRiderTeam: JoinRiderTeamRow[];
};

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
};
