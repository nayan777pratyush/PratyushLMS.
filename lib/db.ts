import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "./env";
import pkg from "pg";

const { Pool } = pkg;

// Create a pg pool using your DATABASE_URL
const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

// Create Prisma adapter for Postgres
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,                // 👈 THIS FIXES "engine type client requires adapter"
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
