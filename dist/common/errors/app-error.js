export class AppError extends Error {
    code;
    details;
    statusCode;
    constructor(statusCode, code, message, details) {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
    }
    static badRequest(message) {
        return new AppError(400, "BAD_REQUEST", message);
    }
    static conflict(message) {
        return new AppError(409, "CONFLICT", message);
    }
    static forbidden(message = "Insufficient permissions") {
        return new AppError(403, "FORBIDDEN", message);
    }
    static notFound(message) {
        return new AppError(404, "NOT_FOUND", message);
    }
    static unauthorized(message = "Authentication required") {
        return new AppError(401, "UNAUTHORIZED", message);
    }
    static validation(details) {
        return new AppError(422, "VALIDATION_ERROR", "Request validation failed", details);
    }
}
//# sourceMappingURL=app-error.js.map