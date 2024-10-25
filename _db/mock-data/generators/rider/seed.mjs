import { PrismaClient } from '@prisma/client';
import { buildMockRacerInfo } from './build-rider.mjs';

const prisma = new PrismaClient();

const insertRider = async (data) => {
  await prisma.tblRider.create({
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
