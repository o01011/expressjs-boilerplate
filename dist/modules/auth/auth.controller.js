import { HttpResponse } from "../../common/http/index.js";
export const createAuthController = (service) => ({
    async register(request, response) {
        const input = request.body;
        const result = await service.register(input);
        HttpResponse.created(response, result);
    },
    async login(request, response) {
        const input = request.body;
        const result = await service.login(input);
        HttpResponse.success(response, result);
    },
    async me(request, response) {
        if (!request.user) {
            HttpResponse.error(response, "UNAUTHORIZED", "User not authenticated", 401);
            return;
        }
        const user = await service.getCurrentUser(request.user.id);
        HttpResponse.success(response, user);
    },
});
//# sourceMappingURL=auth.controller.js.map