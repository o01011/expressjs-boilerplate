import { TaskRepository } from "../repositories/task.repository.js";
import { ConflictError, NotFoundError } from "../utils/errors.util.js";
export class TaskService {
    taskRepository = new TaskRepository();
    async list(query) {
        const { tasks, total } = await this.taskRepository.findMany(query);
        return {
            tasks,
            total,
            page: query.page,
            limit: query.limit,
        };
    }
    async getById(id) {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new NotFoundError("Task", id);
        }
        return task;
    }
    async create(data) {
        const exists = await this.taskRepository.existsByTitle(data.title);
        if (exists) {
            throw new ConflictError(`Task with title '${data.title}' already exists`);
        }
        return this.taskRepository.create(data);
    }
    async update(id, data) {
        await this.getById(id);
        if (data.title) {
            const exists = await this.taskRepository.existsByTitle(data.title);
            if (exists) {
                throw new ConflictError(`Task with title '${data.title}' already exists`);
            }
        }
        const updated = await this.taskRepository.update(id, data);
        if (!updated) {
            throw new NotFoundError("Task", id);
        }
        return updated;
    }
    async delete(id) {
        await this.getById(id);
        await this.taskRepository.delete(id);
    }
}
//# sourceMappingURL=task.service.js.map