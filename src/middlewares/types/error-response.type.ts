export type ErrorResponseType = {
	error: {
		code: string;
		message: string;
		details?: Record<string, string[]>;
		requestId?: string;
	};
};
