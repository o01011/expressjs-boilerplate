import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@web-monorepo/db";
const globalForPrisma = globalThis;
const adapter = new PrismaPg({
    connectionString: "postgres://postgres:postgres@localhost:5432/web-monorepo",
});
export const prisma = globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
        log: process.env["NODE_ENV"] === "development" ? ["query", "error", "warn"] : ["error"],
    });
if (process.env["NODE_ENV"] !== "production") {
    globalForPrisma.prisma = prisma;
}
//# sourceMappingURL=prisma.js.map