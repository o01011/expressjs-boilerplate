import app from "./app.ts";
import { env } from "./config/config.ts";
import { db } from "./db/db.ts";

app.listen(env.APP_PORT, env.APP_HOST, () => {
	console.log(`Server running at http://${env.APP_HOST}:${env.APP_PORT}`);
	console.log(`Environment: ${env.NODE_ENV}`);
	console.log(`API docs: http://${env.APP_HOST}:${env.APP_PORT}/api/docs`);
});

process.on("SIGINT", async () => {
	await db.$disconnect();
	process.exit(0);
});

process.on("SIGTERM", async () => {
	await db.$disconnect();
	process.exit(0);
});
