import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insert some sample data
  await prisma.tblRider.createMany({
    data: [
      {
        firstName: 'John',
        lastName: 'Doe',
        dob: '1990-01-01',
        country: 'USA',
        hometown: 'New York',
        photo: 'http://example.com/photo1.jpg',
        strava: 'john_doe_strava',
        insta: 'john_doe_insta',
        about: 'Loves cycling',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        dob: '1995-05-15',
        country: 'Canada',
        hometown: 'Toronto',
        photo: 'http://example.com/photo2.jpg',
        strava: 'jane_smith_strava',
        insta: 'jane_smith_insta',
        about: 'Avid runner',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
