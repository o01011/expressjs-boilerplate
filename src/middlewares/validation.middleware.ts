import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, type ZodType } from "zod";

export const validateMiddleware = (schema: ZodType) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const validated = schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});

			const locals = res.locals as typeof res.locals & { validated: unknown };
			locals.validated = validated;
			next();
		} catch (e) {
			if (e instanceof ZodError) {
				const details: Record<string, string[]> = {};

				for (const issue of e.issues) {
					const path = issue.path.join(".");
					if (!details[path]) {
						details[path] = [];
					}
					details[path]?.push(issue.message);
				}
				next({
					statusCode: StatusCodes.BAD_REQUEST,
					message: "Validation failed",
					code: "VALIDATION_ERROR",
					details,
				});
				return;
			}
			next(e);
		}
	};
};

export const getValidatedData = <T>(res: Response): T => {
	const locals = res.locals as typeof res.locals & { validated: T };
	return locals.validated;
};
