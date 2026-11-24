import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

const taskStatusEnum = z.enum(["TODO", "IN_PROGRESS", "DONE"]).openapi({ description: "Task Status Enum" });
const taskPriorityEum = z.enum(["LOW", "MEDIUM", "HIGH"]).openapi({ description: "Task Priority Enum" });

export const createTaskSchema = z
	.object({
		body: z.object({
			title: z.string().min(1).max(255),
			description: z.string().optional(),
			status: taskStatusEnum.optional(),
			priority: taskPriorityEum.optional(),
			dueDate: z.coerce.date().optional(),
			tags: z.array(z.string().min(1).max(50)).optional(),
		}),
	})
	.openapi({ description: "Create Task Schema" });

export const updateTaskSchema = z.object({
	body: z.object({
		title: z.string().min(1).max(255).optional(),
		description: z.string().optional(),
		status: taskStatusEnum.optional(),
		priority: taskPriorityEum.optional(),
		dueDate: z.coerce.date().optional(),
		tags: z.array(z.string().min(1).max(50)).optional(),
	}),
	params: z
		.object({
			id: z.uuid(),
		})
		.openapi({ description: "Update Task Schema" }),
});

export const getTaskSchema = z
	.object({
		params: z.object({
			id: z.uuid(),
		}),
	})
	.openapi({ description: "Get Task Schema" });

export const listTasksSchema = z
	.object({
		query: z.object({
			status: taskStatusEnum.optional(),
			priority: taskPriorityEum.optional(),
			page: z.coerce.number().int().positive().default(1),
			limit: z.coerce.number().int().positive().max(100).default(20),
			sortBy: z.enum(["createdAt", "title", "priority", "dueDate"]).default("createdAt"),
			order: z.enum(["asc", "desc"]).default("desc"),
		}),
	})
	.openapi({ description: "List Tasks Schema" });

export type CreateTaskInput = z.infer<typeof createTaskSchema>["body"];
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>["body"];
export type ListTasksQuery = z.infer<typeof listTasksSchema>["query"];
