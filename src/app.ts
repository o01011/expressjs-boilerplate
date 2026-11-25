import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/config.ts";
import { errorMiddleware } from "./middlewares/error.middleware.ts";
import { loggerMiddleware } from "./middlewares/logger.middleware.ts";
import { notFoundHandlerMiddleware } from "./middlewares/not-found.middleware.ts";
import { requestIdMiddleware } from "./middlewares/request-id.middleware.ts";
import healthCheckRouter from "./routes/health-check.route.ts";
import { taskOpenApiRegistry, taskRouter } from "./routes/task.route.ts";

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		credentials: true,
	}),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(requestIdMiddleware);
app.use(loggerMiddleware);

const openApiRegistry = new OpenAPIRegistry([taskOpenApiRegistry]);
const openApiGenerator = new OpenApiGeneratorV3(openApiRegistry.definitions);
const openApiSpec = openApiGenerator.generateDocument({
	openapi: "3.0.0",
	info: {
		title: env.APP_NAME,
		version: "1.0.0",
		description: env.APP_DESCRIPTION,
	},
});

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.use("/api/v1/health-checks", healthCheckRouter);
app.use("/api/v1/tasks", taskRouter);

app.use(notFoundHandlerMiddleware);
app.use(errorMiddleware);

export default app;
