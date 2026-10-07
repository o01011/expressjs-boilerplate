export const toUserDto = ({ password: _password, createdAt, updatedAt, ...user }) => ({
    ...user,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
});
//# sourceMappingURL=user.dto.js.map