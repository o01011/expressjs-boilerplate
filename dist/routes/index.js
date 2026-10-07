import { Router } from "express";
import { healthRouter } from "./health.js";
export const apiRouter = Router().use(healthRouter);
//# sourceMappingURL=index.js.map