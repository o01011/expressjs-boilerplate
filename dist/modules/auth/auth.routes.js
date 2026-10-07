import { Router } from "express";
import { validate } from "../../common/http/validate.js";
import { authenticate } from "./auth.middleware.js";
import { loginBodySchema, registerBodySchema } from "./auth.schema.js";
import { createAuthController } from "./auth.controller.js";
const loginSchemas = { body: loginBodySchema };
const registerSchemas = { body: registerBodySchema };
export const createAuthRouter = (authService, userService) => {
    const router = Router();
    const controller = createAuthController(authService);
    router.post("/register", validate(registerSchemas), async (request, response, next) => {
        try {
            await controller.register(request, response);
        }
        catch (error) {
            next(error);
        }
    });
    router.post("/login", validate(loginSchemas), async (request, response, next) => {
        try {
            await controller.login(request, response);
        }
        catch (error) {
            next(error);
        }
    });
    router.get("/me", authenticate(authService), async (request, response, next) => {
        try {
            await controller.me(request, response);
        }
        catch (error) {
            next(error);
        }
    });
    return router;
};
//# sourceMappingURL=auth.routes.js.map