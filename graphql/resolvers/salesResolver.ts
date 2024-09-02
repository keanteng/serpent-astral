import prisma from "@/prisma/lib/prisma";

export const salesResolvers = {
  Query: {
    products: async () => {
      return await prisma.product.findMany();
    },
    orders: async () => {
      return await prisma.order.findMany({ include: { orderItems: true } });
    },
  },
  Mutation: {
    createOrder: async (_: unknown, { customer }: { customer: string }) => {
      return await prisma.order.create({
        data: {
          customer,
        },
        include: {
          orderItems: true,
        },
      });
    },
    addOrderItem: async (_: unknown, { orderId, productId, quantity }: { orderId: number, productId: number, quantity: number }) => {
      return await prisma.orderItem.create({
        data: {
          orderId,
          productId,
          quantity,
        },
      });
    },
  },
  OrderItem: {
    product: async (parent: { productId: number }) => await prisma.product.findUnique({ where: { id: parent.productId } }),
    order: async (parent: { orderId: number }) => await prisma.order.findUnique({ where: { id: parent.orderId } }),
  },
};