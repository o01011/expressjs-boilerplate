import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware.ts";
import { loggerMiddleware } from "./middlewares/logger.middleware.ts";
import { notFoundHandlerMiddleware } from "./middlewares/not-found.middleware.ts";
import { requestIdMiddleware } from "./middlewares/request-id.middleware.ts";
import router from "./routes/task.route.ts";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.ts";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(requestIdMiddleware);
app.use(loggerMiddleware);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/tasks", router);

app.use(notFoundHandlerMiddleware);
app.use(errorMiddleware);

export default app;
