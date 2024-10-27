import { PrismaClient } from "@prisma/client";

// Ensure that the PrismaClient instance is available globally in development
const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
