import { userResolvers } from "./resolvers/userResolvers";
import { employeesResolvers } from "./resolvers/employeesResolver";
import { ordersResolvers } from "./resolvers/ordersResolver";
import { productsResolvers } from "./resolvers/productsResolver";
import { orderItemsResolvers } from "./resolvers/orderItemsResolver";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...employeesResolvers.Query,
    ...ordersResolvers.Query,
    ...productsResolvers.Query,
    ...orderItemsResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...employeesResolvers.Mutation,
    ...ordersResolvers.Mutation,
    ...productsResolvers.Mutation,
    ...orderItemsResolvers.Mutation
  },
};