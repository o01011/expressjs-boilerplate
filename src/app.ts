import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import z from "zod";
import { errorMiddleware } from "./middlewares/error.middleware.ts";
import { loggerMiddleware } from "./middlewares/logger.middleware.ts";
import { notFoundHandlerMiddleware } from "./middlewares/not-found.middleware.ts";
import { requestIdMiddleware } from "./middlewares/request-id.middleware.ts";
import healthCheckRouter from "./routes/health-check.route.ts";
import router from "./routes/task.route.ts";

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

const openApiRegistry = new OpenAPIRegistry();

openApiRegistry.registerPath({
	method: "get",
	path: "/api/v1/tasks",
	description: "",
	summary: "",
	request: {
		params: z.object({ id: z.string() }),
	},
	responses: {
		200: {
			description: "",
			content: {
				"application/json": {},
			},
		},
	},
});

const openApiGenerator = new OpenApiGeneratorV3(openApiRegistry.definitions);
const openApiSpec = openApiGenerator.generateDocument({
	openapi: "3.0.0",
	info: {
		title: "User API",
		version: "1.0.0",
	},
});

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.use("/api/v1/health-checks", healthCheckRouter);
app.use("/api/v1/tasks", router);

app.use(notFoundHandlerMiddleware);
app.use(errorMiddleware);

export default app;
