import { z } from "zod";

const taskStatusEnum = z.enum(["TODO", "IN_PROGRESS", "DONE"]);
const taskPriorityEum = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const createTaskSchema = z.object({
	body: z.object({
		title: z.string().min(1).max(255),
		description: z.string().optional(),
		status: taskStatusEnum.optional(),
		priority: taskPriorityEum.optional(),
		dueDate: z.coerce.date().optional(),
		tags: z.array(z.string().min(1).max(50)).optional(),
	}),
});

export const updateTaskSchema = z.object({
	body: z.object({
		title: z.string().min(1).max(255).optional(),
		description: z.string().optional(),
		status: taskStatusEnum.optional(),
		priority: taskPriorityEum.optional(),
		dueDate: z.coerce.date().optional(),
		tags: z.array(z.string().min(1).max(50)).optional(),
	}),
	params: z.object({
		id: z.uuid(),
	}),
});

export const getTaskSchema = z.object({
	params: z.object({
		id: z.uuid(),
	}),
});

export const listTasksSchema = z.object({
	query: z.object({
		status: taskStatusEnum.optional(),
		priority: taskPriorityEum.optional(),
		page: z.coerce.number().int().positive().default(1),
		limit: z.coerce.number().int().positive().max(100).default(20),
		sortBy: z.enum(["createdAt", "title", "priority", "dueDate"]).default("createdAt"),
		order: z.enum(["asc", "desc"]).default("desc"),
	}),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>["body"];
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>["body"];
export type ListTasksQuery = z.infer<typeof listTasksSchema>["query"];
