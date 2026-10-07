import { createApp } from "./app.js";
import { config } from "./config/index.js";
import { logger } from "./lib/logger.js";
const server = createApp().listen(config.PORT, () => {
    logger.info(`Server running on http://localhost:${config.PORT}`);
    logger.info(`Environment: ${config.NODE_ENV}`);
});
server.on("error", (error) => {
    logger.fatal({ err: error }, "HTTP server failed");
    process.exitCode = 1;
});
let shuttingDown = false;
function gracefulShutdown(signal) {
    if (shuttingDown) {
        server.closeAllConnections();
        return;
    }
    shuttingDown = true;
    logger.info({ signal }, "Shutting down HTTP server");
    const forceCloseTimer = setTimeout(() => {
        logger.error("Closing remaining HTTP connections after shutdown timeout");
        server.closeAllConnections();
    }, 10_000);
    forceCloseTimer.unref();
    server.close((error) => {
        clearTimeout(forceCloseTimer);
        if (error) {
            logger.error({ err: error }, "HTTP server shutdown failed");
            process.exitCode = 1;
            return;
        }
        logger.info("HTTP server closed");
    });
}
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("unhandledRejection", (reason) => {
    logger.fatal({ err: reason }, "Unhandled rejection");
    process.exitCode = 1;
    gracefulShutdown("unhandledRejection");
});
process.on("uncaughtException", (error) => {
    logger.fatal({ err: error }, "Uncaught exception");
    process.exitCode = 1;
    gracefulShutdown("uncaughtException");
});
//# sourceMappingURL=index.js.map