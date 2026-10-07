import { AppError } from "./app-error.js";
export class ValidationError extends AppError {
    constructor(message, details) {
        super(422, "VALIDATION_ERROR", message, details);
        this.name = "ValidationError";
    }
}
export class NotFoundError extends AppError {
    constructor(resource, identifier) {
        const message = identifier ? `${resource} with id '${identifier}' not found` : `${resource} not found`;
        super(404, "NOT_FOUND", message);
        this.name = "NotFoundError";
    }
}
export class UnauthorizedError extends AppError {
    constructor(message = "Authentication required") {
        super(401, "UNAUTHORIZED", message);
        this.name = "UnauthorizedError";
    }
}
export class ForbiddenError extends AppError {
    constructor(message = "Insufficient permissions") {
        super(403, "FORBIDDEN", message);
        this.name = "ForbiddenError";
    }
}
export class ConflictError extends AppError {
    constructor(message) {
        super(409, "CONFLICT", message);
        this.name = "ConflictError";
    }
}
export class BadRequestError extends AppError {
    constructor(message) {
        super(400, "BAD_REQUEST", message);
        this.name = "BadRequestError";
    }
}
//# sourceMappingURL=custom-errors.js.map