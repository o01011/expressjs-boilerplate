import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/client.ts";
import { env } from "../config/config.ts";

const adapter = new PrismaPg({ connectionString: env.POSTGRES_URL });

export const db = new PrismaClient({ adapter });
