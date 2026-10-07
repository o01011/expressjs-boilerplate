export const createRequestLoggingMiddleware = (logger) => {
    return (request, response, next) => {
        const startTime = Date.now();
        response.on("finish", () => {
            const duration = Date.now() - startTime;
            logger.info({
                method: request.method,
                path: request.path,
                statusCode: response.statusCode,
                duration,
                ip: request.ip,
            }, "Request completed");
        });
        next();
    };
};
export const createSecurityHeadersMiddleware = () => {
    return (request, response, next) => {
        response.setHeader("X-Content-Type-Options", "nosniff");
        response.setHeader("X-Frame-Options", "DENY");
        response.setHeader("X-XSS-Protection", "1; mode=block");
        response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
        next();
    };
};
export const createCacheControlMiddleware = (options) => {
    return (request, response, next) => {
        if (request.method !== "GET") {
            response.setHeader("Cache-Control", "no-store");
        }
        else {
            const maxAge = options?.maxAge ?? 60;
            response.setHeader("Cache-Control", `public, max-age=${maxAge}`);
        }
        next();
    };
};
export const createCorsMiddleware = (env) => {
    return (request, response, next) => {
        const origin = request.headers.origin;
        if (origin && env.CORS_ORIGINS.includes(origin)) {
            response.setHeader("Access-Control-Allow-Origin", origin);
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
            response.setHeader("Access-Control-Max-Age", "86400");
        }
        if (request.method === "OPTIONS") {
            response.sendStatus(204);
        }
        else {
            next();
        }
    };
};
//# sourceMappingURL=custom-middleware.js.map