import { Router } from "express";
import { TaskController } from "../controllers/task.controller.js";
import { validateMiddleware } from "../middlewares/validation.middleware.js";
import { createTaskSchema, getTaskSchema, listTasksSchema, updateTaskSchema } from "../schemas/task.schema.js";
const router = Router();
const controller = new TaskController();
/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: List all tasks
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [todo, in_progress, done]
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: List of tasks with pagination
 */
router.get("/", validateMiddleware(listTasksSchema), controller.list);
/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Task details
 *       404:
 *         description: Task not found
 */
router.get("/:id", validateMiddleware(getTaskSchema), controller.getById);
/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *     responses:
 *       201:
 *         description: Task created
 *       400:
 *         description: Validation error
 *       409:
 *         description: Task with same title exists
 */
router.post("/", validateMiddleware(createTaskSchema), controller.create);
/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *     responses:
 *       200:
 *         description: Task updated
 *       404:
 *         description: Task not found
 */
router.put("/:id", validateMiddleware(updateTaskSchema), controller.update);
/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */
router.delete("/", validateMiddleware(getTaskSchema), controller.delete);
export default router;
//# sourceMappingURL=task.route.js.map