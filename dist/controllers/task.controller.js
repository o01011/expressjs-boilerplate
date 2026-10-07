import { getValidatedData } from "../middlewares/validation.middleware.js";
import { TaskService } from "../services/task.service.js";
export class TaskController {
    taskService = new TaskService();
    list = async (_req, res, next) => {
        try {
            const { query } = getValidatedData(res);
            const result = await this.taskService.list(query);
            res.json({
                data: result.tasks,
                pagination: {
                    page: result.page,
                    limit: result.limit,
                    total: result.total,
                    totalPages: Math.ceil(result.total / result.limit),
                },
            });
        }
        catch (e) {
            next(e);
        }
    };
    getById = async (_req, res, next) => {
        try {
            const { params } = getValidatedData(res);
            const task = await this.taskService.getById(params.id);
            res.json({
                data: task,
            });
        }
        catch (e) {
            next(e);
        }
    };
    create = async (_req, res, next) => {
        try {
            const { body } = getValidatedData(res);
            const createdTask = await this.taskService.create(body);
            res.json({ data: createdTask });
        }
        catch (e) {
            next(e);
        }
    };
    update = async (_req, res, next) => {
        try {
            const { body, params } = getValidatedData(res);
            const updatedTask = await this.taskService.update(params.id, body);
            res.json({ data: updatedTask });
        }
        catch (e) {
            next(e);
        }
    };
    delete = async (_req, res, next) => {
        try {
            const { params } = getValidatedData(res);
            await this.taskService.delete(params.id);
            res.status(204).send();
        }
        catch (e) {
            next(e);
        }
    };
}
//# sourceMappingURL=task.controller.js.map