import prisma from '@/prisma/lib/prisma';

export const ordersResolvers = {
  Query: {
    orders: async () => {
      return prisma.order.findMany({
        select: {
          id: true,
          customer: true,
          date: true,
        },
      });
    },
    searchOrders: async (_: any, { term }: { term: string }) => {
      return prisma.order.findMany({
        where: {
          customer: {
            contains: term,
          },
        },
        select: {
          id: true,
          customer: true,
          date: true,
        },
      });
    },
  },
  Mutation: {
    createOrder: async (_: any, { customer, date }: { customer: string; date: string }) => {
      try {
        const newOrder = await prisma.order.create({
          data: {
            customer,
            date: new Date(date), // Ensure date is a Date object
          },
        });
        return newOrder;
      } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Failed to create order');
      }
    },
    updateOrder: async (_: any, { id, customer, date }: { id: number; customer: string; date: string }) => {
      return prisma.order.update({
        where: { id },
        data: {
          customer,
          date: new Date(date), // Ensure date is a Date object
        },
      });
    },
    deleteOrder: async (_: any, { id }: { id: number }) => {
      try {
        const deletedOrder = await prisma.order.delete({
          where: { id },
        });
        return deletedOrder;
      } catch (error) {
        console.error('Error deleting order:', error);
        throw new Error('Failed to delete order');
      }
    },
  },
};