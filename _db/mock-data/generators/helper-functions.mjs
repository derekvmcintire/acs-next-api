import { SPONSORS } from '../constants/teams.mjs';

/******************************/

export const floorMap = (decimalValue, maxValue) => {
  if (decimalValue < 0 || decimalValue > 1) {
    return 0;
  }
  return Math.floor(decimalValue * maxValue) + 1;
}

/******************************/

export const generateRandomNumber = (max = 1000) => floorMap(Math.random(), max);

/******************************/

export const generateRandomString = (maxLength = 15) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';

  // const length = Math.floor(Math.random() * maxLength) + 1;
  const length = floorMap(Math.random(), maxLength);
  const randomIndex = () => Math.floor(Math.random() * characters.length);

  return Array.from({ length }, () => characters[randomIndex()]).join('');
};

/******************************/

export const getFutureDateTimestamp = (startDate, days) => {
  return new Date(startDate.setDate(startDate.getDate() + days)).getTime();
};

/******************************/

export const generateRandomDateTimestamp = (year = new Date().getFullYear()) => {
  const startTimestamp = new Date(year, 0, 1).getTime();
  const endTimestamp = new Date(year, 11, 31).getTime();

  const randomTimestamp =
    Math.floor(Math.random() * (endTimestamp - startTimestamp + 1)) + startTimestamp;

  return new Date(randomTimestamp).toDateString();
};

/******************************/

export const getRandomBirthday = () => {
  const today = new Date();
  const maxAge = 40;
  const minAge = 17;

  const maxBirthYear = today.getFullYear() - minAge;
  const minBirthYear = today.getFullYear() - maxAge;

  const randomYear = Math.floor(Math.random() * (maxBirthYear - minBirthYear + 1)) + minBirthYear;
  const randomMonth = Math.floor(Math.random() * 12);
  const daysInMonth = new Date(randomYear, randomMonth + 1, 0).getDate();
  const randomDay = floorMap(Math.random(), daysInMonth)

  return new Date(randomYear, randomMonth, randomDay).toDateString();
}

/******************************/

export const getRandomPastYear = (n) => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - n;
  const randomYear = Math.floor(Math.random() * (currentYear - startYear + 1)) + startYear;

  return randomYear;
};

/******************************/

export const getListOfPastYears = (n) => {
  const startingYear = getRandomPastYear(5);
  const years = [startingYear];
  for (let i = 1; i <= n; i++) {
    const nextYear = startingYear - i;
    years.push(nextYear);
  }
  return years;
};

/******************************/

export const generateRandomTeam = (n) => {
  const min = 2;
  const randomNumber = generateRandomNumber(n);
  const numberOfWords = randomNumber < min ? min : randomNumber;


  let team = '';
  for (let i = 0; i < numberOfWords; i++) {
    const word = SPONSORS[generateRandomNumber(SPONSORS.length - 1)];
    team = `${team} ${word}`;
  }

  return team.trim();
};

/******************************/

export const calculateMockUpgradePoints = (place, racers) =>
  place > racers * 0.9 ? generateRandomNumber(10) : 0;