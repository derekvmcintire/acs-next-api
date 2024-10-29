import { PrismaDatabaseClient } from "@/app/_database/types/IDatabaseClient";
import { PrismaClient } from "@prisma/client";

// Ensure that the PrismaClient instance is available globally in development
const prismaClient = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismaClient;
}

// Wrap PrismaClient with PrismaDatabaseClient and export as IDatabaseClient
const databaseClient = new PrismaDatabaseClient(prismaClient);

export default databaseClient;
