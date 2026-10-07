import { Router } from "express";
const healthCheck = (_request, response) => {
    response.json({
        success: true,
        data: {
            status: "healthy",
            timestamp: new Date().toISOString(),
        },
    });
};
const readiness = (_request, response) => {
    response.json({
        success: true,
        data: { status: "ready" },
    });
};
export const healthRouter = Router().get("/health", healthCheck).get("/readiness", readiness);
//# sourceMappingURL=health.js.map