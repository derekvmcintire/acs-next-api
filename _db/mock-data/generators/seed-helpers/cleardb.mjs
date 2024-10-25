export async function clearDB(prisma) {
  try {
    await prisma.$transaction([
      // Delete records from join tables first to avoid foreign key constraints
      prisma.JoinRiderCategory.deleteMany(),
      prisma.JoinRiderTeam.deleteMany(),
      prisma.Result.deleteMany(),

      // Then delete from the main resource tables
      prisma.Race.deleteMany(),
      prisma.Event.deleteMany(),
      prisma.Team.deleteMany(),
      prisma.Category.deleteMany(),
      prisma.Rider.deleteMany(),
      
      // Finally delete from the pick list tables
      prisma.RaceType.deleteMany(),
      prisma.ResultType.deleteMany(),
      prisma.NoPlaceCodeType.deleteMany(),
    ]);

    console.log("All records cleared successfully.");
  } catch (error) {
    console.error("Error clearing records:", error);
  } finally {
    await prisma.$disconnect();
  }
}
