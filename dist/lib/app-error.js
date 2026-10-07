export class AppError extends Error {
    statusCode;
    code;
    constructor(statusCode, message, code = "INTERNAL_ERROR") {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.name = "AppError";
    }
    static badRequest(message, code = "BAD_REQUEST") {
        return new AppError(400, message, code);
    }
    static notFound(message = "Not found") {
        return new AppError(404, message, "NOT_FOUND");
    }
    static internal(message = "Internal server error") {
        return new AppError(500, message, "INTERNAL_ERROR");
    }
}
//# sourceMappingURL=app-error.js.map