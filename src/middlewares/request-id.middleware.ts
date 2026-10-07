import type { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const id = (req.headers["x-request-id"] as string) ?? uuidv4();
	req.headers["x-request-id"] = id;
	res.setHeader("x-request-id", id);
	next();
};
