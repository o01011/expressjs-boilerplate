import { AppError } from "../../common/errors/app-error.js";
export const authenticate = (authService) => async (request, response, next) => {
    const authorization = request.get("authorization");
    const match = authorization?.match(/^Bearer ([^\s]+)$/i);
    const token = match?.[1];
    if (!token) {
        response.set("WWW-Authenticate", "Bearer");
        next(AppError.unauthorized());
        return;
    }
    request.auth = await authService.authenticate(token);
    next();
};
export const requireRole = (...roles) => (request, _response, next) => {
    if (!request.auth) {
        next(AppError.unauthorized());
        return;
    }
    if (!roles.includes(request.auth.role)) {
        next(AppError.forbidden());
        return;
    }
    next();
};
export const requireSelfOrAdmin = (request, _response, next) => {
    if (!request.auth) {
        next(AppError.unauthorized());
        return;
    }
    // biome-ignore lint/complexity/useLiteralKeys: Express params are index-signature typed under this project's strict TypeScript settings.
    if (request.auth.role !== "ADMIN" && Number(request.params["id"]) !== request.auth.userId) {
        next(AppError.forbidden());
        return;
    }
    next();
};
//# sourceMappingURL=auth.middleware.js.map