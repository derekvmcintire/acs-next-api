import { IResult } from "../_types/result/types";

export type RiderTotalPoints = {
  totalPoints: number;
  riderId: number;
  firstName: string;
  lastName: string;
  hometown: string | null;
  country: string | null;
};

export function calculateTotalPoints(results: IResult[]): RiderTotalPoints[] {
  const pointsMap = results.reduce(
    (acc, result) => {
      const riderKey = result?.rider?.id;
      const rider = result?.rider;
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
  if (aggregatedResults && aggregatedResults[0]) {
    console.log("returnin: ", aggregatedResults[0]);
  }

  return aggregatedResults;
}
