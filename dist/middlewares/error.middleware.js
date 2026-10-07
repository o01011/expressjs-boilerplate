export const errorMiddleware = (err, req, res, _next) => {
    const statusCode = err.statusCode ?? 500;
    const code = err.code ?? "INTERNAL_ERROR";
    const message = statusCode === 500 ? "Internal server error" : err.message;
    const requestId = req.headers["x-request-id"];
    if (statusCode === 500) {
        console.error("Unhandled error", {
            message: err.message,
            stack: err.stack,
            requestId,
        });
    }
    res.status(statusCode).json({
        error: {
            code,
            message,
            detals: err.details,
            requestId,
        },
    });
};
//# sourceMappingURL=error.middleware.js.map