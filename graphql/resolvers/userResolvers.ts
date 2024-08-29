import prisma from "@/prisma/lib/prisma";

export const userResolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
    user: async (_: any, args: { id: string }) => {
      return await prisma.user.findUnique({
        where: { id: parseInt(args.id) },
      });
    },
    filterUsers: async (_: any, args: { name?: string; age?: number; email?: string }) => {
      return await prisma.user.findMany({
        where: {
          name: args.name ? { contains: args.name } : undefined,
          age: args.age ? args.age : undefined,
          email: args.email ? { contains: args.email } : undefined,
        },
      });
    },
  },
  Mutation: {
    createUser: async (_: any, args: { name: string; age?: number; email: string }) => {
      return prisma.user.create({
        data: {
          name: args.name,
          age: args.age || 0, // Provide a default value for age
          email: args.email,
        },
      });
    },
    updateUser: async (_: any, args: { id: string; name?: string; age?: number; email?: string }) => {
      return prisma.user.update({
        where: { id: parseInt(args.id) },
        data: {
          name: args.name,
          age: args.age,
          email: args.email,
        },
      });
    },
    deleteUser: async (_: any, args: { id: string }) => {
      return prisma.user.delete({
        where: { id: parseInt(args.id) },
      });
    },
  },
};