import { userResolvers } from "./resolvers/userResolvers";
import { employeesResolvers } from "./resolvers/employeesResolver";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...employeesResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...employeesResolvers.Mutation,
  },
};