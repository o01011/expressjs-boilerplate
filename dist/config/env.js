import { z } from "zod";
const httpOriginSchema = z.url().refine((value) => {
    const url = new URL(value);
    return (url.protocol === "http:" || url.protocol === "https:") && url.origin === value;
}, "Expected an HTTP or HTTPS origin without a path");
const envSchema = z.object({
    APP_LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
    APP_PORT: z.coerce.number().int().min(1).max(65535).default(3000),
    APP_REQUEST_TIMEOUT: z.coerce.number().int().positive().default(30_000),
    CORS_ORIGINS: z
        .string()
        .default("")
        .transform((value) => value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean))
        .pipe(z.array(httpOriginSchema)),
    JWT_EXPIRES_IN: z.coerce.number().int().min(60).max(86_400).default(900),
    JWT_SECRET: z.string().min(32, "JWT_SECRET must contain at least 32 characters"),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    POSTGRES_URL: z.url().refine((value) => {
        const protocol = new URL(value).protocol;
        return protocol === "postgres:" || protocol === "postgresql:";
    }, "Expected a PostgreSQL connection URL"),
    THROTTLE_LIMIT: z.coerce.number().int().positive().default(100),
    THROTTLE_TTL: z.coerce.number().int().positive().default(60_000),
    TRUST_PROXY_HOPS: z.coerce.number().int().min(0).default(0),
});
export const loadEnv = (source = process.env) => {
    const result = envSchema.safeParse(source);
    if (!result.success) {
        throw new Error(`Invalid environment variables:\n${z.prettifyError(result.error)}`);
    }
    return result.data;
};
//# sourceMappingURL=env.js.map