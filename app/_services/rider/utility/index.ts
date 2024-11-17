import { RiderRow, IRider } from "@/app/_types/rider/types";
import { ITeam, JoinRiderTeamRow } from "@/app/_types/team/types";

export const buildRiderTeam = (teams: JoinRiderTeamRow[]): ITeam[] => {
  return teams.map((row: JoinRiderTeamRow) => {
    return {
      year: row.team.year,
      name: row.team.name,
      id: row.team.id,
      url: row.team.url || "",
      description: row.team.description || "",
    };
  });
};

export const buildRider = (rider: RiderRow): IRider => {
  const teams: ITeam[] = buildRiderTeam(rider.JoinRiderTeam || []);
  const currentTeam = teams && teams.length > 0 ? teams[0]?.name : "";

  if (!rider || !rider.id) {
    throw new Error("Missing rider id");
  }

  const newRider: IRider = {
    id: rider.id,
    currentTeam: currentTeam,
    name: {
      first: rider.firstName || "",
      last: rider.lastName || "",
    },
    teams,
    socials: {
      strava: rider.strava || "",
      insta: rider.insta || "",
    },
    categories: [{ disicpline: "road", category: 1 }],
    hometown: {
      country: rider.country,
      city: rider.hometown,
    },
    dob: rider.dob || "",
    photo: rider.photo || "",
    wins: 43,
  };
  return newRider;
};
