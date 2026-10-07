export const loggerMiddleware = (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        const requestId = req.headers["x-request-id"] ?? "unknown";
        console.log(JSON.stringify({
            method: req.method,
            path: req.path,
            status: res.statusCode,
            duration: `${duration}ms`,
            requestId,
        }));
    });
    next();
};
//# sourceMappingURL=logger.middleware.js.map