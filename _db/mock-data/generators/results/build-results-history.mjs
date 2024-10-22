import { buildMockRace } from './build-race-results.mjs';
import { generateRandomNumber, getListOfPastYears } from '../helper-functions.mjs';


export const RACE_TYPES = {
  HILL: 'hill',
  ROAD: 'road',
  CX: 'cx',
  XC: 'xc',
  TT: 'tt',
  STAGE: 'stage',
};

export const buildMockRacesForSingleYear = () => {
  const raceTypes = Object.values(RACE_TYPES);

  const randomNumberOfRaces = generateRandomNumber(40);

  const races = [];
  for (let i = 0; i < randomNumberOfRaces; i++) {
    const randomRaceType = raceTypes[generateRandomNumber(raceTypes.length - 1)];
    races.push(buildMockRace(randomRaceType));
  }

  return races;
};

export const buildMockRacingHistory = (numberOfYears = generateRandomNumber(10)) => {
  const listOfYears = getListOfPastYears(numberOfYears);
  return listOfYears.map((y) => {
    return {
      year: y,
      races: buildMockRacesForSingleYear(),
    };
  });
};
