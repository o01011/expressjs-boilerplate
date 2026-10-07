import { config } from "../config/index.js";
import { AppError } from "../lib/app-error.js";
import { logger } from "../lib/logger.js";
export const errorHandler = (error, _request, response, _next) => {
    if (error instanceof AppError) {
        response.status(error.statusCode).json({
            success: false,
            error: error.message,
            code: error.code,
        });
        return;
    }
    logger.error({ err: error }, "Unhandled request error");
    response.status(500).json({
        success: false,
        error: "Internal server error",
        ...(config.NODE_ENV === "development" && error instanceof Error ? { detail: error.message } : {}),
    });
};
//# sourceMappingURL=error-handler.js.map