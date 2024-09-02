import { gql } from 'graphql-tag';
import { userTypeDefs } from './schema/userSchema';
import { employeesTypeDefs } from './schema/employeesSchema';
import { salesTypeDefs } from './schema/salesSchema';

const baseTypeDefs = gql`
  type Query
  type Mutation
`;

export const typeDefs = [
  baseTypeDefs,
  userTypeDefs,
  employeesTypeDefs,
  salesTypeDefs,
];