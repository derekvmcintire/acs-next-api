/******************************/

export const generateRandomNumber = (max: number = 1000) => Math.floor(Math.random() * max) + 1;

/******************************/

export const generateRandomString = (maxLength: number = 15) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';

  const length = Math.floor(Math.random() * maxLength) + 1;
  const randomIndex = () => Math.floor(Math.random() * characters.length);

  return Array.from({ length }, () => characters[randomIndex()]).join('');
};

/******************************/

export const getFutureDateTimestamp = (startDate: Date, days: number) => {
  return new Date(startDate.setDate(startDate.getDate() + days)).getTime();
};

/******************************/

export const generateRandomDateTimestamp = (year: number = new Date().getFullYear()) => {
  const startTimestamp = new Date(year, 0, 1).getTime();
  const endTimestamp = new Date(year, 11, 31).getTime();

  const randomTimestamp =
    Math.floor(Math.random() * (endTimestamp - startTimestamp + 1)) + startTimestamp;

  return new Date(randomTimestamp).toDateString();
};

/******************************/

export const getRandomPastYear = (n: number): number => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - n;
  const randomYear: number = Math.floor(Math.random() * (currentYear - startYear + 1)) + startYear;

  return randomYear;
};

/******************************/

export const getListOfPastYears = (n: number): number[] => {
  const startingYear: number = getRandomPastYear(5);
  const years: number[] = [startingYear];
  for (let i = 1; i <= n; i++) {
    const nextYear = startingYear - i;
    years.push(nextYear);
  }
  return years;
};
