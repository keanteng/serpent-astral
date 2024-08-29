import { gql } from 'graphql-tag';
import { userTypeDefs } from './schema/userSchema';

const baseTypeDefs = gql`
  type Query
  type Mutation
`;

export const typeDefs = [
  baseTypeDefs,
  userTypeDefs,
];