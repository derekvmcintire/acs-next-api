import { buildMockRacerInfo } from '../rider/build-rider.mjs';
import { generateRandomNumber } from '../helper-functions.mjs';

export const createRiders = async (client) => {
  const teams = await client.team.findMany();
  const categories = await client.category.findMany();
  
  for (let i=1; i < 100; i++) {
    const riderTeamId = teams[generateRandomNumber(teams.length - 1)].id;
    const riderCategoryId = categories[generateRandomNumber(categories.length - 1)].id;
    const data = buildMockRacerInfo();

    // insert rider
    const rider = await client.rider.create({
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

      // insert into joinRiderTeam
      await client.joinRiderTeam.create({
        data: {
          rider: {connect: {id: rider.id}},
          team: {connect: {id: riderTeamId}},
        }
      })

      // insert into joinRiderCategory
      await client.joinRiderCategory.create({
        data: {
          rider: {connect: {id: rider.id}},
          category: {connect: {id: riderCategoryId}}
        }
      })
  }
}