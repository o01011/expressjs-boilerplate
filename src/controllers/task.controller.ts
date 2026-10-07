import type { NextFunction, Request, Response } from "express";
import { getValidatedData } from "../middlewares/validation.middleware.ts";
import type { CreateTaskInput, ListTasksQuery, UpdateTaskInput } from "../schemas/task.schema.ts";
import { TaskService } from "../services/task.service.ts";

export class TaskController {
	private taskService = new TaskService();

	list = async (_req: Request, res: Response, next: NextFunction) => {
		try {
			const { query } = getValidatedData<{ query: ListTasksQuery }>(res);
			const result = await this.taskService.list(query);
			res.json({
				data: result.tasks,
				pagination: {
					page: result.page,
					limit: result.limit,
					total: result.total,
					totalPages: Math.ceil(result.total / result.limit),
				},
			});
		} catch (e) {
			next(e);
		}
	};

	getById = async (_req: Request<{ id: string }>, res: Response, next: NextFunction) => {
		try {
			const { params } = getValidatedData<{ params: { id: string } }>(res);
			const task = await this.taskService.getById(params.id);
			res.json({
				data: task,
			});
		} catch (e) {
			next(e);
		}
	};

	create = async (_req: Request, res: Response, next: NextFunction) => {
		try {
			const { body } = getValidatedData<{ body: CreateTaskInput }>(res);
			const createdTask = await this.taskService.create(body);
			res.json({ data: createdTask });
		} catch (e) {
			next(e);
		}
	};

	update = async (_req: Request<{ id: string }>, res: Response, next: NextFunction) => {
		try {
			const { body, params } = getValidatedData<{
				body: UpdateTaskInput;
				params: { id: string };
			}>(res);
			const updatedTask = await this.taskService.update(params.id, body);
			res.json({ data: updatedTask });
		} catch (e) {
			next(e);
		}
	};

	delete = async (_req: Request<{ id: string }>, res: Response, next: NextFunction) => {
		try {
			const { params } = getValidatedData<{ params: { id: string } }>(res);
			await this.taskService.delete(params.id);
			res.status(204).send();
		} catch (e) {
			next(e);
		}
	};
}
