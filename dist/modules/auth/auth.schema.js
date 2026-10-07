import { z } from "zod";
import { createUserBodySchema } from "../users/user.schema.js";
export const registerBodySchema = createUserBodySchema;
export const loginBodySchema = z.object({
    email: z.email().transform((value) => value.trim().toLowerCase()),
    password: z.string().min(1).max(128),
});
//# sourceMappingURL=auth.schema.js.map