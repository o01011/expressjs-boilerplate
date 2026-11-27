import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const taskStatusSchema = z.enum(["TODO", "IN_PROGRESS", "DONE"]).openapi("TaskStatusEnum", { description: "Task Status Enum" });
export const taskPrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH"]).openapi("TaskPriorityEnum", { description: "Task Priority Enum" });

const createTaskBodyDto = z
	.object({
		title: z.string().min(1).max(255),
		description: z.string().optional(),
		status: taskStatusSchema.optional(),
		priority: taskPrioritySchema.optional(),
		dueDate: z.coerce.date().optional(),
		tags: z.array(z.string().min(1).max(50)).optional(),
	})
	.openapi("CreateTaskBodyDto", { description: "Create Task Body Dto" });

const updateTaskBodyDto = z
	.object({
		title: z.string().min(1).max(255).optional(),
		description: z.string().optional(),
		status: taskStatusSchema.optional(),
		priority: taskPrioritySchema.optional(),
		dueDate: z.coerce.date().optional(),
		tags: z.array(z.string().min(1).max(50)).optional(),
	})
	.openapi("UpdateTaskBodyDto", { description: "Update Task Body Dto" });

const taskIdParamsDto = z
	.object({
		id: z.uuid(),
	})
	.openapi("TaskIdParamsDto", { description: "Task Id Params Dto" });

const listTasksQueryDto = z
	.object({
		status: taskStatusSchema.optional(),
		priority: taskPrioritySchema.optional(),
		page: z.coerce.number().int().positive().default(1),
		limit: z.coerce.number().int().positive().max(100).default(20),
		sortBy: z.enum(["createdAt", "title", "priority", "dueDate"]).default("createdAt"),
		order: z.enum(["asc", "desc"]).default("desc"),
	})
	.openapi("ListTasksQueryDto", { description: "List Tasks Query Dto" });

export const createTaskDto = z.object({
	body: createTaskBodyDto,
});

export const updateTaskDto = z.object({
	body: updateTaskBodyDto,
	params: taskIdParamsDto,
});

export const getTaskDto = z.object({
	params: taskIdParamsDto,
});

export const listTasksDto = z.object({
	query: listTasksQueryDto,
});

export type CreateTaskDto = z.infer<typeof createTaskDto>["body"];
export type UpdateTaskDto = z.infer<typeof updateTaskDto>["body"];
export type ListTasksDto = z.infer<typeof listTasksDto>["query"];
