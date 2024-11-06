import { calculatePoints } from "./ranking.mjs";

describe("calculatePoints", () => {
  test("should award maximum points for 1st place", () => {
    expect(calculatePoints(100, 1)).toBe(100);
  });

  test("should award points for a middle position within the top 10%", () => {
    expect(calculatePoints(620, 12)).toBeGreaterThan(0);
    expect(calculatePoints(620, 12)).toBeLessThan(100);
  });

  test("should award minimum points for the last position within the top 10%", () => {
    const totalRacers = 620;
    const lastTop10PercentPosition = Math.ceil(totalRacers * 0.1);
    expect(
      calculatePoints(totalRacers, lastTop10PercentPosition),
    ).toBeGreaterThan(0);
  });

  test("should award 0 points for positions outside the top 10%", () => {
    const totalRacers = 620;
    const positionOutsideTop10Percent = Math.ceil(totalRacers * 0.1) + 1;
    expect(calculatePoints(totalRacers, positionOutsideTop10Percent)).toBe(0);
  });

  test("should throw an error for invalid position less than 1", () => {
    expect(() => calculatePoints(100, 0)).toThrow(
      "Position must be between 1 and the total number of racers.",
    );
  });

  test("should throw an error for position greater than total racers", () => {
    expect(() => calculatePoints(100, 101)).toThrow(
      "Position must be between 1 and the total number of racers.",
    );
  });
});
