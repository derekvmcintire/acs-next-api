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

export interface IRider {
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

export interface ItblRider {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  country: string;
  hometown: string;
  photo: string;
  strava: string;
  insta: string;
  about: string;
}

export default class RiderService {
  static #buildRider(rider: any): IRider {
    const newRider: IRider = {
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
    const riders: any[] = await RiderDAO.getRidersWithPrisma();
    return this.#mapRiders(riders);
  }
}
