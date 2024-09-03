import prisma from '@/prisma/lib/prisma';

export const orderItemsResolvers = {
  Query: {
    orderItems: async (_: any, { orderId }: { orderId: number }) => {
      return prisma.orderItem.findMany({
        where: { orderId },
        select: {
          id: true,
          quantity: true,
          productId: true,
          orderId: true,
        },
      });
    },
    products: async () => {
      return await prisma.product.findMany();
    },
  },
  Mutation: {
    createOrderItem: async (_: any, { orderId, productId, quantity }: { orderId: number; productId: number; quantity: number }) => {
      try {
        const newOrderItem = await prisma.orderItem.create({
          data: {
            orderId,
            productId,
            quantity,
          },
        });
        return newOrderItem;
      } catch (error) {
        console.error('Error creating order item:', error);
        throw new Error('Failed to create order item');
      }
    },
    deleteOrderItem: async (_: any, args: { id: number }) => {
      return await prisma.orderItem.delete({
        where: { id: args.id },
      });
    },
  },
};