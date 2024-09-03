import { gql } from 'graphql-tag';

export const ordersTypeDefs = gql`
scalar DateTime

type Order {
  id: Int!
  customer: String!
  date: DateTime!
}

type Query {
  orders: [Order!]!
  searchOrders(term: String!): [Order!]!
}

type Mutation {
  createOrder(customer: String!, date: String!): Order!
  updateOrder(id: Int!, customer: String!, date: String!): Order!
  deleteOrder(id: Int!): Order!
}

`