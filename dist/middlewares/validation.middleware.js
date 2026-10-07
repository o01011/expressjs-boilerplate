import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
export const validateMiddleware = (schema) => {
    return (req, res, next) => {
        try {
            const validated = schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            const locals = res.locals;
            locals.validated = validated;
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
export const getValidatedData = (res) => {
    const locals = res.locals;
    return locals.validated;
};
//# sourceMappingURL=validation.middleware.js.map