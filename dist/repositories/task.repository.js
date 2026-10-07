import { Prisma } from "@web-monorepo/db";
import { prisma } from "../lib/prisma.js";
export class TaskRepository {
    async findMany(query) {
        const where = {};
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
                include: { tags: true },
            }),
            prisma.task.count({ where }),
        ]);
        return { tasks, total };
    }
    async findById(id) {
        return prisma.task.findUnique({
            where: { id },
            include: { tags: true },
        });
    }
    async create(createTaskInput) {
        return prisma.task.create({
            data: {
                title: createTaskInput.title,
                description: createTaskInput.description,
                status: createTaskInput.status ?? "TODO",
                prisma: createTaskInput.priority ?? "medium",
                dueDate: createTaskInput.dueDate,
                tags: createTaskInput.tags
                    ? {
                        connectOrCreate: createTaskInput.tags.map((tag) => ({
                            where: { name: tag },
                            create: { name: tag },
                        })),
                    }
                    : undefined,
            },
            include: { tags: true },
        });
    }
    async update(id, updateTaskInput) {
        try {
            return await prisma.task.update({
                where: { id },
                data: {
                    ...updateTaskInput,
                    dueDate: updateTaskInput.dueDate,
                    tags: updateTaskInput.tags
                        ? {
                            set: [],
                            connectOrCreate: updateTaskInput.tags.map((tag) => ({
                                where: { name: tag },
                                create: { name: tag },
                            })),
                        }
                        : undefined,
                },
                include: { tags: true },
            });
        }
        catch (e) {
            if (e instanceof Error && "code" in e && e.code === "P2025") {
                return null;
            }
            throw e;
        }
    }
    async delete(id) {
        try {
            await prisma.task.delete({ where: { id } });
            return true;
        }
        catch (e) {
            if (e instanceof Error && "code" in e && e.code === "P2025") {
                return false;
            }
            throw e;
        }
    }
    async existsByTitle(title, excludeId) {
        const count = await prisma.task.count({
            where: {
                title,
                ...(excludeId ? { id: { not: excludeId } } : {}),
            },
        });
        return count > 0;
    }
}
//# sourceMappingURL=task.repository.js.map