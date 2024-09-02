import { userResolvers } from "./resolvers/userResolvers";
import { employeesResolvers } from "./resolvers/employeesResolver";
import { salesResolvers } from "./resolvers/salesResolver";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...employeesResolvers.Query,
    ...salesResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...employeesResolvers.Mutation,
    ...salesResolvers.Mutation,
  },
  OrderItem: {
    ...salesResolvers.OrderItem,
  },
};