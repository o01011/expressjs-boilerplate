import { AppError } from "../../common/errors/app-error.js";
import { hashPassword } from "../../lib/password.js";
import { toUserDto } from "./user.dto.js";
export const createUserService = (repository) => ({
    create: async ({ password, ...input }) => toUserDto(await repository.create({ ...input, password: await hashPassword(password) })),
    delete: (id) => repository.delete(id),
    get: async (id) => {
        const user = await repository.findById(id);
        if (!user) {
            throw AppError.notFound("User not found");
        }
        return toUserDto(user);
    },
    list: async (query) => {
        const { items, total } = await repository.list(query);
        return { items: items.map(toUserDto), total };
    },
    updateRole: async (id, role) => toUserDto(await repository.updateRole(id, role)),
    update: async (id, input) => toUserDto(await repository.update(id, input)),
});
//# sourceMappingURL=user.service.js.map