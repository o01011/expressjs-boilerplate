export const notFoundHandlerMiddleware = (req, res) => {
    res.status(404).json({
        error: {
            code: "NOT_FOUND",
            message: `Route ${req.method} ${req.path} not found`,
        },
    });
};
//# sourceMappingURL=not-found.middleware.js.map