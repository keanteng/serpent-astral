import prisma from '@/prisma/lib/prisma';

export const productsResolvers = {
  Query: {
    searchProducts: async (_: any, { term }: { term: string }) => {
      return prisma.product.findMany({
        where: {
          name: { contains: term },
        },
      });
    },
    allProducts: async () => {
      return prisma.product.findMany();
    },
  },
  Mutation: {
    createProduct: async (_: any, { name, price }: { name: string; price: number }) => {
      return prisma.product.create({
        data: {
          name,
          price,
        },
      });
    },
    deleteProduct: async (_: any, { id }: { id: number }) => {
      return prisma.product.delete({
        where: {
          id,
        },
      });
    },
    updateProduct: async (_: any, { id, name, price }: { id: number; name?: string; price?: number }) => {
      return prisma.product.update({
        where: { id },
        data: {
          name,
          price,
        },
      });
    },
  },
};