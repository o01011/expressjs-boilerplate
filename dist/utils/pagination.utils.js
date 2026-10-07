import { APP_CONSTANTS } from "../common/constants/index.js";
export const paginationUtils = {
    normalizePage(page, defaultPage = 0) {
        if (page === undefined || page === null || page === "")
            return defaultPage;
        const parsed = typeof page === "string" ? parseInt(page, 10) : page;
        return Math.max(0, Number.isNaN(parsed) ? defaultPage : parsed);
    },
    normalizeLimit(limit, defaultLimit = APP_CONSTANTS.PAGINATION.DEFAULT_LIMIT) {
        if (limit === undefined || limit === null || limit === "")
            return defaultLimit;
        const parsed = typeof limit === "string" ? parseInt(limit, 10) : limit;
        let value = Number.isNaN(parsed) ? defaultLimit : parsed;
        if (value < 1)
            value = 1;
        if (value > APP_CONSTANTS.PAGINATION.MAX_LIMIT)
            value = APP_CONSTANTS.PAGINATION.MAX_LIMIT;
        return value;
    },
    normalizeOffset(offset, defaultOffset = APP_CONSTANTS.PAGINATION.DEFAULT_OFFSET) {
        if (offset === undefined || offset === null || offset === "")
            return defaultOffset;
        const parsed = typeof offset === "string" ? parseInt(offset, 10) : offset;
        return Math.max(0, Number.isNaN(parsed) ? defaultOffset : parsed);
    },
    calculateTotalPages(total, limit) {
        return Math.ceil(total / limit);
    },
    calculateHasMore(total, limit, offset) {
        return offset + limit < total;
    },
    calculateHasPrevious(offset) {
        return offset > 0;
    },
};
//# sourceMappingURL=pagination.utils.js.map