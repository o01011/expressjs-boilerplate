import { HTTP_STATUS } from "./status-codes.js";
export class HttpResponse {
    static success(response, data, statusCode = HTTP_STATUS.OK, meta) {
        const payload = { data };
        if (meta) {
            payload.meta = meta;
        }
        return response.status(statusCode).json(payload);
    }
    static created(response, data, meta) {
        return this.success(response, data, HTTP_STATUS.CREATED, meta);
    }
    static noContent(response) {
        return response.status(HTTP_STATUS.NO_CONTENT).send();
    }
    static error(response, code, message, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, details) {
        const payload = {
            error: { code, message },
        };
        if (details) {
            payload.error.details = details;
        }
        return response.status(statusCode).json(payload);
    }
    static paginated(response, items, total, limit, offset, statusCode = HTTP_STATUS.OK) {
        const hasMore = offset + limit < total;
        return this.success(response, items, statusCode, {
            pagination: {
                limit,
                offset,
                total,
                hasMore,
            },
        });
    }
}
//# sourceMappingURL=response.js.map