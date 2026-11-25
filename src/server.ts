import app from "./app.ts";
import { env } from "./config/config.ts";
import { db } from "./db/db.ts";

const server = app.listen(env.APP_PORT, env.APP_HOST, () => {
	console.log(`Server running at http://${env.APP_HOST}:${env.APP_PORT}`);
	console.log(`Environment: ${env.NODE_ENV}`);
	console.log(`API docs: http://${env.APP_HOST}:${env.APP_PORT}/api/v1/docs`);
});

server.on("error", (error) => {
	console.error("HTTP server failed", error);
	process.exit(1);
});

const shutdown = async (signal: NodeJS.Signals) => {
	console.log(`${signal} received, shutting down`);
	setTimeout(() => process.exit(1), 10_000).unref();

	await new Promise<void>((resolve) => {
		server.close(() => resolve());
	});
	await db.$disconnect();
	process.exit(0);
};

for (const signal of ["SIGINT", "SIGTERM"] as const) {
	process.once(signal, () => {
		shutdown(signal).catch((error: unknown) => {
			console.error("Shutdown failed", error);
			process.exit(1);
		});
	});
}
