import { buildMockRacerInfo } from '../rider/build-rider.mjs';


export const createRiders = async (client) => {
  for (let i=1; i < 100; i++) {
      const data = buildMockRacerInfo();
      await client.rider.create({
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            dob: data.dob,
            country: data.country,
            hometown: data.hometown,
            photo: data.photo,
            strava: data.strava,
            insta: data.insta,
            about: data.about,
          },
      });
  }
}