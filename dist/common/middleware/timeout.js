export const requestTimeout = (timeoutMs) => (request, response, next) => {
    response.setTimeout(timeoutMs, () => {
        if (!response.headersSent) {
            request.log.warn({ timeoutMs }, "Request timed out");
            response.status(503).json({
                error: {
                    code: "TIMEOUT",
                    message: "Request timed out",
                    requestId: request.id,
                },
            });
        }
    });
    next();
};
//# sourceMappingURL=timeout.js.map