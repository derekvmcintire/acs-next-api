import { generateRandomNumber, generateRandomString, getFutureDateTimestamp, calculateMockUpgradePoints } from '../helper-functions.mjs';

const buildMockStage = (raceData, stageType = 'road') => {
  const stages = raceData?.stages !== null ? raceData.stages : [];

  const startDate =
    stages.length > 0
      ? getFutureDateTimestamp(new Date(stages[stages.length - 1].startDate), 1)
      : raceData.startDate;

  return {
    name: generateRandomString(),
    stageNumber: stages.length,
    type: stageType,
    startDate: String(startDate),
    place: generateRandomNumber(raceData.racers),
    racers: raceData.racers,
    points: generateRandomNumber(800),
    upgPoints: calculateMockUpgradePoints(raceData.place, raceData.racers),
    noPlaceCode: raceData.place ? null : 'DNF',
  };
};

export const buildMockStagesForStageRace = (raceData, n) => {
  const stageTypes = ['road', 'hill', 'xc', 'cx'];
  const randomStageType = stageTypes[generateRandomNumber(stageTypes.length - 1)];

  const stages = [];
  for (let i = 0; i < n; i++) {
    stages.push(buildMockStage(raceData, randomStageType));
  }

  return stages;
};
