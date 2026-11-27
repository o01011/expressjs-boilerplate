import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { taskPrioritySchema, taskStatusSchema } from "../dtos/task.dto.ts";

extendZodWithOpenApi(z);

const tagRdo = z
	.object({
		id: z.uuid(),
		name: z.string(),
	})
	.openapi("TagRdo", { description: "Tag Rdo" });

const taskRdo = z
	.object({
		id: z.uuid(),
		title: z.string(),
		description: z.string().nullable(),
		status: taskStatusSchema,
		priority: taskPrioritySchema,
		dueDate: z.iso.datetime().nullable(),
		createdAt: z.iso.datetime(),
		updatedAt: z.iso.datetime(),
		tags: z.array(tagRdo),
	})
	.openapi("TaskRdo", { description: "Task Rdo" });

export const taskResponseRdo = z
	.object({
		data: taskRdo,
	})
	.openapi("TaskResponseRdo", { description: "Task Response Rdo" });

export const taskListResponseRdo = z
	.object({
		data: z.array(taskRdo),
		pagination: z
			.object({
				page: z.number().int(),
				limit: z.number().int(),
				total: z.number().int(),
				totalPages: z.number().int(),
			})
			.openapi("Pagination", { description: "Pagination" }),
	})
	.openapi("TaskListResponseRdo", { description: "Task List Response Rdo" });
