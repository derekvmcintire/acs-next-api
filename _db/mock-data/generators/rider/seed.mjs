import { PrismaClient } from '@prisma/client';
import { buildMockRacerInfo } from './build-rider.mjs';
import { generateRandomTeam } from "../helper-functions.mjs";


const prisma = new PrismaClient();

// Clear Database
const clearDB = async () => {
  const deleteTeams = await prisma.team.deleteMany();
  const deleteRiders = await prisma.rider.deleteMany();
  return [deleteTeams, deleteRiders];
}

// Create and insert Teams
const teams = [];

const insertTeam = async (data) => {
  await prisma.team.create({
    data: {
      name: data.name,
      year: 2024,
      url: '',
      description: `${data.name} is a racing community. We help each other keep things dialed on and off the bike to realize one another\'s  athletic goals.`
    }
  })
}

const createTeams = () => {
  for (let i=0; i < 10; i++) {
      const newTeam = {
          name: generateRandomTeam(4)
      }
      insertTeam(newTeam)
  }
  return teams;
}

// Create and insert Riders
const insertRider = async (data) => {
  await prisma.rider.create({
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

const createRiders = () => {
  for (let i=1; i < 100; i++) {
      const newRider = buildMockRacerInfo();
      insertRider(newRider);
  }
}

async function main() {
  const cleared = await clearDB();
  createTeams();
  createRiders();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
