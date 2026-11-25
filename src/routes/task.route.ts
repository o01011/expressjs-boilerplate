import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { Router } from "express";
import { TaskController } from "../controllers/task.controller.ts";
import { validationMiddleware } from "../middlewares/validation.middleware.ts";
import {
	apiErrorSchema,
	createTaskSchema,
	getTaskSchema,
	listTasksSchema,
	taskListResponseSchema,
	taskResponseSchema,
	updateTaskSchema,
} from "../schemas/task.schema.ts";

const taskRouter = Router();
const taskController = new TaskController();
const taskOpenApiRegistry = new OpenAPIRegistry();

const taskIdParams = getTaskSchema.shape.params;

const json = (description: string, schema: typeof taskResponseSchema | typeof taskListResponseSchema | typeof apiErrorSchema) => ({
	description,
	content: {
		"application/json": {
			schema,
		},
	},
});

taskOpenApiRegistry.registerPath({
	method: "get",
	path: "/api/v1/tasks",
	operationId: "listTasks",
	tags: ["Tasks"],
	summary: "List tasks",
	description:
		"Returns a paginated list of tasks. Results can be filtered by status or priority and sorted by createdAt, title, priority, or dueDate.",
	request: {
		query: listTasksSchema.shape.query,
	},
	responses: {
		200: json("A page of tasks", taskListResponseSchema),
	},
});
taskRouter.get("/", validationMiddleware(listTasksSchema), taskController.list);

taskOpenApiRegistry.registerPath({
	method: "get",
	path: "/api/v1/tasks/{id}",
	operationId: "getTask",
	tags: ["Tasks"],
	summary: "Get a task",
	description: "Returns a single task, including its tags.",
	request: {
		params: taskIdParams,
	},
	responses: {
		200: json("The requested task", taskResponseSchema),
	},
});
taskRouter.get("/:id", validationMiddleware(getTaskSchema), taskController.getById);

taskOpenApiRegistry.registerPath({
	method: "post",
	path: "/api/v1/tasks",
	operationId: "createTask",
	tags: ["Tasks"],
	summary: "Create a task",
	description: "Creates a task. Tag names are created when they do not already exist. The title must be unique.",
	request: {
		body: {
			required: true,
			content: {
				"application/json": {
					schema: createTaskSchema.shape.body,
				},
			},
		},
	},
	responses: {
		200: json("The created task", taskResponseSchema),
	},
});
taskRouter.post("/", validationMiddleware(createTaskSchema), taskController.create);

taskOpenApiRegistry.registerPath({
	method: "put",
	path: "/api/v1/tasks/{id}",
	operationId: "updateTask",
	tags: ["Tasks"],
	summary: "Update a task",
	description: "Updates the provided fields of a task. When tags are sent, they replace the task's current tags. The title must stay unique.",
	request: {
		params: taskIdParams,
		body: {
			content: {
				"application/json": {
					schema: updateTaskSchema.shape.body,
				},
			},
		},
	},
	responses: {
		200: json("The updated task", taskResponseSchema),
	},
});
taskRouter.put("/:id", validationMiddleware(updateTaskSchema), taskController.update);

taskOpenApiRegistry.registerPath({
	method: "delete",
	path: "/api/v1/tasks/{id}",
	operationId: "deleteTask",
	tags: ["Tasks"],
	summary: "Delete a task",
	description: "Deletes a task by id.",
	request: {
		params: taskIdParams,
	},
	responses: {
		204: {
			description: "The task was deleted",
		},
	},
});
taskRouter.delete("/:id", validationMiddleware(getTaskSchema), taskController.delete);

export { taskOpenApiRegistry, taskRouter };
