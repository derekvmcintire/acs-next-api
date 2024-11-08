/*
ACS Point System
Top 20% of finishers receive points.
*/
export const MIN_FINISHERS = 5;
export const MIN_POINTS = 20;
export const MAX_POINTS = 200;
export const MAX_FINISHERS = 1000;
export const POINT_SCALING_RANGE = MAX_POINTS - MIN_POINTS;

export function calculatePoints(totalRacers, position) {
  if (totalRacers < MIN_FINISHERS) {
    return 0; // No points if there are fewer than 5 racers
  }
  if (position < 1 || position > totalRacers) {
    throw new Error('Position must be between 1 and the total number of racers.');
  }

  // Calculate maxPoints using logarithmic scaling
  const logTotalRacers = Math.log(totalRacers + 1); // Adding 1 to avoid log(0)
  const logMaxRacers = Math.log(MAX_FINISHERS + 1); // Same as above
  const logScaledPoints = MIN_POINTS + (logTotalRacers / logMaxRacers) * POINT_SCALING_RANGE;

  // Define the minimum points awarded to the last position in the top 20%
  const minPoints = 10;

  // Determine the number of racers in the top 20%
  const topFinishers = Math.ceil(totalRacers * 0.2);

  if (position > topFinishers) {
    return 0; // No points outside the top 20%
  }

  // Calculate the decrement to distribute points across the top finishers
  const pointDecrement = (logScaledPoints - minPoints) / (topFinishers - 1);

  // Calculate points based on position
  const points = logScaledPoints - (position - 1) * pointDecrement;
  return Math.round(points);
}

/*
### Explanation of Point Stysem

- **Dynamic Point Decrement**: We calculate `pointDecrement` by dividing the range from `maxPoints` (100) to `minPoints` (10) by the number of top finishers minus one. This way, points decrease gradually and ensure that even the last finisher within the top 10% receives at least the `minPoints` value.
- **Rounding**: We use `Math.round` to keep the points as whole numbers.

### Example Calculation

For `620` racers and a `position` of `12`:

1. **Top 10% Calculation**:
   - \( \text{topFinishers} = \text{Math.ceil}(620 \times 0.1) = 62 \)

2. **Position Check**:
   - `12` is within the top `62`, so we proceed with point calculation.

3. **Points Calculation**:
   - \( \text{pointDecrement} = \frac{100 - 10}{62 - 1} = \frac{90}{61} \approx 1.48 \)
   - Points for the 12th place position:
     \[
     \text{points} = 100 - (12 - 1) \times 1.48 \approx 100 - 16.28 \approx 84
     \]

Thus, a 12th-place finisher would receive approximately **84 points** under this setup.

### Example usage:

```typescript
const totalRacers = 620;
const finishingPosition = 12;

const points = calculatePoints(totalRacers, finishingPosition);
console.log(`Points for finishing 12th out of 620 racers: ${points}`);
```
*/
