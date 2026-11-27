import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const apiErrorRdo = z
	.object({
		error: z.object({
			code: z.string(),
			message: z.string(),
			details: z.record(z.string(), z.array(z.string())).optional(),
			requestId: z.string().optional(),
		}),
	})
	.openapi("ApiErrorRdo", { description: "Api Error Rdo" });
