export interface ITeam {
  id: number;
  name: string;
  year: number;
  url: string | null;
  description: string | null;
}

export interface TeamRow {
  id: number;
  name: string;
  year: number;
  url: string | null;
  description: string | null;
}

export interface JoinRiderTeamRow {
  // @TODO: Think about where this lives
  id: number;
  riderId: number;
  teamId: number;
  team: TeamRow;
}
