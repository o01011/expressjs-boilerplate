import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/client.ts";

const adapter = new PrismaPg({ connectionString: process.env["POSTGRES_URL"] });

export const db = new PrismaClient({ adapter });
