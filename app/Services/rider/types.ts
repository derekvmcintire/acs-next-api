import { Rider as PrismaRider } from "@prisma/client";

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

export interface IGetRidersParams {
  teamName?: string;
  country?: string;
  name?: string;
  ids?: number[];
  id?: number;
}

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
>;

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
