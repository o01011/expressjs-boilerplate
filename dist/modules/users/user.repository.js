import { Prisma } from "@web-monorepo/db";
import { AppError } from "../../common/errors/app-error.js";
export const createUserRepository = (prisma) => ({
    create: (data) => mapPrismaError(() => prisma.user.create({ data })),
    delete: async (id) => {
        await mapPrismaError(() => prisma.$transaction(async (transaction) => {
            const user = await transaction.user.findUnique({ select: { role: true }, where: { id } });
            if (!user) {
                throw AppError.notFound("User not found");
            }
            if (user.role === "ADMIN" && (await transaction.user.count({ where: { role: "ADMIN" } })) <= 1) {
                throw AppError.conflict("Cannot remove the last administrator");
            }
            await transaction.user.delete({ where: { id } });
        }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }));
    },
    findByEmail: (email) => prisma.user.findFirst({ where: { email: { equals: email, mode: "insensitive" } } }),
    findById: (id) => prisma.user.findUnique({ where: { id } }),
    list: async ({ limit, offset }) => {
        const [items, total] = await prisma.$transaction([
            prisma.user.findMany({ orderBy: { id: "asc" }, skip: offset, take: limit }),
            prisma.user.count(),
        ]);
        return { items, total };
    },
    update: (id, data) => mapPrismaError(() => prisma.user.update({ data, where: { id } })),
    updateRole: (id, role) => mapPrismaError(() => prisma.$transaction(async (transaction) => {
        const user = await transaction.user.findUnique({ select: { role: true }, where: { id } });
        if (!user) {
            throw AppError.notFound("User not found");
        }
        if (user.role === "ADMIN" && role === "USER" && (await transaction.user.count({ where: { role: "ADMIN" } })) <= 1) {
            throw AppError.conflict("Cannot remove the last administrator");
        }
        return transaction.user.update({ data: { role }, where: { id } });
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable })),
});
const mapPrismaError = async (operation) => {
    try {
        return await operation();
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw AppError.conflict("User with this username or email already exists");
            }
            if (error.code === "P2025") {
                throw AppError.notFound("User not found");
            }
            if (error.code === "P2034") {
                throw AppError.conflict("Concurrent role change; retry the request");
            }
        }
        throw error;
    }
};
//# sourceMappingURL=user.repository.js.map