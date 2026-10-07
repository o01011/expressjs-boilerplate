export class AppError extends Error {
	public statusCode: number;
	public code?: string;
	constructor(statusCode: number, message: string, code?: string) {
		super(message);
		this.name = "AppError";
		this.statusCode = statusCode;
		this.code = code;
	}
}

export class NotFoundError extends AppError {
	constructor(resource: string, id: string) {
		super(404, `${resource} with id '${id}' not found`, "NOT_FOUND");
		this.name = "NotFoundError";
	}
}

export class ValidationError extends AppError {
	public details?: Record<string, string[]>;
	constructor(message: string, details?: Record<string, string[]>) {
		super(400, message, "VALIDATION_ERROR");
		this.name = "ValidationError";
		this.details = details;
	}
}

export class ConflictError extends AppError {
	constructor(message: string) {
		super(400, message, "CONFLICT");
		this.name = "ConflictError";
	}
}
