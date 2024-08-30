import prisma from "@/prisma/lib/prisma";

export const employeesResolvers = {
    Query: {
        employees: async () => {
            return await prisma.employee.findMany();
        },
    }
}