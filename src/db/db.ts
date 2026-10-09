import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/client.ts";

const connectionString = process.env["POSTGRES_URL"];

if (!connectionString) {
	throw new Error("POSTGRES_URL must be set");
}

const globalForPrisma = globalThis as typeof globalThis & {
	prisma?: PrismaClient;
};

const adapter = new PrismaPg({ connectionString });

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env["NODE_ENV"] !== "production") {
	globalForPrisma.prisma = db;
}
