import type { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
