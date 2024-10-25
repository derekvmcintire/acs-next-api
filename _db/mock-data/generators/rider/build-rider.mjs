import { FIRST_NAMES, LAST_NAMES } from '../../constants/names.mjs';
import { COUNTRIES, CITIES } from '../../constants/hometowns.mjs';
import { IMG_URLS } from '../../constants/photos.mjs';
import { generateRandomNumber, generateRandomString, getRandomBirthday } from '../helper-functions.mjs';

export const buildMockRacerInfo = () => {
  return {
    firstName: FIRST_NAMES[generateRandomNumber(FIRST_NAMES.length - 1)],
    lastName: LAST_NAMES[generateRandomNumber(LAST_NAMES.length - 1)],
    dob: getRandomBirthday(),
    country: COUNTRIES[generateRandomNumber(COUNTRIES.length - 1)],
    hometown: CITIES[generateRandomNumber(CITIES.length - 1)],
    photo: IMG_URLS[generateRandomNumber(IMG_URLS.length - 1)],
    strava: String(generateRandomNumber(10000000)),
    insta: generateRandomString(),
    about: 'They think I\'m just some dumb hick. They said that to me, at a dinner!'
  };
};
