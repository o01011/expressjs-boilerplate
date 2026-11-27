import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { Router } from "express";
import { TaskController } from "../controllers/task.controller.ts";
import { createTaskDto, getTaskDto, listTasksDto, updateTaskDto } from "../dtos/task.dto.ts";
import { validationMiddleware } from "../middlewares/validation.middleware.ts";
import { apiErrorRdo } from "../rdos/api-error.rdo.ts";
import { taskListResponseRdo, taskResponseRdo } from "../rdos/task.rdo.ts";

const taskRouter = Router();
const taskController = new TaskController();
const taskOpenApiRegistry = new OpenAPIRegistry();

const taskIdParams = getTaskDto.shape.params;

const json = (
	description: string,
	schema: typeof taskResponseRdo | typeof taskListResponseRdo | typeof apiErrorRdo,
): {
	description: string;
	content: { "application/json": { schema: typeof taskResponseRdo | typeof taskListResponseRdo | typeof apiErrorRdo } };
} => ({
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
		query: listTasksDto.shape.query,
	},
	responses: {
		200: json("A page of tasks", taskListResponseRdo),
		400: json("The query failed validation. error.code is VALIDATION_ERROR and error.details lists the fields.", apiErrorRdo),
		500: json("Unexpected failure. error.code is INTERNAL_SERVER_ERROR.", apiErrorRdo),
	},
});
taskRouter.get("/", validationMiddleware(listTasksDto), taskController.list);

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
		200: json("The requested task", taskResponseRdo),
		400: json("The id is not a UUID. error.code is VALIDATION_ERROR.", apiErrorRdo),
		404: json("No task exists with that id. error.code is NOT_FOUND.", apiErrorRdo),
		500: json("Unexpected failure. error.code is INTERNAL_SERVER_ERROR.", apiErrorRdo),
	},
});
taskRouter.get("/:id", validationMiddleware(getTaskDto), taskController.getById);

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
					schema: createTaskDto.shape.body,
				},
			},
		},
	},
	responses: {
		200: json("The created task", taskResponseRdo),
		400: json("The body failed validation, or a task with that title already exists. error.code is VALIDATION_ERROR or CONFLICT.", apiErrorRdo),
		500: json("Unexpected failure. error.code is INTERNAL_SERVER_ERROR.", apiErrorRdo),
	},
});
taskRouter.post("/", validationMiddleware(createTaskDto), taskController.create);

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
					schema: updateTaskDto.shape.body,
				},
			},
		},
	},
	responses: {
		200: json("The updated task", taskResponseRdo),
		400: json("The id or body failed validation, or the title is already taken. error.code is VALIDATION_ERROR or CONFLICT.", apiErrorRdo),
		404: json("No task exists with that id. error.code is NOT_FOUND.", apiErrorRdo),
		500: json("Unexpected failure. error.code is INTERNAL_SERVER_ERROR.", apiErrorRdo),
	},
});
taskRouter.put("/:id", validationMiddleware(updateTaskDto), taskController.update);

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
		400: json("The id is not a UUID. error.code is VALIDATION_ERROR.", apiErrorRdo),
		404: json("No task exists with that id. error.code is NOT_FOUND.", apiErrorRdo),
		500: json("Unexpected failure. error.code is INTERNAL_SERVER_ERROR.", apiErrorRdo),
	},
});
taskRouter.delete("/:id", validationMiddleware(getTaskDto), taskController.delete);

export { taskOpenApiRegistry, taskRouter };
