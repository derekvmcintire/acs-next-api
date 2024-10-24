import RiderDAO from "@/app/DAOs/rider";

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

export interface IRiderInfo {
  id: number;
  currentTeam?: string;
  name: IRiderName;
  teams: ITeam[];
  socials: ISocials;
  categories: ICategory[];
  hometown: IHometown;
  dob: string;
  photo: string;
  wins?: number;
  topResults?: any[];
}

export default class RiderService {
  static #buildRider(rider: any): IRiderInfo {
    const newRider: IRiderInfo = {
      id: rider.id,
      currentTeam: "Some Team",
      name: {
        first: rider.firstname,
        last: rider.lastname,
      },
      teams: [],
      socials: {
        strava: rider.strava,
        insta: rider.insta || "",
      },
      categories: [{ discipline: "road", category: 1 }],
      hometown: {
        country: rider.country,
        city: rider.hometown,
      },
      dob: rider.dob,
      photo: rider.photo,
      wins: 43,
      topResults: [],
    };
    return newRider;
  }

  static #mapRiders(riders: any[]) {
    return riders.map((rider: any) => {
      return this.#buildRider(rider);
    });
  }

  static async getRiders() {
    const riders = await RiderDAO.getRiders();
    return this.#mapRiders(riders);
  }
}
