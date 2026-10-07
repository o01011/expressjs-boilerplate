import { z } from "zod";
export const userIdParamsSchema = z.object({ id: z.coerce.number().int().positive() });
export const listUsersQuerySchema = z.object({
    limit: z.coerce.number().int().min(1).max(100).default(20),
    offset: z.coerce.number().int().min(0).default(0),
});
export const createUserBodySchema = z.object({
    email: z.email().transform((value) => value.trim().toLowerCase()),
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().min(1).max(100),
    password: z.string().min(12).max(128),
    username: z.string().trim().min(3).max(32).regex(/^\w+$/),
});
export const updateUserBodySchema = createUserBodySchema
    .omit({ password: true })
    .partial()
    .refine((input) => Object.keys(input).length > 0, "At least one field must be provided");
export const updateUserRoleBodySchema = z.object({ role: z.enum(["USER", "ADMIN"]) });
//# sourceMappingURL=user.schema.js.map