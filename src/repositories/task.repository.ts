import type { CreateTaskInput, ListTasksQuery, UpdateTaskInput } from "../schemas/task.schema.ts";
import { Prisma, type Task } from "../prisma/generated/client.ts";
import { prisma } from "../lib/prisma.ts";

export class TaskRepository {
	async findMany(query: ListTasksQuery): Promise<{ tasks: Task[]; total: number }> {
		const where: Prisma.TaskWhereInput = {};

		if (query.status) {
			where.status = query.status;
		}
		if (query.priority) {
			where.priority = query.priority;
		}

		const [tasks, total] = await Promise.all([
			prisma.task.findMany({
				where,
				orderBy: { [query.sortBy]: query.order },
				skip: (query.page - 1) * query.limit,
				take: query.limit,
				include: { tags: { include: { tag: true } } },
			}),
			prisma.task.count({ where }),
		]);

		return { tasks, total };
	}

	async findById(id: string): Promise<Task | null> {
		return prisma.task.findUnique({
			where: { id },
			include: { tags: { include: { tag: true } } },
		});
	}

	async create(createTaskInput: CreateTaskInput): Promise<Task> {
		return prisma.task.create({
			data: {
				title: createTaskInput.title,
				description: createTaskInput.description,
				status: createTaskInput.status ?? "TODO",
				priority: createTaskInput.priority ?? "MEDIUM",
				dueDate: createTaskInput.dueDate,
				tags: createTaskInput.tags
					? {
							create: createTaskInput.tags.map((name) => ({
								tag: {
									connectOrCreate: {
										where: { name },
										create: { name },
									},
								},
							})),
						}
					: undefined,
			},
			include: { tags: { include: { tag: true } } },
		});
	}

	async update(id: string, updateTaskInput: UpdateTaskInput): Promise<Task | null> {
		try {
			return await prisma.task.update({
				where: { id },
				data: {
					...updateTaskInput,
					dueDate: updateTaskInput.dueDate,
					tags: updateTaskInput.tags
						? {
								deleteMany: {},
								create: updateTaskInput.tags.map((name) => ({
									tag: {
										connectOrCreate: {
											where: { name },
											create: { name },
										},
									},
								})),
							}
						: undefined,
				},
				include: { tags: { include: { tag: true } } },
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
			await prisma.task.delete({ where: { id } });
			return true;
		} catch (e) {
			if (e instanceof Error && "code" in e && (e as { code: string }).code === "P2025") {
				return false;
			}
			throw e;
		}
	}

	async existsByTitle(title: string, excludeId?: string): Promise<boolean> {
		const count = await prisma.task.count({
			where: {
				title,
				...(excludeId ? { id: { not: excludeId } } : {}),
			},
		});
		return count > 0;
	}
}
