import { PrismaClient } from "@prisma/client";

/**
 * Prisma Client Singleton
 *
 * In development, Next.js hot-reloads modules which can create many
 * Prisma instances. We store the client on `globalThis` to prevent this.
 * In production, we just create a single instance.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
