export async function clearDB(prisma) {
  try {
    await prisma.$transaction([
      prisma.JoinRiderCategory.deleteMany(),
      prisma.JoinRiderTeam.deleteMany(),
      prisma.Result.deleteMany(),
      prisma.Race.deleteMany(),
      prisma.Event.deleteMany(),
      prisma.Team.deleteMany(),
      prisma.Category.deleteMany(),
      prisma.Rider.deleteMany(),
      prisma.RaceType.deleteMany(),
      prisma.ResultType.deleteMany(),
      prisma.NoPlaceCodeType.deleteMany(),
    ]);

    await prisma.$executeRaw`ALTER SEQUENCE "Rider_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "Event_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "Race_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "Team_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "Category_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "Result_id_seq" RESTART WITH 1`;
    // Add similar statements for other tables as needed.

    console.log("All records cleared successfully.");
  } catch (error) {
    console.error("Error clearing records:", error);
  } finally {
    await prisma.$disconnect();
  }
}
