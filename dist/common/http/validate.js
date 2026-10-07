import { AppError } from "../errors/app-error.js";
/**
 * Parses body/params/query with zod and exposes the typed result on `request.validated`.
 * Express 5 makes `request.query` a read-only getter, so parsed values are never written back to it.
 */
export const validate = (schemas) => (request, _response, next) => {
    const issues = [];
    const validated = {};
    for (const key of ["body", "params", "query"]) {
        const schema = schemas[key];
        if (!schema) {
            continue;
        }
        const result = schema.safeParse(request[key]);
        if (result.success) {
            validated[key] = result.data;
        }
        else {
            issues.push(...result.error.issues.map((issue) => ({ message: issue.message, path: [key, ...issue.path].join(".") })));
        }
    }
    if (issues.length > 0) {
        next(AppError.validation(issues));
        return;
    }
    request.validated = validated;
    next();
};
//# sourceMappingURL=validate.js.map