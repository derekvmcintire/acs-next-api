/*
ACS Point System
Top 10% of finishers receive points.
*/
export function calculatePoints(totalRacers, position) {
  if (position < 1 || position > totalRacers) {
    throw new Error(
      "Position must be between 1 and the total number of racers.",
    );
  }

  // Determine the number of racers in the top 10%
  const topFinishers = Math.ceil(totalRacers * 0.1);

  // Check if the position is within the top 10%
  if (position > topFinishers) {
    return 0; // Positions outside the top 10% receive no points
  }

  // Define the highest points for the top finisher and the lowest for the last position in top 10%
  const maxPoints = 100;
  const minPoints = 10;

  // Calculate the decrement dynamically to distribute points across top 10%
  const pointDecrement = (maxPoints - minPoints) / (topFinishers - 1);

  // Calculate points for the position
  const points = maxPoints - (position - 1) * pointDecrement;
  return Math.round(points); // Round to nearest whole number for simplicity
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
