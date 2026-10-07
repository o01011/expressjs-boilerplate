import { z } from "zod";
const emptyAsUndefined = (value) => (value === "" ? undefined : value);
const envSchema = z.object({
    NODE_ENV: z.preprocess(emptyAsUndefined, z.enum(["development", "production", "test"]).default("development")),
    PORT: z.preprocess(emptyAsUndefined, z.coerce.number().int().min(1).max(65_535).default(3000)),
    LOG_LEVEL: z.preprocess(emptyAsUndefined, z.enum(["debug", "info", "warn", "error"]).default("info")),
    CORS_ORIGINS: z.preprocess(emptyAsUndefined, z
        .string()
        .default("http://localhost:3000")
        .transform((origins) => origins.trim() === ""
        ? ["http://localhost:3000"]
        : origins
            .split(",")
            .map((origin) => origin.trim())
            .filter(Boolean))),
});
export function loadConfig(environment = process.env) {
    return envSchema.parse(environment);
}
export const config = loadConfig();
//# sourceMappingURL=index.js.map