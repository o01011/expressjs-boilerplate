export const notFound = (_request, response) => {
    response.status(404).json({
        success: false,
        error: "Not found",
    });
};
//# sourceMappingURL=not-found.js.map