export const createAppConfig = (env) => ({
    api: {
        version: "v1",
        prefix: "/api/v1",
        port: env.PORT,
        host: env.HOST,
    },
    security: {
        corsOrigins: env.CORS_ORIGINS,
        trustProxy: env.TRUST_PROXY_HOPS,
        requestTimeout: env.APP_REQUEST_TIMEOUT,
        rateLimiting: {
            enabled: true,
            windowMs: 15 * 60 * 1000,
            maxRequests: 100,
        },
    },
    jwt: {
        secret: env.JWT_SECRET,
        expiresIn: env.JWT_EXPIRES_IN,
        algorithm: "HS256",
    },
    database: {
        maxConnections: 10,
        connectionTimeout: 5000,
    },
    logging: {
        level: env.LOG_LEVEL,
        pretty: env.NODE_ENV !== "production",
    },
});
//# sourceMappingURL=app.config.js.map