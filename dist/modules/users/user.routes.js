import { Router } from "express";
import { validate } from "../../common/http/validate.js";
import { authenticate, requireRole, requireSelfOrAdmin } from "../auth/auth.middleware.js";
import { createUserBodySchema, listUsersQuerySchema, updateUserBodySchema, updateUserRoleBodySchema, userIdParamsSchema } from "./user.schema.js";
import { createUserController } from "./user.controller.js";
const idParams = { params: userIdParamsSchema };
const listSchemas = { query: listUsersQuerySchema };
const createSchemas = { body: createUserBodySchema };
const updateSchemas = { body: updateUserBodySchema, params: userIdParamsSchema };
const updateRoleSchemas = { body: updateUserRoleBodySchema, params: userIdParamsSchema };
export const createUserRouter = (service, authService) => {
    const router = Router();
    const controller = createUserController(service);
    router.use(authenticate(authService));
    router.get("/", requireRole("ADMIN"), validate(listSchemas), async (request, response, next) => {
        try {
            await controller.list(request, response);
        }
        catch (error) {
            next(error);
        }
    });
    router.post("/", requireRole("ADMIN"), validate(createSchemas), async (request, response, next) => {
        try {
            await controller.create(request, response);
        }
        catch (error) {
            next(error);
        }
    });
    router.get("/:id", validate(idParams), requireSelfOrAdmin, async (request, response, next) => {
        try {
            await controller.get(request, response);
        }
        catch (error) {
            next(error);
        }
    });
    router.patch("/:id", validate(updateSchemas), requireSelfOrAdmin, async (request, response, next) => {
        try {
            await controller.update(request, response);
        }
        catch (error) {
            next(error);
        }
    });
    router.patch("/:id/role", requireRole("ADMIN"), validate(updateRoleSchemas), async (request, response, next) => {
        try {
            await controller.updateRole(request, response);
        }
        catch (error) {
            next(error);
        }
    });
    router.delete("/:id", validate(idParams), requireSelfOrAdmin, async (request, response, next) => {
        try {
            await controller.delete(request, response);
        }
        catch (error) {
            next(error);
        }
    });
    return router;
};
//# sourceMappingURL=user.routes.js.map