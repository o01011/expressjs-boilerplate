import { Router } from "express";
import { TaskController } from "../controllers/task.controller.ts";
import { validationMiddleware } from "../middlewares/validation.middleware.ts";
import { createTaskSchema, getTaskSchema, listTasksSchema, updateTaskSchema } from "../schemas/task.schema.ts";

const router = Router();
const controller = new TaskController();

router.get("/", validationMiddleware(listTasksSchema), controller.list);
router.get("/:id", validationMiddleware(getTaskSchema), controller.getById);
router.post("/", validationMiddleware(createTaskSchema), controller.create);
router.put("/:id", validationMiddleware(updateTaskSchema), controller.update);
router.delete("/:id", validationMiddleware(getTaskSchema), controller.delete);

export default router;
