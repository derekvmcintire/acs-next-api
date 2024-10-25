import { PrismaClient } from '@prisma/client';
import { clearDB } from './seed-helpers/cleardb.mjs';
import { createTeams } from './seed-helpers/team.mjs';
import { createRiders } from './seed-helpers/rider.mjs';
import { createRaces } from './seed-helpers/race.mjs';
import { createCategories, createRaceTypes, createResultTypes, createNoPlaceCodeTypes } from './seed-helpers/pick-tables.mjs';

const prisma = new PrismaClient();

async function main() {
  await clearDB(prisma)
  await createResultTypes(prisma);
  await createRaceTypes(prisma);
  await createNoPlaceCodeTypes(prisma);
  await createCategories(prisma);
  await createRiders(prisma);
  await createTeams(prisma);


  await createRaces(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
