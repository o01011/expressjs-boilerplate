import { AppError } from "../errors/app-error.js";
export const notFoundHandler = (request, _response, next) => {
    next(AppError.notFound(`Route ${request.method} ${request.path} not found`));
};
export const errorHandler = (error, request, response, next) => {
    if (response.headersSent) {
        next(error);
        return;
    }
    const appError = toAppError(error);
    if (appError.statusCode >= 500) {
        request.log.error({ err: error }, "Unhandled error");
    }
    response.status(appError.statusCode).json({
        error: {
            code: appError.code,
            message: appError.statusCode >= 500 ? "Internal server error" : appError.message,
            ...(appError.details && { details: appError.details }),
            requestId: request.id,
        },
    });
};
const toAppError = (error) => {
    if (error instanceof AppError) {
        return error;
    }
    if (isHttpError(error)) {
        return new AppError(error.status, error.status === 404 ? "NOT_FOUND" : "BAD_REQUEST", error.message);
    }
    return new AppError(500, "INTERNAL_ERROR", "Internal server error");
};
// Errors raised by Express/body-parser (malformed JSON, payload too large, ...)
const isHttpError = (error) => error instanceof Error && "status" in error && typeof error.status === "number" && error.status >= 400 && error.status < 500;
//# sourceMappingURL=error-handler.js.map