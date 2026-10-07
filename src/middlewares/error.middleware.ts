import type { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
	err: Error & { statusCode?: number; code?: string; details?: Record<string, string[]> },
	req: Request,
	res: Response,
	_next: NextFunction,
) => {
	const statusCode = err.statusCode ?? 500;
	const code = err.code ?? "INTERNAL_ERROR";
	const message = statusCode === 500 ? "Internal server error" : err.message;
	const requestId = req.headers["x-request-id"] as string | undefined;

	if (statusCode === 500) {
		console.error("Unhandled error", {
			message: err.message,
			stack: err.stack,
			requestId,
		});
	}

	res.status(statusCode).json({
		error: {
			code,
			message,
			detals: err.details,
			requestId,
		},
	});
};
