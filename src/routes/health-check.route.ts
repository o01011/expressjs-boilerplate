import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (_request, response) => {
	response.status(StatusCodes.OK).json({ data: { status: "ok" } });
});

export default router;
