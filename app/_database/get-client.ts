import { PrismaDatabaseClient } from "@/app/_database/PrismaDatabaseClient";
import { Prisma, PrismaClient } from "@prisma/client";

const prismaConfig: Prisma.PrismaClientOptions = {
  log: (process.env.NODE_ENV === "development"
    ? ["query", "info", "warn", "error"]
    : ["warn", "error"]) as Prisma.LogLevel[],
};

// Ensure that the PrismaClient instance is available globally in development
const prismaClient = globalThis.prisma || new PrismaClient(prismaConfig);

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismaClient;
}

const databaseClient = new PrismaDatabaseClient(prismaClient);

export default databaseClient;
