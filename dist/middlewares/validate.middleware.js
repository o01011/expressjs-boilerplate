import { StatusCodes } from "http-status-codes";
import { ZodAny, ZodError } from "zod";
export const validateMiddleware = (schema) => {
    return (req, _res, next) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (e) {
            if (e instanceof ZodError) {
                const details = {};
                for (const issue of e.issues) {
                    const path = issue.path.join(".");
                    if (!details[path]) {
                        details[path] = [];
                    }
                    details[path]?.push(issue.message);
                }
                next({
                    statusCode: StatusCodes.BAD_REQUEST,
                    message: "Validation failed",
                    code: "VALIDATION_ERROR",
                    details,
                });
                return;
            }
            next(e);
        }
    };
};
//# sourceMappingURL=validate.middleware.js.map