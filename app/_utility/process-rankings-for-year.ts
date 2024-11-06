import { IResult } from "../_types/result/types";

// export type RiderResult = {
//   points: number | null;
//   rider: {
//     id: number;
//     firstName: string;
//     lastName: string;
//     hometown: string | null;
//     country: string | null;
//     JoinRiderTeam: { name: string | null }[]; // assuming it's an array with at least one entry
//   };
// };

export type RiderTotalPoints = {
  totalPoints: number;
  riderId: number;
  firstName: string;
  lastName: string;
  hometown: string | null;
  country: string | null;
  teamName: string | null;
};

export function calculateTotalPoints(results: IResult[]): RiderTotalPoints[] {
  const pointsMap = results.reduce(
    (acc, result) => {
      const riderKey = result?.rider?.id;
      const rider = result?.rider;
      const riderTeam = rider?.JoinRiderTeam ? rider?.JoinRiderTeam[0] : "";
      const teamName = riderTeam?.team?.name || "";
      if (!riderKey || !rider || !rider?.id) {
        return acc;
      }

      if (!acc[riderKey]) {
        acc[riderKey] = {
          totalPoints: 0,
          riderId: rider.id,
          firstName: rider.firstName,
          lastName: rider.lastName,
          hometown: rider.hometown,
          country: rider.country,
          teamName: teamName, // assuming team name is in the first array entry
        };
      }

      // Accumulate points, treating null as 0
      acc[riderKey].totalPoints += result.points ?? 0;

      return acc;
    },
    {} as Record<number, RiderTotalPoints>,
  );

  const aggregatedResults = Object.values(pointsMap);
  aggregatedResults.sort((a, b) => b.totalPoints - a.totalPoints);

  return aggregatedResults;
}
