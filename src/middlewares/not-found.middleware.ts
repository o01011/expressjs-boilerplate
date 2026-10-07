import type { Request, Response } from "express";

export const notFoundHandlerMiddleware = (req: Request, res: Response) => {
	res.status(404).json({
		error: {
			code: "NOT_FOUND",
			message: `Route ${req.method} ${req.path} not found`,
		},
	});
};
