import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

	APP_PORT: z.coerce.number().default(3000),
	APP_HOST: z.string().default("0.0.0.0"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
	console.error("Invalid environment variables");
	console.error(parsed.error.flatten().fieldErrors);
	process.exit(1);
}

export const env = parsed.data;
