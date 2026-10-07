export class AppError extends Error {
    statusCode;
    code;
    constructor(statusCode, message, code) {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
        this.code = code;
    }
}
export class NotFoundError extends AppError {
    constructor(resource, id) {
        super(404, `${resource} with id '${id}' not found`, "NOT_FOUND");
        this.name = "NotFoundError";
    }
}
export class ValidationError extends AppError {
    details;
    constructor(message, details) {
        super(400, message, "VALIDATION_ERROR");
        this.name = "ValidationError";
        this.details = details;
    }
}
export class ConflictError extends AppError {
    constructor(message) {
        super(400, message, "CONFLICT");
        this.name = "ConflictError";
    }
}
//# sourceMappingURL=errors.util.js.map