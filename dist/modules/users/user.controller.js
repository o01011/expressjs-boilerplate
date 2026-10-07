import { HttpResponse } from "../../common/http/index.js";
import { paginationUtils } from "../../utils/index.js";
export const createUserController = (service) => ({
    async list(request, response) {
        const limit = paginationUtils.normalizeLimit(request.query.limit);
        const offset = paginationUtils.normalizeOffset(request.query.offset);
        const query = { limit, offset };
        const { items, total } = await service.list(query);
        HttpResponse.paginated(response, items, total, limit, offset);
    },
    async create(request, response) {
        const input = request.body;
        const user = await service.create(input);
        HttpResponse.created(response, user);
    },
    async get(request, response) {
        const id = parseInt(request.params.id, 10);
        const user = await service.get(id);
        HttpResponse.success(response, user);
    },
    async update(request, response) {
        const id = parseInt(request.params.id, 10);
        const input = request.body;
        const user = await service.update(id, input);
        HttpResponse.success(response, user);
    },
    async updateRole(request, response) {
        const id = parseInt(request.params.id, 10);
        const role = request.body.role;
        const user = await service.updateRole(id, role);
        HttpResponse.success(response, user);
    },
    async delete(request, response) {
        const id = parseInt(request.params.id, 10);
        await service.delete(id);
        HttpResponse.noContent(response);
    },
});
//# sourceMappingURL=user.controller.js.map