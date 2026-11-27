import { db } from "../db/db.ts";
import type { CreateTaskDto, ListTasksDto, UpdateTaskDto } from "../dtos/task.dto.ts";
import { Prisma, type Task } from "../prisma/generated/client.ts";

export class TaskRepository {
	async findMany(listTasksDto: ListTasksDto): Promise<{ tasks: Task[]; total: number }> {
		const where: Prisma.TaskWhereInput = {};

		if (listTasksDto.status) {
			where.status = listTasksDto.status;
		}
		if (listTasksDto.priority) {
			where.priority = listTasksDto.priority;
		}

		const [tasks, total] = await Promise.all([
			db.task.findMany({
				where,
				orderBy: { [listTasksDto.sortBy]: listTasksDto.order },
				skip: (listTasksDto.page - 1) * listTasksDto.limit,
				take: listTasksDto.limit,
				include: { tags: true },
			}),
			db.task.count({ where }),
		]);

		return { tasks, total };
	}

	async findById(id: string): Promise<Task | null> {
		return db.task.findUnique({
			where: { id },
			include: { tags: true },
		});
	}

	async create(createTaskDto: CreateTaskDto): Promise<Task> {
		return db.task.create({
			data: {
				title: createTaskDto.title,
				description: createTaskDto.description,
				status: createTaskDto.status ?? "TODO",
				priority: createTaskDto.priority ?? "MEDIUM",
				dueDate: createTaskDto.dueDate,
				tags: createTaskDto.tags
					? {
							connectOrCreate: createTaskDto.tags.map((tag) => ({
								where: { name: tag },
								create: { name: tag },
							})),
						}
					: undefined,
			},
			include: { tags: true },
		});
	}

	async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null> {
		try {
			return await db.task.update({
				where: { id },
				data: {
					...updateTaskDto,
					dueDate: updateTaskDto.dueDate,
					tags: updateTaskDto.tags
						? {
								set: [],
								connectOrCreate: updateTaskDto.tags.map((tag) => ({
									where: { name: tag },
									create: { name: tag },
								})),
							}
						: undefined,
				},
				include: { tags: true },
			});
		} catch (e) {
			if (e instanceof Error && "code" in e && (e as { code: string }).code === "P2025") {
				return null;
			}
			throw e;
		}
	}

	async delete(id: string): Promise<boolean> {
		try {
			await db.task.delete({ where: { id } });
			return true;
		} catch (e) {
			if (e instanceof Error && "code" in e && (e as { code: string }).code === "P2025") {
				return false;
			}
			throw e;
		}
	}

	async existsByTitle(title: string, excludeId?: string): Promise<boolean> {
		const count = await db.task.count({
			where: {
				title,
				...(excludeId ? { id: { not: excludeId } } : {}),
			},
		});
		return count > 0;
	}
}
