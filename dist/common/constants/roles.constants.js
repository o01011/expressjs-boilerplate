export const ROLE = {
    ADMIN: "ADMIN",
    USER: "USER",
};
export const ROLE_HIERARCHY = {
    [ROLE.ADMIN]: 2,
    [ROLE.USER]: 1,
};
export const isRoleGreaterOrEqual = (userRole, requiredRole) => {
    return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};
//# sourceMappingURL=roles.constants.js.map