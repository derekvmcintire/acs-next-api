import { generateRandomTeam } from '../helper-functions.mjs';

export const createTeams = async (client) => {
  for (let i=0; i < 10; i++) {
    const teamName = generateRandomTeam(4);
       await client.team.create({
        data: {
          name: teamName,
          year: 2024,
          url: '',
          description: `${teamName} is a racing community. We help each other keep things dialed on and off the bike to realize one another\'s  athletic goals.`
        }
      })
  }
}