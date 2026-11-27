import type { CreateTaskDto, ListTasksDto, UpdateTaskDto } from "../dtos/task.dto.ts";
import type { Task } from "../prisma/generated/client.ts";
import { TaskRepository } from "../repositories/task.repository.ts";
import type { PageType } from "../types/page.type.ts";
import { ConflictError, NotFoundError } from "../utils/errors.util.ts";

export class TaskService {
	private readonly taskRepository = new TaskRepository();

	async list(listTasksDto: ListTasksDto): Promise<PageType<Task>> {
		const { tasks, total } = await this.taskRepository.findMany(listTasksDto);

		return {
			items: tasks,
			total,
			page: listTasksDto.page,
			limit: listTasksDto.limit,
		};
	}

	async getById(id: string): Promise<Task> {
		const task = await this.taskRepository.findById(id);

		if (!task) {
			throw new NotFoundError("Task", id);
		}

		return task;
	}

	async create(createTaskDto: CreateTaskDto): Promise<Task> {
		const exists = await this.taskRepository.existsByTitle(createTaskDto.title);

		if (exists) {
			throw new ConflictError(`Task with title '${createTaskDto.title}' already exists`);
		}

		return this.taskRepository.create(createTaskDto);
	}

	async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
		await this.getById(id);

		if (updateTaskDto.title) {
			const exists = await this.taskRepository.existsByTitle(updateTaskDto.title);
			if (exists) {
				throw new ConflictError(`Task with title '${updateTaskDto.title}' already exists`);
			}
		}

		const updated = await this.taskRepository.update(id, updateTaskDto);

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
