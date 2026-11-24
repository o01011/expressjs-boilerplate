import type { Task } from "../prisma/generated/client.ts";
import { TaskRepository } from "../repositories/task.repository.ts";
import type { CreateTaskInput, ListTasksQuery, UpdateTaskInput } from "../schemas/task.schema.ts";
import type { PageType } from "../types/page.type.ts";
import { ConflictError, NotFoundError } from "../utils/errors.util.ts";

export class TaskService {
	private readonly taskRepository = new TaskRepository();

	async list(query: ListTasksQuery): Promise<PageType<Task>> {
		const { tasks, total } = await this.taskRepository.findMany(query);

		return {
			items: tasks,
			total,
			page: query.page,
			limit: query.limit,
		};
	}

	async getById(id: string): Promise<Task> {
		const task = await this.taskRepository.findById(id);
		if (!task) {
			throw new NotFoundError("Task", id);
		}
		return task;
	}

	async create(data: CreateTaskInput): Promise<Task> {
		const exists = await this.taskRepository.existsByTitle(data.title);
		if (exists) {
			throw new ConflictError(`Task with title '${data.title}' already exists`);
		}
		return this.taskRepository.create(data);
	}

	async update(id: string, data: UpdateTaskInput): Promise<Task> {
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

	async delete(id: string): Promise<void> {
		await this.getById(id);
		await this.taskRepository.delete(id);
	}
}
