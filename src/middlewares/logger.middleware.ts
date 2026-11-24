import type { NextFunction, Request, Response } from "express";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.originalUrl.startsWith("/api/v1/docs")) {
		next();
		return;
	}

	const start = Date.now();

	res.on("finish", () => {
		const duration = Date.now() - start;
		const requestId = req.headers["x-request-id"] ?? "unknown";

		console.log(
			JSON.stringify({
				method: req.method,
				path: req.path,
				status: res.statusCode,
				duration: `${duration}ms`,
				requestId,
			}),
		);
	});
	next();
};
