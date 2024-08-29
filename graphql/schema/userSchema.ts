import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    filterUsers(name: String, age: Int, email: String): [User!]!
  }

  type Mutation {
    createUser(name: String!, age: Int, email: String!): User
    updateUser(id: ID!, name: String, age: Int, email: String): User
    deleteUser(id: ID!): User
  }
`;