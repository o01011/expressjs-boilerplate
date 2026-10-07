import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Task Management API",
			version: "1.0.0",
			description: "A REST API for managing tasks, built with Express.js and TypeScript",
		},
		servers: [
			{
				url: "/api/v1",
				description: "API v1",
			},
		],
		components: {
			schemas: {
				Task: {
					type: "object",
					properties: {
						id: { type: "string", format: "uuid" },
						title: { type: "string", maxLength: 200 },
						description: { type: "string", maxLength: 2000 },
						status: { type: "string", enum: ["todo", "in_progress", "done"] },
						priority: { type: "string", enum: ["low", "medium", "high"] },
						dueDate: { type: "string", format: "date-time" },
						createdAt: { type: "string", format: "date-time" },
						updatedAt: { type: "string", format: "date-time" },
					},
				},
				CreateTask: {
					type: "object",
					required: ["title"],
					properties: {
						title: { type: "string", minLength: 1, maxLength: 200 },
						description: { type: "string", maxLength: 2000 },
						status: { type: "string", enum: ["todo", "in_progress", "done"], default: "todo" },
						priority: { type: "string", enum: ["low", "medium", "high"], default: "medium" },
						dueDate: { type: "string", format: "date-time" },
					},
				},
				Error: {
					type: "object",
					properties: {
						error: {
							type: "object",
							properties: {
								code: { type: "string" },
								message: { type: "string" },
								details: { type: "object" },
								requestId: { type: "string" },
							},
						},
					},
				},
			},
		},
	},
	apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
