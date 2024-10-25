import { buildMockStagesForStageRace } from './build-stage-race-results.mjs';
import { generateRandomNumber, generateRandomString, getFutureDateTimestamp, generateRandomDateTimestamp } from '../helper-functions.mjs';
import { floorMap } from '../helper-functions.mjs';
import { COUNTRIES, CITIES } from '../../constants/hometowns.mjs';
import { PREFIXES, POSTFIXES, SEPARATORS } from '../../constants/races.mjs';



export const getRacePlace = (n) => {
  // Random number is scaled using a quadractic function to make it more likely to get a higher scaledValue
  const scaledValue = Math.sqrt(Math.random());
  return floorMap(scaledValue, n);
}

export const buildRaceName = () => {
  const n = generateRandomNumber(100);
  const locationOne = CITIES[generateRandomNumber(CITIES.length - 1)];
  const locationTwo = CITIES[generateRandomNumber(CITIES.length - 1)];

  if (n < 50) {
    const prefix = PREFIXES[generateRandomNumber(PREFIXES.length - 1)]
    return `${prefix}${locationOne}`;
  } else if (n < 90) {
    const separator = SEPARATORS[generateRandomNumber(SEPARATORS.length - 1)];
    return `${locationOne}${separator}${locationTwo}`;
  }
  const postfix = POSTFIXES[generateRandomNumber(POSTFIXES.length - 1)]
  return `${locationOne} ${postfix}`
}

export const buildMockRace = (raceType = 'road') => {
  const startDate = generateRandomDateTimestamp();
  const endDate =
    raceType === 'stage' ? String(getFutureDateTimestamp(new Date(startDate), 3)) : null;
  const racers = generateRandomNumber(85);
  const place = getRacePlace(racers);
  const upgradePoints = place > racers * 0.9 ? generateRandomNumber(10) : 0;
  const shouldDnf = generateRandomNumber(75) > 75 * 0.9;

  const race = {
    name: buildRaceName(),
    type: raceType,
    startDate,
    endDate,
    category: `Cat ${generateRandomNumber(4) + 1}`,
    place: shouldDnf ? 0 : place,
    racers,
    points: generateRandomNumber(800),
    upgPoints: upgradePoints,
    stages: null,
    noPlaceCode: shouldDnf ? 'DNF' : null,
  };

  if (raceType === 'stage') {
    race.stages = buildMockStagesForStageRace(race, 3);
  }

  return race;
};
