import { v4 as uuidv4 } from "uuid";
export const requestIdMiddleware = (req, res, next) => {
    const id = req.headers["x-request-id"] ?? uuidv4();
    req.headers["x-request-id"] = id;
    res.setHeader("x-request-id", id);
    next();
};
//# sourceMappingURL=request-id.middleware.js.map