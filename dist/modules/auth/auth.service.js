import { randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import { AppError } from "../../common/errors/app-error.js";
import { hashPassword, verifyPassword } from "../../lib/password.js";
const JWT_ISSUER = "web-monorepo";
const JWT_AUDIENCE = "web-monorepo-api";
export const createAuthService = (repository, userService, env) => {
    const dummyPasswordHash = hashPassword(randomBytes(32).toString("hex"));
    const createResult = (user) => ({
        accessToken: jwt.sign({}, env.JWT_SECRET, {
            algorithm: "HS256",
            audience: JWT_AUDIENCE,
            expiresIn: env.JWT_EXPIRES_IN,
            issuer: JWT_ISSUER,
            subject: String(user.id),
        }),
        expiresIn: env.JWT_EXPIRES_IN,
        tokenType: "Bearer",
        user,
    });
    return {
        authenticate: async (token) => {
            let payload;
            try {
                payload = jwt.verify(token, env.JWT_SECRET, {
                    algorithms: ["HS256"],
                    audience: JWT_AUDIENCE,
                    issuer: JWT_ISSUER,
                });
            }
            catch {
                throw AppError.unauthorized("Invalid or expired access token");
            }
            if (typeof payload === "string" || typeof payload.sub !== "string" || !/^[1-9]\d*$/.test(payload.sub)) {
                throw AppError.unauthorized("Invalid or expired access token");
            }
            const userId = Number(payload.sub);
            if (!Number.isSafeInteger(userId)) {
                throw AppError.unauthorized("Invalid or expired access token");
            }
            const user = await repository.findById(userId);
            if (!user) {
                throw AppError.unauthorized("Invalid or expired access token");
            }
            return { role: user.role, userId: user.id };
        },
        getCurrentUser: async (userId) => userService.get(userId),
        login: async ({ email, password }) => {
            const user = await repository.findByEmail(email);
            const passwordMatches = await verifyPassword(password, user?.password ?? (await dummyPasswordHash));
            if (!user || !passwordMatches) {
                throw AppError.unauthorized("Invalid email or password");
            }
            return createResult(await userService.get(user.id));
        },
        register: async (input) => createResult(await userService.create(input)),
    };
};
//# sourceMappingURL=auth.service.js.map