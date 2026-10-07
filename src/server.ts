import express from "express";
import { requestIdMiddleware } from "./middlewares/request-id.middleware.ts";
import { loggerMiddleware } from "./middlewares/logger.middleware.ts";
import { notFoundHandlerMiddleware } from "./middlewares/not-found.middleware.ts";
import { errorMiddleware } from "./middlewares/error.middleware.ts";
import router from "./routes/task.route.ts";
import { env } from "./config/config.ts";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.ts";
import { prisma } from "./lib/prisma.ts";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(requestIdMiddleware);
app.use(loggerMiddleware);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/tasks", router);

app.use(notFoundHandlerMiddleware);
app.use(errorMiddleware);

app.listen(env.APP_PORT, env.APP_HOST, () => {
	console.log(`Server running at http://${env.APP_HOST}:${env.APP_PORT}`);
	console.log(`Environment: ${env.NODE_ENV}`);
	console.log(`API docs: http://${env.APP_HOST}:${env.APP_PORT}/api/docs`);
});

process.on("SIGINT", async () => {
	await prisma.$disconnect();
	process.exit(0);
});

process.on("SIGTERM", async () => {
	await prisma.$disconnect();
	process.exit(0);
});
