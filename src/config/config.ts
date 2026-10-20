import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

	APP_PORT: z.coerce.number().int().min(1).max(65535).default(3000),
	APP_HOST: z.string().default("0.0.0.0"),
	APP_REQUEST_TIMEOUT: z.string(),
	APP_NAME: z.string(),
	APP_DESCRIPTION: z.string(),
	APP_LOG_LEVEL: z.string(),

	POSTGRES_URL: z.string(),
	POSTGRES_HOST: z.string(),
	POSTGRES_PORT: z.string(),
	POSTGRES_USER: z.string(),
	POSTGRES_PASSWORD: z.string(),
	POSTGRES_DB: z.string(),

	KAFKA_NODE_ID: z.string(),
	KAFKA_PORT: z.string(),
	KAFKA_CONTROLLER_PORT: z.string(),
	KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: z.string(),
	KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: z.string(),
	KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: z.string(),
	KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: z.string(),
	KAFKA_NUM_PARTITIONS: z.string(),

	KAFKA_UI_PORT: z.string(),
	KAFKA_CLUSTERS_0_NAME: z.string(),

	REDIS_URL: z.string(),
	REDIS_PORT: z.string(),
	REDIS_HOST: z.string(),
	REDIS_DATABASES: z.string(),
	REDIS_PASSWORD: z.string(),

	RI_PORT: z.string(),
	RI_DISABLE_ENCRYPTION: z.string(),

	JWT_SECRET: z.string(),
	JWT_EXPIRES_IN: z.string(),

	THROTTLE_TTL: z.string(),
	THROTTLE_LIMIT: z.string(),

	AWS_REGION: z.string(),
	AWS_ACCESS_KEY_ID: z.string(),
	AWS_SECRET_ACCESS_KEY: z.string(),
	AWS_S3_BUCKET_NAME: z.string()
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
	console.error("Invalid environment variables");
	console.error(parsed.error.flatten().fieldErrors);
	process.exit(1);
}

export const env = parsed.data;
