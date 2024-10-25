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
}
