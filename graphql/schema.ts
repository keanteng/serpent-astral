import { gql } from 'graphql-tag';
import { userTypeDefs } from './schema/userSchema';
import { employeesTypeDefs } from './schema/employeesSchema';
import { ordersTypeDefs } from './schema/ordersSchema';
import { productsTypeDefs } from './schema/productsSchema';
import { orderItemsTypeDefs } from './schema/orderItemsSchema';

const baseTypeDefs = gql`
  type Query
  type Mutation
`;

export const typeDefs = [
  baseTypeDefs,
  userTypeDefs,
  employeesTypeDefs,
  ordersTypeDefs,
  productsTypeDefs,
  orderItemsTypeDefs,
];